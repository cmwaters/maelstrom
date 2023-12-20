package node

import (
	"context"
	"time"

	"github.com/tendermint/tendermint/rpc/client"
)

// TriggerFn is the function that is invoked by the releaser. An error
// here will cause the releaser to stop and error out.
type TriggerFn func() error

type Releaser struct {
	client  client.Client
	trigger TriggerFn
	delay   time.Duration
}

func NewReleaser(client client.Client, delay time.Duration, trigger TriggerFn) *Releaser {
	return &Releaser{
		client:  client,
		trigger: trigger,
		delay:   delay,
	}
}

func (r *Releaser) Start(ctx context.Context) error {
	err := r.client.Start()
	if err != nil {
		return err
	}
	defer func() { _ = r.client.Stop() }()

	errCh := make(chan error)

	eventsCh, err := r.client.Subscribe(ctx, "releaser", "tm.events.type='NewBlockHeader'")
	if err != nil {
		return err
	}
	defer func() { _ = r.client.UnsubscribeAll(ctx, "releaser") }()
	for {
		select {
		case err := <-errCh:
			return err
		case <-ctx.Done():
			return ctx.Err()
		case <-eventsCh:
			time.AfterFunc(r.delay, func() {
				err := r.trigger()
				if err != nil {
					errCh <- err
				}
			})
		}
	}
}
