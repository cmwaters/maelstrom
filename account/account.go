package account

import (
	"errors"
	"fmt"

	"github.com/cmwaters/maelstrom/proto/gen/go/maelstrom/v1"
	"github.com/cosmos/cosmos-sdk/crypto/keys/ed25519"
	"github.com/cosmos/cosmos-sdk/crypto/keys/secp256k1"
	"github.com/cosmos/cosmos-sdk/crypto/keys/secp256r1"
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

	var pk crypto.PubKey
	if acc.PubKey != nil {
		switch acc.PubKeyType {
		case maelstrom.Account_SECP256K1:
			pk = &secp256k1.PubKey{Key: acc.PubKey}
		case maelstrom.Account_SECP256R1:
			spk := &secp256r1.PubKey{}
			if err := spk.Key.Unmarshal(acc.PubKey); err != nil {
				return nil, err
			}
			pk = spk
		case maelstrom.Account_ED25519:
			pk = &ed25519.PubKey{Key: acc.PubKey}
		default:
			return nil, errors.New("unsupported public key type")
		}
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
	var pkType maelstrom.Account_PubKeyType
	switch a.PubKey.(type) {
	case *secp256k1.PubKey:
		pkType = maelstrom.Account_SECP256K1
	case *secp256r1.PubKey:
		pkType = maelstrom.Account_SECP256R1
	case *ed25519.PubKey:
		pkType = maelstrom.Account_ED25519
	default:
		return nil, fmt.Errorf("unsupported public key type: %s", a.PubKey.Type())
	}

	return proto.Marshal(&maelstrom.Account{
		PubKey:     a.PubKey.Bytes(),
		Balance:    a.Balance,
		PubKeyType: pkType,
	})
}
