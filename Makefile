install:
	@echo "Installing maelstrom server..."
	@go install ./server/cmd/maelstrom
.PHONY: install

testnet:
	@echo "Starting celestia testnet and maelstrom server..."
	@bash ./scripts/testnet.sh
.PHONY: testnet