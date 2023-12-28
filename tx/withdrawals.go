package tx

import (
	"encoding/binary"
	"errors"

	"github.com/cmwaters/maelstrom/account"
	"github.com/dgraph-io/badger"
)

func (p *Pool) PopAllWithdrawals() map[string]uint64 {
	p.mtx.Lock()
	defer p.mtx.Unlock()

	withdrawals := p.pendingWithdrawals
	p.pendingWithdrawals = make(map[string]uint64)
	return withdrawals
}

func (p *Pool) ProcessWithdrawal(address string, amount uint64) error {
	p.mtx.Lock()
	defer p.mtx.Unlock()

	// Store the withdrawal in the database
	err := p.store.SetWidthdrawal(address, amount)
	if err != nil {
		return err
	}

	// Add the withdrawal to the in-memory map
	p.pendingWithdrawals[address] += amount
	return nil
}

func (p *Pool) MarkWithdrawalsComplete(withdrawals map[string]uint64) error {
	p.mtx.Lock()
	defer p.mtx.Unlock()

	// Delete the withdrawals from the database
	err := p.store.DeleteWithdrawals(withdrawals)
	if err != nil {
		return err
	}

	// Delete the withdrawals from the in-memory map
	for address, amount := range withdrawals {
		if _, ok := p.pendingWithdrawals[address]; ok {
			if p.pendingWithdrawals[address] == amount {
				delete(p.pendingWithdrawals, address)
			} else {
				p.pendingWithdrawals[address] -= amount
			}
		}
	}
	return nil
}

func (s *Store) SetWidthdrawal(address string, amount uint64) error {
	return s.db.Update(func(txn *badger.Txn) error {
		key := WithdrawalKey(address)
		item, err := txn.Get(key)
		if err != nil {
			if errors.Is(err, badger.ErrKeyNotFound) {
				buf := make([]byte, 8)
				binary.BigEndian.PutUint64(buf, amount)
				if err := txn.Set(key, buf); err != nil {
					return err
				}

				return account.UpdateBalance(txn, address, amount, false)
			}
			return err
		}

		var withdrawal uint64
		err = item.Value(func(val []byte) error {
			withdrawal = binary.BigEndian.Uint64(val)
			return nil
		})
		if err != nil {
			return err
		}

		withdrawal += amount
		buf := make([]byte, 8)
		binary.BigEndian.PutUint64(buf, withdrawal)
		if err := txn.Set(key, buf); err != nil {
			return err
		}

		return account.UpdateBalance(txn, address, amount, false)
	})
}

func (s *Store) DeleteWithdrawals(withdrawals map[string]uint64) error {
	return s.db.Update(func(txn *badger.Txn) error {
		for address, amount := range withdrawals {
			key := WithdrawalKey(address)
			item, err := txn.Get(key)
			if err != nil {
				return err
			}

			var withdrawal uint64
			err = item.Value(func(val []byte) error {
				withdrawal = binary.BigEndian.Uint64(val)
				return nil
			})
			if err != nil {
				return err
			}

			if withdrawal == amount {
				if err := txn.Delete(key); err != nil {
					return err
				}
				continue
			}

			withdrawal -= amount
			buf := make([]byte, 8)
			binary.BigEndian.PutUint64(buf, withdrawal)
			if err := txn.Set(key, buf); err != nil {
				return err
			}
		}
		return nil
	})
}
