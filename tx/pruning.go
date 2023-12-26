package tx

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
		}
	}
	if err := p.store.MarkExpired(txsToExpire, height); err != nil {
		return 0, err
	}
	for _, tx := range txsToExpire {
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
