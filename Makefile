install-server:
	@echo "Installing maelstrom server..."
	@go install ./server/cmd/maelstrom
.PHONY: install-server

install-client:
	@echo "Installing maelstrom client..."
	@go install ./client/cmd/maelstrom
.PHONY: install-client

build-server:
	@echo "building maelstrom server..."
	@go build ./server/cmd/maelstrom -o ./bin/server/maelstrom
.PHONY: build-server

build-client:
	@echo "building maelstrom client..."
	@go build ./client/cmd/maelstrom -o ./bin/client/maelstrom
.PHONY: build-client

testnet:
	@echo "Starting celestia testnet and maelstrom server..."
	@bash ./scripts/testnet.sh
.PHONY: testnet