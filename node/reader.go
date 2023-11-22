package node

import (
	"context"
	"time"

	"github.com/celestiaorg/celestia-app/app"
	"github.com/celestiaorg/celestia-app/app/encoding"
	"github.com/cmwaters/maelstrom/account"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/rs/zerolog"
	"github.com/tendermint/tendermint/rpc/client"

	bank "github.com/cosmos/cosmos-sdk/x/bank/types"
)

// Reader listens to committed blocks to the Celestia blockchain
// and updates the balances of accounts in its store
func Read(ctx context.Context, log zerolog.Logger, client client.Client, store *account.Store) error {
	latestStoreHeight, err := store.GetHeight()
	if err != nil {
		return err
	}
	pubKey, err := store.GetOwnerPubKey()
	if err != nil {
		return err
	}
	address := pubKey.Address().String()
	log.Info().Str("address", address).Int64("height", latestStoreHeight).Msg("starting chain reader")

	ticker := time.NewTicker(time.Second)
	for {
		select {
		case <-ticker.C:
			head, err := client.Header(ctx, nil)
			if err != nil {
				return err
			}
			if head.Header.Height > latestStoreHeight {
				if err := Sync(ctx, log, client, store, address, latestStoreHeight+1, head.Header.Height); err != nil {
					return err
				}
				latestStoreHeight = head.Header.Height
			}
		case <-ctx.Done():
			return ctx.Err()
		}
	}
}

func Sync(ctx context.Context, log zerolog.Logger, client client.Client, store *account.Store, signer string, fromHeight, toHeight int64) error {
	decoder := encoding.MakeConfig(app.ModuleEncodingRegisters...).TxConfig.TxDecoder()
	for height := fromHeight; height <= toHeight; height++ {
		block, err := client.Block(ctx, &height)
		if err != nil {
			return err
		}

		sendTxs := filterSendTxs(block.Block.Data.Txs.ToSliceOfBytes(), decoder, signer)

		if len(sendTxs) == 0 {
			log.Info().Int64("height", height).Msg("processed block")
			if err := store.SetHeight(uint64(height)); err != nil {
				return err
			}
			continue
		}

		// get the results from all transactions in that block
		blockResults, err := client.BlockResults(ctx, &height)
		if err != nil {
			return err
		}

		// filter out all invalid transactions
		for txIndex, _ := range sendTxs {
			if !blockResults.TxsResults[txIndex].IsOK() {
				delete(sendTxs, txIndex)
			}
		}

		deposits := aggregateMsgSendsIntoDeposits(sendTxs)
		if err := store.ProcessDeposits(deposits, uint64(height)); err != nil {
			return err
		}
		log.Info().Int64("height", height).Int("deposits", len(sendTxs)).Msg("processed block")
	}

	return nil
}

func filterSendTxs(txs [][]byte, decoder sdk.TxDecoder, signer string) map[int]*bank.MsgSend {
	sendTxs := make(map[int]*bank.MsgSend)
	for i, tx := range txs {
		decodedTx, err := decoder(tx)
		if err != nil {
			continue
		}
		for _, msg := range decodedTx.GetMsgs() {
			// NOTE: we don't allow for multiple MsgSend's in a single transaction
			// to the same signer.
			if msgSend, ok := msg.(*bank.MsgSend); ok {
				// the message has to be addressed to the signer
				if msgSend.ToAddress == signer {
					sendTxs[i] = msgSend
				}
			}
		}
	}
	return sendTxs
}

func aggregateMsgSendsIntoDeposits(sendMsgs map[int]*bank.MsgSend) map[string]uint64 {
	deposits := make(map[string]uint64)
	for _, msg := range sendMsgs {
		deposits[msg.FromAddress] += msg.Amount.AmountOf(app.BondDenom).Uint64()
	}
	return deposits
}
