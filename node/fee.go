package node

import (
	"google.golang.org/grpc"
)

type FeeMonitor struct {
	conn *grpc.ClientConn
}

func NewFeeMonitor(conn *grpc.ClientConn) *FeeMonitor {
	return &FeeMonitor{
		conn: conn,
	}
}

func (fm *FeeMonitor) GasPrice() float64 {
	return 0.1
}
