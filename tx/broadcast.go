package tx

import (
	"github.com/cmwaters/maelstrom/account"
	wire "github.com/cmwaters/maelstrom/proto/gen/go/maelstrom/v1"
	"github.com/dgraph-io/badger"
	"google.golang.org/protobuf/proto"
)

func (p *Pool) WasBroadcasted(txID TxID) bool {
	p.mtx.Lock()
	defer p.mtx.Unlock()

	_, ok := p.broadcastMap[txID]
	return ok
}

func (p *Pool) MarkBroadcasted(txID TxID, blobIDs []BlobID, timeoutHeight uint64) error {
	p.mtx.Lock()
	defer p.mtx.Unlock()

	if err := p.store.MarkBroadcasted(txID, blobIDs, timeoutHeight); err != nil {
		return err
	}
	// remove txs from the pending queue
	for i := range p.pendingQueue {
		if p.pendingQueue[i].id == blobIDs[0] {
			if i+len(blobIDs) >= len(p.pendingQueue) {
				p.pendingQueue = make([]*Blob, 0)
			} else {
				p.pendingQueue = append(p.pendingQueue[:i], p.pendingQueue[i+len(blobIDs):]...)
			}
			break
		}
	}
	for _, id := range blobIDs {
		p.reverseBlobTxMap[id] = txID
	}
	p.broadcastMap[txID] = &wire.BlobTx{
		TxIds:         ToUint64s(blobIDs),
		TimeoutHeight: timeoutHeight,
	}
	return nil
}

func (p *Pool) checkBroadcastTimeouts(height uint64) (int, error) {
	failedTxs := make([]TxID, 0)
	failedBlobs := make([]*Blob, 0)
	for txID, blobTx := range p.broadcastMap {
		if blobTx.TimeoutHeight < height {
			failedTxs = append(failedTxs, txID)
			failedBlobs = append(failedBlobs, p.getBlobs(ToBlobIDs(blobTx.TxIds))...)
		}
	}

	if err := p.store.MarkAsTimedOut(failedTxs, failedBlobs, height); err != nil {
		return 0, err
	}

	for _, blob := range failedBlobs {
		delete(p.blobs, blob.id)
		delete(p.reverseBlobTxMap, blob.id)
		delete(p.blobByHash, string(blob.Hash()))
		p.expiredBlobMap[blob.id] = height
	}

	for _, tx := range failedTxs {
		delete(p.broadcastMap, tx)
	}
	return len(failedTxs), nil
}

func (s *Store) MarkBroadcasted(txID TxID, ids []BlobID, height uint64) error {
	return s.db.Update(func(txn *badger.Txn) error {
		tx := &wire.BlobTx{
			TxIds:         ToUint64s(ids),
			TimeoutHeight: height,
		}
		txBytes, err := proto.Marshal(tx)
		if err != nil {
			return err
		}

		return txn.Set(BroadcastedBlobTxKey(txID), txBytes)
	})
}

func (s *Store) MarkAsTimedOut(txs []TxID, blobs []*Blob, height uint64) error {
	return s.db.Update(func(txn *badger.Txn) error {
		for _, blob := range blobs {
			// return the funds to the user for the failed tx
			if err := account.UpdateBalance(txn, blob.signer, blob.fee, true); err != nil {
				return err
			}

			// mark the tx as expired so the user can work out the status
			if err := markExpired(txn, blob.id, height); err != nil {
				return err
			}
		}

		// delete the record of the batches from the store
		for _, tx := range txs {
			if err := txn.Delete(BroadcastedBlobTxKey(tx)); err != nil {
				return err
			}
		}
		return nil
	})
}

func (s *Store) LoadAllBroadcastedBlobTxs() (map[TxID]*wire.BlobTx, error) {
	blobTxs := make(map[TxID]*wire.BlobTx)
	err := s.db.View(func(txn *badger.Txn) error {
		opts := badger.DefaultIteratorOptions
		opts.PrefetchValues = true
		it := txn.NewIterator(opts)
		defer it.Close()

		prefix := []byte{BroadcastedBlobTxPrefix}
		for it.Seek(prefix); it.ValidForPrefix(prefix); it.Next() {
			item := it.Item()
			txID := TxIDFromKey(item.Key())
			var blobTx wire.BlobTx
			err := item.Value(func(val []byte) error {
				return proto.Unmarshal(val, &blobTx)
			})
			if err != nil {
				return err
			}
			blobTxs[txID] = &blobTx
		}
		return nil
	})
	return blobTxs, err
}
