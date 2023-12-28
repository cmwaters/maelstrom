package tx

import (
	"bytes"
	"encoding/binary"
	"errors"

	"github.com/dgraph-io/badger"
)

const (
	LastTxIDPrefix                = byte(0x03)
	PendingTxPrefix               = byte(0x04)
	BroadcastedBlobTxPrefix       = byte(0x05)
	NoncePrefix                   = byte(0x06)
	ExpiredTxPrefix               = byte(0x07)
	CommittedTxPrefix             = byte(0x08)
	WithdrawalPrefix              = byte(0x09)
	BroadcastedWithdrawalTxPrefix = byte(0x0A)

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

func (s *Store) GetLastBlobKey() (BlobID, error) {
	var blobID BlobID
	err := s.db.View(func(txn *badger.Txn) error {
		item, err := txn.Get(LastBlobIDKey())
		if err != nil {
			return err
		}
		return item.Value(func(val []byte) error {
			blobID = BlobIDFromKey(val)
			return nil
		})
	})
	return blobID, err
}

func LastBlobIDKey() []byte {
	return []byte{LastTxIDPrefix}
}

func PendingBlobKey(id BlobID) []byte {
	return storeKey(PendingTxPrefix, id)
}

func BroadcastedBlobTxKey(id TxID) []byte {
	return append([]byte{BroadcastedBlobTxPrefix}, id.Bytes()...)
}

func CommittedBlobKey(id BlobID) []byte {
	return storeKey(CommittedTxPrefix, id)
}

func ExpiredBlobKey(id BlobID) []byte {
	return storeKey(ExpiredTxPrefix, id)
}

func NonceKey(nonce uint64) []byte {
	return storeKey(NoncePrefix, BlobID(nonce))
}

func WithdrawalKey(address string) []byte {
	buf := bytes.NewBuffer([]byte{WithdrawalPrefix})
	_, err := buf.Write([]byte(address))
	if err != nil {
		panic(err)
	}
	return buf.Bytes()
}

func BroadcastedWithdrawalTxKey(id TxID) []byte {
	return append([]byte{BroadcastedWithdrawalTxPrefix}, id.Bytes()...)
}

func storeKey(prefix byte, id BlobID) []byte {
	buf := bytes.NewBuffer([]byte{prefix})
	_, err := buf.Write(binary.BigEndian.AppendUint64(nil, uint64(id)))
	if err != nil {
		panic(err)
	}
	return buf.Bytes()
}

func ParseAddressFromKey(withdrawalKey []byte) string {
	return string(withdrawalKey[1:])
}

func BlobIDFromKey(key []byte) BlobID {
	if len(key) != 9 {
		panic("invalid tx key")
	}
	return BlobID(binary.BigEndian.Uint64(key[1:]))
}

func TxIDFromKey(key []byte) TxID {
	return TxID(key[1:])
}

func checkAndSetTxKey(db *badger.DB) error {
	return db.Update(func(txn *badger.Txn) error {
		_, err := txn.Get(LastBlobIDKey())
		if errors.Is(err, badger.ErrKeyNotFound) {
			return txn.Set(LastBlobIDKey(), PendingBlobKey(StartingTxNumber))
		}
		return err
	})
}
