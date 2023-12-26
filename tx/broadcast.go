package tx

import (
	"github.com/cmwaters/maelstrom/account"
	wire "github.com/cmwaters/maelstrom/proto/gen/maelstrom/v1"
	"github.com/dgraph-io/badger"
	"google.golang.org/protobuf/proto"
)

func (p *Pool) WasBroadcasted(batchID BatchID) bool {
	p.mtx.Lock()
	defer p.mtx.Unlock()

	_, ok := p.broadcastMap[batchID]
	return ok
}

func (p *Pool) MarkBroadcasted(batchID BatchID, ids []ID, timeoutHeight Height) error {
	p.mtx.Lock()
	defer p.mtx.Unlock()

	if err := p.store.MarkBroadcasted(batchID, ids, timeoutHeight); err != nil {
		return err
	}
	p.batchTxs(ids, batchID)
	p.broadcastMap[batchID] = timeoutHeight
	return nil
}

func (p *Pool) checkBroadcastTimeouts(height Height) (int, error) {
	failedBatches := make([]BatchID, 0)
	for BatchID, timeoutHeight := range p.broadcastMap {
		if timeoutHeight < height {
			failedBatches = append(failedBatches, BatchID)
		}
	}

	failedTxs := make([]*Tx, 0)
	for _, BatchID := range failedBatches {
		ids := p.batchMap[BatchID]
		for _, id := range ids {
			tx := p.txs[id]
			failedTxs = append(failedTxs, tx)
		}
	}

	if err := p.store.MarkAsTimedOut(failedBatches, failedTxs, height); err != nil {
		return 0, err
	}

	for _, tx := range failedTxs {
		delete(p.txs, tx.id)
		delete(p.reverseBatchMap, tx.id)
		delete(p.txByHash, string(tx.Hash()))
		p.expiredTxMap[tx.id] = height
	}

	for _, batch := range failedBatches {
		delete(p.batchMap, batch)
		delete(p.broadcastMap, batch)
	}
	return len(failedTxs), nil
}

func (s *Store) MarkBroadcasted(batchID BatchID, ids []ID, height Height) error {
	return s.db.Update(func(txn *badger.Txn) error {
		batch := &wire.Batch{TxIds: make([]uint64, len(ids))}
		for i, key := range ids {
			batch.TxIds[i] = uint64(key)
		}
		batchBytes, err := proto.Marshal(batch)
		if err != nil {
			return err
		}

		if err := txn.Set(BatchKey(batchID), batchBytes); err != nil {
			return err
		}

		return txn.Set(BroadcastedBatchKey(batchID), height.Bytes())
	})
}

func (s *Store) MarkAsTimedOut(batches []BatchID, txs []*Tx, height Height) error {
	return s.db.Update(func(txn *badger.Txn) error {
		for _, tx := range txs {
			// return the funds to the user for the failed tx
			if _, err := account.UpdateBalance(txn, tx.signer, tx.fee, true); err != nil {
				return err
			}

			// mark the tx as expired so the user can work out the status
			if err := markExpired(txn, tx.id, height); err != nil {
				return err
			}
		}

		// delete the record of the batches from the store
		for _, batchID := range batches {
			if err := txn.Delete(BatchKey(batchID)); err != nil {
				return err
			}
			if err := txn.Delete(BroadcastedBatchKey(batchID)); err != nil {
				return err
			}
		}
		return nil
	})
}

func (s *Store) LoadAllBatchedTxs() (map[BatchID][]ID, error) {
	batchedTxs := make(map[BatchID][]ID)
	err := s.db.View(func(txn *badger.Txn) error {
		opts := badger.DefaultIteratorOptions
		opts.PrefetchValues = false
		it := txn.NewIterator(opts)
		defer it.Close()

		prefix := []byte{BatchIDPrefix}
		for it.Seek(prefix); it.ValidForPrefix(prefix); it.Next() {
			item := it.Item()
			batchID := BatchIDFromBytes(item.Key())

			batch := &wire.Batch{}
			err := item.Value(func(val []byte) error {
				return proto.Unmarshal(val, batch)
			})
			if err != nil {
				return err
			}

			batchedTxs[batchID] = ToIDs(batch.TxIds)
		}
		return nil
	})
	return batchedTxs, err
}

func (s *Store) LoadAllBroadcastedBatches() (map[BatchID]Height, error) {
	batchedTxs := make(map[BatchID]Height)
	err := s.db.View(func(txn *badger.Txn) error {
		opts := badger.DefaultIteratorOptions
		opts.PrefetchValues = false
		it := txn.NewIterator(opts)
		defer it.Close()

		prefix := []byte{BroadcastedPrefix}
		for it.Seek(prefix); it.ValidForPrefix(prefix); it.Next() {
			item := it.Item()
			batchID := BatchIDFromBytes(item.Key())
			var height Height
			err := item.Value(func(val []byte) error {
				height = HeightFromBytes(val)
				return nil
			})
			if err != nil {
				return err
			}
			batchedTxs[batchID] = height
		}
		return nil
	})
	return batchedTxs, err
}
