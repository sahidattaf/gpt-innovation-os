# Restaurant Command Center — QA Acceptance Criteria

**Status:** Planning baseline  
**Applies to:** A future fictional-data internal pilot only

## Required acceptance categories

A future implementation may not be promoted beyond internal pilot review until all applicable checks pass or an owner explicitly accepts a documented exception.

## UI

- [ ] Desktop layout passes
- [ ] Mobile layout passes
- [ ] Navigation functions
- [ ] No broken design-system components
- [ ] GPT Innovation Design System v7 patterns are inherited correctly
- [ ] Loading states are defined
- [ ] Empty states are defined
- [ ] Error states are defined

## Data

- [ ] Fictional data only
- [ ] No BOSSA production records
- [ ] No client/prospect production records
- [ ] Organization scoping is represented
- [ ] Status values are deterministic
- [ ] Seed reset is documented
- [ ] Demo metrics are visibly labelled

## Security architecture

- [ ] No credentials committed
- [ ] Authorization requirements documented
- [ ] Tenant-boundary requirements documented
- [ ] No assumption that an admin route is public-safe
- [ ] Production authentication remains out of scope unless separately approved
- [ ] Sensitive-data categories identified before any live-data gate

## AI controls

- [ ] Mock AI outputs are clearly identified where applicable
- [ ] AI cannot confirm bookings
- [ ] AI cannot confirm payments
- [ ] AI cannot invent operational facts
- [ ] AI cannot present demo KPIs as verified results
- [ ] Human-review boundaries are documented

## Commercial and evidence controls

- [ ] Design-mockup pricing is not treated as approved pricing
- [ ] Placeholder testimonials are not treated as proof
- [ ] No unsupported ROI, savings, response-time, conversion, or revenue claims
- [ ] No production-ready claim before production acceptance
- [ ] No client name is used without explicit approval

## Engineering acceptance target

For a later code implementation, the minimum technical target is:

```text
Build                PASS
Typecheck            PASS
Lint                 PASS
Desktop QA           PASS
Mobile QA            PASS
Demo-data isolation  PASS
Claim-safety QA      PASS
Security checklist   PASS
```

## Release boundary

Passing this checklist does not authorize production release. Client acceptance, production release, live-data connection, and measurement remain separate owner-gated stages.
