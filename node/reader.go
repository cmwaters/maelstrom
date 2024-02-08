package node

import (
	"context"
	"time"

	"github.com/celestiaorg/celestia-app/app"
	"github.com/celestiaorg/celestia-app/app/encoding"
	"github.com/cmwaters/maelstrom/account"
	"github.com/cmwaters/maelstrom/tx"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/rs/zerolog"
	"github.com/tendermint/tendermint/rpc/client"
	"github.com/tendermint/tendermint/types"

	bank "github.com/cosmos/cosmos-sdk/x/bank/types"
)

// Reader listens to committed blocks to the Celestia blockchain
// and updates the balances of accounts in its store
func Read(
	ctx context.Context,
	log zerolog.Logger,
	client client.Client,
	store *account.Store,
	pool *tx.Pool,
) error {
	latestStoreHeight := store.GetHeight()
	pubKey, err := store.GetOwnerPubKey()
	if err != nil {
		return err
	}
	address := sdk.AccAddress(pubKey.Address()).String()
	log.Info().Str("address", address).Uint64("height", latestStoreHeight).Msg("starting chain reader")

	timer := time.NewTimer(0)
	for {
		select {
		case <-timer.C:
			head, err := client.Header(ctx, nil)
			if err != nil {
				return err
			}
			headerHeight := uint64(head.Header.Height)
			if headerHeight > latestStoreHeight {
				if err := Sync(ctx, log, client, store, pool, address, latestStoreHeight+1, headerHeight); err != nil {
					return err
				}
				latestStoreHeight = headerHeight
			}
			timer.Reset(time.Second)
		case <-ctx.Done():
			return ctx.Err()
		}
	}
}

func Sync(
	ctx context.Context,
	log zerolog.Logger,
	client client.Client,
	store *account.Store,
	pool *tx.Pool,
	signer string,
	fromHeight, toHeight uint64,
) error {
	decoder := encoding.MakeConfig(app.ModuleEncodingRegisters...).TxConfig.TxDecoder()
	for height := fromHeight; height <= toHeight; height++ {
		h := int64(height)
		block, err := client.Block(ctx, &h)
		if err != nil {
			return err
		}

		txn := store.NewTx(true)
		defer txn.Discard()

		// update the height
		if err := store.SetHeight(txn, height); err != nil {
			return err
		}

		blockTxs := block.Block.Data.Txs.ToSliceOfBytes()

		sendTxs := filterSendTxs(blockTxs, decoder, signer)
		if len(sendTxs) != 0 {
			// get the results from all transactions in that block
			blockResults, err := client.BlockResults(ctx, &h)
			if err != nil {
				return err
			}

			// filter out all invalid transactions
			for txIndex := range sendTxs {
				if !blockResults.TxsResults[txIndex].IsOK() {
					delete(sendTxs, txIndex)
				}
			}

			deposits := aggregateMsgSendsIntoDeposits(sendTxs)
			// update the balances of all users who sent funds
			if err := store.ProcessDeposits(txn, deposits); err != nil {
				return err
			}
		}

		// loop through all transactions and check which of the nodes broadcasted
		// transactions have been included in the block. Then mark them as committed
		committedCounter := 0
		withdrawalCounter := 0
		for _, blockTx := range blockTxs {
			txID := tx.GetTxID(blockTx)
			if pool.WasBroadcasted(txID) {
				blobTx, isBlobTx := types.UnmarshalBlobTx(blockTx)
				if !isBlobTx {
					panic("maelstrom registers a broadcasted tx that is not a blob tx")
				}
				pfbHash := tx.Hash(blobTx.Tx)

				if err := pool.CommitTx(txn, txID, pfbHash); err != nil {
					return err
				}
				committedCounter++
			}
			if pool.WasWithdrawalBroadcasted(txID) {
				withdrawals, err := pool.MarkWithdrawalsComplete(txID)
				if err != nil {
					return err
				}
				withdrawalCounter += withdrawals
			}
		}

		// commit all the updates atomically to the database
		if err := txn.Commit(); err != nil {
			return err
		}

		// update the pools height. This will trigger pruning of transactions
		// that have expired and return funds to the senders. It does not have
		// to be atomic with the transaction processing committed block transactions.
		failedTxs, err := pool.Update(height)
		if err != nil {
			return err
		}

		log.Info().
			Uint64("height", height).
			Int("confirmed_txs", committedCounter).
			Int("failed_txs", failedTxs).
			Int("deposits", len(sendTxs)).
			Int("withdrawals", withdrawalCounter).
			Int("total_txs", len(blockTxs)).
			Msg("processed block")
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
