install-server:
	@echo "Installing maelstrom server..."
	@go install ./server/cmd/ms
.PHONY: install-server

install-client:
	@echo "Installing maelstrom client..."
	@go install ./client/cmd/maelstrom
.PHONY: install-client

testnet:
	@echo "Starting celestia testnet and maelstrom server..."
	@bash ./scripts/single-node.sh
.PHONY: testnet

update-api:
	@bash ./scripts/openapi.sh
.PHONY: update-api

