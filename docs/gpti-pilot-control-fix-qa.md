# GPTI-PILOT-CONTROL-FIX-1 — QA Evidence

**Date:** 2026-09-13  
**Status:** Branch QA complete; analytics receipt check not independently verifiable  
**Scope:** Documentation reconciliation, canonical owner template, and labeled analytics verification only

## Completed evidence

- Production event types compared directly with `apps/website/src/lib/lead-measurement.ts`.
- Measurement SOP updated to the six-event allowlist and ten approved CTA locations.
- Preliminary website fit explicitly separated from owner qualification.
- Canonical owner qualification and pilot-scope template added.
- No application behavior, public website copy, pricing, integration, CRM or external service changed.

## Analytics test window

- Date: 2026-09-13
- Environment: Production
- Scenario: Fictional `Coral Bay Guesthouse` internal dry run
- Expected milestones: `discovery_cta_selected`, `intake_started`, `validation_completed`, `pilot_fit_displayed`, and `whatsapp_continuation_selected`
- Prohibited interpretation: The test is not a real lead, sent WhatsApp message, qualified opportunity, proposal, sale or revenue event.

## Receipt reconciliation checklist

- [ ] Vercel Analytics shows the labeled test-window event types — **not independently verifiable; secure dashboard sign-in was not completed**.
- [x] Event property contract contains only the documented categorical allowlist — verified in source and focused tests.
- [x] No names, business names, locations, form answers, free text, phone numbers, WhatsApp content, URLs or query strings are allowed as custom properties — verified in source and focused tests.
- [x] Each milestone is constrained to one emission per tested page lifecycle — verified in component logic and focused tests.
- [x] Analytics evidence remains separate from Notion opportunities — verified in the operating SOP.

If the dashboard cannot isolate the test reliably, record **Not independently verifiable** and do not infer success from aggregate counts.

## Required validation before PR handoff

- [x] Documentation diff reviewed
- [x] TypeScript check passed
- [x] Focused tests passed — 14 passed, 0 failed
- [x] Production build passed — 24 routes generated
- [ ] Vercel preview Ready
- [x] Analytics receipt result recorded honestly — not independently verifiable

## Gate boundary

This branch does not authorize merge, prospect contact, public pricing, quotes, contracts, payments, client delivery, production changes or new third-party services.
