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

serve-api:
	@docker run -p 80:8080 -e SWAGGER_JSON=/maelstrom/proto/gen/openapiv2/maelstrom/v1/server.swagger.json -v /Users/callum/Developer/go/src/github.com/cmwaters/maelstrom:/maelstrom swaggerapi/swagger-ui
.PHONY: serve-api