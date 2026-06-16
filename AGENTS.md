# AGENTS.md — GPT Innovation OS (Project Governance)

**Repository**: `gpt-innovation-os`
**Path**: `C:\Users\sahid\gpt-innovation-os`
**Owner**: Sahid Attaf (sahidattaf@gmail.com)
**GitHub**: `sahidattaf/gpt-innovation-os`
**Last updated**: 2026-06-15

This file is the project-specific governance document for GPT Innovation OS.
It complements (and does not replace) [CLAUDE.md](CLAUDE.md), which holds
day-to-day coding conventions for this repo.

---

## 1. Mission

Build **GPT Innovation by Attaf** as a scalable AI services, product delivery,
client acquisition, multi-agent, automation, and deployment operating system.

The platform supports:

- AI consulting
- Custom GPT products
- Client onboarding
- Hospitality AI solutions
- Real-estate AI solutions
- Marketing automation
- Multilingual assistants
- Demo systems
- Proposal generation
- Delivery workflows
- Subscription services
- Training and education
- Agent orchestration
- Analytics
- Client dashboards
- AI-powered business operating systems

---

## 2. Source-of-Truth Files

Inspect actual repository files before editing. Read in this order:

1. `AGENTS.md` (this file)
2. [CLAUDE.md](CLAUDE.md)
3. [README.md](README.md)
4. [MASTER_PLAN.md](MASTER_PLAN.md)
5. `PROJECT_PLAN.md` — **not present** (gap — document if needed, do not invent)
6. `TECH_ARCHITECTURE.md` — **not present** (gap — see [docs/architecture.md](docs/architecture.md) instead)
7. [package.json](package.json)
8. [docs/](docs/) — contains `architecture.md`, `setup.md`, `supabase-readiness-plan.md`,
   `supabase-create-project.md`, `vercel-import-website.md`, `vercel-import-chatbot-widget.md`
9. `supabase/` — **not present yet** (no migrations directory exists; see §9 Supabase Governance)
10. [.github/workflows/ci.yml](.github/workflows/ci.yml)
11. [.env.example](.env.example)
12. Relevant application code under `apps/*`, agent code under `packages/agents/` and `agents/`,
    and prompts under `packages/prompts/` and `prompts/`
13. GPT Innovation context in `sahid-ai-clone-pack/projects/gpt-innovation-os.md`
    and `sahid-ai-clone-pack/projects/gpt-innovation-by-attaf.md`

If a listed file is missing, continue using the actual repository structure,
document the gap, and do not invent architecture or status.

---

## 3. Business and Product Priorities

Work in this order. Anything outside this list is backlog or post-MVP unless
explicitly approved:

1. Clear product and service catalogue
2. Lead capture and qualification
3. Demo booking
4. Proposal and package generation
5. Client onboarding
6. Agent and solution delivery
7. Subscription and support workflows
8. Case studies and social proof
9. Multilingual AI services
10. Infrastructure and deployment automation
11. Client reporting and analytics
12. Reusable product templates
13. Secure multi-tenant delivery
14. Partner and reseller enablement

**Current state (2026-06-15)**: Repo is at infrastructure/deployment-automation stage
(priority 10). `apps/website` and `apps/chatbot-widget` are deployed to Vercel.
Catalogue, lead capture, demo booking, proposals, and onboarding flows (priorities 1–5)
are not yet implemented in code — `apps/storefront` and `apps/command-center` are
scaffolds only.

---

## 4. Repository Rules

- Do not invent clients, testimonials, revenue, integrations, certifications,
  case studies, or deployment results.
- Separate public marketing claims from internal plans.
- Do not commit secrets, tokens, passwords, API keys, customer data, private
  prompts, or private Notion URLs. `.env.local` is gitignored — keep it that way.
