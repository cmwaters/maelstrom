install-server:
	@echo "Installing maelstrom server..."
	@go install ./server/cmd/maelstrom
.PHONY: install-server

install-client:
	@echo "Installing maelstrom client..."
	@go install ./client/cmd/maelstrom
.PHONY: install-client

testnet:
	@echo "Starting celestia testnet and maelstrom server..."
	@bash ./scripts/testnet.sh
.PHONY: testnet