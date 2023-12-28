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
) (BlobID, error) {
	p.mtx.Lock()
	defer p.mtx.Unlock()

	blob := &Blob{
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
			blob.timeoutBlocks = options.TimeoutBlocks
		}
	}
	hash := blob.Hash()
	if _, ok := p.blobByHash[string(hash[:])]; ok {
		return 0, fmt.Errorf("duplicate transaction")
	}

	blobMeta := blob.BlobMeta()
	id, err := p.store.SetPendingBlob(blobMeta, hook)
	if err != nil {
		return 0, err
	}
	blob.id = id
	p.blobByHash[string(hash)] = id
	p.blobs[id] = blob
	p.pendingQueue = append(p.pendingQueue, blob)
	p.totalGas += estimatedGas
	p.totalFee += fee

	return id, nil
}

func (p *Pool) Cancel(id BlobID) error {
	p.mtx.Lock()
	defer p.mtx.Unlock()
	tx, ok := p.blobs[id]
	if !ok {
		return fmt.Errorf("tx not found")
	}
	if _, ok := p.reverseBlobTxMap[id]; ok {
		return fmt.Errorf("tx has already been broadcasted")
	}
	refund := func(txn *badger.Txn) error {
		// refund the fee back to the user
		err := account.UpdateBalance(txn, tx.signer, tx.fee, true)
		return err
	}

	if err := p.store.DeletePendingBlob(id, refund); err != nil {
		return err
	}
	delete(p.blobs, id)
	// remove the tx from the queue
	for i, queueTx := range p.pendingQueue {
		if queueTx.id == id {
			p.pendingQueue = append(p.pendingQueue[:i], p.pendingQueue[i+1:]...)
			break
		}
	}
	delete(p.blobByHash, string(tx.Hash()))
	p.totalGas -= tx.estimatedGas
	p.totalFee -= tx.fee
	return nil
}

func (p *Pool) Pull(gasPrice float64, fixedPFBGas uint64) []*Blob {
	p.mtx.Lock()
	defer p.mtx.Unlock()

	if float64(p.totalFee) > float64((p.totalGas+fixedPFBGas))*gasPrice {
		return p.pendingQueue
	}
	return nil
}

func (p *Pool) GetPendingTx(id BlobID) *Blob {
	p.mtx.Lock()
	defer p.mtx.Unlock()

	return p.blobs[id]
}

func (s *Store) GetBlobMeta(id BlobID) (*wire.BlobMeta, error) {
	var blobMeta *wire.BlobMeta
	err := s.db.View(func(txn *badger.Txn) error {
		item, err := txn.Get(PendingBlobKey(id))
		if err != nil {
			return err
		}
		return item.Value(func(val []byte) error {
			return proto.Unmarshal(val, blobMeta)
		})
	})
	return blobMeta, err
}

func (s *Store) SetPendingBlob(blobMeta *wire.BlobMeta, hook func(txn *badger.Txn) error) (BlobID, error) {
	var lastID BlobID
	err := s.db.Update(func(txn *badger.Txn) error {
		bz, err := proto.Marshal(blobMeta)
		if err != nil {
			return err
		}

		item, err := txn.Get(LastBlobIDKey())
		if err != nil {
			return fmt.Errorf("getting last tx id: %w", err)
		}

		err = item.Value(func(val []byte) error {
			lastID = BlobIDFromKey(val)
			return nil
		})
		if err != nil {
			return err
		}

		if err := txn.Set(LastBlobIDKey(), PendingBlobKey(lastID+1)); err != nil {
			return fmt.Errorf("incrementing last tx id: %w", err)
		}

		if err := txn.Set(PendingBlobKey(lastID), bz); err != nil {
			return err
		}

		if hook != nil {
			return hook(txn)
		}
		return nil
	})
	return lastID, err
}

func (s *Store) DeletePendingBlob(id BlobID, hook func(txn *badger.Txn) error) error {
	return s.db.Update(func(txn *badger.Txn) error {
		if hook != nil {
			if err := hook(txn); err != nil {
				return err
			}
		}
		return txn.Delete(PendingBlobKey(id))
	})
}

func (s *Store) RefundLostPendingTxs(height uint64) (map[BlobID]uint64, error) {
	expiredTxMap := make(map[BlobID]uint64)
	err := s.db.Update(func(txn *badger.Txn) error {
		opts := badger.DefaultIteratorOptions
		opts.Reverse = true
		it := txn.NewIterator(opts)
		defer it.Close()

		for it.Seek([]byte{PendingTxPrefix}); it.ValidForPrefix([]byte{PendingTxPrefix}); it.Next() {
			item := it.Item()
			blobID := BlobIDFromKey(item.Key())
			if err := markExpired(txn, blobID, height); err != nil {
				return err
			}
			var blobMeta wire.BlobMeta
			err := item.Value(func(val []byte) error {
				return proto.Unmarshal(val, &blobMeta)
			})
			if err != nil {
				return err
			}

			// refund the fee back to the user
			if err := account.UpdateBalance(txn, blobMeta.Signer, blobMeta.Fee, true); err != nil {
				return err
			}

			expiredTxMap[blobID] = height
		}
		return nil
	})
	if err != nil {
		return nil, err
	}
	return expiredTxMap, nil
}
