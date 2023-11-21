package tx

import (
	"encoding/json"
	"github.com/dgraph-io/badger"
)

type Tracker struct {
	db *badger.DB
}

func NewTracker(db *badger.DB) *Tracker {
	return &Tracker{db: db}
}

func (t *Tracker) Set(hash string, keys []uint64) error {
	keysJson, err := json.Marshal(keys)
	if err != nil {
		return err
	}
	return t.db.Update(func(txn *badger.Txn) error {
		return txn.Set([]byte(hash), keysJson)
	})
}

func (t *Tracker) Get(hash string) ([]uint64, error) {
	var keys []uint64
	err := t.db.View(func(txn *badger.Txn) error {
		item, err := txn.Get([]byte(hash))
		if err != nil {
			return err
		}
		value, err := item.ValueCopy(nil)
		if err != nil {
			return err
		}
		err = json.Unmarshal(value, &keys)
		return err
	})
	return keys, err
}

func (t *Tracker) Delete(hash string) error {
	return t.db.Update(func(txn *badger.Txn) error {
		return txn.Delete([]byte(hash))
	})
}

