package tx

import (
	"errors"

	wire "github.com/cmwaters/maelstrom/proto/gen/go/maelstrom/v1"
	"github.com/dgraph-io/badger"
	"google.golang.org/protobuf/proto"
)

func (p *Pool) CommitTx(txn *badger.Txn, txID TxID, pfbHash []byte) error {
	p.mtx.Lock()
	defer p.mtx.Unlock()

	blobTx, ok := p.broadcastMap[txID]
	if !ok {
		return errors.New("batch not found")
	}
	ids := ToBlobIDs(blobTx.TxIds)

	if err := p.store.MarkCommitted(txn, ids, pfbHash); err != nil {
		return err
	}
	for _, blobID := range ids {
		delete(p.blobs, blobID)
		delete(p.reverseBlobTxMap, blobID)
		p.committedBlobMap[blobID] = TxID(pfbHash)
	}
	delete(p.broadcastMap, txID)
	return nil
}

func (s *Store) MarkCommitted(txn *badger.Txn, blobIds []BlobID, txHash []byte) error {
	for _, blobID := range blobIds {
		item, err := txn.Get(PendingBlobKey(blobID))
		if err != nil {
			return err
		}

		var blob wire.BlobMeta
		err = item.Value(func(val []byte) error {
			return proto.Unmarshal(val, &blob)
		})
		if err != nil {
			return err
		}
		newBlob := &wire.BlobMeta{
			Signer: blob.Signer,
			Fee:    blob.Fee,
			TxHash: txHash,
		}
		txBytes, err := proto.Marshal(newBlob)
		if err != nil {
			return err
		}

		if err := txn.Set(CommittedBlobKey(blobID), txBytes); err != nil {
			return err
		}
		if err := txn.Delete(PendingBlobKey(blobID)); err != nil {
			return err
		}
	}
	return nil
}

func (s *Store) GetCommittedBlob(id BlobID) (*wire.BlobMeta, error) {
	var blob wire.BlobMeta
	err := s.db.View(func(txn *badger.Txn) error {
		item, err := txn.Get(CommittedBlobKey(id))
		if err != nil {
			return err
		}

		return item.Value(func(val []byte) error {
			return proto.Unmarshal(val, &blob)
		})
	})
	return &blob, err
}

func (s *Store) DeleteCommittedTxs(ids []BlobID) error {
	return s.db.Update(func(txn *badger.Txn) error {
		for _, id := range ids {
			if err := txn.Delete(CommittedBlobKey(id)); err != nil {
				return err
			}
		}
		return nil
	})
}

func (s *Store) GetMostRecentCommittedTxs(limit BlobID) (map[BlobID]*wire.BlobMeta, error) {
	var txs = make(map[BlobID]*wire.BlobMeta)
	err := s.db.View(func(txn *badger.Txn) error {
		opts := badger.DefaultIteratorOptions
		opts.Reverse = true
		it := txn.NewIterator(opts)
		defer it.Close()

		for it.Seek(CommittedBlobKey(limit)); it.ValidForPrefix([]byte{CommittedTxPrefix}); it.Next() {
			item := it.Item()
			var blob wire.BlobMeta
			err := item.Value(func(val []byte) error {
				return proto.Unmarshal(val, &blob)
			})
			if err != nil {
				return err
			}
			txID := BlobIDFromKey(item.Key())
			txs[txID] = &blob
		}
		return nil
	})
	return txs, err
}
