#!/bin/bash

make install-server
make install-client

mkdir -p temp/client
mkdir -p temp/server

cd temp/server
echo "Initializing maelstrom server..."
ms init 

cd ../../temp/client
echo "Starting maelstrom client..."
maelstrom init
