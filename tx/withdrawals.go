package tx

import (
	"encoding/binary"
	"errors"

	"github.com/cmwaters/maelstrom/account"
	wire "github.com/cmwaters/maelstrom/proto/gen/go/maelstrom/v1"
	"github.com/dgraph-io/badger"
	"google.golang.org/protobuf/proto"
)

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

func (p *Pool) GetAllWithdrawals() map[string]uint64 {
	p.mtx.Lock()
	defer p.mtx.Unlock()

	withdrawals := p.pendingWithdrawals
	return withdrawals
}

func (p *Pool) GetPendingWithdrawalAmount(address string) uint64 {
	p.mtx.Lock()
	defer p.mtx.Unlock()

	amount := p.pendingWithdrawals[address]
	for _, withdrawalTx := range p.broadcastWithdrawals {
		for _, withdrawal := range withdrawalTx.Withdrawals {
			if withdrawal.Address == address {
				amount += withdrawal.Amount
			}
		}
	}
	return amount
}

func (p *Pool) MarkWithdrawalTxBroadcasted(txID TxID, withdrawals map[string]uint64, timeoutHeight uint64) error {
	p.mtx.Lock()
	defer p.mtx.Unlock()

	w := make([]*wire.Withdrawal, len(withdrawals))
	i := 0
	for address, amount := range withdrawals {
		w[i] = &wire.Withdrawal{
			Address: address,
			Amount:  amount,
		}
		i++
	}

	withdrawalTx := &wire.WithdrawalTx{
		Withdrawals:   w,
		TimeoutHeight: timeoutHeight,
	}

	err := p.store.MoveWithdrawalToBroadcast(txID, withdrawalTx)
	if err != nil {
		return err
	}

	p.broadcastWithdrawals[txID] = withdrawalTx
	for address, amount := range withdrawals {
		p.pendingWithdrawals[address] -= amount
		if p.pendingWithdrawals[address] == 0 {
			delete(p.pendingWithdrawals, address)
		}
	}
	return nil
}

func (p *Pool) MarkWithdrawalTxFailed(txID TxID) error {
	p.mtx.Lock()
	defer p.mtx.Unlock()

	withdrawalTx, ok := p.broadcastWithdrawals[txID]
	if !ok {
		return errors.New("withdrawal tx not found")
	}

	if err := p.store.MoveWithdrawalToPending(txID); err != nil {
		return err
	}

	for _, withdrawal := range withdrawalTx.Withdrawals {
		p.pendingWithdrawals[withdrawal.Address] += withdrawal.Amount
	}
	delete(p.broadcastWithdrawals, txID)
	return nil
}

func (p *Pool) WasWithdrawalBroadcasted(txID TxID) bool {
	p.mtx.Lock()
	defer p.mtx.Unlock()

	_, ok := p.broadcastWithdrawals[txID]
	return ok
}

func (p *Pool) MarkWithdrawalsComplete(txID TxID) (int, error) {
	p.mtx.Lock()
	defer p.mtx.Unlock()

	withdrawalTx, ok := p.broadcastWithdrawals[txID]
	if !ok {
		return 0, errors.New("withdrawal tx not found")
	}

	// Delete the withdrawals from the database
	err := p.store.DeleteWithdrawalTx(txID)
	if err != nil {
		return 0, err
	}

	// Delete the withdrawals from the in-memory map
	delete(p.broadcastWithdrawals, txID)
	return len(withdrawalTx.Withdrawals), nil
}

// updateWithdrawalTxs updates the status of all withdrawal txs that have timed out
// moving them back into pending so that they can be added back to a future transaction.
// This called upon every new height.
func (p *Pool) updateWithdrawalTxs(height uint64) (int, error) {
	counter := 0
	for txID, withdrawalTx := range p.broadcastWithdrawals {
		if withdrawalTx.TimeoutHeight < height {
			if err := p.MarkWithdrawalTxFailed(txID); err != nil {
				return 0, err
			}
			counter++
		}
	}
	return counter, nil
}

func (s *Store) SetWidthdrawal(address string, amount uint64) error {
	return s.db.Update(func(txn *badger.Txn) error {
		if err := AddWithdrawal(txn, address, amount, true); err != nil {
			return err
		}

		return account.UpdateBalance(txn, address, amount, false)
	})
}

func (s *Store) DeleteWithdrawalTx(txID TxID) error {
	return s.db.Update(func(txn *badger.Txn) error {
		return txn.Delete(BroadcastedWithdrawalTxKey(txID))
	})
}

func (s *Store) MoveWithdrawalToBroadcast(txID TxID, withdrawalTx *wire.WithdrawalTx) error {
	return s.db.Update(func(txn *badger.Txn) error {
		txBytes, err := proto.Marshal(withdrawalTx)
		if err != nil {
			return err
		}

		if err := txn.Set(BroadcastedWithdrawalTxKey(txID), txBytes); err != nil {
			return err
		}

		for _, withdrawal := range withdrawalTx.Withdrawals {
			if err := AddWithdrawal(txn, withdrawal.Address, withdrawal.Amount, false); err != nil {
				return err
			}
		}
		return nil
	})
}

func (s *Store) MoveWithdrawalToPending(txID TxID) error {
	return s.db.Update(func(txn *badger.Txn) error {
		item, err := txn.Get(BroadcastedWithdrawalTxKey(txID))
		if err != nil {
			return err
		}

		var withdrawalTx wire.WithdrawalTx
		err = item.Value(func(val []byte) error {
			return proto.Unmarshal(val, &withdrawalTx)
		})
		if err != nil {
			return err
		}

		for _, withdrawal := range withdrawalTx.Withdrawals {
			if err := AddWithdrawal(txn, withdrawal.Address, withdrawal.Amount, true); err != nil {
				return err
			}
		}
		return txn.Delete(BroadcastedWithdrawalTxKey(txID))
	})
}

func AddWithdrawal(txn *badger.Txn, address string, amount uint64, add bool) error {
	key := WithdrawalKey(address)
	item, err := txn.Get(key)
	if err != nil {
		if add && errors.Is(err, badger.ErrKeyNotFound) {
			buf := make([]byte, 8)
			binary.BigEndian.PutUint64(buf, amount)
			return txn.Set(key, buf)
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

	if add {
		withdrawal += amount
	} else if withdrawal == amount {
		return txn.Delete(key)
	} else {
		withdrawal -= amount
	}
	buf := make([]byte, 8)
	binary.BigEndian.PutUint64(buf, withdrawal)
	return txn.Set(key, buf)
}
