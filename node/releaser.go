package node

import (
	"context"
	"time"

	"github.com/tendermint/tendermint/rpc/client"
)

type Releaser struct {
	client  client.Client
	trigger func()
	delay   time.Duration
}

func NewReleaser(client client.Client, delay time.Duration, trigger func()) *Releaser {
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

	eventsCh, err := r.client.Subscribe(ctx, "releaser", "tm.events.type='NewBlockHeader'")
	if err != nil {
		return err
	}
	defer func() { _ = r.client.UnsubscribeAll(ctx, "releaser") }()
	for {
		select {
		case <-ctx.Done():
			return ctx.Err()
		case <-eventsCh:
			time.AfterFunc(r.delay, r.trigger)
		}
	}
}
