package test

import (
	"bytes"
	"context"
	"crypto/rand"
	"io"
	"net/http"
	"testing"
	"time"

	"github.com/celestiaorg/celestia-app/app"
	"github.com/celestiaorg/celestia-app/app/encoding"
	"github.com/celestiaorg/celestia-app/pkg/appconsts"
	"github.com/celestiaorg/celestia-app/pkg/user"
	"github.com/celestiaorg/celestia-app/test/util/testnode"
	client "github.com/cmwaters/maelstrom/client/go"
	"github.com/cmwaters/maelstrom/proto/gen/go/maelstrom/v1"
	"github.com/cmwaters/maelstrom/server"
	"github.com/cmwaters/maelstrom/tx"
	"github.com/stretchr/testify/require"
	"github.com/stretchr/testify/suite"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

func TestEndToEnd(t *testing.T) {
	if testing.Short() {
		t.Skip("skipping e2e test")
	}
	suite.Run(t, new(EndToEndTestSuite))
}

const (
	serverAcc = "server"
	clientAcc = "client"
)

type EndToEndTestSuite struct {
	suite.Suite
	cancel context.CancelFunc

	nctx   testnode.Context
	server *server.Server
	config *server.Config
	client *client.Client
}

func (s *EndToEndTestSuite) SetupSuite() {
	t := s.T()
	testCtx, cancel := context.WithCancel(context.Background())
	s.cancel = cancel
	cfg := testnode.DefaultConfig().WithAccounts([]string{serverAcc, clientAcc})
	require.Equal(t, cfg.TmConfig.TxIndex.Indexer, "kv")
	nctx, rpcAddr, grpcAddr := testnode.NewNetwork(t, cfg)
	s.nctx = nctx

	_, err := nctx.WaitForHeight(5)
	require.NoError(t, err)

	config := server.DefaultConfig().WithDir(t.TempDir()).WithKeyring(nctx.Keyring)
	config.CelestiaGRPCAddress = grpcAddr
	config.CelestiaRPCAddress = rpcAddr
	config.KeyringName = serverAcc
	config.TimeoutCommit = cfg.TmConfig.Consensus.TimeoutCommit
	s.config = config

	server, err := config.NewServer(testCtx)
	require.NoError(t, err)
	s.server = server

	go func() {
		err = server.Serve(testCtx)
		require.Contains(t, err.Error(), context.Canceled.Error())
	}()

	syncCtx, cancel := context.WithTimeout(testCtx, 30*time.Second)
	defer cancel()
	require.NoError(t, server.WaitUntilReady(syncCtx))

	clientConn, err := grpc.Dial(s.config.GRPCServerAddress, grpc.WithTransportCredentials(insecure.NewCredentials()))
	require.NoError(t, err)
	record, err := nctx.Keyring.Key(clientAcc)
	require.NoError(t, err)
	clientAddr, err := record.GetAddress()
	require.NoError(t, err)

	cdc := encoding.MakeConfig(app.ModuleEncodingRegisters...)
	signer, err := user.SetupSigner(testCtx, nctx.Keyring, nctx.GRPCClient, clientAddr, cdc)
	require.NoError(t, err)
	blobClient := maelstrom.NewBlobClient(clientConn)
	celestiaClient := maelstrom.NewCelestiaClient(clientConn)
	s.client, err = client.New(nctx.Keyring, signer, blobClient, celestiaClient)
	require.NoError(t, err)
}

func (s *EndToEndTestSuite) TestA_Info() {
	resp, err := s.server.Info(context.Background(), &maelstrom.InfoRequest{})
	s.Require().NoError(err)

	record, err := s.nctx.Keyring.Key(serverAcc)
	s.Require().NoError(err)
	addr, err := record.GetAddress()
	s.Require().NoError(err)
	s.Require().Equal(addr.String(), resp.Address)
	s.Require().Greater(resp.Height, uint64(1))
	s.Require().Equal(appconsts.DefaultMinGasPrice, resp.MinGasPrice)

	// check that the grpc gateway endpoint also works
	httpResp, err := http.Get("http://" + s.config.GRPCGatewayAddress + "/v1/info")
	s.Require().NoError(err)
	s.Require().Equal(http.StatusOK, httpResp.StatusCode)
	httpRespBody, err := io.ReadAll(httpResp.Body)
	s.Require().NoError(err)
	// assert that the same address is returned there. This
	// is a bit lazy but we don't have the equivalent JSON
	// based go types to unmarshal into
	s.Require().Contains(string(httpRespBody), resp.Address)
	s.T().Log(string(httpRespBody))
}

func (s *EndToEndTestSuite) TestB_Deposit() {
	ctx := context.Background()
	balance, err := s.client.Balance(ctx)
	s.Require().NoError(err)
	s.Require().Zero(balance)

	var coins uint64 = 1_000_000
	err = s.client.Deposit(ctx, coins)
	s.Require().NoError(err)

	newBalance, err := s.client.Balance(ctx)
	s.Require().NoError(err)
	s.Require().Equal(coins, newBalance)
}

func (s *EndToEndTestSuite) TestC_Submit() {
	previousBalance, err := s.client.Balance(context.Background())
	s.Require().NoError(err)

	size := 4 * 1024 // 4Kb
	blob := createBlob(size)
	fee := uint64(100_000)
	id, err := s.client.Submit(context.Background(), []byte("maelstrom"), [][]byte{blob}, fee)
	s.Require().NoError(err)
	s.Require().EqualValues(tx.StartingTxNumber, id)

	// double submissions should be rejected
	_, err = s.client.Submit(context.Background(), []byte("maelstrom"), [][]byte{blob}, fee)
	s.Require().Error(err)

	hash, err := s.client.Confirm(context.Background(), id)
	s.Require().NoError(err)

	res, err := s.nctx.Client.Tx(context.Background(), hash, false)
	s.Require().NoError(err)
	s.Require().Equal(res.TxResult.Code, uint32(0))

	block, err := s.nctx.Client.Block(context.Background(), &res.Height)
	s.Require().NoError(err)
	s.Require().Len(block.Block.Txs, 1)
	s.Require().True(bytes.Contains(block.Block.Txs[0], blob))

	// test that the fees were deducted
	balanceAfterTx, err := s.client.Balance(context.Background())
	s.Require().NoError(err)
	s.Require().Equal(balanceAfterTx, previousBalance-fee)
}

func (s *EndToEndTestSuite) TestD_Cancel() {
	balanceBefore, err := s.client.Balance(context.Background())
	s.Require().NoError(err)

	blob := createBlob(2 * 1024)
	fee := uint64(100_000)
	id, err := s.client.Submit(context.Background(), []byte("maelstrom"), [][]byte{blob}, fee)
	s.Require().NoError(err)
	s.Require().EqualValues(tx.StartingTxNumber+1, id)

	err = s.client.Cancel(context.Background(), id)
	s.Require().NoError(err)

	// TODO: we may want to create a cancelled status
	_, err = s.client.Confirm(context.Background(), id)
	s.Require().Error(err)

	balanceAfter, err := s.client.Balance(context.Background())
	s.Require().NoError(err)
	s.Require().Equal(balanceBefore, balanceAfter)
}

func (s *EndToEndTestSuite) TestE_Withdrawal() {
	balanceBefore, err := s.client.Balance(context.Background())
	s.Require().NoError(err)

	withdrawalAmount := balanceBefore - 10_000

	err = s.client.Withdraw(context.Background(), withdrawalAmount)
	s.Require().NoError(err)

	s.Require().Eventually(func() bool {
		balanceAfter, err := s.client.Balance(context.Background())
		s.Require().NoError(err)
		return balanceAfter == 10_000
	}, 5*time.Second, 200*time.Millisecond)
}

func (s *EndToEndTestSuite) TearDownSuite() {
	s.cancel()
}

func createBlob(size int) []byte {
	blob := make([]byte, size)
	_, _ = rand.Read(blob)
	return blob
}
