# T-04 — Supabase Readiness Plan

**Status**: Approved — awaiting Supabase project creation  
**Last updated**: 2026-06-04

---

## Context

T-02 (website) and T-03 (chatbot-widget) are live. The next three apps —
storefront, ai-dashboard, and command-center — all depend on `@gpt-os/database`
and `@gpt-os/auth`. Before any of them can be deployed with real data, a Supabase
project must be provisioned and configured. This plan documents every requirement
found in the codebase so setup can be done safely, in order, with no guesswork.

No Supabase project has been created yet. No real secrets exist yet.
This is a readiness/inspection plan only.

---

## 1. Which Apps Need Supabase and Why

| App | Supabase Dependency | Why |
|-----|---------------------|-----|
| `apps/storefront` | `@gpt-os/database`, `@gpt-os/auth` | Product catalog, user orders, Stripe checkout tied to Supabase users |
| `apps/ai-dashboard` | `@gpt-os/database`, `@gpt-os/auth` | Reads token usage and conversation analytics from DB |
| `apps/command-center` | `@gpt-os/database`, `@gpt-os/auth`, `@gpt-os/agents` | Admin CRUD on products/orders, user management, AI agent calls scoped to auth |
| `apps/website` | None currently | Static pages only — no Supabase dependency |
| `apps/chatbot-widget` | None currently | Static UI only — no Supabase dependency |

---

## 2. Files That Reference Supabase

| File | What it does | Risk level |
|------|-------------|------------|
| `packages/database/src/client.ts` | Creates `db` (anon) and `adminDb` (service role) at **module scope** | HIGH — see §7 |
| `packages/database/src/types.ts` | TypeScript types for 3 tables: profiles, products, orders | Safe — types only |
| `packages/database/src/index.ts` | Re-exports db, adminDb, Database, Tables | Safe — re-export only |
| `packages/auth/src/client.ts` | Lazy `createClient()` — only runs when called | Safe — lazy |
| `packages/auth/src/session.ts` | getSession(), getUser(), signOut() — calls createClient() lazily | Safe — lazy |
| `.env.example` | Placeholder vars for all Supabase keys | Safe — no real values |

### Critical finding — module-level client instantiation

`packages/database/src/client.ts` lines 10–18 create `db` and `adminDb` at module scope:

```typescript
export const db = createClient<Database>(
  requireEnv("NEXT_PUBLIC_SUPABASE_URL"),      // throws if missing
  requireEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"), // throws if missing
);

export const adminDb = createClient<Database>(
  requireEnv("NEXT_PUBLIC_SUPABASE_URL"),
  requireEnv("SUPABASE_SERVICE_ROLE_KEY"),      // throws if missing + SERVER-ONLY
  { auth: { autoRefreshToken: false, persistSession: false } },
);
```

These run at module load time — the moment any file does `import { db } from "@gpt-os/database"`,
all three env vars must be present or the process will throw.

Current pages (storefront, ai-dashboard, command-center) don't import `@gpt-os/database`
in their `page.tsx` yet, so builds currently pass. The moment any page or API route
imports `db` or `adminDb`, the Supabase env vars become required at build time.

---

## 3. Required Supabase Project Settings

Create one Supabase project for all apps (multi-app, single project):

| Setting | Value |
|---------|-------|
| Project name | `gpt-innovation-os` |
| Region | Choose closest to target users (e.g., `us-east-1`) |
| Database password | Generate strong password — save to password manager, NOT `.env.local` |
| Plan | Free tier is sufficient to start |
| Auth → Email | Enable email/password auth |
| Auth → JWT expiry | Default 3600s (1 hour) — can tune later |
| Auth → Site URL | Set to `https://gpt-os-website.vercel.app` when ready |

---

## 4. Database Tables and Schema Plan

Three tables are already typed in `packages/database/src/types.ts`. The SQL to create them:

### Table: profiles

```sql
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text not null,
  full_name text,
  avatar_url text,
  role text not null default 'user' check (role in ('user', 'operator', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Auto-populate profile on user signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
```

### Table: products

