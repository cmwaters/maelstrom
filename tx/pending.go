package tx

import (
	"fmt"

	wire "github.com/cmwaters/maelstrom/proto/gen/maelstrom/v1"
	"github.com/dgraph-io/badger"
	"google.golang.org/protobuf/proto"
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
		signer:           signer,
		namespace:        namespace,
		blobs:            blobs,
		fee:              fee,
		estimatedGas:     estimatedGas,
		insertHeight:     p.latestHeight,
		timeoutBlocks:    options.TimeoutBlocks,
		compact:          options.Compact,
		namespaceVersion: options.NamespaceVersion,
		shareVersion:     options.ShareVersion,
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
	if err := p.store.DeletePendingTx(id); err != nil {
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

func (s *Store) GetAllPendingTxs() (map[ID]*wire.Tx, error) {
	pendingTxs := make(map[ID]*wire.Tx)
	err := s.db.View(func(txn *badger.Txn) error {
		opts := badger.DefaultIteratorOptions
		opts.Prefix = []byte{PendingTxPrefix}
		it := txn.NewIterator(opts)
		defer it.Close()
		for it.Rewind(); it.Valid(); it.Next() {
			item := it.Item()
			key := TxIDFromBytes(item.Key())
			var pendingTx *wire.Tx
			err := item.Value(func(val []byte) error {
				if err := proto.Unmarshal(val, pendingTx); err != nil {
					return err
				}
				return nil
			})
			if err != nil {
				return err
			}
			pendingTxs[key] = pendingTx
		}
		return nil
	})
	return pendingTxs, err
}

func (s *Store) SetPendingTx(pendingTx *wire.Tx, hook func(txn *badger.Txn) error) (ID, error) {
	var lastID ID
	err := s.db.Update(func(txn *badger.Txn) error {
		bz, err := proto.Marshal(pendingTx)
		if err != nil {
			return err
		}

		item, err := txn.Get(LastTxKey())
		if err != nil {
			return err
		}

		err = item.Value(func(val []byte) error {
			lastID = TxIDFromBytes(val)
			return txn.Set(LastTxKey(), PendingTxKey(lastID+1))
		})
		if err != nil {
			return err
		}

		if err := txn.Set(PendingTxKey(lastID), bz); err != nil {
			return err
		}

		if hook != nil {
			return hook(txn)
		}
		return nil
	})
	return lastID, err
}

func (s *Store) DeletePendingTx(id ID) error {
	return s.db.Update(func(txn *badger.Txn) error {
		return txn.Delete(PendingTxKey(id))
	})
}
