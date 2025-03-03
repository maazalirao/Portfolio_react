#!/bin/bash

# Increase Node memory limit
export NODE_OPTIONS="--max_old_space_size=4096"

# Print Node and npm versions for debugging
echo "Node version: $(node -v)"
echo "npm version: $(npm -v)"

# Install dependencies with specific flags
npm install --prefer-offline --no-audit

# Run build
npm run build

# Report success
echo "Build completed successfully!" 