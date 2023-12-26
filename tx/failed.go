package tx

import (
	"encoding/binary"
	"fmt"

	"github.com/cmwaters/maelstrom/account"
	"github.com/dgraph-io/badger"
)

func (p *Pool) MarkFailed(batchID BatchID, height Height) error {
	p.mtx.Lock()
	defer p.mtx.Unlock()

	ids, ok := p.batchMap[batchID]
	if !ok {
		return fmt.Errorf("batch %s not found", batchID)
	}

	txs := p.getTxs(ids)
	if err := p.store.MarkFailed(batchID, txs, height); err != nil {
		return err
	}

	for _, tx := range txs {
		delete(p.txs, tx.id)
		delete(p.txByHash, string(tx.hash))
		delete(p.reverseBatchMap, tx.id)
		p.expiredTxMap[tx.id] = height
	}

	delete(p.batchMap, batchID)
	delete(p.broadcastMap, batchID)
	return nil
}

func (s *Store) MarkFailed(batchID BatchID, txs []*Tx, height Height) error {
	return s.db.Update(func(txn *badger.Txn) error {
		for _, tx := range txs {
			if err := markExpired(txn, tx.id, height); err != nil {
				return err
			}

			// refund the fee back to the user
			if _, err := account.UpdateBalance(txn, tx.signer, tx.fee, true); err != nil {
				return err
			}
		}

		return deleteBatch(txn, batchID)
	})
}

func (s *Store) MarkExpired(txs []*Tx, height Height) error {
	return s.db.Update(func(txn *badger.Txn) error {
		for _, tx := range txs {
			if err := markExpired(txn, tx.id, height); err != nil {
				return err
			}

			// refund the fee back to the user
			if _, err := account.UpdateBalance(txn, tx.signer, tx.fee, true); err != nil {
				return err
			}
		}
		return nil
	})
}

func markExpired(txn *badger.Txn, key ID, height Height) error {
	heightBytes := make([]byte, 8)
	binary.BigEndian.PutUint64(heightBytes, uint64(height))

	if err := txn.Set(ExpiredTxKey(key), heightBytes); err != nil {
		return err
	}
	if err := txn.Delete(PendingTxKey(key)); err != nil {
		return err
	}
	return nil
}

func (s *Store) GetExpired(id ID) (uint64, error) {
	var height uint64
	err := s.db.View(func(txn *badger.Txn) error {
		item, err := txn.Get(ExpiredTxKey(id))
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

func (s *Store) DeleteExpiredTxs(ids []ID) error {
	return s.db.Update(func(txn *badger.Txn) error {
		for _, id := range ids {
			if err := txn.Delete(ExpiredTxKey(id)); err != nil {
				return err
			}
		}
		return nil
	})
}
