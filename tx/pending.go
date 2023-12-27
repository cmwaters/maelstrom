package tx

import (
	"fmt"

	"github.com/cmwaters/maelstrom/account"
	wire "github.com/cmwaters/maelstrom/proto/gen/maelstrom/v1"
	"github.com/dgraph-io/badger"
	"google.golang.org/protobuf/proto"
)

const (
	defaultTimeout = 10
	maxTimeout     = 1_000
)

func (p *Pool) Add(
	signer string,
	namespace []byte,
	blobs [][]byte,
	fee, estimatedGas uint64,
	options *wire.Options,
	hook func(*badger.Txn) error,
) (ID, error) {
	p.mtx.Lock()
	defer p.mtx.Unlock()

	tx := &Tx{
		signer:        signer,
		namespace:     namespace,
		blobs:         blobs,
		fee:           fee,
		estimatedGas:  estimatedGas,
		insertHeight:  p.latestHeight,
		timeoutBlocks: defaultTimeout,
	}
	if options != nil {
		if options.TimeoutBlocks > 0 && options.TimeoutBlocks <= maxTimeout {
			tx.timeoutBlocks = options.TimeoutBlocks
		}
	}
	hash := tx.Hash()
	if _, ok := p.txByHash[string(hash[:])]; ok {
		return 0, fmt.Errorf("duplicate transaction")
	}

	pendingTx := tx.ToPendingTx()
	id, err := p.store.SetPendingTx(pendingTx, hook)
	if err != nil {
		return 0, err
	}
	tx.id = id
	p.txByHash[string(hash)] = id
	p.txs[id] = tx
	p.pendingQueue = append(p.pendingQueue, tx)
	p.totalGas += estimatedGas
	p.totalFee += fee

	return id, nil
}

func (p *Pool) Cancel(id ID) error {
	p.mtx.Lock()
	defer p.mtx.Unlock()
	tx, ok := p.txs[id]
	if !ok {
		return fmt.Errorf("tx not found")
	}
	if _, ok := p.reverseBatchMap[id]; ok {
		return fmt.Errorf("tx has already been broadcasted")
	}
	refund := func(txn *badger.Txn) error {
		// refund the fee back to the user
		_, err := account.UpdateBalance(txn, tx.signer, tx.fee, true)
		return err
	}

	if err := p.store.DeletePendingTx(id, refund); err != nil {
		return err
	}
	delete(p.txs, id)
	// remove the tx from the queue
	for i, queueTx := range p.pendingQueue {
		if queueTx.id == id {
			p.pendingQueue = append(p.pendingQueue[:i], p.pendingQueue[i+1:]...)
			break
		}
	}
	delete(p.txByHash, string(tx.Hash()))
	p.totalGas -= tx.estimatedGas
	p.totalFee -= tx.fee
	return nil
}

func (p *Pool) Pull(gasPrice float64, fixedPFBGas uint64) []*Tx {
	p.mtx.Lock()
	defer p.mtx.Unlock()

	if float64(p.totalFee) > float64((p.totalGas+fixedPFBGas))*gasPrice {
		return p.pendingQueue
	}
	return nil
}

func (p *Pool) GetPendingTx(id ID) *Tx {
	p.mtx.Lock()
	defer p.mtx.Unlock()

	return p.txs[id]
}

func (s *Store) GetPendingTx(id ID) (*wire.Tx, error) {
	var pendingTx *wire.Tx
	err := s.db.View(func(txn *badger.Txn) error {
		item, err := txn.Get(PendingTxKey(id))
		if err != nil {
			return err
		}
		return item.Value(func(val []byte) error {
			return proto.Unmarshal(val, pendingTx)
		})
	})
	return pendingTx, err
}

func (s *Store) SetPendingTx(pendingTx *wire.Tx, hook func(txn *badger.Txn) error) (ID, error) {
	var lastID ID
	err := s.db.Update(func(txn *badger.Txn) error {
		bz, err := proto.Marshal(pendingTx)
		if err != nil {
			return err
		}

		item, err := txn.Get(LastTxIDKey())
		if err != nil {
			return fmt.Errorf("getting last tx id: %w", err)
		}

		err = item.Value(func(val []byte) error {
			lastID = TxIDFromBytes(val)
			fmt.Println("lastID", lastID)
			return nil
		})
		if err != nil {
			return err
		}

		if err := txn.Set(LastTxIDKey(), PendingTxKey(lastID+1)); err != nil {
			return fmt.Errorf("incrementing last tx id: %w", err)
		}

		if err := txn.Set(PendingTxKey(lastID), bz); err != nil {
			return err
		}

		if hook != nil {
			return hook(txn)
		}
		return nil
	})
	fmt.Println("returning lastID", lastID)
	return lastID, err
}

func (s *Store) DeletePendingTx(id ID, hook func(txn *badger.Txn) error) error {
	return s.db.Update(func(txn *badger.Txn) error {
		if hook != nil {
			if err := hook(txn); err != nil {
				return err
			}
		}
		return txn.Delete(PendingTxKey(id))
	})
}

func (s *Store) RefundLostPendingTxs(height Height) (map[ID]Height, error) {
	expiredTxMap := make(map[ID]Height)
	err := s.db.Update(func(txn *badger.Txn) error {
		opts := badger.DefaultIteratorOptions
		opts.Reverse = true
		it := txn.NewIterator(opts)
		defer it.Close()

		for it.Seek([]byte{PendingTxPrefix}); it.ValidForPrefix([]byte{PendingTxPrefix}); it.Next() {
			item := it.Item()
			txID := TxIDFromBytes(item.Key())
			if err := markExpired(txn, txID, height); err != nil {
				return err
			}
			var tx wire.Tx
			err := item.Value(func(val []byte) error {
				return proto.Unmarshal(val, &tx)
			})
			if err != nil {
				return err
			}

			// refund the fee back to the user
			if _, err := account.UpdateBalance(txn, tx.Signer, tx.Fee, true); err != nil {
				return err
			}

			expiredTxMap[txID] = height
		}
		return nil
	})
	if err != nil {
		return nil, err
	}
	return expiredTxMap, nil
}
