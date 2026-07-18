# InterKambia App

Minimal Next.js shell for the InterKambia validation and concierge-pilot phase.

## Prototype workspace status

This package is intentionally excluded from the root monorepo workspace until the integration gate is approved and a generated lockfile can be committed safely. That protects the existing `pnpm install --frozen-lockfile` CI workflow.

## Run locally

```bash
cd apps/interkambia
pnpm install
pnpm dev
```

The app runs on port `3005`.

## Current scope

- public positioning page;
- launch corridors;
- concierge workflow;
- trust principles;
- links to the Notion command center and versioned operating plan.

## Integration gate

Move the app into the root workspace only after:

1. the pilot positioning is approved;
2. the shared UI/auth/database dependency plan is confirmed;
3. `pnpm install` generates the root lockfile importer;
4. root lint, typecheck, and build pass.

## Not implemented yet

- authentication;
- provider application persistence;
- client request persistence;
- Supabase project or schema;
- automated matching;
- payments or escrow;
- WhatsApp or email integrations;
- operator dashboard.

These remain gated by validation evidence and compliance decisions documented in `docs/interkambia`.
