#!/bin/bash

make build-server
make build-client

mkdir -p temp/client
mkdir -p temp/server

cd temp/server
echo "Initializing maelstrom server..."
../../bin/server/maelstrom init 

cd ../../temp/client
echo "Starting maelstrom client..."
../../bin/client/maelstrom init
