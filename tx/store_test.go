package tx_test

import (
	"testing"

	"github.com/cmwaters/maelstrom/tx"
	wire "github.com/cmwaters/maelstrom/proto/gen/maelstrom/v1"
	"github.com/stretchr/testify/require"
)

func TestPendingTxPersistence(t *testing.T) {
	store, err := tx.NewStore(t.TempDir())
	require.NoError(t, err)

	// Create a new PendingTx
	pendingTx := &wire.PendingTx{
		// Fill with test data
	}

	// Persist the PendingTx
	key, err := store.SetPendingTx(pendingTx)
	require.NoError(t, err)

	// Retrieve the PendingTx
	retrievedTx, err := store.GetPendingTx(key)
	require.NoError(t, err)

	// Check if the retrieved PendingTx is the same as the original
	require.Equal(t, pendingTx, retrievedTx)
}
