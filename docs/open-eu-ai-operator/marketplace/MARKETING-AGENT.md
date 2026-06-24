# Marketing Agent Pack

## Purpose

The Marketing Agent Pack helps SMEs create repeatable AI-assisted marketing workflows for campaigns, content, lead generation, and customer follow-up.

It supports content planning, offer creation, social media, email, WhatsApp, SEO notes, and basic performance review. The agent drafts and organizes. Humans approve public messaging, claims, pricing, and targeting.

## Target Users

| User | Use case |
|---|---|
| SME owner | Weekly content and offers |
| Marketing freelancer | Client campaign delivery |
| Restaurant marketer | Local promotions |
| Real estate marketer | Listing campaigns |
| AI consultant | Marketing OS setup |

## Agents Included

### 1. Campaign Planner Agent

**Role:** Creates 7-day, 14-day, or 30-day campaign plans.

**Inputs:** Offer, audience, channel, goal, deadline, brand tone.

**Outputs:** Campaign brief, content calendar, CTA plan, review checklist.

**Human review:** Required before publishing.

### 2. Content Repurposing Agent

**Role:** Turns one idea into posts, scripts, email copy, carousel outlines, and WhatsApp messages.

**Inputs:** Source idea, platform, audience, tone.

**Outputs:** Multi-channel content pack.

**Human review:** Required before scheduling.

### 3. Offer Builder Agent

**Role:** Helps package business offers with clear value, pricing logic, upsell path, and CTA.

**Inputs:** Product or service, target audience, price range, margin goal.

**Outputs:** Offer structure, headline, benefits, CTA, follow-up copy.

**Human review:** Required for pricing and claims.

### 4. Lead Follow-Up Agent

**Role:** Drafts follow-up sequences for leads, inquiries, abandoned conversations, and warm prospects.

**Inputs:** Lead status, previous message, offer, desired next step.

**Outputs:** Follow-up message, objection reply, next-action reminder.

**Human review:** Required before sending.

### 5. Performance Review Agent

**Role:** Summarizes campaign results and suggests improvements.

**Inputs:** Reach, clicks, replies, bookings, sales, notes.

**Outputs:** Performance summary, insight list, next test.

**Human review:** Required before strategy changes.

## Starter Workflow

```text
Marketing goal
↓
Select campaign type
↓
Generate content pack
↓
Human review
↓
Schedule / publish
↓
Collect results
↓
Review and improve
```

## Notion Fields

| Field | Type |
|---|---|
| Campaign | Title |
| Agent | Select |
| Status | Select |
| Channel | Multi-select |
| Publish Date | Date |
| CTA | Text |
| Human Review | Checkbox |
| Result Notes | Text |

## GitHub Path

```text
docs/open-eu-ai-operator/marketplace/MARKETING-AGENT.md
```

## Guardrails

- Do not publish false claims.
- Do not use customer data without consent.
- Do not create discriminatory targeting.
- Review all public content before posting.
- Mark assumptions and missing information.

## Example Prompt

```text
Act as MarketingOSGPT for a European SME.

Goal:
[describe campaign goal]

Business context:
[offer, audience, channel, brand tone]

Return:
- campaign plan
- content calendar
- draft copy
- CTA
- human review point
- Notion tracking fields
- next action
```
