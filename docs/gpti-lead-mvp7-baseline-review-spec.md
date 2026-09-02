# GPTI-LEAD-MVP-7 — Seven-Day Conversion Baseline Review and Optimization Specification

**Status:** Approved specification only  
**Owner:** Coach Sahid  
**Production implementation:** Not authorized  
**Notion control page:** https://app.notion.com/p/3cfa269fc94781c3adc1d9962aef7e41

## Objective

Evaluate the first complete seven days of the GPT Innovation by Attaf discovery funnel using anonymous production events, identify one evidence-supported friction point, and prepare an owner decision without treating anonymous clicks as verified leads.

## Measurement window

- Start: September 2, 2026 at approximately 10:43 AM Curaçao time
- Close: September 9, 2026 at approximately 10:43 AM Curaçao time
- Environment: Vercel production only
- Route: https://gpt-os-website.vercel.app/discovery
- Preview, development, test, and post-window events are excluded.

## Approved evidence

| Measure | Source | Interpretation |
| --- | --- | --- |
| Discovery page views | Vercel Web Analytics | Visits to the discovery route |
| `discovery_cta_selected` | Vercel events | CTA selections by approved location only |
| `intake_started` | Vercel events | First form interaction |
| `validation_completed` | Vercel events | Valid review screen reached |
| `whatsapp_continuation_selected` | Vercel events | WhatsApp draft opened; not proof of send |
| Verified opportunities | Owner-reviewed Notion register | Real inquiries verified manually by Coach Sahid |

## Privacy and evidence boundary

- Use aggregate counts and approved enumerated event properties only.
- Do not access, export, infer, or store names, phone numbers, business names, form answers, message text, query strings, or persistent identifiers.
- Never join anonymous events to Notion contacts or opportunities.
- A WhatsApp continuation does not prove a sent, received, or qualified inquiry.
- A verified opportunity exists only after owner review and an evidence-based Notion record.
- Report zero or missing data honestly.

## Scorecard

| Metric | Formula |
| --- | --- |
| CTA-to-start | Intake starts / CTA selections * 100 |
| Start-to-review | Valid reviews / intake starts * 100 |
| Review-to-WhatsApp | WhatsApp continuations / valid reviews * 100 |
| CTA-to-WhatsApp | WhatsApp continuations / CTA selections * 100 |
| Approximate opportunity rate | Owner-verified opportunities / WhatsApp continuations * 100 |

When a denominator is zero, report **Not measurable**, not 0%. The opportunity rate must be labelled **approximate and non-attributed**.

## Review procedure

1. Confirm the seven-day window has closed.
2. Confirm production-only scope and the four approved event names.
3. Record aggregate event counts and discovery page views.
4. Break CTA selections down only by `header`, `home`, `contact`, and `footer`.
5. Calculate the scorecard with denominator safeguards.
6. Separately count owner-verified opportunities from genuine discovery inquiries.
7. Record missing data, suspected internal/bot traffic, instrumentation gaps, and sample limitations.
8. Identify at most one primary optimization candidate.
9. Prepare one recommendation, one alternative, and a no-change option.
10. Stop for owner approval.

## Decision rules

- Fewer than 20 CTA selections: classify the baseline as **Directional only** and continue observation.
- Missing events: inspect instrumentation before interpreting visitor behavior.
- Do not use external benchmarks for this first baseline.
- Optimize only one funnel step at a time.
- Prefer the smallest reversible evidence-supported change.
- Preserve privacy, visitor-controlled WhatsApp, and owner-controlled qualification.
- Every implementation requires a separate owner gate.

## Allowed optimization candidates

- CTA wording or placement
- Value proposition and reassurance copy
- Mobile readability and visual hierarchy
- Required-versus-optional field burden
- Validation guidance
- Review-screen clarity
- WhatsApp continuation wording

## Explicit exclusions

No new fields, personal-data analytics, session replay, heatmaps, cookies, advertising pixels, identity resolution, CRM automation, automatic Notion writes, automated WhatsApp messaging, pricing promises, qualification automation, or production changes.

## September 9 deliverable

- Exact window and source
- Raw aggregate counts
- Funnel rates with denominator notes
- CTA-location distribution
- Verified-opportunity count kept separate
- Data-quality and sample-size assessment
- One evidence-supported recommendation
- One alternative and one no-change option
- Risks, rollback concept, and next owner gate

## Acceptance criteria

- [ ] Full seven-day window completed
- [ ] Production aggregate data only
- [ ] Reproducible calculations
- [ ] Honest zero and missing-data treatment
- [ ] No personal-data access or joins
- [ ] Anonymous events not labelled qualified leads
- [ ] At most one optimization prioritized
- [ ] No code, event-contract, CRM, or production change
- [ ] Owner approval required before implementation

## Next gate

If evidence is sufficient:

`OWNER GATE GPTI-LEAD-MVP-8 — APPROVE ONE PRIORITIZED OPTIMIZATION ON A FEATURE BRANCH AND VERCEL PREVIEW ONLY.`

If evidence is insufficient, continue the existing privacy-safe measurement and schedule a 14-day review without changing production.
