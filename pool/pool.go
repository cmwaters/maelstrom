package pool

import (
	"sync"

	"github.com/cmwaters/maelstrom/proto/gen/maelstrom/v1"
)

type Pool struct {
	mtx          sync.Mutex
	lastKey      uint64
	latestHeight uint64
	txs          map[uint64]*Tx
	// this is used for replay protection, preventing a user from submitting
	// the exact same payload multiple times
	txByHash      map[string]map[string]struct{} // signer -> tx hash
	prunedTxCache map[uint64]struct{}
	store         Store
}

type Tx struct {
	key              uint64
	hash             []byte
	signer           string
	namespace        []byte
	blobs            [][]byte
	fee              uint64
	insertHeight     uint64
	timeoutBlocks    uint64
	compact          bool
	namespaceVersion uint32
	shareVersion     uint32
}

func (p *Pool) Add(
	signer string,
	namespace []byte,
	blobs [][]byte,
	fee uint64,
	options maelstrom.Options,
) (uint64, error) {

	return 0, nil
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

func (p *Pool) Prune(height uint64) {
	p.mtx.Lock()
	defer p.mtx.Unlock()

	for key, tx := range p.txs {
		if tx.insertHeight+tx.timeoutBlocks < height {
			delete(p.txs, key)
			if signerTxs, ok := p.txByHash[tx.signer]; ok {
				delete(signerTxs, string(tx.hash))
			}
			p.prunedTxCache[tx.key] = struct{}{}
		}
	}
}
