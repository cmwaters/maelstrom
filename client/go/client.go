package client

import (
	"context"
	"fmt"
	"time"

	"github.com/celestiaorg/celestia-app/app"
	"github.com/celestiaorg/celestia-app/pkg/user"
	maelstrom "github.com/cmwaters/maelstrom/proto/gen/maelstrom/v1"
	"github.com/cmwaters/maelstrom/server"
	"github.com/cosmos/cosmos-sdk/crypto/keyring"
	sdk "github.com/cosmos/cosmos-sdk/types"
	bank "github.com/cosmos/cosmos-sdk/x/bank/types"
)

type Client struct {
	keys   keyring.Keyring
	signer *user.Signer
	client maelstrom.BlobClient
}

func New(keys keyring.Keyring, signer *user.Signer, client maelstrom.BlobClient) (*Client, error) {
	return &Client{
		keys:   keys,
		signer: signer,
		client: client,
	}, nil
}

func (c *Client) Balance(ctx context.Context) (uint64, error) {
	balance, err := c.client.Balance(ctx, &maelstrom.BalanceRequest{
		Address: c.signer.Address().String(),
	})
	if err != nil {
		return 0, err
	}
	return balance.Balance, nil
}

func (c *Client) Deposit(ctx context.Context, coins uint64) error {
	resp, err := c.client.Info(ctx, &maelstrom.InfoRequest{})
	if err != nil {
		return err
	}
	toAdress := resp.Address
	_, err = c.signer.SubmitTx(ctx, []sdk.Msg{
		&bank.MsgSend{
			FromAddress: c.signer.Address().String(),
			ToAddress:   toAdress,
			Amount:      sdk.NewCoins(sdk.NewInt64Coin(app.BondDenom, int64(coins))),
		},
	})
	return err
}

func (c *Client) Submit(ctx context.Context, namespace []byte, blobs [][]byte, fee uint64) (uint64, error) {
	msg := server.SubmitRequestSignOverData(namespace, blobs)
	signature, _, err := c.keys.SignByAddress(c.signer.Address(), msg)
	if err != nil {
		return 0, err
	}
	resp, err := c.client.Submit(ctx, &maelstrom.SubmitRequest{
		Signer:    c.signer.Address().String(),
		Namespace: namespace,
		Blobs:     blobs,
		Fee:       fee,
		Signature: signature,
	})
	if err != nil {
		return 0, err
	}
	return resp.Id, nil
}

func (c *Client) Confirm(ctx context.Context, id uint64) ([]byte, error) {
	ticker := time.NewTicker(time.Second)
	for {
		select {
		case <-ctx.Done():
			return nil, ctx.Err()
		case <-ticker.C:
			resp, err := c.client.Status(ctx, &maelstrom.StatusRequest{Id: id})
			if err != nil {
				return nil, err
			}
			switch resp.Status {
			case maelstrom.StatusResponse_COMMITTED:
				return resp.TxHash, nil
			case maelstrom.StatusResponse_PENDING:
				continue
			case maelstrom.StatusResponse_EXPIRED:
				return nil, fmt.Errorf("tx expired at height %d without being committed", resp.ExpiryHeight)
			default:
				return nil, fmt.Errorf("no tx with id %d exists", id)

			}
		}
	}
}