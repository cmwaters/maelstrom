package tx

import (
	"encoding/binary"

	"github.com/dgraph-io/badger"
)

// TODO: make configurable
const deepPruneFrequency = 1_000
const expiredTxPrunePeriod = 10_000 // roughly every 2 days given 15 second block time

func (p *Pool) prune(height Height) (int, error) {
	prunedTxs, err := p.prunePending(height)
	if err != nil {
		return 0, err
	}

	if height%deepPruneFrequency == 0 {
		if err := p.pruneExpired(height); err != nil {
			return 0, err
		}
	}
	return prunedTxs, nil
}

func (p *Pool) prunePending(height Height) (int, error) {
	txsToExpire := make([]*Tx, 0)
	expiredTxIds := make([]ID, len(txsToExpire))
	for id, tx := range p.txs {
		if tx.insertHeight+Height(tx.timeoutBlocks) < height {
			// if it is part of a batch that has been broadcasted
			// we ignore it. The broadcast timeout should manage this tx
			if batchID, ok := p.reverseBatchMap[id]; ok {
				if _, ok := p.broadcastMap[batchID]; ok {
					continue
				}
			}

			txsToExpire = append(txsToExpire, tx)
			expiredTxIds = append(expiredTxIds, id)
		}
	}
	if err := p.store.MarkExpired(expiredTxIds, height); err != nil {
		return 0, err
	}
	for _, tx := range txsToExpire {
		p.onFailure(tx.id, tx.signer, tx.fee)
		delete(p.txs, tx.id)
		delete(p.txByHash, string(tx.hash))
		p.expiredTxMap[tx.id] = height
	}
	return len(txsToExpire), nil
}

func (p *Pool) pruneExpired(height Height) error {
	expiredTxIds := make([]ID, 0)
	for txKey, expiredHeight := range p.expiredTxMap {
		if expiredHeight+expiredTxPrunePeriod < height {
			expiredTxIds = append(expiredTxIds, txKey)
		}
	}
	if err := p.store.DeleteExpiredTxs(expiredTxIds); err != nil {
		return err
	}
	for _, txKey := range expiredTxIds {
		delete(p.expiredTxMap, txKey)
	}
	return nil
}

func (s *Store) MarkExpired(keys []ID, height Height) error {
	return s.db.Update(func(txn *badger.Txn) error {
		for _, key := range keys {
			if err := markExpired(txn, key, height); err != nil {
				return err
			}
		}
		return nil
	})
}

func markExpired(txn *badger.Txn, key ID, height Height) error {
	_, err := txn.Get(PendingTxKey(key))
	if err != nil {
		return err
	}
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
