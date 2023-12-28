package server

import (
	"context"
	"math"

	"github.com/celestiaorg/celestia-app/app"
	"github.com/celestiaorg/celestia-app/pkg/user"
	blob "github.com/celestiaorg/celestia-app/x/blob/types"
	"github.com/cmwaters/maelstrom/tx"
	sdk "github.com/cosmos/cosmos-sdk/types"
	bank "github.com/cosmos/cosmos-sdk/x/bank/types"
	tmproto "github.com/tendermint/tendermint/proto/tendermint/types"
)

// most transactions are kicked out of users mempools after 5 transactions anyway
const heightTimeout = 5

func (s *Server) broadcastTx() error {
	if err := s.broadcastWithdrawals(); err != nil {
		return err
	}

	return s.broadcastPFB()
}

func (s *Server) broadcastPFB() error {
	txs := s.pool.Pull(s.feeMonitor.GasPrice(), blob.PFBGasFixedCost)
	if len(txs) == 0 {
		// nothing to broadcast, so skip
		return nil
	}
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

	txID := tx.GetTxID(txBytes)
	if err := s.pool.MarkBroadcasted(txID, tx.GetBlobIDs(txs), timeoutHeight); err != nil {
		s.log.Error().Err(err).Msg("failed to batch txs")
		return nil
	}

	resp, err := s.signer.BroadcastTx(context.Background(), txBytes)
	if err != nil {
		s.log.Error().Err(err).Msg("failed to broadcast pay for blob")
		return s.pool.MarkFailed(txID, currentHeight)
	} else if resp.Code != 0 {
		s.log.Error().Uint32("code", resp.Code).Str("raw log", resp.RawLog).Msg("failed to submit pay for blob")
		return s.pool.MarkFailed(txID, currentHeight)
	}
	s.log.Info().
		Str("tx hash", txID.HEX()).
		Int("blobs", len(txs)).
		Uint64("fee", fee).
		Msg("broadcasted pay for blob")
	return nil
}

func (s *Server) broadcastWithdrawals() error {
	withdrawals := s.pool.GetAllWithdrawals()
	if len(withdrawals) == 0 {
		// nothing to broadcast, so skip
		return nil
	}

	// the nodes own address
	sender := s.signer.Address()

	sends := make([]sdk.Msg, len(withdrawals))
	i := 0
	for address, amount := range withdrawals {
		coins := sdk.NewCoins(sdk.NewInt64Coin(app.BondDenom, int64(amount)))
		sends[i] = &bank.MsgSend{
			FromAddress: sender.String(),
			ToAddress:   address,
			Amount:      coins,
		}
	}

	gasPrice := s.feeMonitor.GasPrice()

	// FIXME: (hack) this increments the sequence in the background
	sequence := s.signer.GetSequence()
	s.signer.ForceSetSequence(sequence)
	txBytes, err := s.signer.CreateTx(
		sends,
		user.SetGasLimitAndFee(100_000, gasPrice),
	)
	if err != nil {
		s.log.Error().Err(err).Msg("failed to create tx")
		return nil
	}
	s.signer.ForceSetSequence(sequence)

	gasUsed, err := s.feeMonitor.EstimateGas(context.Background(), txBytes)
	if err != nil {
		s.log.Error().Err(err).Msg("failed to estimate gas for send tx")
		return nil
	}

	// add a margin of 10%
	gasUsed = gasUsed + (gasUsed / 10)
	fee := uint64(math.Ceil(float64(gasUsed) * gasPrice))
	currentHeight := s.store.GetHeight()
	timeoutHeight := currentHeight + heightTimeout

	txBytes, err = s.signer.CreateTx(
		sends,
		user.SetGasLimit(gasUsed),
		user.SetFee(fee),
		user.SetTimeoutHeight(timeoutHeight),
	)
	if err != nil {
		s.log.Error().Err(err).Msg("failed to create tx")
		return nil
	}

	txID := tx.GetTxID(txBytes)
	if err := s.pool.MarkWithdrawalTxBroadcasted(txID, withdrawals, timeoutHeight); err != nil {
		s.log.Error().Err(err).Msg("failed to batch txs")
		return nil
	}

	resp, err := s.signer.BroadcastTx(context.Background(), txBytes)
	if err != nil {
		s.log.Error().Err(err).Msg("failed to broadcast tx")
		return s.pool.MarkWithdrawalTxFailed(txID)
	} else if resp.Code != 0 {
		s.log.Error().Uint32("code", resp.Code).Str("raw log", resp.RawLog).Msg("failed to submit tx")
		return s.pool.MarkWithdrawalTxFailed(txID)
	}
	s.log.Info().
		Str("tx hash", txID.HEX()).
		Int("withdrawals", len(withdrawals)).
		Uint64("fee", fee).
		Msg("broadcasted msg send for withdrawals")

	return nil
}

func blobSizes(blobs []*tmproto.Blob) []uint32 {
	sizes := make([]uint32, len(blobs))
	for i, blob := range blobs {
		sizes[i] = uint32(len(blob.Data))
	}
	return sizes
}
