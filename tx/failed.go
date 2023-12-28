package tx

import (
	"encoding/binary"
	"fmt"

	"github.com/cmwaters/maelstrom/account"
	"github.com/dgraph-io/badger"
)

func (p *Pool) MarkFailed(txID TxID, height uint64) error {
	p.mtx.Lock()
	defer p.mtx.Unlock()

	blobTx, ok := p.broadcastMap[txID]
	if !ok {
		return fmt.Errorf("blobTx %s not found", txID)
	}

	blobs := p.getBlobs(ToBlobIDs(blobTx.TxIds))
	if err := p.store.MarkFailed(txID, blobs, height); err != nil {
		return err
	}

	for _, blob := range blobs {
		delete(p.blobs, blob.id)
		delete(p.blobByHash, string(blob.hash))
		delete(p.reverseBlobTxMap, blob.id)
		p.expiredBlobMap[blob.id] = height
	}

	delete(p.broadcastMap, txID)
	return nil
}

func (s *Store) MarkFailed(txID TxID, blobs []*Blob, height uint64) error {
	return s.db.Update(func(txn *badger.Txn) error {
		for _, blob := range blobs {
			if err := markExpired(txn, blob.id, height); err != nil {
				return err
			}

			// refund the fee back to the user
			if err := account.UpdateBalance(txn, blob.signer, blob.fee, true); err != nil {
				return err
			}
		}

		return txn.Delete(BroadcastedBlobTxKey(txID))
	})
}

func (s *Store) MarkExpired(blobs []*Blob, height uint64) error {
	return s.db.Update(func(txn *badger.Txn) error {
		for _, blob := range blobs {
			if err := markExpired(txn, blob.id, height); err != nil {
				return err
			}

			// refund the fee back to the user
			if err := account.UpdateBalance(txn, blob.signer, blob.fee, true); err != nil {
				return err
			}
		}
		return nil
	})
}

func markExpired(txn *badger.Txn, blobID BlobID, height uint64) error {
	heightBytes := make([]byte, 8)
	binary.BigEndian.PutUint64(heightBytes, uint64(height))

	if err := txn.Set(ExpiredBlobKey(blobID), heightBytes); err != nil {
		return err
	}
	if err := txn.Delete(PendingBlobKey(blobID)); err != nil {
		return err
	}
	return nil
}

func (s *Store) GetExpired(id BlobID) (uint64, error) {
	var height uint64
	err := s.db.View(func(txn *badger.Txn) error {
		item, err := txn.Get(ExpiredBlobKey(id))
		if err != nil {
			return err
		}
		return item.Value(func(val []byte) error {
			height = binary.BigEndian.Uint64(val)
			return nil
		})
	})
	return height, err
}

func (s *Store) DeleteExpiredTxs(ids []BlobID) error {
	return s.db.Update(func(txn *badger.Txn) error {
		for _, id := range ids {
			if err := txn.Delete(ExpiredBlobKey(id)); err != nil {
				return err
			}
		}
		return nil
	})
}

func (s *Store) LoadRecentlyExpiredTxs(limit BlobID) (map[BlobID]uint64, error) {
	expiredTxMap := make(map[BlobID]uint64)
	err := s.db.View(func(txn *badger.Txn) error {
		opts := badger.DefaultIteratorOptions
		opts.Reverse = true
		it := txn.NewIterator(opts)
		defer it.Close()

		for it.Seek(ExpiredBlobKey(limit)); it.ValidForPrefix([]byte{ExpiredTxPrefix}); it.Next() {
			item := it.Item()
			blobID := BlobIDFromKey(item.Key())
			var height uint64
			err := item.Value(func(val []byte) error {
				height = binary.BigEndian.Uint64(val)
				return nil
			})
			if err != nil {
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
