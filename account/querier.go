package account

import (
	"context"
	"time"

	"github.com/celestiaorg/celestia-app/app"
	"github.com/celestiaorg/celestia-app/app/encoding"
	"github.com/celestiaorg/celestia-app/pkg/user"
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

func (q *Querier) GetPubKey(ctx context.Context, address string) (cryptotypes.PubKey, error) {
	user.QueryAccount(ctx, q.conn, q.cdc, address)

	client := auth.NewQueryClient(q.conn)
	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()

	resp, err := client.Account(ctx, &auth.QueryAccountRequest{Address: address})
	if err != nil {
		return nil, err
	}

	var acc auth.AccountI
	err = q.cdc.InterfaceRegistry.UnpackAny(resp.Account, &acc)
	if err != nil {
		return nil, err
	}

	return acc.GetPubKey(), nil
}
