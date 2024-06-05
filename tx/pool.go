package tx

import (
	"encoding/binary"
	"errors"
	"sync"

	wire "github.com/cmwaters/maelstrom/proto/gen/go/maelstrom/v1"
	"github.com/dgraph-io/badger"
)

var ErrTxNotFound = errors.New("transaction not found")

func HeightToBytes(h uint64) []byte {
	heightBytes := make([]byte, 8)
	binary.BigEndian.PutUint64(heightBytes, uint64(h))
	return heightBytes
}

func HeightFromBytes(heightBytes []byte) uint64 {
	return binary.BigEndian.Uint64(heightBytes)
}

const defaultCacheSize = 1000

type Pool struct {
	mtx          sync.Mutex
	latestHeight uint64
	cacheID      BlobID
	totalGas     uint64
	totalFee     uint64
	blobs        map[BlobID]*Blob
	pendingQueue []*Blob
	// this is used for replay protection, preventing a user from submitting
	// the exact same payload multiple times
	blobByHash           map[string]BlobID
	reverseBlobTxMap     map[BlobID]TxID
	nonceMap             map[uint64]TxID
	broadcastMap         map[TxID]*wire.BlobTx
	expiredBlobMap       map[BlobID]uint64
	committedBlobMap     map[BlobID]TxID
	pendingWithdrawals   map[string]uint64
	broadcastWithdrawals map[TxID]*wire.WithdrawalTx

	// persist the things that matter, the rest stays in memory
	store *Store
}

func NewPool(db *badger.DB, latestHeight uint64) (*Pool, error) {
	store, err := NewStore(db)
	if err != nil {
		return nil, err
	}
	pool := &Pool{
		blobs:                make(map[BlobID]*Blob),
		blobByHash:           make(map[string]BlobID),
		reverseBlobTxMap:     make(map[BlobID]TxID),
		nonceMap:             make(map[uint64]TxID),
		broadcastMap:         make(map[TxID]*wire.BlobTx),
		expiredBlobMap:       make(map[BlobID]uint64),
		committedBlobMap:     make(map[BlobID]TxID),
		pendingQueue:         make([]*Blob, 0),
		pendingWithdrawals:   make(map[string]uint64),
		broadcastWithdrawals: make(map[TxID]*wire.WithdrawalTx),
		store:                store,
		latestHeight:         latestHeight,
	}
	if err := pool.load(pool.latestHeight, defaultCacheSize); err != nil {
		return nil, err
	}
	return pool, nil
}

func (p *Pool) Status(id BlobID) *wire.StatusResponse {
	p.mtx.Lock()
	defer p.mtx.Unlock()

	resp := &wire.StatusResponse{
		Status: p.getStatus(id),
	}
	switch resp.Status {
	case wire.StatusResponse_PENDING:
		blob := p.blobs[id]
		resp.InsertHeight = blob.InsertHeight()
		resp.ExpiryHeight = blob.InsertHeight() + blob.TimeoutBlocks()
	case wire.StatusResponse_BROADCASTING:
		blob := p.blobs[id]
		resp.InsertHeight = blob.InsertHeight()
		blobTx := p.broadcastMap[p.reverseBlobTxMap[id]]
		resp.ExpiryHeight = blobTx.TimeoutHeight
	case wire.StatusResponse_EXPIRED:
		resp.ExpiryHeight = uint64(p.expiredBlobMap[id])
	case wire.StatusResponse_COMMITTED:
		resp.TxHash = p.committedBlobMap[id].Bytes()
	}
	return resp
}

func (p *Pool) getStatus(id BlobID) wire.StatusResponse_Status {
	_, isPending := p.blobs[id]
	if isPending {
		BatchID, isBatched := p.reverseBlobTxMap[id]
		_, isBroadcast := p.broadcastMap[BatchID]
		if isBatched && isBroadcast {
			return wire.StatusResponse_BROADCASTING
		}
		return wire.StatusResponse_PENDING
	}
	_, isExpired := p.expiredBlobMap[id]
	if isExpired {
		return wire.StatusResponse_EXPIRED
	}
	_, isCommitted := p.committedBlobMap[id]
	if isCommitted {
		return wire.StatusResponse_COMMITTED
	}
	return wire.StatusResponse_UNKNOWN
}

func (p *Pool) Update(height uint64) (int, error) {
	p.mtx.Lock()
	defer p.mtx.Unlock()

	expiredTxs, err := p.prune(height)
	if err != nil {
		return 0, err
	}

	timedOutTxs, err := p.checkBroadcastTimeouts(height)
	if err != nil {
		return 0, err
	}

	if _, err = p.updateWithdrawalTxs(height); err != nil {
		return 0, err
	}

	p.latestHeight = height
	return expiredTxs + timedOutTxs, nil
}

func (p *Pool) getBlobs(ids []BlobID) []*Blob {
	blobs := make([]*Blob, 0, len(ids))
	for _, id := range ids {
		if blob, exists := p.blobs[id]; exists {
			blobs = append(blobs, blob)
		}
	}
	return blobs
}

func (p *Pool) load(height uint64, cacheSize int) error {
	lastKey, err := p.store.GetLastBlobKey()
	if err != nil {
		return err
	}

	limitID := BlobID(0)
	if uint64(lastKey) > uint64(cacheSize) {
		limitID = lastKey - BlobID(cacheSize)
	}
	p.cacheID = limitID

	commitedTxs, err := p.store.GetMostRecentCommittedTxs(limitID)
	if err != nil {
		return err
	}
	for id, tx := range commitedTxs {
		p.committedBlobMap[id] = TxID(tx.TxHash)
	}

	expiredTxs, err := p.store.LoadRecentlyExpiredTxs(limitID)
	if err != nil {
		return err
	}
	for id, height := range expiredTxs {
		p.expiredBlobMap[id] = height
	}

	expiredTxs, err = p.store.RefundLostPendingTxs(height)
	if err != nil {
		return err
	}
	for id, height := range expiredTxs {
		p.expiredBlobMap[id] = height
	}

	p.broadcastMap, err = p.store.LoadAllBroadcastedBlobTxs()
	return err
}
