# Architecture

## Overview

GPT Innovation OS is a Turborepo monorepo with 5 Next.js apps and 6 shared packages.

## Data Flow

```
User → Website / Storefront
         ↓
    Supabase Auth
         ↓
    Command Center (operators)
         ↓
    Claude AI (via packages/agents)
         ↓
    Notion (CMS) + Supabase (DB)
```

## Shared Packages

- `@gpt-os/ui` — Design system (Tailwind + React components)
- `@gpt-os/auth` — Supabase auth helpers
- `@gpt-os/database` — Supabase client + TypeScript schema types
- `@gpt-os/agents` — Claude agent runner (with prompt caching)
- `@gpt-os/prompts` — Prompt templates and builders
- `@gpt-os/notion` — Notion API client and query helpers
