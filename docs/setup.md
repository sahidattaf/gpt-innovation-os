# Setup Guide

## Prerequisites

- Node.js >= 20
- pnpm >= 9 (`npm install -g pnpm`)
- Supabase account
- Anthropic API key (claude.ai/account)

## Step-by-Step

1. **Clone** the repo
2. **Install**: `pnpm install`
3. **Environment**: `cp .env.example .env.local` then fill in values
4. **Supabase**: Create a project at supabase.com, copy URL and keys
5. **Run**: `pnpm dev`

## App URLs (local)

| App | URL |
|-----|-----|
| website | http://localhost:3000 |
| storefront | http://localhost:3001 |
| command-center | http://localhost:3002 |
| chatbot-widget | http://localhost:3003 |
| ai-dashboard | http://localhost:3004 |
