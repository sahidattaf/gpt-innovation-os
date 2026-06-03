# GPT Innovation OS — Claude Code Instructions

## Repository Identity

- **Repo**: `gpt-innovation-os`
- **Path**: `C:\Users\sahid\gpt-innovation-os`
- **Owner**: Sahid Attaf (sahidattaf@gmail.com)
- **GitHub**: sahidattaf/gpt-innovation-os
- **Purpose**: Full-stack AI operating system for entrepreneurs

## Tech Stack

- **Framework**: Next.js 15 (App Router, TypeScript)
- **Monorepo**: Turborepo + pnpm workspaces
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Database**: Supabase (PostgreSQL + Auth + Storage)
- **AI**: Anthropic Claude (claude-sonnet-4-6 default)
- **Payments**: Stripe
- **CMS**: Notion API
- **Deploy**: Vercel

## Development Rules

### Code Style
- TypeScript strict mode everywhere
- No `any` types — use proper types or `unknown`
- Named exports preferred over default exports
- Server Components by default; Client Components only when required
- File naming: `kebab-case.ts` for utilities, `PascalCase.tsx` for components

### AI / Claude
- Default model: `claude-sonnet-4-6`
- Always use prompt caching for long system prompts
- Store prompts in `packages/prompts/` — never inline long prompts
- Agent definitions live in `packages/agents/`

### Database
- All schema changes via Supabase migrations
- Use `packages/database` client — never raw fetch to Supabase in app code
- Row Level Security (RLS) required on all user-facing tables

### Environment
- Real secrets in `.env.local` only (gitignored)
- `.env.example` for placeholders — keep it updated
- Use `NEXT_PUBLIC_` prefix only for values safe to expose to the browser

### Commits
- Conventional commits: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`
- No force-push to main
- No --no-verify

## Package Workspace Map

| Package | Import | Purpose |
|---------|--------|---------|
| `@gpt-os/ui` | `packages/ui` | Shared UI components |
| `@gpt-os/auth` | `packages/auth` | Auth helpers & hooks |
| `@gpt-os/database` | `packages/database` | Supabase client & types |
| `@gpt-os/agents` | `packages/agents` | Claude agent runners |
| `@gpt-os/prompts` | `packages/prompts` | Prompt templates |
| `@gpt-os/notion` | `packages/notion` | Notion API client |

## Apps Port Map

| App | Port |
|-----|------|
| website | 3000 |
| storefront | 3001 |
| command-center | 3002 |
| chatbot-widget | 3003 |
| ai-dashboard | 3004 |

## Do Not

- Do not migrate code from `curacao-connect-pro`
- Do not push to GitHub without explicit instruction
- Do not commit `.env.local` or any real secrets
- Do not use `create-react-app` patterns — this is Next.js App Router only
