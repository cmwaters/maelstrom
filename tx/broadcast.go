package tx

import (
	"github.com/cmwaters/maelstrom/account"
	"github.com/dgraph-io/badger"
)

func (p *Pool) WasBroadcasted(batchID BatchID) bool {
	p.mtx.Lock()
	defer p.mtx.Unlock()

	_, ok := p.broadcastMap[batchID]
	return ok
}

func (p *Pool) MarkBroadcasted(batchID BatchID, height Height) error {
	p.mtx.Lock()
	defer p.mtx.Unlock()

	if err := p.store.MarkBroadcasted(batchID, height); err != nil {
		return err
	}
	p.broadcastMap[batchID] = height
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
	}

	for _, batch := range failedBatches {
		delete(p.batchMap, batch)
		delete(p.broadcastMap, batch)
	}
	return len(failedTxs), nil
}

func (s *Store) MarkBroadcasted(batchID BatchID, height Height) error {
	return s.db.Update(func(txn *badger.Txn) error {
		_, err := txn.Get(BatchKey(batchID))
		if err != nil {
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
