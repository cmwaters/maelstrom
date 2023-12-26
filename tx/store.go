package tx

import (
	"encoding/binary"
	"errors"

	"github.com/dgraph-io/badger"
)

const (
	LastTxIDPrefix    = byte(0x03)
	PendingTxPrefix   = byte(0x04)
	BatchIDPrefix     = byte(0x05)
	BroadcastedPrefix = byte(0x06)
	NoncePrefix       = byte(0x07)
	ExpiredTxPrefix   = byte(0x08)
	CommittedTxPrefix = byte(0x09)

	StartingTxNumber = 0
)

type Store struct {
	db *badger.DB
}

func NewStore(db *badger.DB) (*Store, error) {
	if err := checkAndSetTxKey(db); err != nil {
		return nil, err
	}
	return &Store{
		db: db,
	}, nil
}

func (s *Store) GetLastTxKey() (ID, error) {
	var txID ID
	err := s.db.View(func(txn *badger.Txn) error {
		item, err := txn.Get(LastTxIDKey())
		if err != nil {
			return err
		}
		return item.Value(func(val []byte) error {
			txID = TxIDFromBytes(val)
			return nil
		})
	})
	return txID, err
}

func LastTxIDKey() []byte {
	return []byte{LastTxIDPrefix}
}

func PendingTxKey(txID ID) []byte {
	return storeKey(PendingTxPrefix, txID)
}

func BatchKey(batchID BatchID) []byte {
	return append([]byte{BatchIDPrefix}, batchID.Bytes()...)
}

func BroadcastedBatchKey(batchID BatchID) []byte {
	return append([]byte{BroadcastedPrefix}, batchID.Bytes()...)
}

func CommittedTxKey(id ID) []byte {
	return storeKey(CommittedTxPrefix, id)
}

func ExpiredTxKey(id ID) []byte {
	return storeKey(ExpiredTxPrefix, id)
}

func NonceKey(nonce uint64) []byte {
	return storeKey(NoncePrefix, ID(nonce))
}

func storeKey(prefix byte, txID ID) []byte {
	b := make([]byte, 9)
	b[0] = prefix
	binary.BigEndian.AppendUint64(b[1:], uint64(txID))
	return b
}

func TxIDFromBytes(b []byte) ID {
	if len(b) != 9 {
		panic("invalid tx key")
	}
	return ID(binary.BigEndian.Uint64(b[1:]))
}

func BatchIDFromBytes(b []byte) BatchID {
	return BatchID(b[1:])
}


func checkAndSetTxKey(db *badger.DB) error {
	return db.Update(func(txn *badger.Txn) error {
		_, err := txn.Get(LastTxIDKey())
		if errors.Is(err, badger.ErrKeyNotFound) {
			return txn.Set(LastTxIDKey(), PendingTxKey(StartingTxNumber))
		}
		return err
	})
}
