package account_test

import (
	"reflect"
	"testing"

	"github.com/cmwaters/maelstrom/account"
	"github.com/cosmos/cosmos-sdk/crypto/keys/secp256k1"
	"github.com/dgraph-io/badger"
	"github.com/stretchr/testify/require"
)

func TestCreateAndRetrieveAccount(t *testing.T) {
	// Create a new store
	ownerPrivKey := secp256k1.GenPrivKey()
	db, err := badger.Open(badger.DefaultOptions(t.TempDir()))
	require.NoError(t, err)
	store, err := account.NewStore(db, ownerPrivKey.PubKey())
	require.NoError(t, err)

	privKey := secp256k1.GenPrivKey()
	pubKey := privKey.PubKey()
	address := pubKey.Address().String()

	// Create a new account
	account := account.NewAccount(pubKey, 100)
	require.NoError(t, err)

	// Set the account in the store
	err = store.SetAccount(address, account)
	require.NoError(t, err)

	// Retrieve the account from the store
	retrievedAccount, err := store.GetAccount(address)
	require.NoError(t, err)

	// Compare the retrieved account with the original account
	if !reflect.DeepEqual(account, retrievedAccount) {
		t.Fatalf("Retrieved account does not match original account")
	}
}
