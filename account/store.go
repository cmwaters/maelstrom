package account

import (
	"github.com/dgraph-io/badger"
)

type Store struct {
	db *badger.DB
}

func NewStore(dir string) (*Store, error) {
	opts := badger.DefaultOptions(dir)
	db, err := badger.Open(opts)
	if err != nil {
		return nil, err
	}
	return &Store{db: db}, nil
}

func (s *Store) GetAccount(address string) (*Account, error) {
	var account *Account
	err := s.db.View(func(txn *badger.Txn) error {
		item, err := txn.Get([]byte(address))
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
		return txn.Set([]byte(address), bz)
	})
}

func (s *Store) UpdateBalance(address string, amount uint64, add bool) (bool, error) {
	successful := false
	err := s.db.Update(func(txn *badger.Txn) error {
		item, err := txn.Get([]byte(address))
		if err != nil {
			return err
		}
		return item.Value(func(val []byte) error {
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
				return txn.Set([]byte(address), bz)
			}
			return nil
		})
	})
	if err != nil {
		return false, err
	}
	return successful, nil
}
