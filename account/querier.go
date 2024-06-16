package account

import (
	"context"
	"fmt"
	"time"

	"github.com/celestiaorg/celestia-app/app"
	"github.com/celestiaorg/celestia-app/app/encoding"
	"github.com/celestiaorg/celestia-app/pkg/appconsts"
	cryptotypes "github.com/cosmos/cosmos-sdk/crypto/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	auth "github.com/cosmos/cosmos-sdk/x/auth/types"
	bank "github.com/cosmos/cosmos-sdk/x/bank/types"
	"google.golang.org/grpc"
)

type Querier struct {
	conn *grpc.ClientConn
	cdc  encoding.Config
}

func NewQuerier(conn *grpc.ClientConn) *Querier {
	return &Querier{
		conn: conn,
		cdc:  encoding.MakeConfig(app.ModuleEncodingRegisters...),
	}
}

func (q *Querier) GetAccount(ctx context.Context, address string) (cryptotypes.PubKey, uint64, error) {
	client := auth.NewQueryClient(q.conn)
	timeOutCtx, cancel := context.WithTimeout(ctx, 3*time.Second)
	defer cancel()

	resp, err := client.Account(timeOutCtx, &auth.QueryAccountRequest{Address: address})
	if err != nil {
		return nil, 0, err
	}

	var acc auth.AccountI
	err = q.cdc.InterfaceRegistry.UnpackAny(resp.Account, &acc)
	if err != nil {
		return nil, 0, err
	}

	return acc.GetPubKey(), acc.GetAccountNumber(), nil
}

func (q *Querier) GetBalance(ctx context.Context, address string) (uint64, error) {
	_, err := sdk.AccAddressFromBech32(address)
	if err != nil {
		return 0, fmt.Errorf("invalid address: %w", err)
	}

	client := bank.NewQueryClient(q.conn)
	resp, err := client.Balance(ctx, &bank.QueryBalanceRequest{Address: address, Denom: appconsts.BondDenom})
	if err != nil {
		return 0, err
	}

	return resp.Balance.Amount.Uint64(), nil
}
