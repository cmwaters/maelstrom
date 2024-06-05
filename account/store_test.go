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
	store, err := account.NewStore(db, ownerPrivKey.PubKey(), 0)
	require.NoError(t, err)

	privKey := secp256k1.GenPrivKey()
	pubKey := privKey.PubKey()
	address := pubKey.Address().String()

	// Create a new account
	account := account.NewAccount(pubKey, 100, 1)
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

func TestHeights(t *testing.T) {
	ownerPrivKey := secp256k1.GenPrivKey()
	db, err := badger.Open(badger.DefaultOptions(t.TempDir()))
	require.NoError(t, err)
	store, err := account.NewStore(db, ownerPrivKey.PubKey(), 0)
	require.NoError(t, err)
	require.Equal(t, uint64(0), store.GetHeight())

	// setting the start height on an already initialized store should
	// do nothing
	store, err = account.NewStore(db, ownerPrivKey.PubKey(), 100)
	require.NoError(t, err)
	require.Equal(t, uint64(0), store.GetHeight())

	// with a new db, the starting height should work
	newDb, err := badger.Open(badger.DefaultOptions(t.TempDir()))
	require.NoError(t, err)
	store, err = account.NewStore(newDb, ownerPrivKey.PubKey(), 100)
	require.NoError(t, err)
	require.Equal(t, uint64(100), store.GetHeight())
}