- Do not push directly to `main`. Work on a scoped feature branch.
- Inspect before editing. Reuse established repository patterns.
- Keep changes scoped, reviewable, reversible, and documented.
- TypeScript strict mode everywhere (already enforced via root `tsconfig.json`).
- Avoid `any`; use explicit types or `unknown` with validation.
- Validate external inputs with Zod or an established validation layer
  (not yet introduced in this repo — flag as a gap if needed for a new API route).
- Protect client and tenant data.
- Keep reusable product templates (e.g. `gpts/`) separate from client-specific
  configurations (`clients/`).
- Do not expose customer prompts, credentials, documents, workflows, or
  proprietary data.
- Route hospitality-specific implementation to **Hospitality OS** (not this repo).
- Route BOSSA-specific execution to **BOSSA-ASADO-I-MAR** (not this repo).
- Route shared identity, memory, governance, and cross-project workflows to
  **sahid-ai-clone-pack**.
- Require human review for legal, financial, contractual, medical, safety-critical,
  and high-impact client outputs.
- Update documentation when behavior, architecture, deployment, pricing status,
  or product ownership changes.

---

## 5. Product and Agent Standard

Every product, agent, service, or automation added to this repo must define:

- Product or agent name
- Target customer
- Problem solved
- Business value
- Inputs
- Outputs
- Human-review boundary
- Data requirements
- Integration requirements
- Environment variables
- Pricing status
- Delivery status
- Deployment status
- Security considerations
- Failure behavior
- Support ownership
- Testing requirements
- Documentation
- Version

Do not publish or sell a product that lacks these definitions.

**Current agent inventory:**

| Agent | File | Status |
|-------|------|--------|
| Chat agent | [packages/agents/src/chat-agent.ts](packages/agents/src/chat-agent.ts) | Defined, not wired to a UI/API route |
| Orchestrator | [agents/orchestrator.ts](agents/orchestrator.ts) | Defined, not deployed/invoked anywhere yet |

Neither agent currently has a documented pricing status, delivery status, or
support ownership — this is a gap to close before either is presented as a product.

---

## 6. Deployment Rules

**Confirmed deployment provider**: Vercel (see [docs/vercel-import-website.md](docs/vercel-import-website.md),
[docs/vercel-import-chatbot-widget.md](docs/vercel-import-chatbot-widget.md), and [PROGRESS.md](PROGRESS.md)).

| App | Vercel Project | Status |
|-----|----------------|--------|
| `apps/website` | `gpt-os-website` | Live — `https://gpt-os-website.vercel.app/` |
| `apps/chatbot-widget` | `gpt-os-chatbot-widget` | Live — `https://gpt-os-chatbot-widget.vercel.app/` |
| `apps/storefront` | `gpt-os-storefront` | Not deployed — blocked on Supabase |
| `apps/ai-dashboard` | `gpt-os-ai-dashboard` | Not deployed — blocked on Supabase |
| `apps/command-center` | `gpt-os-command-center` | Not deployed — blocked on Supabase + Auth |

Other infrastructure systems referenced in this repo:

- **Supabase** — planned, not yet created (see [docs/supabase-readiness-plan.md](docs/supabase-readiness-plan.md)
  and [docs/supabase-create-project.md](docs/supabase-create-project.md))
- **GitHub Actions** — [.github/workflows/ci.yml](.github/workflows/ci.yml) runs install, lint, typecheck, build
- **Custom domains** — not configured
- **Analytics** — not configured
- **Email** — not configured
- **WhatsApp** — not configured
- **Payment providers** — Stripe planned, not started (`STRIPE_*` vars in `.env.example` only)
- **AI model providers** — Anthropic Claude (`ANTHROPIC_API_KEY`, default model `claude-sonnet-4-6`)

Treat each system above as separate infrastructure — do not assume one being
configured implies another is.

### Before production release

