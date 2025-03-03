#!/bin/bash

# Set environment variables
export NODE_OPTIONS="--max-old-space-size=4096"
export GENERATE_SOURCEMAP=false

# Debug info
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"

# Build the app
echo "Starting build process..."
npm run build

echo "Build completed" 