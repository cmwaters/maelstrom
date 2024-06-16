package client

import (
	"context"
	"errors"
	"fmt"
	"time"

	"github.com/celestiaorg/celestia-app/app"
	ns "github.com/celestiaorg/celestia-app/pkg/namespace"
	"github.com/celestiaorg/celestia-app/pkg/user"
	maelstrom "github.com/cmwaters/maelstrom/proto/gen/go/maelstrom/v1"
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
	return balance.MaelstromBalance, nil
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
	}, user.SetGasLimitAndFee(200_000, resp.MinGasPrice))
	return err
}

func (c *Client) Submit(ctx context.Context, namespace []byte, blobs [][]byte, fee uint64) (uint64, error) {
	n, err := ns.NewV0(namespace)
	if err != nil {
		return 0, err
	}
	msg := server.SubmitRequestSignOverData(n.Bytes(), blobs)
	signature, _, err := c.keys.SignByAddress(c.signer.Address(), msg)
	if err != nil {
		return 0, err
	}
	resp, err := c.client.Submit(ctx, &maelstrom.SubmitRequest{
		Signer:    c.signer.Address().String(),
		Namespace: n.Bytes(),
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
	ticker := time.NewTimer(0)
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
			case maelstrom.StatusResponse_PENDING, maelstrom.StatusResponse_BROADCASTING:
				ticker.Reset(time.Second)
				continue
			case maelstrom.StatusResponse_EXPIRED:
				return nil, fmt.Errorf("tx expired at height %d without being committed", resp.ExpiryHeight)
			case maelstrom.StatusResponse_UNKNOWN:
				return nil, fmt.Errorf("tx with id %d not found", id)
			default:
				return nil, fmt.Errorf("unknown status %v", resp.Status)
			}
		}
	}
}

func (c *Client) Cancel(ctx context.Context, id uint64) error {
	msg := server.CancelRequestSignOverData(c.signer.Address().String(), id)
	signature, _, err := c.keys.SignByAddress(c.signer.Address(), msg)
	if err != nil {
		return err
	}
	_, err = c.client.Cancel(ctx, &maelstrom.CancelRequest{
		Id:        id,
		Signature: signature,
	})
	return err
}

func (c *Client) Withdraw(ctx context.Context, amount uint64) error {
	balance, err := c.Balance(ctx)
	if err != nil {
		return fmt.Errorf("failed to get balance: %w", err)
	}
	if amount > balance {
		return fmt.Errorf("amount greater than balance: %d > %d", amount, balance)
	}

	return c.withdraw(ctx, balance, amount)
}

func (c *Client) WithdrawAll(ctx context.Context) error {
	balance, err := c.Balance(ctx)
	if err != nil {
		return fmt.Errorf("failed to get balance: %w", err)
	}
	return c.withdraw(ctx, balance, balance)
}

func (c *Client) withdraw(ctx context.Context, balance, amount uint64) error {
	now := uint64(time.Now().UTC().Unix())
	addr := c.signer.Address().String()
	msg := server.WithdrawRequestSignOverData(addr, balance, amount, now)
	signature, _, err := c.keys.SignByAddress(c.signer.Address(), msg)
	if err != nil {
		return fmt.Errorf("failed to sign withdraw request: %w", err)
	}

	_, err = c.client.Withdraw(ctx, &maelstrom.WithdrawRequest{
		Signer:    addr,
		Balance:   balance,
		Amount:    amount,
		Timestamp: now,
		Signature: signature,
	})
	if err != nil {
		return err
	}

	// wait for up to a minute for the withdrawal to be confirmed
	subCtx, cancel := context.WithTimeout(ctx, time.Minute)
	defer cancel()
	ticker := time.NewTicker(time.Second)
	for {
		select {
		case <-subCtx.Done():
			return errors.New("unable to confirm withdrawal after timeout (1 minute)")
		case <-ctx.Done():
			return ctx.Err()
		case <-ticker.C:
			resp, err := c.client.PendingWithdrawal(subCtx, &maelstrom.PendingWithdrawalRequest{
				Address: addr,
			})
			if err != nil {
				return fmt.Errorf("querying pending withdrawal: %w", err)
			}
			if resp.Amount == 0 {
				return nil
			}
		}
	}
}
