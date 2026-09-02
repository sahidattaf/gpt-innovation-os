# GPTI Lead MVP — Conversion Measurement and Notion Intake SOP

**Gate:** GPTI-LEAD-MVP-4  
**Status:** Specification approved; implementation not authorized  
**Owner:** Coach Sahid  
**Version:** 1.0  
**Date:** 2026-09-02

## 1. Purpose

Define a privacy-safe conversion funnel for the production discovery flow and a manual WhatsApp-to-Notion intake procedure. This document does not install analytics, alter production code, collect prospect data, create CRM records, or authorize outbound communication.

## 2. Control boundary

- Website measurement counts anonymous interface actions, not people or qualified leads.
- The website must never send intake field values to analytics.
- Selecting **Continue to WhatsApp** means the visitor opened a WhatsApp draft. It does not prove that a message was sent or received.
- A qualified sales opportunity exists only after Coach Sahid reviews the actual WhatsApp conversation and records an evidence-based opportunity in the existing Qualified Sales Opportunity Register.
- No AI or automation may qualify a prospect, change an opportunity stage, quote pricing, promise delivery, send a proposal, or contact a prospect without owner approval.
- Notion remains the operational source of truth for verified opportunities. The repository remains the source of truth for code and versioned specifications.

## 3. Measurement event contract

Event names and properties are allowlisted. Any property not listed here is prohibited.

| Event | Trigger | Allowed properties | Interpretation |
|---|---|---|---|
| `discovery_cta_selected` | A visitor selects a discovery CTA | `cta_location`: `header`, `home`, `contact`, or `footer` | Interest in opening discovery |
| `intake_started` | First interaction with the discovery form | None | Form engagement |
| `validation_completed` | Visitor successfully reaches review | `result`: `valid` only | A valid client-side review was produced |
| `whatsapp_continuation_selected` | Visitor selects Continue to WhatsApp | `source`: `discovery_review` | WhatsApp draft opened; send not confirmed |

### Event rules

- Emit each milestone no more than once per page lifecycle.
- Do not emit `validation_completed` for failed validation.
- Do not attach form values, field names, free text, phone numbers, names, business names, roles, locations, URLs, query strings, user IDs, device fingerprints, or persistent cross-site identifiers.
- Do not derive audience segments from intake answers.
- Do not log the generated WhatsApp message.
- Development and preview events must be excluded from production reporting.
- Provider selection and installation require a separate implementation gate.
- A privacy/legal review is required before activation; this specification does not decide whether consent tooling is legally required.

## 4. Funnel definitions

Use the same reporting period and production-only event source for numerator and denominator.

| KPI | Formula | Guardrail |
|---|---|---|
| CTA-to-start rate | unique `intake_started` sessions ÷ unique `discovery_cta_selected` sessions × 100 | Report only when denominator > 0 |
| Start-to-review rate | unique `validation_completed` sessions ÷ unique `intake_started` sessions × 100 | Measures valid review, not lead quality |
| Review-to-WhatsApp rate | unique `whatsapp_continuation_selected` sessions ÷ unique `validation_completed` sessions × 100 | Measures draft-open selection, not sent message |
| CTA-to-WhatsApp rate | unique `whatsapp_continuation_selected` sessions ÷ unique `discovery_cta_selected` sessions × 100 | Directional website conversion only |
| Verified opportunity count | Notion opportunities created after owner review during the period | Never inferred from analytics |
| Verified opportunity rate | verified Notion opportunities ÷ unique `whatsapp_continuation_selected` sessions × 100 | Label as approximate because anonymous events cannot be person-matched |

### Reporting cadence

- Review the anonymous website funnel weekly.
- Record a monthly owner-verified snapshot in the existing Company KPI & Commercial Evidence Register only after measurement is implemented and actuals exist.
- Until then, KPI entries must be marked **Definition Only** or **Actuals Unavailable**. Do not invent baselines or targets.
- Suppress percentage commentary for very small samples; use raw counts and note that the sample is insufficient for decisions.
- Do not join analytics events to personal Notion records.

## 5. Notion intake SOP

### Trigger

Start this SOP only when Coach Sahid has an actual WhatsApp conversation from a prospect and has enough evidence to identify a genuine business opportunity. A website event alone is never sufficient.

### Owner procedure

