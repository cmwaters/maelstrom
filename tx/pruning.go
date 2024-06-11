package tx

// TODO: make configurable
const (
	deepPruneFrequency   = 1_000
	expiredTxPrunePeriod = 10_000 // roughly every 2 days given 15 second block time
)

func (p *Pool) prune(height uint64) (int, error) {
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

func (p *Pool) prunePending(height uint64) (int, error) {
	blobsToExpire := make([]*Blob, 0)
	for id, blob := range p.blobs {
		if blob.ExpiryHeight() < height {
			// if it is part of a batch that has been broadcasted
			// we ignore it. The broadcast timeout should manage this tx
			if batchID, ok := p.reverseBlobTxMap[id]; ok {
				if _, ok := p.broadcastMap[batchID]; ok {
					continue
				}
			}

			blobsToExpire = append(blobsToExpire, blob)
		}
	}
	if err := p.store.MarkExpired(blobsToExpire, height); err != nil {
		return 0, err
	}
	for _, blob := range blobsToExpire {
		delete(p.blobs, blob.ID())
		delete(p.blobByHash, string(blob.Hash()))
		p.expiredBlobMap[blob.ID()] = height
	}
	return len(blobsToExpire), nil
}

func (p *Pool) pruneExpired(height uint64) error {
	expiredBlobIds := make([]BlobID, 0)
	for blobID, expiredHeight := range p.expiredBlobMap {
		if expiredHeight+expiredTxPrunePeriod < height {
			expiredBlobIds = append(expiredBlobIds, blobID)
		}
	}
	if err := p.store.DeleteExpiredTxs(expiredBlobIds); err != nil {
		return err
	}
	for _, blobID := range expiredBlobIds {
		delete(p.expiredBlobMap, blobID)
	}
	return nil
}
