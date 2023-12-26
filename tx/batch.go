package tx

import (
	"crypto/sha256"
	"fmt"

	wire "github.com/cmwaters/maelstrom/proto/gen/maelstrom/v1"
	"github.com/dgraph-io/badger"
	"google.golang.org/protobuf/proto"
)

func GetBatchID(tx []byte) BatchID {
	hash := sha256.Sum256(tx)
	return BatchID(hash[:])
}

func Hash(b []byte) []byte {
	hash := sha256.Sum256(b)
	return hash[:]
}

// BatchID is the sha256 hash of the raw blob tx that is submitted
// and committed in a block
type BatchID string

func (b BatchID) Bytes() []byte {
	return []byte(b)
}

func (b BatchID) HEX() string {
	return fmt.Sprintf("%X", b)
}

func (p *Pool) batchTxs(ids []ID, batchID BatchID) {
	// remove txs from the pending queue
	for i := range p.pendingQueue {
		if p.pendingQueue[i].id == ids[0] {
			if i+len(ids) >= len(p.pendingQueue) {
				p.pendingQueue = make([]*Tx, 0)
			} else {
				p.pendingQueue = append(p.pendingQueue[:i], p.pendingQueue[i+len(ids):]...)
			}
			break
		}
	}
	p.batchMap[batchID] = ids
	for _, id := range ids {
		p.reverseBatchMap[id] = batchID
	}
}

func (s *Store) GetBatch(batchID BatchID) ([]ID, error) {
	var ids []ID
	err := s.db.View(func(txn *badger.Txn) error {
		item, err := txn.Get(BatchKey(batchID))
		if err != nil {
			return err
		}

		batch := &wire.Batch{}
		if err := item.Value(func(val []byte) error {
			return proto.Unmarshal(val, batch)
		}); err != nil {
			return err
		}

		ids = make([]ID, len(batch.TxIds))
		for i, id := range batch.TxIds {
			ids[i] = ID(id)
		}
		return nil
	})
	return ids, err
}

func (s *Store) DeleteBatches(batchIDs []BatchID) error {
	return s.db.Update(func(txn *badger.Txn) error {
		for _, batchID := range batchIDs {
			if err := deleteBatch(txn, batchID); err != nil {
				return err
			}
		}
		return nil
	})
}

func deleteBatch(txn *badger.Txn, batchID BatchID) error {
	if err := txn.Delete(BatchKey(batchID)); err != nil {
		return err
	}
	return txn.Delete(BroadcastedBatchKey(batchID))
}