- [ ] Run `pnpm lint`
- [ ] Run `pnpm typecheck`
- [ ] Run `pnpm test` (no test suites currently exist — see §7 gap)
- [ ] Run `pnpm build` (`--concurrency 1` required on Windows — see [CLAUDE.md](CLAUDE.md)/PROGRESS.md)
- [ ] Verify environment variables against `.env.example`
- [ ] Verify authentication and authorization (not yet implemented in any app)
- [ ] Verify tenant isolation (not applicable yet — no multi-tenant data model exists)
- [ ] Verify lead and onboarding flows (not yet implemented)
- [ ] Verify demo-booking flow (not yet implemented)
- [ ] Verify proposal or package flow (not yet implemented)
- [ ] Verify no secrets are exposed (check `.env.local` not committed, no hardcoded keys)
- [ ] Verify metadata and social previews
- [ ] Verify mobile behavior
- [ ] Document deployment and rollback impact

### Do not modify without explicit approval

- DNS
- Production domains
- Payment settings
- Production client data
- Production authentication
- Supabase production policies (once Supabase exists)

Use preview deployments when available (Vercel preview URLs on PR branches).

---

## 7. Testing Rules

Inspect the repository first, then run the commands that actually exist.

**Commands confirmed present** (root [package.json](package.json)):

```bash
pnpm install
pnpm lint        # turbo run lint
pnpm typecheck   # turbo run typecheck
pnpm test        # turbo run test — currently no test files exist in any app/package
pnpm build       # turbo run build (use --concurrency 1 on Windows)
```

`python -m pytest` is **not applicable** — this repo has no Python code.

**Gap**: No automated tests exist yet for any app or package. `pnpm test` will
run `turbo run test` but individual packages have no `test` script wired to a
runner. Document this gap rather than claiming tests pass.

Also validate (where the relevant feature exists in code):

- Lead capture — not implemented
- Contact forms — not implemented
- Demo booking — not implemented
- Proposal generation — not implemented
- Client onboarding — not implemented
- Authentication — not implemented (Supabase Auth planned via `packages/auth`)
- Authorization — not implemented
- Tenant isolation — not applicable (no multi-tenant schema yet)
- Agent routing — `agents/orchestrator.ts` exists but is not invoked by any route
- API input validation — no API routes exist yet in any app
- Audit logging — not implemented
- Subscription states — not implemented
- Payment flow — not implemented (Stripe planned)
- Dashboard visibility — `apps/command-center` and `apps/ai-dashboard` are static placeholders
- Mobile layout — verify Tailwind responsive classes on any new UI
- Accessibility basics — not yet audited
- Metadata — verify `layout.tsx` metadata per app
- Broken links — verify cross-app `NEXT_PUBLIC_*_URL` links
- Environment handling — verify `requireEnv()` pattern in `packages/database/src/client.ts`
  and `packages/auth/src/client.ts`

**Add tests for** (as features are built):

- Business logic
- Routing logic
- Agent execution
- Data transformations
- Permission checks
- Tenant isolation
- API handlers
- Critical user journeys

Do not claim a check passed unless it was actually run successfully. If a
command is unavailable or a feature doesn't exist, report it honestly and
explain the gap — do not fabricate a result.

---

## 8. Notion Integration Rules

`packages/notion` provides a Notion client and query helpers
([packages/notion/src/client.ts](packages/notion/src/client.ts),
[packages/notion/src/queries.ts](packages/notion/src/queries.ts)).
[notion/databases.md](notion/databases.md) documents intended database structure.

Use Notion for:

- Executive dashboard
- Sales pipeline
- Client registry
- Proposal tracker
- Delivery tracker
- Agent registry
- Product catalogue
- Decision log
- Meeting notes
- Document tracker
- Open decisions
- Client implementation plans
- Support tracking
- Renewal tracking
- Partner pipeline
- Roadmap
- Operating reviews

Do not use Notion as the sole transactional database for:

- Authentication
- Payments
- Agent runs
- Audit logs
- Tenant-protected client data
- Sensitive client documents
- Production API state

