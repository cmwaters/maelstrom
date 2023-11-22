package account

import (
	"bytes"
	"encoding/binary"
	"errors"
	"fmt"

	"github.com/cosmos/cosmos-sdk/crypto/keys/secp256k1"
	crypto "github.com/cosmos/cosmos-sdk/crypto/types"

	"github.com/dgraph-io/badger"
)

type Store struct {
	db *badger.DB
}

var (
	heightKey       = []byte{0x00}
	addressPrefix   = []byte{0x01}
	ownerAccountKey = []byte{0x02}
)

func AddressKey(address string) []byte {
	return append(addressPrefix, []byte(address)...)
}

func NewStore(dir string, accountPubKey crypto.PubKey) (*Store, error) {
	opts := badger.DefaultOptions(dir)
	opts.Logger = nil // Suppress the logs from badger
	db, err := badger.Open(opts)
	if err != nil {
		return nil, err
	}
	// assert that the account key matches the one persisted to disk
	// If none currently exists, persist the provided one
	if accountPubKey != nil {
		if accountPubKey.Type() != "secp256k1" {
			return nil, fmt.Errorf("only secp256k1 keys are supported")
		}
		err = db.Update(func(txn *badger.Txn) error {
			item, err := txn.Get(ownerAccountKey)
			if errors.Is(err, badger.ErrKeyNotFound) {
				// Create the account prefix
				return txn.Set(ownerAccountKey, accountPubKey.Bytes())
			} else if err != nil {
				return err
			} else {
				// Check that the existing pub key matches the provided one
				item.Value(func(val []byte) error {
					if !bytes.Equal(val, accountPubKey.Bytes()) {
						return fmt.Errorf("account prefix already exists with different public key")
					}
					return nil
				})
			}
			return nil
		})
		if err != nil {
			return nil, err
		}
	}
	// set the height if it is unset
	err = db.Update(func(txn *badger.Txn) error {
		_, err := txn.Get(heightKey)
		if errors.Is(err, badger.ErrKeyNotFound) {
			// If no height exists, set the height key to 0
			height := make([]byte, 8)
			binary.BigEndian.PutUint64(height, 0)
			return txn.Set(heightKey, height)
		}
		return err
	})

	return &Store{db: db}, nil
}

func (s *Store) GetHeight() (int64, error) {
	var height uint64
	err := s.db.View(func(txn *badger.Txn) error {
		item, err := txn.Get(heightKey)
		if err != nil {
			return err
		} else {
			return item.Value(func(val []byte) error {
				height = binary.BigEndian.Uint64(val)
				return nil
			})
		}
	})
	return int64(height), err
}

func (s *Store) SetHeight(newHeight uint64) error {
	return s.db.Update(func(txn *badger.Txn) error {
		return s.setHeight(txn, newHeight)
	})
}

func (s *Store) setHeight(txn *badger.Txn, newHeight uint64) error {
	item, err := txn.Get(heightKey)
	if err != nil {
		return err
	}
	var oldHeight uint64
	err = item.Value(func(val []byte) error {
		oldHeight = binary.BigEndian.Uint64(val)
		return nil
	})
	if err != nil {
		return err
	}
	if newHeight != oldHeight+1 {
		return fmt.Errorf("heights must be monotonically increasing. last height: %d, got: %d", oldHeight, newHeight)
	}
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, newHeight)
	return txn.Set(heightKey, bz)
}

func (s *Store) GetOwnerPubKey() (crypto.PubKey, error) {
	var pubKey crypto.PubKey
	err := s.db.View(func(txn *badger.Txn) error {
		item, err := txn.Get(ownerAccountKey)
		if err != nil {
			return err
		}
		return item.Value(func(val []byte) error {
			pubKey = &secp256k1.PubKey{Key: val}
			return nil
		})
	})
	return pubKey, err
}

func (s *Store) GetAccount(address string) (*Account, error) {
	var account *Account
	err := s.db.View(func(txn *badger.Txn) error {
		item, err := txn.Get(AddressKey(address))
		if err != nil {
			return err
		}
		return item.Value(func(val []byte) error {
			var err error
			account, err = NewAccountFromBytes(val)
			return err
		})
	})
	return account, err
}

func (s *Store) SetAccount(address string, account *Account) error {
	return s.db.Update(func(txn *badger.Txn) error {
		bz, err := account.Bytes()
		if err != nil {
			return err
		}
		return txn.Set(AddressKey(address), bz)
	})
}

func (s *Store) ProcessDeposits(deposits map[string]uint64, height uint64) error {
	return s.db.Update(func(txn *badger.Txn) error {
		if err := s.setHeight(txn, height); err != nil {
			return err
		}

		for address, amount := range deposits {
			_, err := s.updateBalance(txn, address, amount, true)
			if err != nil {
				return err
			}
		}
		return nil
	})
}

func (s *Store) UpdateBalance(address string, amount uint64, add bool) (bool, error) {
	successful := false
	err := s.db.Update(func(txn *badger.Txn) error {
		var err error
		successful, err = s.updateBalance(txn, address, amount, add)
		return err
	})
	if err != nil {
		return false, err
	}
	return successful, nil
}

func (s *Store) updateBalance(txn *badger.Txn, address string, amount uint64, add bool) (bool, error) {
	successful := false
	item, err := txn.Get(AddressKey(address))
	if err != nil {
		return false, err
	}
	err = item.Value(func(val []byte) error {
		var err error
		account, err := NewAccountFromBytes(val)
		if err != nil {
			return err
		}
		if add || account.Balance >= amount {
			if add {
				account.Balance += amount
			} else {
				account.Balance -= amount
			}
			successful = true
			bz, err := account.Bytes()
			if err != nil {
				return err
			}
			return txn.Set(AddressKey(address), bz)
		}
		return nil
	})
	if err != nil {
		return false, err
	}
	return successful, nil
}