1. **Verify the conversation.** Confirm that the message exists in Coach Sahid's WhatsApp and relates to a real business inquiry.
2. **Apply the qualification guide.** Score segment fit, clear problem, clear outcome, decision access, and timing/investment readiness from 0–2 each.
3. **Choose the stage.**
   - 7–10: `Qualified`, only when the evidence supports it.
   - 4–6: `Discovery Needed`.
   - 0–3: do not create a sales opportunity unless there is a legitimate follow-up reason; otherwise nurture outside the register or decline.
4. **Create one record** in the existing Qualified Sales Opportunity Register. Search first to prevent duplicates.
5. **Populate only the approved fields** using the mapping below.
6. **Review privacy.** Store the minimum useful summary; never paste the full WhatsApp transcript or the generated discovery message.
7. **Set the next action.** Any outbound message, meeting, proposal, price, or commitment remains owner-controlled.
8. **Review weekly.** Update stage only when new evidence exists. Mark stale or stopped work `Paused` or `Not Won`; do not fabricate progress.

### Exact field mapping

| Register field | Entry rule |
|---|---|
| `Opportunity / Account` | Business name plus concise opportunity label; avoid unnecessary personal data |
| `Authorized Contact` | `Unverified` by default; `Owner Confirmed` after Sahid verifies identity/authority; `Contact Approved` only after explicit approval for contact handling |
| `Client Type` | Use the closest existing option: `Hospitality`, `Restaurant`, `Real Estate`, `Professional Services`, or `Other` |
| `Evidence Status` | `Unverified` initially; `Owner Provided` when based on Sahid's verified conversation; `Documented` only with appropriate documentation; `Commercially Verified` only with verified commercial evidence |
| `Last Reviewed` | Date Coach Sahid reviewed the evidence |
| `Next Action` | Specific owner-controlled action with timing; no automatic send |
| `Offer Alignment` | Short fit statement; do not promise a package, scope, price, or timeline |
| `Opportunity Stage` | One existing stage supported by current evidence |
| `Privacy Notes` | Minimum-data note, consent/context limitations, and any deletion or handling requirement |
| `Source URL` | Leave blank for private WhatsApp conversations; never paste private chat links. Use only a safe public source URL when relevant |

### Duplicate check

Before creating a record, search the register by business name and contact context. If a match exists, update the existing record after confirming it is the same opportunity. Do not create a second record merely because the prospect submits the form again.

### Data minimization

Do not store passwords, API keys, payment data, guest/customer data, government IDs, confidential files, health data, full WhatsApp transcripts, or information unrelated to qualification. If sensitive data arrives in WhatsApp, do not copy it into Notion; record only a safe operational note and follow the appropriate deletion/escalation process.

## 6. Roles

| Role | Authorized actions |
|---|---|
| Coach Sahid | Verify conversations, qualify prospects, create/update Notion opportunities, approve stages and outbound actions |
| AI Operator | Prepare a draft summary or checklist for owner review; never create a real opportunity or contact a prospect under this gate |
| Website | Prepare the WhatsApp draft and, after a later gate, emit only allowlisted anonymous events |
| Analytics provider | Aggregate allowlisted production events only; provider and configuration are not yet approved |
| Notion | Hold owner-verified operational opportunity records; not a website submission endpoint |

## 7. Acceptance criteria for a future implementation

- All four allowlisted events fire at the defined milestones and only once per page lifecycle.
- No intake value or generated message appears in analytics payloads, logs, URLs, cookies, local storage, or session storage.
- Preview/development traffic is excluded from production reports.
- The UI never claims a WhatsApp message was sent.
- Analytics and Notion totals are visibly labeled as different evidence classes.
- The manual SOP is tested with a fictional training scenario only; no fake record remains in the live register.
- Lint, typecheck, focused tests, and production build pass on a feature branch.
- Vercel preview is reviewed before any production merge.
- Rollback removes analytics instrumentation without changing the discovery form or Notion records.

## 8. Explicit exclusions

This gate does not authorize analytics installation, cookies, consent banners, CRM automation, Notion API writes, Supabase, email, booking, message sending, proposals, pricing, payments, production code changes, production deployment, target setting, or fabricated metrics.

## 9. Future owner gate

`OWNER GATE GPTI-LEAD-MVP-5 — APPROVE PRIVACY-SAFE MEASUREMENT IMPLEMENTATION ON A FEATURE BRANCH AND VERCEL PREVIEW ONLY.`

That gate must name the analytics provider, confirm privacy/legal review, and preserve the no-PII event contract. Production merge remains a separate authorization.
