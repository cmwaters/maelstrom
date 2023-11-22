install-server:
	@echo "Installing maelstrom server..."
	@go install ./server/cmd/maelstrom
.PHONY: install-server