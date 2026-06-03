# GPT Innovation OS

> A full-stack AI operating system for entrepreneurs — built with Next.js, Supabase, Notion, Claude, and Vercel.

## Overview

GPT Innovation OS is a monorepo that powers a complete AI business platform: a public website, a GPT storefront, a command center for operators, an embeddable chatbot widget, and an AI dashboard — all sharing a common set of packages for UI, auth, database, agents, prompts, and Notion integration.

## Monorepo Structure

```
gpt-innovation-os/
├── apps/
│   ├── website/          # Public marketing site (Next.js)
│   ├── storefront/       # GPT product marketplace (Next.js)
│   ├── command-center/   # Operator dashboard (Next.js)
│   ├── chatbot-widget/   # Embeddable AI chat (Next.js / React)
│   └── ai-dashboard/     # AI analytics & monitoring (Next.js)
├── packages/
│   ├── ui/               # Shared component library (shadcn/ui + Tailwind)
│   ├── auth/             # Authentication utilities (Supabase Auth)
│   ├── database/         # Database client & schema (Supabase)
│   ├── agents/           # Claude agent definitions & runners
│   ├── prompts/          # Prompt templates & versioning
│   └── notion/           # Notion API client & helpers
├── notion/               # Notion database blueprints
├── clients/              # Client configuration files
├── gpts/                 # GPT definitions & specs
├── mcp/                  # MCP server configurations
├── agents/               # Top-level agent orchestration
├── skills/               # Claude Code skills
├── prompts/              # Global prompt library
├── docs/                 # Documentation
└── scripts/              # Automation & deploy scripts
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Monorepo | Turborepo + pnpm |
| Styling | Tailwind CSS + shadcn/ui |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| AI | Claude (Anthropic) |
| CMS / Data | Notion API |
| Payments | Stripe |
| Deployment | Vercel |

## Getting Started

### Prerequisites

- Node.js >= 20
- pnpm >= 9
- Supabase account
- Anthropic API key

### Setup

```bash
# Clone the repository
git clone https://github.com/sahidattaf/gpt-innovation-os
cd gpt-innovation-os

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local
# → Fill in your values

# Start all apps in development mode
pnpm dev
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start all apps in dev mode |
| `pnpm build` | Build all apps and packages |
| `pnpm lint` | Lint all workspaces |
| `pnpm typecheck` | Type-check all workspaces |
| `pnpm test` | Run all tests |
| `pnpm format` | Format all files |

## Apps

| App | Port | Description |
|-----|------|-------------|
| website | 3000 | Public marketing site |
| storefront | 3001 | GPT product store |
| command-center | 3002 | Operator dashboard |
| chatbot-widget | 3003 | Embeddable AI chat |
| ai-dashboard | 3004 | AI analytics |

## License

Private — All rights reserved © 2026 Sahid Attaf
