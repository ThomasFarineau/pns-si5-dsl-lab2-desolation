#!/bin/sh

# Build the application
cd ./midi-dsl && npm run build
# Go back to the root directory
cd ..
# Run the application
#./midi-dsl/bin/cli.js generate ./test.mml
./midi-dsl/bin/cli.js generate ./moonlight.mml