package account

import (
	"bytes"
	"encoding/binary"
	"errors"
	"fmt"
	"sync"

	"github.com/cosmos/cosmos-sdk/crypto/keys/secp256k1"
	crypto "github.com/cosmos/cosmos-sdk/crypto/types"

	"github.com/dgraph-io/badger"
)

type Store struct {
	db *badger.DB

	lock   sync.Mutex
	height uint64
}

func NewStore(db *badger.DB, accountPubKey crypto.PubKey) (*Store, error) {
	// assert that the account key matches the one persisted to disk
	// If none currently exists, persist the provided one
	if accountPubKey != nil {
		if accountPubKey.Type() != "secp256k1" {
			return nil, fmt.Errorf("only secp256k1 keys are supported")
		}
		err := db.Update(func(txn *badger.Txn) error {
			item, err := txn.Get(MyAccountKey())
			if errors.Is(err, badger.ErrKeyNotFound) {
				// Create the account prefix
				return txn.Set(MyAccountKey(), accountPubKey.Bytes())
			} else if err != nil {
				return err
			} else {
				// Check that the existing pub key matches the provided one
				return item.Value(func(val []byte) error {
					if !bytes.Equal(val, accountPubKey.Bytes()) {
						return fmt.Errorf("account prefix already exists with different public key: existing %X, new %X", val, accountPubKey.Bytes())
					}
					return nil
				})
			}
		})
		if err != nil {
			return nil, err
		}
	}
	// set the height if it is unset
	var height uint64
	err := db.Update(func(txn *badger.Txn) error {
		item, err := txn.Get(HeightKey())
		if err != nil {
			if errors.Is(err, badger.ErrKeyNotFound) {
				// If no height exists, set the height key to 0
				heightBytes := make([]byte, 8)
				binary.BigEndian.PutUint64(heightBytes, height)
				return txn.Set(HeightKey(), heightBytes)
			}
			return err
		}
		return item.Value(func(val []byte) error {
			height = binary.BigEndian.Uint64(val)
			return nil
		})
	})
	if err != nil {
		return nil, err
	}

	return &Store{
		db:     db,
		height: height,
	}, nil
}

func (s *Store) GetHeight() uint64 {
	s.lock.Lock()
	defer s.lock.Unlock()
	return s.height
}

func (s *Store) NewTx(update bool) *badger.Txn {
	return s.db.NewTransaction(update)
}

func (s *Store) SetHeight(txn *badger.Txn, newHeight uint64) error {
	s.lock.Lock()
	defer s.lock.Unlock()
	if newHeight != s.height+1 {
		return fmt.Errorf("last height: %d, suggested new height %d is not monotonically increasing", s.height, newHeight)
	}
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, newHeight)
	if err := txn.Set(HeightKey(), bz); err != nil {
		return err
	}
	s.height = newHeight
	return nil
}

func (s *Store) GetOwnerPubKey() (crypto.PubKey, error) {
	var pubKey crypto.PubKey
	err := s.db.View(func(txn *badger.Txn) error {
		item, err := txn.Get(MyAccountKey())
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
		item, err := txn.Get(AccountKey(address))
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
		return txn.Set(AccountKey(address), bz)
	})
}

func (s *Store) ProcessDeposits(txn *badger.Txn, deposits map[string]uint64) error {
	for address, amount := range deposits {
		if err := UpdateBalance(txn, address, amount, true); err != nil {
			return err
		}
	}
	return nil
}

func (s *Store) UpdateBalance(address string, amount uint64, add bool) error {
	return s.db.Update(UpdateBalanceFn(address, amount, add))
}

func UpdateBalanceFn(address string, amount uint64, add bool) func(*badger.Txn) error {
	return func(txn *badger.Txn) error {
		return UpdateBalance(txn, address, amount, add)
	}
}

func UpdateBalance(txn *badger.Txn, address string, amount uint64, add bool) error {
	item, err := txn.Get(AccountKey(address))
	if err != nil {
		if errors.Is(err, badger.ErrKeyNotFound) {
			if add {
				newAccount := &Account{Balance: amount}
				accountBytes, err := newAccount.Bytes()
				if err != nil {
					return err
				}
				if err := txn.Set(AccountKey(address), accountBytes); err != nil {
					return err
				}
				return nil
			} else {
				panic(fmt.Sprintf("account %s does not exist. Tried deducting %d", address, amount))
			}
		}
		return err
	}
	err = item.Value(func(val []byte) error {
		var err error
		account, err := NewAccountFromBytes(val)
		if err != nil {
			return err
		}
		if !add && amount > account.Balance {
			return fmt.Errorf("account %s does not have enough balance to deduct %d", address, amount)
		}

		if add {
			account.Balance += amount
		} else {
			account.Balance -= amount
		}
		bz, err := account.Bytes()
		if err != nil {
			return err
		}
		return txn.Set(AccountKey(address), bz)
	})
	if err != nil {
		return err
	}
	return nil
}