```sql
create table public.products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  price_cents integer not null,
  currency text not null default 'usd',
  stripe_product_id text,
  stripe_price_id text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

### Table: orders

```sql
create table public.orders (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  product_id uuid references public.products(id) on delete cascade not null,
  stripe_session_id text,
  status text not null default 'pending'
    check (status in ('pending', 'complete', 'cancelled', 'refunded')),
  amount_cents integer not null,
  created_at timestamptz not null default now()
);
```

---

## 5. Required Environment Variables

### Variables from Supabase dashboard (Project Settings → API)

| Variable | Where to find it | Used by |
|----------|-----------------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Project Settings → API → URL | storefront, ai-dashboard, command-center |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Project Settings → API → anon public key | storefront, ai-dashboard, command-center |
| `SUPABASE_SERVICE_ROLE_KEY` | Project Settings → API → service_role key | command-center only (`adminDb`) |

### Security rules for these vars

- `NEXT_PUBLIC_SUPABASE_URL` — safe for browser exposure
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — safe for browser exposure (Supabase RLS protects data)
- `SUPABASE_SERVICE_ROLE_KEY` — **SERVER-ONLY**. Never add `NEXT_PUBLIC_` prefix. Never import `adminDb` in Client Components.

---

## 6. Vercel Projects — Which Env Vars Go Where

| Vercel Project | `NEXT_PUBLIC_SUPABASE_URL` | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `SUPABASE_SERVICE_ROLE_KEY` |
|----------------|:--------------------------:|:-------------------------------:|:---------------------------:|
| gpt-os-website | No | No | No |
| gpt-os-chatbot-widget | No | No | No |
| gpt-os-storefront | Yes | Yes | No |
| gpt-os-ai-dashboard | Yes | Yes | No |
| gpt-os-command-center | Yes | Yes | Yes |

---

## 7. Security Checklist

- [ ] `SUPABASE_SERVICE_ROLE_KEY` is NEVER prefixed with `NEXT_PUBLIC_`
- [ ] `adminDb` is NEVER imported in Client Components (`"use client"` files)
- [ ] RLS is enabled on `profiles`, `products`, and `orders` before any data is written
- [ ] RLS policies: users can only read/update their own profile
- [ ] RLS policies: orders visible to owner only
- [ ] Products table: read-only for anonymous users; write restricted to admin role
- [ ] Auth trigger runs as `security definer` — only inserts `id` and `email`
- [ ] Supabase dashboard → Auth → Logs reviewed after first real signup
- [ ] `.env.local` is in `.gitignore` — confirmed present in repo

### adminDb import risk (flag for future API route work)

`packages/database/src/client.ts` exports both `db` and `adminDb` from the same module.
If a Client Component imports `db`, Next.js may bundle the `adminDb` initializer (and the
service role key read) into the client bundle.

**Mitigation needed when command-center API routes are built:**
Split `packages/database/src/admin.ts` to export only `adminDb`, and ensure it is imported
exclusively in Server Components, API Routes, or Server Actions. Mark as a future task.

---

## 8. Local Development Checklist

To run any of the three apps locally after Supabase is provisioned:

1. Copy `.env.example` to `.env.local` in repo root (already gitignored)
2. Fill in real values:
   - `NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>`
   - `SUPABASE_SERVICE_ROLE_KEY=<service-role-key>` (command-center work only)
3. Run a specific app: `pnpm --filter @gpt-os/storefront dev`
4. Confirm the app loads without "Missing environment variable" errors

`.env.local` at repo root is picked up by all Next.js apps in the monorepo — this is intentional.

---

## 9. Migration / Seed Strategy

### Phase 1: Manual SQL via Supabase dashboard (now)

No migration files exist yet in `packages/database/`. The initial schema will be applied
manually via the Supabase SQL editor. This is safe for early setup.

### Phase 2: Supabase CLI + migration files (future task)

A future task (post-storefront deploy) should:

1. Install Supabase CLI: `npm install -g supabase`
2. Initialize: `supabase init` in repo root
3. Pull current schema: `supabase db pull`
4. Commit migration files to `packages/database/migrations/`
5. Wire `supabase db push` into CI for future schema changes

### Seed data

No seed data is needed initially — products will be created via command-center once deployed.
RLS policies must be in place before any real user data is written.

---

## 10. What to Create Manually in Supabase Dashboard

Execute in this order after approval:

1. **Create project** — name: `gpt-innovation-os`, choose region, set DB password
2. **SQL editor** — run the three `CREATE TABLE` statements from §4
3. **SQL editor** — run the `handle_new_user` trigger from §4
4. **SQL editor** — run the RLS setup below
5. **Authentication → Providers** — confirm Email is enabled
6. **Authentication → URL Configuration** — set Site URL to `https://gpt-os-website.vercel.app`
7. **Table Editor** — verify all three tables appear with correct columns
8. **Project Settings → API** — copy URL, anon key, service role key → store in password manager

### Row Level Security — run immediately after table creation

```sql
-- Enable RLS on all tables
alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;

-- profiles: users can read/update their own row
create policy "Users can view own profile"
  on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

-- products: anyone can read active products
create policy "Anyone can view active products"
  on public.products for select using (active = true);

-- orders: users can only see their own orders
create policy "Users can view own orders"
  on public.orders for select using (auth.uid() = user_id);
```

---

## 11. What Should NOT Be Done Yet

- Do NOT deploy storefront, ai-dashboard, or command-center to Vercel
- Do NOT add Supabase env vars to Vercel (no project exists yet)
- Do NOT start Stripe setup (storefront comes after Supabase is stable)
- Do NOT start Cloudflare or custom domains
- Do NOT split `adminDb` into a separate file yet (future task)
- Do NOT add Supabase CLI / migration files yet (manual SQL first)
- Do NOT enable OAuth providers (Google, GitHub) until auth flows are built in the apps

---

## 12. Approval Gate Before Setup

- [ ] This plan approved by user
- [ ] Supabase account confirmed at supabase.com (free tier is fine)
- [ ] Decision confirmed: one project for all apps (not separate per app)
- [ ] User ready to run SQL migrations in Supabase dashboard
- [ ] Password manager ready to store DB password and service role key
- [ ] storefront, ai-dashboard, command-center remain undeployed until Supabase is live

**After gate cleared, the next action is: open supabase.com → New Project.**
No code changes are needed before Supabase setup.
