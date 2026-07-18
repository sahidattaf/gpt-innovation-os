# InterKambia Decision Log

## D-001 — Invite-only B2B concierge pilot

- Date: 2026-07-18
- Status: approved
- Decision: launch with verified businesses and professionals only; do not open a public marketplace during validation.
- Why: reduces trust, consumer-protection, payment, provider-quality, and dispute complexity.
- Review: after the first five completed matches.

## D-002 — Commercial ownership and ecosystem placement

- Date: 2026-07-18
- Status: approved
- Decision: GPT Innovation by Attaf owns the commercial venture. Digital Kòrsou is a strategic economic-empowerment partner, not the transaction operator.
- Why: separates public-interest governance from commercial contracts, fees, identity checks, disputes, and payments.

## D-003 — Monorepo code home

- Date: 2026-07-18
- Status: approved
- Decision: start in `gpt-innovation-os/apps/interkambia` with documentation in `docs/interkambia`.
- Why: reuse established Next.js, shared-package, Vercel, authentication, prompt, and agent patterns.
- Spinout trigger: external investment, separate ownership, materially different deployment needs, or governance requiring repository isolation.

## D-004 — Dedicated data project

- Date: 2026-07-18
- Status: approved
- Decision: use a dedicated InterKambia Supabase project rather than the generic GPT Innovation storefront schema.
- Why: identity, tax, compliance, agreements, incidents, consent, and audit data require stronger isolation and tailored row-level security.

## D-005 — Direct settlement during pilot

- Date: 2026-07-18
- Status: approved
- Decision: clients pay providers directly during the pilot; InterKambia records milestones and completion evidence but does not custody funds.
- Why: marketplace payment eligibility, payout, currency, chargeback, refund, reserve, and licensing questions remain unresolved.

## D-006 — AI remains advisory

- Date: 2026-07-18
- Status: approved
- Decision: AI can classify requests, rank providers, translate, draft proposals, and flag risk. Humans approve providers, matches, compliance decisions, disputes, and production changes.

## D-007 — Service-swap design

- Date: 2026-07-18
- Status: approved for pilot design
- Decision: support bilateral service swaps with a reference value and explicit deliverables; do not create a transferable token or general marketplace currency.
- Review required: tax, accounting, and contract treatment before live use.

## Open decisions

1. Final operating entity and governing law
2. Curaçao OB and Dutch VAT matrix
3. GDPR and Curaçao privacy roles
4. DAC7 platform-operator scope
5. Licensed PSP eligibility for Curaçao and Netherlands providers
6. Provider insurance requirements
7. Permanent monetization model
8. Production launch categories