#!/bin/bash
# GPT Innovation OS — Initial setup script

set -e

echo "GPT Innovation OS — Setup"
echo "========================="

# Check prerequisites
if ! command -v node &>/dev/null; then
  echo "ERROR: Node.js is not installed. Install from nodejs.org"
  exit 1
fi

if ! command -v pnpm &>/dev/null; then
  echo "Installing pnpm..."
  npm install -g pnpm
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
  echo "ERROR: Node.js >= 20 required. Current: $(node -v)"
  exit 1
fi

echo "Node.js: $(node -v)"
echo "pnpm: $(pnpm -v)"

# Install dependencies
echo ""
echo "Installing dependencies..."
pnpm install

# Copy env file if not exists
if [ ! -f .env.local ]; then
  cp .env.example .env.local
  echo ""
  echo "Created .env.local — fill in your API keys before running pnpm dev"
fi

echo ""
echo "Setup complete! Next steps:"
echo "  1. Edit .env.local with your API keys"
echo "  2. Run: pnpm dev"
