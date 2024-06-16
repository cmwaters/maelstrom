package server

import (
	"context"
	"errors"
	"fmt"
	"sync/atomic"
	"time"

	"github.com/celestiaorg/celestia-app/pkg/appconsts"
	"github.com/celestiaorg/celestia-app/pkg/namespace"
	"github.com/celestiaorg/celestia-app/pkg/user"
	blobtypes "github.com/celestiaorg/celestia-app/x/blob/types"
	"github.com/cmwaters/maelstrom/account"
	"github.com/cmwaters/maelstrom/node"
	maelstrom "github.com/cmwaters/maelstrom/proto/gen/go/maelstrom/v1"
	"github.com/cmwaters/maelstrom/tx"
	"github.com/cosmos/cosmos-sdk/crypto/keyring"
	sdk "github.com/cosmos/cosmos-sdk/types"
	auth "github.com/cosmos/cosmos-sdk/x/auth/types"
	"github.com/dgraph-io/badger"
	"github.com/rs/zerolog"
	"google.golang.org/grpc"
)

var _ maelstrom.MaelstromServer = (*Server)(nil)

type Server struct {
	isConnected      atomic.Bool
	log              zerolog.Logger
	config           *Config
	pool             *tx.Pool
	store            *account.Store
	keys             keyring.Keyring
	conn             *grpc.ClientConn
	signer           *user.Signer
	address          sdk.AccAddress
	accountRetriever *account.Querier
	feeMonitor       *node.FeeMonitor
	maelstrom.UnimplementedMaelstromServer
}

func New(
	log zerolog.Logger,
	config *Config,
	pool *tx.Pool,
	store *account.Store,
	keys keyring.Keyring,
	address sdk.AccAddress,
) *Server {
	return &Server{
		log:     log,
		config:  config,
		pool:    pool,
		store:   store,
		keys:    keys,
		address: address,
	}
}

var ErrServerNotReady = errors.New("server not ready")

func (s *Server) Info(ctx context.Context, req *maelstrom.InfoRequest) (*maelstrom.InfoResponse, error) {
	chainID := ""
	if s.signer != nil {
		chainID = s.signer.ChainID()
	}
	return &maelstrom.InfoResponse{
		Address:     s.address.String(),
		Height:      s.store.GetHeight(),
		ChainId:     chainID,
		MinGasPrice: s.feeMonitor.GasPrice(),
	}, nil
}

func (s *Server) Submit(ctx context.Context, req *maelstrom.SubmitRequest) (*maelstrom.SubmitResponse, error) {
	if !s.isConnected.Load() {
		return nil, ErrServerNotReady
	}

	if err := validateSubmitRequest(req); err != nil {
		return nil, err
	}

	// ensure that the transaction pays at least the minimum fee
	gas := EstimateMinGas(totalBlobSize(req.Blobs))
	requiredPrice := uint64(float64(gas) * s.feeMonitor.GasPrice())
	if req.Fee < requiredPrice {
		return nil, fmt.Errorf("minimum fee of %dutia required for this transaction", requiredPrice)
	}

	acc, err := s.getAccount(ctx, req.Signer)
	if err != nil {
		return nil, fmt.Errorf("getting account: %w", err)
	}

	msg := SubmitRequestSignOverData(req.Namespace, req.Blobs)
	if !acc.PubKey.VerifySignature(msg, req.Signature) {
		return nil, fmt.Errorf("invalid signature for signer %s", req.Signer)
	}

	if acc.Balance < req.Fee {
		return nil, fmt.Errorf("insufficient balance for signer %s, (have %d, require %d)", req.Signer, acc.Balance, req.Fee)
	}

	id, err := s.pool.Add(req.Signer, req.Namespace[1:], req.Blobs, req.Fee, gas, req.Options, account.UpdateBalanceFn(req.Signer, req.Fee, false))
	if err != nil {
		return nil, fmt.Errorf("adding to pool: %w", err)
	}

	return &maelstrom.SubmitResponse{Id: uint64(id)}, nil
}

func (s *Server) Status(ctx context.Context, req *maelstrom.StatusRequest) (*maelstrom.StatusResponse, error) {
	if !s.isConnected.Load() {
		return nil, ErrServerNotReady
	}

	status := s.pool.Status(tx.BlobID(req.Id))
	return status, nil
}

func (s *Server) Balance(ctx context.Context, req *maelstrom.BalanceRequest) (*maelstrom.BalanceResponse, error) {
	if !s.isConnected.Load() {
		return nil, ErrServerNotReady
	}

	celestiaBalance, err := s.accountRetriever.GetBalance(ctx, req.Address)
	if err != nil {
		return nil, err
	}

	acc, err := s.store.GetAccount(req.Address)
	if err != nil {
		if errors.Is(err, badger.ErrKeyNotFound) {
			return &maelstrom.BalanceResponse{
				MaelstromBalance: 0,
				CelestiaBalance:  celestiaBalance,
			}, nil
		}
		return nil, err
	}
	return &maelstrom.BalanceResponse{
		MaelstromBalance: acc.Balance,
		CelestiaBalance:  celestiaBalance,
	}, nil
}