**Ownership** (current state): no production dataset currently exists in either
Notion or Supabase — both are pre-launch. When Supabase is provisioned
(see [docs/supabase-readiness-plan.md](docs/supabase-readiness-plan.md)), document
which system owns each dataset at that point.

Never commit:

- Notion integration tokens (`NOTION_API_KEY` — `.env.local` only)
- Private workspace credentials
- Sensitive page URLs
- Client-confidential data

The repository remains the source of truth for application code, product
definitions, agent logic, infrastructure configuration, tests, and versioned
documentation.

---

## 9. Supabase Governance

**Current state**: No Supabase project exists yet. No `supabase/` directory
exists in this repo. Planning is complete:

- [docs/supabase-readiness-plan.md](docs/supabase-readiness-plan.md) — schema plan,
  RLS policies, env var matrix, security checklist
- [docs/supabase-create-project.md](docs/supabase-create-project.md) — founder
  checklist for creating the project

`packages/database/src/client.ts` and `packages/auth/src/client.ts` already
contain the client code expecting `NEXT_PUBLIC_SUPABASE_URL`,
`NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY`.

Once Supabase is provisioned, the following rules apply:

- Enforce organization and client isolation.
- Use Row Level Security (policies drafted in
  [docs/supabase-readiness-plan.md](docs/supabase-readiness-plan.md) §10).
- Keep service-role credentials server-side — `SUPABASE_SERVICE_ROLE_KEY` must
  never reach a Client Component (`"use client"`). `packages/database/src/client.ts`
  currently exports `db` and `adminDb` from the same module — split into a
  separate `admin.ts` before any API route imports `adminDb` (flagged in
  [docs/supabase-readiness-plan.md](docs/supabase-readiness-plan.md) §7).
- Use immutable migrations after deployment — create new migrations instead of
  rewriting deployed migration history.
- Add audit logs for sensitive actions.
- Separate shared templates from tenant-owned records.
- Validate all API inputs server-side.
- Use constraints for critical states and relationships (see schema in
  [packages/database/src/types.ts](packages/database/src/types.ts) and SQL in
  [docs/supabase-readiness-plan.md](docs/supabase-readiness-plan.md) §4).
- Test schema and migration changes outside production first.
- Never perform destructive production operations without explicit approval.
- Prepare rollback plans for risky migrations.
- Minimize personal and client-confidential data.
- Define retention and deletion behavior.
- Protect prompts, documents, agent runs, and client outputs.
- Document authorization assumptions.
- Review policies whenever a new table or role is added.

---

## 10. Claude Code and Codex Operating Instructions

### At the beginning of every task

1. Read `AGENTS.md` (this file).
2. Inspect the repository tree.
3. Read relevant source-of-truth files (§2).
4. Check the current Git branch (`git branch --show-current`).
5. Check the working tree (`git status --porcelain`).
6. Identify the business outcome.
7. Identify the owning product or agent (app under `apps/`, package under
   `packages/`, or top-level `agents/`, `prompts/`, `notion/`, `clients/`, `gpts/`, `mcp/`).
8. State the intended scope.
9. Avoid editing until current behavior is understood.

### During execution

- Inspect before editing.
- Reuse existing patterns — e.g. `transpilePackages` in each app's
  `next.config.ts`, `requireEnv()` in `packages/database/src/client.ts`, lazy
  client construction in `packages/agents/src/runner.ts`.
- Keep changes scoped.
- Add tests and documentation with the feature.
- Preserve tenant isolation (not yet applicable — flag if a multi-tenant model
  is introduced without isolation).
- Preserve security boundaries (especially the `adminDb` / service-role boundary).
- Do not fabricate integrations, clients, metrics, or test results.
- Preserve existing working behavior unless explicitly changing it.
- Route cross-project work to the correct repository (§4).
- Stop and report if an action would expose secrets or damage production data.

### Before completion

