package test

import (
	"context"
	"crypto/rand"
	"testing"

	"github.com/celestiaorg/celestia-app/app"
	"github.com/celestiaorg/celestia-app/app/encoding"
	"github.com/celestiaorg/celestia-app/pkg/user"
	"github.com/celestiaorg/celestia-app/test/util/testnode"
	client "github.com/cmwaters/maelstrom/client/go"
	"github.com/cmwaters/maelstrom/proto/gen/maelstrom/v1"
	"github.com/cmwaters/maelstrom/server"
	"github.com/stretchr/testify/require"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

func TestEndToEnd(t *testing.T) {
	testCtx, cancel := context.WithCancel(context.Background())
	defer cancel()
	serverAcc := "server"
	clientAcc := "client"
	cfg := testnode.DefaultConfig().WithAccounts([]string{serverAcc, clientAcc})
	nctx, rpcAddr, grpcAddr := testnode.NewNetwork(t, cfg)
	err := nctx.WaitForNextBlock()
	require.NoError(t, err)

	config := server.DefaultConfig().WithDir(t.TempDir()).WithKeyring(nctx.Keyring)
	config.CelestiaGRPCAddress = grpcAddr
	config.CelestiaRPCAddress = rpcAddr
	config.KeyringName = serverAcc

	server, err := config.NewServer(testCtx)
	require.NoError(t, err)

	go func() {
		err = server.Serve(testCtx)
		require.Contains(t, err.Error(), context.Canceled.Error())
	}()

	server.Wait()

	resp, err := server.Info(testCtx, &maelstrom.InfoRequest{})
	require.NoError(t, err)

	record, err := nctx.Keyring.Key(serverAcc)
	require.NoError(t, err)
	addr, err := record.GetAddress()
	require.NoError(t, err)
	require.Equal(t, addr.String(), resp.Address)
	require.Greater(t, resp.Height, uint64(1))

	clientConn, err := grpc.Dial(config.GRPCServerAddress, grpc.WithTransportCredentials(insecure.NewCredentials()))
	require.NoError(t, err)
	record, err = nctx.Keyring.Key(clientAcc)
	require.NoError(t, err)
	clientAddr, err := record.GetAddress()
	require.NoError(t, err)

	cdc := encoding.MakeConfig(app.ModuleEncodingRegisters...)
	signer, err := user.SetupSigner(testCtx, nctx.Keyring, nctx.GRPCClient, clientAddr, cdc)
	require.NoError(t, err)
	c := maelstrom.NewBlobClient(clientConn)
	client, err := client.New(nctx.Keyring, signer, c)
	require.NoError(t, err)

	balance, err := client.Balance(testCtx)
	require.NoError(t, err)
	require.Zero(t, balance)

	var coins uint64 = 1_000_000
	err = client.Deposit(testCtx, coins)
	require.NoError(t, err)

	newBalance, err := client.Balance(testCtx)
	require.NoError(t, err)
	require.Equal(t, coins, newBalance)

	blob := make([]byte, 1024)
	_, err = rand.Read(blob)
	require.NoError(t, err)
	id, err := client.Submit(testCtx, []byte("maelstrom"), [][]byte{blob}, 1500)
	require.NoError(t, err)

	hash, err := client.Confirm(testCtx, id)
	require.NoError(t, err)
	t.Log(hash)
}
