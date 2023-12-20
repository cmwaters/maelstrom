package tx

import (
	"errors"

	"github.com/dgraph-io/badger"
)

func (p *Pool) CommitBatch(txn *badger.Txn, batchID BatchID, height Height) error {
	p.mtx.Lock()
	defer p.mtx.Unlock()

	ids, ok := p.batchMap[batchID]
	if !ok {
		return errors.New("batch not found")
	}

	if err := p.store.MarkCommitted(txn, ids, batchID); err != nil {
		return err
	}
	for _, txID := range ids {
		delete(p.txs, txID)
		delete(p.reverseBatchMap, txID)
		p.committedTxMap[txID] = batchID
	}
	delete(p.batchMap, batchID)
	p.broadcastMap[batchID] = height
	return nil
}

func (s *Store) MarkCommitted(txn *badger.Txn, txIds []ID, BatchID BatchID) error {
	for _, txID := range txIds {
		_, err := txn.Get(PendingTxKey(txID))
		if err != nil {
			return err
		}
		if err := txn.Set(CommittedTxKey(txID), []byte(BatchID)); err != nil {
			return err
		}
		if err := txn.Delete(PendingTxKey(txID)); err != nil {
			return err
		}
	}
	return nil
}

func (s *Store) GetCommittedTx(id ID) (BatchID, error) {
	var batchID BatchID
	err := s.db.View(func(txn *badger.Txn) error {
		item, err := txn.Get(CommittedTxKey(id))
		if err != nil {
			return err
		}

		return item.Value(func(val []byte) error {
			batchID = BatchID(val)
			return nil
		})
	})
	return batchID, err
}

func (s *Store) DeleteCommittedTxs(ids []ID) error {
	return s.db.Update(func(txn *badger.Txn) error {
		for _, id := range ids {
			if err := txn.Delete(CommittedTxKey(id)); err != nil {
				return err
			}
		}
		return nil
	})
}
