package tx

import (
	"encoding/binary"
	"errors"

	"github.com/dgraph-io/badger"

	wire "github.com/cmwaters/maelstrom/proto/gen/maelstrom/v1"
	"google.golang.org/protobuf/proto"
)

const (
	StartingTxNumber      = 1
	PendingTxKeyPrefix    = byte(0x01)
	SuccessfulTxKeyPrefix = byte(0x02)
)

var lastTxKey = PendingTxKey(0)

type Store struct {
	db *badger.DB
}

func NewStore(dir string) (*Store, error) {
	opts := badger.DefaultOptions(dir)
	opts.Logger = nil // Suppress the logs from badger
	db, err := badger.Open(opts)
	if err != nil {
		return nil, err
	}
	if err := checkAndSetTxKey(db); err != nil {
		return nil, err
	}
	return &Store{
		db: db,
	}, nil
}

func (s *Store) GetLastTxKey() (uint64, error) {
	var txKey uint64
	err := s.db.View(func(txn *badger.Txn) error {
		item, err := txn.Get(lastTxKey)
		if err != nil {
			return err
		}
		return item.Value(func(val []byte) error {
			txKey = TxKeyFromBytes(val)
			return nil
		})
	})
	return txKey, err
}

func (s *Store) GetPendingTx(key uint64) (*wire.PendingTx, error) {
	var pendingTx *wire.PendingTx
	err := s.db.View(func(txn *badger.Txn) error {
		item, err := txn.Get(PendingTxKey(key))
		if err != nil {
			return err
		}
		return item.Value(func(val []byte) error {
			if err := proto.Unmarshal(val, pendingTx); err != nil {
				return err
			}
			return nil
		})
	})
	return pendingTx, err
}

func (s *Store) GetAllPendingTxs() (map[uint64]*wire.PendingTx, error) {
	pendingTxs := make(map[uint64]*wire.PendingTx)
	err := s.db.View(func(txn *badger.Txn) error {
		opts := badger.DefaultIteratorOptions
		opts.Prefix = []byte{PendingTxKeyPrefix}
		it := txn.NewIterator(opts)
		defer it.Close()
		for it.Rewind(); it.Valid(); it.Next() {
			item := it.Item()
			key := TxKeyFromBytes(item.Key())
			var pendingTx *wire.PendingTx
			err := item.Value(func(val []byte) error {
				if err := proto.Unmarshal(val, pendingTx); err != nil {
					return err
				}
				return nil
			})
			if err != nil {
				return err
			}
			pendingTxs[key] = pendingTx
		}
		return nil
	})
	return pendingTxs, err
}

func (s *Store) SetPendingTx(pendingTx *wire.PendingTx) (uint64, error) {
	var lastKey uint64
	err := s.db.Update(func(txn *badger.Txn) error {
		bz, err := proto.Marshal(pendingTx)
		if err != nil {
			return err
		}

		item, err := txn.Get(lastTxKey)
		if err != nil {
			return err
		}

		item.Value(func(val []byte) error {
			lastKey = TxKeyFromBytes(val)
			return txn.Set(lastTxKey, PendingTxKey(lastKey+1))
		})

		return txn.Set(PendingTxKey(lastKey), bz)
	})
	return lastKey, err
}

func (s *Store) DeletePendingTx(key uint64) error {
	return s.db.Update(func(txn *badger.Txn) error {
		return txn.Delete(PendingTxKey(key))
	})
}

func (s *Store) MarkSuccessful(key uint64, tx *wire.SuccessfulTx) error {
	return s.db.Update(func(txn *badger.Txn) error {
		bz, err := proto.Marshal(tx)
		if err != nil {
			return err
		}
		if err := txn.Set(SuccessfulTxKey(key), bz); err != nil {
			return err
		}
		return txn.Delete(PendingTxKey(key))
	})
}

func (s *Store) GetSuccessfulTx(key uint64) (*wire.SuccessfulTx, error) {
	var successfulTx *wire.SuccessfulTx
	err := s.db.View(func(txn *badger.Txn) error {
		item, err := txn.Get(SuccessfulTxKey(key))
		if err != nil {
			return err
		}

		item.Value(func(val []byte) error {
			successfulTx = &wire.SuccessfulTx{}
			return proto.Unmarshal(val, successfulTx)
		})
		return nil
	})
	return successfulTx, err
}

func PendingTxKey(key uint64) []byte {
	b := make([]byte, 9)
	binary.BigEndian.AppendUint64([]byte{PendingTxKeyPrefix}, key)
	return b
}

func SuccessfulTxKey(key uint64) []byte {
	b := make([]byte, 9)
	binary.BigEndian.AppendUint64([]byte{SuccessfulTxKeyPrefix}, key)
	return b
}

func TxKeyFromBytes(b []byte) uint64 {
	if len(b) != 9 {
		panic("invalid tx key")
	}
	return binary.BigEndian.Uint64(b[1:])
}

func checkAndSetTxKey(db *badger.DB) error {
	return db.Update(func(txn *badger.Txn) error {
		_, err := txn.Get(lastTxKey)
		if errors.Is(err, badger.ErrKeyNotFound) {
			return txn.Set(lastTxKey, PendingTxKey(StartingTxNumber))
		}
		return err
	})
}
