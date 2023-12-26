package server

import (
	"context"
	"math"

	"github.com/celestiaorg/celestia-app/pkg/user"
	blob "github.com/celestiaorg/celestia-app/x/blob/types"
	"github.com/cmwaters/maelstrom/tx"
	tmproto "github.com/tendermint/tendermint/proto/tendermint/types"
)

// most transactions are kicked out of users mempools after 5 transactions anyway
const heightTimeout = 5

func (s *Server) broadcastTx() error {
	txs := s.pool.Pull(s.feeMonitor.GasPrice(), blob.PFBGasFixedCost)
	blobs := make([]*tmproto.Blob, 0)
	for _, tx := range txs {
		for _, blob := range tx.Blobs() {
			blobs = append(blobs, &tmproto.Blob{
				NamespaceId:      tx.Namespace(),
				Data:             blob,
				ShareVersion:     tx.ShareVersion(),
				NamespaceVersion: tx.NamespaceVersion(),
			})
		}
	}

	gas := blob.DefaultEstimateGas(blobSizes(blobs))
	fee := uint64(math.Ceil(float64(gas) * s.feeMonitor.GasPrice()))

	currentHeight := s.store.GetHeight()
	timeoutHeight := currentHeight + heightTimeout
	txBytes, err := s.signer.CreatePayForBlob(
		blobs,
		user.SetGasLimit(gas),
		user.SetFee(fee),
		user.SetTimeoutHeight(uint64(timeoutHeight)),
	)
	if err != nil {
		s.log.Error().Err(err).Msg("failed to create pay for blob")
		return nil
	}

	batchID := tx.GetBatchID(txBytes)
	if err := s.pool.MarkBroadcasted(batchID, tx.GetIDs(txs), tx.Height(currentHeight)); err != nil {
		s.log.Error().Err(err).Msg("failed to batch txs")
		return nil
	}

	resp, err := s.signer.BroadcastTx(context.Background(), txBytes)
	if err != nil {
		s.log.Error().Err(err).Msg("failed to broadcast pay for blob")
		return s.pool.MarkFailed(batchID, tx.Height(currentHeight))
	} else if resp.Code != 0 {
		s.log.Error().Uint32("code", resp.Code).Str("raw log", resp.RawLog).Msg("failed to submit pay for blob")
		return s.pool.MarkFailed(batchID, tx.Height(currentHeight))
	}
	return nil
}

func blobSizes(blobs []*tmproto.Blob) []uint32 {
	sizes := make([]uint32, len(blobs))
	for i, blob := range blobs {
		sizes[i] = uint32(len(blob.Data))
	}
	return sizes
}
