package account

import (
	"github.com/cmwaters/maelstrom/proto/gen/maelstrom/v1"
	"github.com/cosmos/cosmos-sdk/crypto/keys/secp256k1"
	crypto "github.com/cosmos/cosmos-sdk/crypto/types"
	"google.golang.org/protobuf/proto"
)

type Account struct {
	PubKey  crypto.PubKey
	Balance uint64 // balance in utia
}

func NewAccount(pubKey crypto.PubKey, balance uint64) *Account {
	return &Account{
		PubKey:  pubKey,
		Balance: balance,
	}
}

func NewAccountFromBytes(bz []byte) (*Account, error) {
	acc := &maelstrom.Account{}
	if err := proto.Unmarshal(bz, acc); err != nil {
		return nil, err
	}

	// FIXME: we only support secp256k1 keys for now.
	// Need to eventually generalize this
	var pk crypto.PubKey
	if acc.PubKey != nil {
		pk = &secp256k1.PubKey{Key: acc.PubKey}
	}

	return &Account{
		PubKey:  pk,
		Balance: acc.Balance,
	}, nil
}

func (a *Account) Bytes() ([]byte, error) {
	if a.PubKey == nil {
		return proto.Marshal(&maelstrom.Account{
			Balance: a.Balance,
		})
	}
	return proto.Marshal(&maelstrom.Account{
		PubKey:  a.PubKey.Bytes(),
		Balance: a.Balance,
	})
}
