# Hospitality Agent Pack

## Purpose

The Hospitality Agent Pack helps restaurants, hotels, beach clubs, guest houses, and tourism operators use AI for practical daily workflows.

It focuses on guest service, reservations, reviews, menus, SOPs, offers, and operational follow-up. The goal is not to replace hospitality staff. The goal is to reduce repetitive work, improve response speed, and keep humans in control of guest-facing decisions.

## Target Users

| User | Use case |
|---|---|
| Restaurant owner | Menu, offers, reviews |
| Hotel operator | Guest messaging, concierge |
| Beach club manager | Events, bookings, service SOPs |
| Hospitality consultant | Client workflows |
| Marketing team | Campaigns and content |

## Agents Included

### 1. Reservation Assistant

**Role:** Helps draft booking replies, confirmations, reminders, and schedule summaries.

**Inputs:** Date, time, party size, guest name, special requests.

**Outputs:** Guest reply draft, internal booking note, follow-up reminder.

**Human review:** Required before sending guest-facing messages.

### 2. Guest Concierge Agent

**Role:** Answers common guest questions and recommends approved experiences, menu items, or local services.

**Inputs:** Guest question, business details, approved recommendations.

**Outputs:** Reply draft, upsell option, escalation note.

**Human review:** Required for complaints, allergy questions, safety issues, refunds, or legal threats.

### 3. Review Response Agent

**Role:** Drafts polite, brand-safe responses to Google, TripAdvisor, social media, or booking-platform reviews.

**Inputs:** Review text, rating, guest concern, brand tone.

**Outputs:** Public response draft, internal improvement note.

**Human review:** Always required before publishing.

### 4. Menu & Offer Agent

**Role:** Creates menu descriptions, weekend specials, bundles, and promotional offers.

**Inputs:** Dishes, prices, margin goals, brand style, target audience.

**Outputs:** Menu copy, offer structure, upsell logic, campaign text.

**Human review:** Required from owner, chef, or manager.

### 5. SOP Builder Agent

**Role:** Builds practical SOPs for opening, closing, prep, cleaning, service flow, and handover.

**Inputs:** Task description, role, location, quality standard.

**Outputs:** SOP checklist, training note, escalation rules.

**Human review:** Required from operations lead.

## Starter Workflow

```text
Hospitality request
↓
Classify request type
↓
Route to correct agent
↓
Generate draft
↓
Human review
↓
Publish / execute
↓
Log result
```

## Notion Fields

| Field | Type |
|---|---|
| Workflow | Title |
| Agent | Select |
| Status | Select |
| Owner | Text |
| Channel | Select |
| Human Review | Checkbox |
| Due Date | Date |
| Result Notes | Text |

## GitHub Path

```text
docs/open-eu-ai-operator/marketplace/HOSPITALITY-AGENT.md
```

## Guardrails

- Do not send guest-facing messages without human approval.
- Do not process allergy, safety, refund, or legal issues automatically.
- Do not upload private guest data into public prompts.
- Use fake data for demos.
- Keep a record of AI-assisted responses when used for public reviews.

## Example Prompt

```text
Act as HospitalityOSGPT for a European SME hospitality business.

Goal:
[describe the hospitality task]

Business context:
[name, location, offer, audience]

Return:
- recommended workflow
- draft output
- human review point
- Notion tracking fields
- risk notes
- next action
```
