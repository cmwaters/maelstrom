#!/bin/bash

# Initialize a celestia-app consensus node in a temporary directory
./scripts/single-node.sh

mkdir maelstrom
cd maelstrom

# Setup the maelstrom directory using the init command
maelstrom init

# Start the server
maelstrom start
