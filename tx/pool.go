package tx

import (
	"fmt"
	"sync"

	"github.com/cmwaters/maelstrom/proto/gen/maelstrom/v1"
)

type Pool struct {
	mtx          sync.Mutex
	latestHeight uint64
	txs          map[uint64]*Tx
	// this is used for replay protection, preventing a user from submitting
	// the exact same payload multiple times
	txByHash      map[string]uint64 // signer -> tx hash
	prunedTxCache map[uint64]struct{}
	store         *Store
}

func New(latestHeight uint64, dbDir string) (*Pool, error) {
	store, err := NewStore(dbDir)
	if err != nil {
		return nil, err
	}
	return &Pool{
		txs:           make(map[uint64]*Tx),
		txByHash:      make(map[string]uint64),
		prunedTxCache: make(map[uint64]struct{}),
		store:         store,
	}, nil
}

func (p *Pool) Add(
	signer string,
	namespace []byte,
	blobs [][]byte,
	fee uint64,
	options *maelstrom.Options,
) (uint64, error) {
	p.mtx.Lock()
	defer p.mtx.Unlock()

	tx := &Tx{
		signer:           signer,
		namespace:        namespace,
		blobs:            blobs,
		fee:              fee,
		insertHeight:     p.latestHeight,
		timeoutBlocks:    options.TimeoutBlocks,
		compact:          options.Compact,
		namespaceVersion: options.NamespaceVersion,
		shareVersion:     options.ShareVersion,
	}
	hash := tx.Hash()
	if _, ok := p.txByHash[string(hash[:])]; ok {
		return 0, fmt.Errorf("duplicate transaction")
	}

	pendingTx := tx.ToPendingTx()
	key, err := p.store.SetPendingTx(pendingTx)
	if err != nil {
		return 0, err
	}
	tx.key = key
	p.txByHash[string(hash[:])] = key
	p.txs[key] = tx

	return key, nil
}

func (p *Pool) Remove(key uint64) error {
	return nil
}

func (p *Pool) Get(key uint64) (*Tx, error) {
	return nil, nil
}

func (p *Pool) Pull() ([]*Tx, error) {
	return nil, nil
}

func (p *Pool) ConfirmTxs()

func (p *Pool) Prune(height uint64) {
	p.mtx.Lock()
	defer p.mtx.Unlock()

	for key, tx := range p.txs {
		if tx.insertHeight+tx.timeoutBlocks < height {
			delete(p.txs, key)
			delete(p.txByHash, string(tx.hash))
			p.prunedTxCache[tx.key] = struct{}{}
		}
	}
}

func (p *Pool) UpdateHeight(height uint64) {
	p.mtx.Lock()
	defer p.mtx.Unlock()

	p.latestHeight = height
}
