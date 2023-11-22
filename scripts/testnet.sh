#!/bin/bash

if [[ -d "temp" ]]; then
  rm -r "temp"
fi

MAELSTROM_MNEMONIC="dog comic tube mail abuse pride thought black pigeon transfer galaxy donate swift popular desert ridge gravity reward album drum cycle dial issue mean"

# Initialize a celestia-app consensus node in a temporary directory
mkdir -p temp
echo "Initializing celestia-app consensus node..."
./scripts/single-node.sh &> temp/logs.txt &

# Setup the maelstrom directory using the init command
cd temp
echo "Initializing maelstrom server..."
maelstrom init --mnemonic ${MAELSTROM_MNEMONIC}

# Start the server
echo "Starting maelstrom server..."
maelstrom start
