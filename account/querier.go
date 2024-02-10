package account

import (
	"context"
	"time"

	"github.com/celestiaorg/celestia-app/app"
	"github.com/celestiaorg/celestia-app/app/encoding"
	cryptotypes "github.com/cosmos/cosmos-sdk/crypto/types"
	auth "github.com/cosmos/cosmos-sdk/x/auth/types"
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
