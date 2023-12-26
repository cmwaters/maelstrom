package tx

import (
	"encoding/binary"
	"errors"
	"sync"

	wire "github.com/cmwaters/maelstrom/proto/gen/maelstrom/v1"
	"github.com/dgraph-io/badger"
)

var ErrTxNotFound = errors.New("transaction not found")

type Height uint64

func (h Height) Bytes() []byte {
	heightBytes := make([]byte, 8)
	binary.BigEndian.PutUint64(heightBytes, uint64(h))
	return heightBytes
}

type Pool struct {
	mtx          sync.Mutex
	latestHeight Height
	totalGas     uint64
	totalFee     uint64
	txs          map[ID]*Tx
	pendingQueue []*Tx
	// this is used for replay protection, preventing a user from submitting
	// the exact same payload multiple times
	txByHash        map[string]ID
	batchMap        map[BatchID][]ID
	reverseBatchMap map[ID]BatchID
	nonceMap        map[uint64]BatchID
	broadcastMap    map[BatchID]Height
	expiredTxMap    map[ID]Height
	committedTxMap  map[ID][]byte

	// persist the things that matter, the rest stays in memory
	store *Store
}

func NewPool(db *badger.DB, latestHeight uint64) (*Pool, error) {
	store, err := NewStore(db)
	if err != nil {
		return nil, err
	}
	// TODO: we need to load all the persisted values from the store
	return &Pool{
		txs:             make(map[ID]*Tx),
		txByHash:        make(map[string]ID),
		batchMap:        make(map[BatchID][]ID),
		reverseBatchMap: make(map[ID]BatchID),
		nonceMap:        make(map[uint64]BatchID),
		broadcastMap:    make(map[BatchID]Height),
		expiredTxMap:    make(map[ID]Height),
		committedTxMap:  make(map[ID][]byte),
		pendingQueue:    make([]*Tx, 0),
		store:           store,
		latestHeight:    Height(latestHeight),
	}, nil
}

func (p *Pool) Status(id ID) *wire.StatusResponse {
	p.mtx.Lock()
	defer p.mtx.Unlock()

	resp := &wire.StatusResponse{
		Status: p.getStatus(id),
	}
	switch resp.Status {
	case wire.StatusResponse_PENDING:
		tx := p.txs[id]
		resp.InsertHeight = uint64(tx.insertHeight)
		resp.ExpiryHeight = uint64(tx.insertHeight) + tx.timeoutBlocks
	case wire.StatusResponse_BROADCASTING:
		tx := p.txs[id]
		resp.InsertHeight = uint64(tx.insertHeight)
		resp.ExpiryHeight = uint64(p.broadcastMap[p.reverseBatchMap[id]])
	case wire.StatusResponse_EXPIRED:
		resp.ExpiryHeight = uint64(p.expiredTxMap[id])
	case wire.StatusResponse_COMMITTED:
		resp.TxHash = p.committedTxMap[id]
	}
	return resp
}

func (p *Pool) getStatus(id ID) wire.StatusResponse_Status {
	_, isPending := p.txs[id]
	if isPending {
		BatchID, isBatched := p.reverseBatchMap[id]
		_, isBroadcast := p.broadcastMap[BatchID]
		if isBatched && isBroadcast {
			return wire.StatusResponse_BROADCASTING
		}
		return wire.StatusResponse_PENDING
	}
	_, isExpired := p.expiredTxMap[id]
	if isExpired {
		return wire.StatusResponse_EXPIRED
	}
	_, isCommitted := p.committedTxMap[id]
	if isCommitted {
		return wire.StatusResponse_COMMITTED
	}
	return wire.StatusResponse_UNKNOWN
}

func (p *Pool) Update(height Height) (int, error) {
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

	p.latestHeight = height
	return expiredTxs + timedOutTxs, nil
}

func (p *Pool) getTxs(ids []ID) []*Tx {
	txs := make([]*Tx, len(ids))
	for i, id := range ids {
		txs[i] = p.txs[id]
	}
	return txs
}