func (s *Server) Cancel(ctx context.Context, req *maelstrom.CancelRequest) (*maelstrom.CancelResponse, error) {
	if !s.isConnected.Load() {
		return nil, ErrServerNotReady
	}

	tx := s.pool.GetPendingTx(tx.BlobID(req.Id))
	if tx == nil {
		return nil, fmt.Errorf("transaction %d not found", req.Id)
	}
	acc, err := s.getAccount(ctx, tx.Signer())
	if err != nil {
		return nil, err
	}
	msg := CancelRequestSignOverData(tx.Signer(), req.Id)
	if !acc.PubKey.VerifySignature(msg, req.Signature) {
		return nil, fmt.Errorf("invalid signature for signer %s", tx.Signer())
	}

	if err := s.pool.Cancel(tx.ID()); err != nil {
		return nil, err
	}
	return &maelstrom.CancelResponse{}, nil
}

func (s *Server) Withdraw(ctx context.Context, req *maelstrom.WithdrawRequest) (*maelstrom.WithdrawResponse, error) {
	if !s.isConnected.Load() {
		return nil, ErrServerNotReady
	}

	now := uint64(time.Now().UTC().Unix())
	tolerance := uint64(10) // 10 seconds
	if req.Timestamp < now-tolerance || req.Timestamp > now+tolerance {
		return nil, fmt.Errorf("invalid timestamp %d, must be within %d seconds of current time", req.Timestamp, tolerance)
	}

	if req.Balance <= req.Amount {
		return nil, fmt.Errorf("invalid amount %d, must be less than balance %d", req.Amount, req.Balance)
	}

	acc, err := s.getAccount(ctx, req.Signer)
	if err != nil {
		return nil, fmt.Errorf("getting account: %w", err)
	}

	if acc.Balance != req.Balance {
		return nil, fmt.Errorf("invalid balance %d, must match account balance %d", req.Balance, acc.Balance)
	}

	msg := WithdrawRequestSignOverData(req.Signer, req.Balance, req.Amount, req.Timestamp)
	if !acc.PubKey.VerifySignature(msg, req.Signature) {
		return nil, fmt.Errorf("invalid signature for signer %s", req.Signer)
	}

	if err := s.pool.ProcessWithdrawal(req.Signer, req.Amount); err != nil {
		return nil, err
	}

	return &maelstrom.WithdrawResponse{}, nil
}

func (s *Server) PendingWithdrawal(ctx context.Context, req *maelstrom.PendingWithdrawalRequest) (*maelstrom.PendingWithdrawalResponse, error) {
	if !s.isConnected.Load() {
		return nil, ErrServerNotReady
	}
	return &maelstrom.PendingWithdrawalResponse{
		Amount: s.pool.GetPendingWithdrawalAmount(req.Address),
	}, nil
}

func (s *Server) getAccount(ctx context.Context, address string) (*account.Account, error) {
	acc, err := s.store.GetAccount(address)
	if err != nil {
		return nil, err
	}

	// If the public key / account number is not present, we need to
	// retrieve it from the chain and update the account store.
	if !acc.IsSet() {
		pk, accNum, err := s.accountRetriever.GetAccount(ctx, address)
		if err != nil {
			return nil, fmt.Errorf("failed to get pubkey for signer %s: %w", address, err)
		}
		acc.PubKey = pk
		acc.AccountNumber = accNum
		if err := s.store.SetAccount(address, acc); err != nil {
			return nil, fmt.Errorf("failed to set account for signer %s: %w", address, err)
		}
	}
	return acc, nil
}

// SetLogger sets the logger for the server. Must be called prior to starting the server
func (s *Server) SetLogger(log zerolog.Logger) {
	s.log = log
}

func totalBlobSize(blobs [][]byte) []uint32 {
	size := make([]uint32, len(blobs))
	for i, b := range blobs {
		size[i] = uint32(len(b))
	}
	return size
}

func EstimateMinGas(blobSizes []uint32) uint64 {
	gas := blobtypes.GasToConsume(blobSizes, appconsts.DefaultGasPerBlobByte)
	gas += blobtypes.BytesPerBlobInfo * auth.DefaultTxSizeCostPerByte * uint64(len(blobSizes))
	return gas
}

func validateSubmitRequest(req *maelstrom.SubmitRequest) error {
	// check that the namespace is valid
	_, err := namespace.From(req.Namespace)
	if err != nil {
		return fmt.Errorf("invalid namespace: %w", err)
	}

	if len(req.Blobs) == 0 {
		return errors.New("no blobs provided")
	}

	if len(req.Signature) == 0 {
		return errors.New("no signature provided")
	}

	for idx, blob := range req.Blobs {
		if len(blob) == 0 {
			return fmt.Errorf("blob %d contains no data", idx)
		}
	}

	_, err = sdk.AccAddressFromBech32(req.Signer)
	return err
}
