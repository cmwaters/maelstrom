package tx_test

import (
	"testing"

	wire "github.com/cmwaters/maelstrom/proto/gen/maelstrom/v1"
	"github.com/cmwaters/maelstrom/tx"
	"github.com/dgraph-io/badger"
	"github.com/stretchr/testify/require"
)

func TestPendingTxPersistence(t *testing.T) {
	db, err := badger.Open(badger.DefaultOptions(t.TempDir()))
	require.NoError(t, err)

	store, err := tx.NewStore(db)
	require.NoError(t, err)

	// Create a new PendingTx
	pendingTx := &wire.Tx{
		// Fill with test data
	}

	// Persist the PendingTx
	key, err := store.SetPendingTx(pendingTx, nil)
	require.NoError(t, err)

	// Retrieve the PendingTx
	retrievedTx, err := store.GetPendingTx(key)
	require.NoError(t, err)

	// Check if the retrieved PendingTx is the same as the original
	require.Equal(t, pendingTx, retrievedTx)
}

func TestKeys(t *testing.T) {
	for _, id := range []tx.ID{0, 1, 10} {
		key := tx.PendingTxKey(id)
		output := tx.TxIDFromBytes(key)
		require.Equal(t, output, id)
	}
}
