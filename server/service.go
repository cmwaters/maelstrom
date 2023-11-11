package server

import (
	"context"
	"fmt"

	"github.com/cmwaters/maelstrom/pool"
	"github.com/cmwaters/maelstrom/proto/gen/maelstrom/v1"
	"github.com/cmwaters/maelstrom/account"
)

var _ maelstrom.BlobServer = (*Server)(nil)

type Server struct {
	maelstrom.UnimplementedBlobServer
	pool  pool.Pool
	store account.Store
}

func (s *Server) Info(ctx context.Context, req *maelstrom.InfoRequest) (*maelstrom.InfoResponse, error) {
	// TODO: Implement
	return &maelstrom.InfoResponse{}, nil
}

func (s *Server) Submit(ctx context.Context, req *maelstrom.SubmitRequest) (*maelstrom.SubmitResponse, error) {
	// TODO: Implement
	acc, err := s.store.GetAccount(req.Signer)
	if err != nil {
		return nil, err
	}
	msg := SubmitRequestSignOverData(req.Namespace, req.Blobs)
	if !acc.PubKey.VerifySignature(msg, req.Signature) {
		return nil, fmt.Errorf("invalid signature for signer %s", req.Signer)
	}

	return &maelstrom.SubmitResponse{}, nil
}

func (s *Server) Status(ctx context.Context, req *maelstrom.StatusRequest) (*maelstrom.StatusResponse, error) {
	// TODO: Implement
	return &maelstrom.StatusResponse{}, nil
}

func (s *Server) Balance(ctx context.Context, req *maelstrom.BalanceRequest) (*maelstrom.BalanceResponse, error) {
	// TODO: Implement
	return &maelstrom.BalanceResponse{}, nil
}

func (s *Server) Deposit(ctx context.Context, req *maelstrom.DepositRequest) (*maelstrom.DepositResponse, error) {
	// TODO: Implement
	return &maelstrom.DepositResponse{}, nil
}

func (s *Server) Withdraw(ctx context.Context, req *maelstrom.WithdrawRequest) (*maelstrom.WithdrawResponse, error) {
	// TODO: Implement
	return &maelstrom.WithdrawResponse{}, nil
}

func (s *Server) WithdrawAll(ctx context.Context, req *maelstrom.WithdrawAllRequest) (*maelstrom.WithdrawAllResponse, error) {
	// TODO: Implement
	return &maelstrom.WithdrawAllResponse{}, nil
}
