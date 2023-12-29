package node

import (
	"context"
	"strconv"
	"strings"

	"github.com/celestiaorg/celestia-app/pkg/appconsts"
	"github.com/cosmos/cosmos-sdk/client/grpc/node"
	"github.com/cosmos/cosmos-sdk/types/tx"
	"google.golang.org/grpc"
)

type FeeMonitor struct {
	conn *grpc.ClientConn

	minGasPrice float64
}

func NewFeeMonitor(ctx context.Context, conn *grpc.ClientConn) (*FeeMonitor, error) {
	fm := &FeeMonitor{
		conn: conn,
	}
	if err := fm.getMinGasPrice(ctx); err != nil {
		return nil, err
	}
	return fm, nil
}

func (fm *FeeMonitor) GasPrice() float64 {
	return fm.minGasPrice
}

func (fm *FeeMonitor) getMinGasPrice(ctx context.Context) error {
	resp, err := node.NewServiceClient(fm.conn).Config(ctx, &node.ConfigRequest{})
	if err != nil {
		return err
	}
	if resp.MinimumGasPrice == "" {
		fm.minGasPrice = appconsts.DefaultMinGasPrice
	} else {
		resp.MinimumGasPrice = strings.TrimSuffix(resp.MinimumGasPrice, appconsts.BondDenom)
		fm.minGasPrice, err = strconv.ParseFloat(resp.MinimumGasPrice, 64)
	}
	return err
}

func (fm *FeeMonitor) EstimateGas(ctx context.Context, txBytes []byte) (uint64, error) {
	resp, err := tx.NewServiceClient(fm.conn).Simulate(ctx, &tx.SimulateRequest{
		TxBytes: txBytes,
	})
	if err != nil {
		return 0, err
	}
	return resp.GasInfo.GasUsed, nil
}
