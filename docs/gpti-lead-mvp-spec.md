# GPT Innovation Qualified Lead Capture MVP

**Gate:** GPTI-LEAD-MVP-1  
**Status:** Specification approved; implementation not authorized  
**Owner:** Coach Sahid Attaf  
**Version:** 1.0  
**Date:** 2026-09-02

## 1. Outcome

Create a short, trustworthy website intake that converts interested Curaçao
hospitality operators into structured WhatsApp discovery conversations without
storing prospect data or creating unverified CRM records automatically.

## 2. Target user

- Primary: Curaçao hospitality operators
- Examples: restaurants, hotels, apartments, resorts, tour operators, and
  hospitality service businesses
- Secondary segments remain out of the MVP unless the owner approves expansion

## 3. User journey

1. Visitor selects **Start Your AI Discovery**.
2. Visitor completes the short intake.
3. The browser validates required fields.
4. The site shows a review screen and privacy notice.
5. Visitor explicitly selects **Continue to WhatsApp**.
6. The site opens a structured, prefilled message to +599 9 523 0683.
7. The visitor chooses whether to send the message in WhatsApp.
8. Coach Sahid reviews the conversation and decides whether to create a
   qualified opportunity in the existing Notion sales pipeline.

No website submission, CRM creation, email, proposal, booking, or automated
follow-up occurs in this MVP.

## 4. Intake fields

| Field | Required | Notes |
|---|---:|---|
| Contact name | Yes | Included only in the WhatsApp draft |
| Business name | Yes | Included only in the WhatsApp draft |
| Role | Yes | Owner, manager, operator, team member, other |
| Business type | Yes | Hospitality options plus other |
| Location | Yes | Curaçao first; free-text fallback |
| Main workflow challenge | Yes | Select one plus optional detail |
| Desired result | Yes | Time, organization, follow-up, guest service, decisions, other |
| Current tools | No | WhatsApp, Notion, CRM, email, booking tools, other |
| Urgency | Yes | Exploring, 30 days, 60–90 days, urgent |
| Investment readiness | Yes | Need guidance, pilot-ready, larger implementation-ready |
| Support preference | No | One-time setup, ongoing support, unsure |
| Decision-maker status | Yes | Self, shared decision, researching for another person |
| Privacy acknowledgement | Yes | Explicit confirmation before opening WhatsApp |

Do not request passwords, API keys, financial account data, customer/guest data,
health information, identity documents, or confidential files.

## 5. Challenge options

- Repetitive administration
- Slow customer or guest responses
- Weak lead follow-up
- Disorganized SOPs or operations
- Content and marketing workload
- Reporting and decision visibility
- Staff training or knowledge access
- Other

## 6. WhatsApp draft

The generated message must:

- identify GPT Innovation by Attaf as the intended recipient;
- label the message as an AI Discovery Request;
- summarize only the visitor-entered intake fields;
- contain no hidden metadata or inferred facts;
- avoid promising price, delivery time, availability, or results;
- state that the request is not a contract or confirmed booking.

## 7. Owner-side qualification

Coach Sahid remains the qualification and approval owner. The AI Operator may
prepare summaries and follow-up drafts but cannot mark a lead qualified, quote a
price, send a proposal, or promise delivery without owner review.

Internal qualification dimensions:

| Dimension | Score |
|---|---:|
| Approved segment fit | 0–2 |
| Clear workflow problem | 0–2 |
| Clear desired outcome | 0–2 |
| Decision access | 0–2 |
| Timing and investment readiness | 0–2 |

- 7–10: Qualified — owner may approve discovery
- 4–6: Discovery Needed — clarify before qualification
- 0–3: Nurture or decline

Scores are internal guidance, not claims about the prospect.

## 8. Notion handoff

Only real, owner-reviewed opportunities may be entered into the existing
Qualified Sales Opportunity Register. Preserve the canonical lifecycle:

`Lead Identified → Discovery Needed → Qualified → Proposal Ready → Proposal Sent
→ Won / Not Won → Authorized Onboarding`

Minimum manual record:

- source: GPT Innovation website;
- received date;
- business and contact names;
- hospitality subtype;
- stated problem and desired result;
- qualification status;
- next action;
- owner;
- evidence link or note;
- consent/source note.

Do not create a second CRM or duplicate the existing pipeline.

## 9. Measurement

MVP events may measure:

- discovery CTA selected;
- intake started;
- validation completed;
- WhatsApp continuation selected.

Rules:

- no field values or personal data in analytics;
- no claim that a WhatsApp message was sent;
- no conversion or revenue claim without verified evidence;
- cookie/consent behavior must match the analytics provider selected later.

## 10. Accessibility and quality

- Keyboard-operable form and review screen
- Programmatic labels and clear error summaries
- Mobile-first layout
- EN first; PAP copy prepared for a later approved language gate
- No dark patterns or pre-checked consent
- WhatsApp opens in a new tab with safe link attributes
- Existing contact page and direct WhatsApp option remain available

## 11. Security and privacy

- Client-side message preparation only
- No database, API route, localStorage, sessionStorage, cookies, or file upload
- No Notion token or private page identifier in client code
- No untrusted rich-text or HTML rendering
- Encode all visitor input before constructing the WhatsApp URL
- Enforce length limits and discard line-control characters
- Add an abuse-resilient maximum message size

## 12. Build plan

### Phase A — UX and content

1. Add a dedicated `/discovery` route.
2. Create typed field definitions and option lists.
3. Add progress, validation, review, consent, and success guidance.
4. Link the homepage, contact page, and navigation CTA to the discovery route.

### Phase B — Safe WhatsApp handoff

1. Reuse the centralized business contact configuration.
2. Add a pure message-builder utility.
3. Normalize and encode all user-provided values.
4. Open WhatsApp only after explicit visitor action.

### Phase C — Verification

1. Unit-test validation, sanitization, and message construction.
2. Test mobile and desktop keyboard flows.
3. Verify the correct WhatsApp account opens.
4. Confirm no network submission or local persistence occurs.
5. Run lint, typecheck, tests, and production build.

### Phase D — Controlled release

1. Open a feature pull request with screenshots and validation evidence.
2. Create a Vercel preview.
3. Obtain owner approval after preview review.
4. Merge and verify production.
5. Record the release and baseline events in Notion.

## 13. Planned files

- `apps/website/src/app/discovery/page.tsx`
- `apps/website/src/components/discovery-form.tsx`
- `apps/website/src/lib/discovery.ts`
- `apps/website/src/lib/discovery.test.ts`
- updates to homepage, contact page, and site navigation
- documentation updates if behavior differs from this specification

Exact test framework selection belongs to the implementation gate because the
repository currently has no configured test runner.

## 14. Acceptance criteria

- Correct public number: +599 9 523 0683
- No prospect data stored or transmitted by the website
- WhatsApp draft contains the reviewed intake summary
- Visitor controls the final WhatsApp send
- No automatic Notion record creation
- Owner remains the qualification authority
- Analytics contain no personal or form-field data
- Accessible on mobile and desktop
- CI and Vercel preview pass
- Production remains unchanged until a separate release approval

## 15. Explicitly out of scope

- Live form implementation under this gate
- Automatic Notion writes
- Supabase or other database provisioning
- Email delivery
- Calendar booking
- AI-generated qualification decisions
- Automated proposals, prices, outreach, or follow-ups
- Payments
- File uploads
- Production deployment
- External announcements

## 16. Next gate

`OWNER GATE GPTI-LEAD-MVP-2 — APPROVE IMPLEMENTATION ON A FEATURE BRANCH AND
VERCEL PREVIEW ONLY.`

This next gate must not authorize production merge, automatic CRM writes,
outbound messages, pricing commitments, or public announcements.