1. Run available lint (`pnpm lint`).
2. Run available typecheck (`pnpm typecheck`).
3. Run available tests (`pnpm test` — report if no tests exist for the touched area).
4. Run validators (none configured beyond TypeScript/ESLint at present).
5. Run the production build when relevant (`pnpm build --concurrency 1` on Windows).
6. Inspect the final diff.
7. Confirm no secrets were added.
8. List changed files.
9. Report passed, failed, and unavailable checks.
10. Explain deployment impact.
11. Explain Supabase impact.
12. Explain Notion impact.
13. Explain security impact.
14. Explain rollback steps.
15. Record major decisions in the correct decision log
    (`sahid-ai-clone-pack/projects/gpt-innovation-os.md` or memory).

---

## 11. GitHub Workflow Standards

### Branches

```text
feat/<short-description>
fix/<short-description>
docs/<short-description>
chore/<short-description>
refactor/<short-description>
test/<short-description>
```

### Conventional commits

```text
feat: add client onboarding flow
fix: correct agent authorization
docs: add project AGENTS governance
test: validate tenant isolation
chore: update deployment metadata
```

### Every pull request must include

- Objective
- Business impact
- Product impact
- Summary of changes
- Changed files
- Validation results
- Test results
- Screenshots for visual changes
- Deployment impact
- Environment-variable impact
- Supabase or migration impact
- Notion impact
- Security considerations
- Tenant-isolation impact
- Human-review requirements
- Rollback notes

Do not merge when required checks fail (see [.github/workflows/ci.yml](.github/workflows/ci.yml)
for required CI: install, lint, typecheck, build).

Use squash merge unless repository policy specifies otherwise.

No force-push to `main`. No `--no-verify`.

---

## 12. Ecosystem Standard

This repository follows the Sahid AI Ecosystem structure:

```text
Master governance:
sahid-ai-clone-pack/AGENTS.md   (not yet created — gap)

Project governance:
gpt-innovation-os/AGENTS.md     (this file)

Project context and memory:
sahid-ai-clone-pack/projects/gpt-innovation-os.md
sahid-ai-clone-pack/projects/gpt-innovation-by-attaf.md

Reusable workflows and governance:
sahid-ai-clone-pack/workflows/
sahid-ai-clone-pack/docs/
sahid-ai-clone-pack/memory/

Operational application code:
gpt-innovation-os (this repository)

Executive tracking:
Notion Command Center (planned — not yet built, see notion/databases.md)

Transactional data:
Supabase (planned — not yet created, see docs/supabase-readiness-plan.md)

Specialized hospitality execution:
hospitality-os-plugin (separate repository)

BOSSA-specific execution:
BOSSA-ASADO-I-MAR (separate repository)
```

**Gap**: `sahid-ai-clone-pack/AGENTS.md` (the master governance file) does not
exist yet. Until it is created, this file is authoritative for all
GPT Innovation OS work. GPT Innovation-specific rules override the master when
they are more restrictive, once the master file exists.

---

## 13. Completion Checklist

Before completing work in this repository:

- [ ] Correct repository confirmed (`gpt-innovation-os` at `C:\Users\sahid\gpt-innovation-os`)
- [ ] Correct branch confirmed (feature branch, not `main`)
- [ ] Repository structure inspected
- [ ] Source-of-truth files reviewed (§2)
- [ ] Product ownership confirmed (which app/package owns the change)
- [ ] Business claims verified (no invented clients/metrics/integrations)
- [ ] No secrets added
- [ ] Tenant isolation preserved (n/a until multi-tenant model exists)
- [ ] Lint completed or explained
- [ ] Typecheck completed or explained
- [ ] Tests completed or explained
- [ ] Validators completed or explained
- [ ] Build completed or explained
- [ ] Deployment impact documented
- [ ] Supabase impact documented
- [ ] Notion impact documented
- [ ] Security impact documented
- [ ] Changed files listed
- [ ] Human-review requirements documented
- [ ] Rollback steps explained
