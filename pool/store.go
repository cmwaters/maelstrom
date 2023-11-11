package pool

import "github.com/dgraph-io/badger"

type Store struct {
	db *badger.DB
}

func NewStore(dir string) (*Store, error) {
	db, err := badger.Open(badger.DefaultOptions(dir))
	if err != nil {
		return nil, err
	}
	return &Store{
		db: db,
	}, nil
}

func (s *Store) IncrementLastTxKey() (uint64, error) {
	return 0, nil
}

func (s *Store)	GetLastTxKey() (uint64, error) {
	return 0, nil
}

func (s *Store) GetPendingTx(key uint64) {}

func (s *Store) SetPendingTx(key uint64) {}


