# T-05 — Supabase Project Creation Checklist

**Status**: Approved — awaiting founder action
**Last updated**: 2026-06-04

---

## Context

T-04 confirmed what is needed before Supabase can be provisioned. This checklist
covers the "create the project and collect the keys" step only. No SQL is run here.
No Vercel env vars are set. No apps are deployed.

---

## 1. Recommended Supabase Project Name

**`gpt-innovation-os`**

- Matches the GitHub repo name and Turborepo root package name
- Lowercase, hyphenated — consistent with the rest of the project naming
- Will appear in the generated project URL: `https://<ref>.supabase.co`

---

## 2. Recommended Organization / Workspace Name

Use your **personal Supabase account** (no new org needed to start).

- Supabase free tier is per-organization; your personal account IS an organization
- Creating a separate org is optional — only useful if you plan to add team members later
- Recommendation: start on personal account (`sahidattaf`), create an org later if billing needs to be separated

---

## 3. Free vs Pro Recommendation

**Start on Free tier.**

| Feature | Free | Pro ($25/mo) |
|---------|------|--------------|
| Database | 500 MB | 8 GB |
| Auth MAU | 50,000 | Unlimited |
| Storage | 1 GB | 100 GB |
| Edge Functions | 500k invocations/mo | 2M invocations/mo |
| Branching | No | Yes |
| Pausing | After 1 week inactive | Never |

Free tier is sufficient to build and validate GPT Innovation OS. Upgrade to Pro only
when hitting storage/MAU limits or when the project generates revenue that justifies the cost.

> **Free tier caveat**: Projects are paused after 1 week of inactivity. Log in to the
> Supabase dashboard at least once a week during development, or upgrade to Pro when live.

---

## 4. Region Recommendation

**`East US (North Virginia)` — `us-east-1`**

- Closest AWS region to most US-based early users
- Vercel default edge region defaults to US East — reduces latency between app and DB
- Most Supabase infrastructure (auth, realtime, storage) runs in the same AWS region as the DB

If your users are primarily in Europe, use `West EU (Ireland)` — `eu-west-1` instead.

> Region **cannot be changed** after project creation — choose carefully.

---

## 5. Database Password Guidance

- Generate a strong random password using a password manager (1Password, Bitwarden, etc.)
- Minimum 20 characters, mixed case + numbers + symbols
- Do NOT use the password Supabase auto-generates in the field — replace it with your own
- Save it in your password manager as: `GPT Innovation OS — Supabase DB Password`
- Do NOT put this password in `.env.local` — needed only for direct DB connections later
- Do NOT paste this password into any AI chat

---

## 6. Exact Dashboard Steps to Create the Project

### Pre-flight

- [ ] Log in to `supabase.com` as `sahidattaf`
- [ ] Password manager is open and ready

### Step 1 — New Project

1. Go to: `supabase.com/dashboard`
2. Click **"New project"**
3. Select organization: your personal account (`sahidattaf`)

### Step 2 — Fill in project details

| Field | Value |
|-------|-------|
| **Name** | `gpt-innovation-os` |
| **Database Password** | Generate in password manager -> paste -> save immediately |
| **Region** | `East US (North Virginia)` |
| **Pricing Plan** | `Free` |

4. Click **"Create new project"**
5. Wait ~2 minutes for provisioning — do not close the tab

### Step 3 — Confirm project is ready

- Dashboard shows `gpt-innovation-os` with a green status indicator
- You are redirected to the project home page

---

## 7. What Values to Copy After Creation

Navigate to: **Project Settings -> API**

| Value | Password Manager Label | Sensitivity |
|-------|----------------------|-------------|
| **Project URL** | `GPT Innovation OS — Supabase URL` | Low — safe to share |
| **anon public** key | `GPT Innovation OS — Supabase Anon Key` | Low — safe for browser |
| **service_role** key | `GPT Innovation OS — Supabase Service Role Key` | CRITICAL — keep private |

Also from **Project Settings -> General**:

| Value | Use |
|-------|-----|
| **Reference ID** | Needed later for Supabase CLI: `supabase link --project-ref <id>` |

---

## 8. Where Each Value Will Eventually Go

| Value | Goes into |
|-------|-----------|
| `NEXT_PUBLIC_SUPABASE_URL` | `.env.local` + Vercel: storefront, ai-dashboard, command-center |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `.env.local` + Vercel: storefront, ai-dashboard, command-center |
| `SUPABASE_SERVICE_ROLE_KEY` | `.env.local` + Vercel: command-center only (server-side) |
| DB password | Password manager only — needed for `supabase db pull` / psql later |
| Reference ID | Needed when running `supabase link` in CLI setup |

**Nothing gets added to Vercel or `.env.local` in this task.**
That happens in T-07 after SQL and RLS are applied and verified.

---

## 9. What NOT to Paste Into ChatGPT / Claude / Any AI

Never share these in any AI chat, Slack, Discord, or unencrypted channel:

| Secret | Why it matters |
|--------|---------------|
| `SUPABASE_SERVICE_ROLE_KEY` | Bypasses all Row Level Security — full DB access |
| Database password | Direct DB access |
| `AUTH_SECRET` | Session signing key |
| `STRIPE_SECRET_KEY` | Can charge cards |
| `ANTHROPIC_API_KEY` | Can run up API costs |

Safe to share: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
are public by design — Supabase RLS enforces access control at the DB level.

---

## 10. Security Checklist

- [ ] Password manager is set up before starting
- [ ] DB password is generated by password manager (not reused from another service)
- [ ] Service role key saved in password manager immediately after copying
- [ ] Service role key NOT pasted into any chat, email, or cloud-synced notes
- [ ] `.env.local` is in `.gitignore` — confirmed present in repo
- [ ] After project creation: verify no keys appear in any browser tab URLs
- [ ] If you accidentally expose a key: Supabase -> Project Settings -> API -> Regenerate
- [ ] Row Level Security will be enabled in T-06 before any real data is written

---

## 11. Approval Gate Before Opening Supabase Dashboard

- [ ] This T-05 checklist reviewed
- [ ] Password manager is ready
- [ ] Region confirmed: `East US (North Virginia)` or alternate chosen
- [ ] Account confirmed: personal account `sahidattaf`, not a new org
- [ ] One project for all GPT Innovation OS apps confirmed
- [ ] storefront, ai-dashboard, command-center will remain undeployed after this task

---

## 12. What to Do After the Project Is Created

**In this task: copy keys to password manager only.** Nothing else.

| Task | What it does | Blocked on |
|------|-------------|-----------|
| **T-05** <- here | Create project + copy keys to password manager | — |
| **T-06** | Run SQL: tables, triggers, RLS in Supabase SQL editor | T-05 complete |
| **T-07** | Add keys to `.env.local`, verify local dev runs without errors | T-06 complete |
| **T-08** | Add Supabase env vars to Vercel (storefront, ai-dashboard, command-center) | T-07 complete |
| **T-09** | Deploy storefront, ai-dashboard, command-center to Vercel | T-08 complete |

Do not skip ahead — each task validates the previous one before propagating secrets.
