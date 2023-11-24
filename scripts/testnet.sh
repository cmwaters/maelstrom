#!/bin/bash

if [[ -d "temp" ]]; then
  rm -r "temp"
fi

# Initialize a celestia-app consensus node in a temporary directory
mkdir -p temp
echo "Initializing celestia-app consensus node..."
./scripts/single-node.sh &> temp/logs.txt &

# Setup the maelstrom directory using the init command
cd temp
echo "Initializing maelstrom server..."
maelstrom init

# Start the server
echo "Starting maelstrom server..."
maelstrom start
