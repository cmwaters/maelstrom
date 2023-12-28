package tx_test

import (
	"testing"

	"github.com/cmwaters/maelstrom/tx"
	"github.com/stretchr/testify/require"
)

func TestKeys(t *testing.T) {
	for _, id := range []tx.BlobID{0, 1, 10} {
		key := tx.PendingBlobKey(id)
		output := tx.BlobIDFromKey(key)
		require.Equal(t, output, id)
	}
}
