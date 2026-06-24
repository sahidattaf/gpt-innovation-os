# Real Estate Agent Pack

## Purpose

The Real Estate Agent Pack helps brokers, developers, property managers, and real estate marketers use AI for structured property workflows.

It focuses on listings, lead follow-up, investor readiness, property research, stakeholder updates, and documentation. The agents assist with drafting, organizing, summarizing, and routing work. Humans remain responsible for pricing, legal claims, financial promises, contracts, and final publication.

## Target Users

| User | Use case |
|---|---|
| Broker | Listings and lead follow-up |
| Developer | Investor and project docs |
| Property manager | Tenant and owner updates |
| Real estate marketer | Campaigns and content |
| Consultant | Client delivery workflows |

## Agents Included

### 1. Listing Builder Agent

**Role:** Creates listing descriptions, feature summaries, social captions, and brochure drafts.

**Inputs:** Property type, location, size, features, photos notes, target buyer.

**Outputs:** Listing draft, short caption, long description, highlights list.

**Human review:** Required before publication.

### 2. Lead Follow-Up Agent

**Role:** Drafts WhatsApp, email, or CRM follow-up messages for buyers, sellers, renters, or investors.

**Inputs:** Lead stage, client interest, property match, last contact date.

**Outputs:** Follow-up message, call agenda, next action.

**Human review:** Required before sending.

### 3. Investor Readiness Agent

**Role:** Prepares investor data room checklists, project summaries, FAQs, and decision logs.

**Inputs:** Project details, timeline, capital need, available documents.

**Outputs:** Data room checklist, investor FAQ, pitch outline, open questions.

**Human review:** Always required.

### 4. Property Research Agent

**Role:** Organizes research questions and assumptions for zoning, market, comparable properties, and infrastructure.

**Inputs:** Location, project type, assumptions, known constraints.

**Outputs:** Research brief, assumption map, risk questions, source checklist.

**Human review:** Required for factual, legal, or financial claims.

### 5. Stakeholder Update Agent

**Role:** Converts project progress into clear updates for owners, partners, investors, or internal teams.

**Inputs:** Progress notes, blockers, decisions needed, timeline.

**Outputs:** Update memo, decision request, next-step list.

**Human review:** Required before external sharing.

## Starter Workflow

```text
Real estate request
↓
Classify workflow
↓
Select agent
↓
Generate structured draft
↓
Flag assumptions
↓
Human review
↓
Publish / send / execute
↓
Log next action
```

## Notion Fields

| Field | Type |
|---|---|
| Property / Project | Title |
| Agent | Select |
| Status | Select |
| Audience | Select |
| Review Needed | Checkbox |
| Risk Level | Select |
| Next Action | Text |
| GitHub Path | Text |

## GitHub Path

```text
docs/open-eu-ai-operator/marketplace/REAL-ESTATE-AGENT.md
```

## Guardrails

- Do not invent legal, zoning, title, ownership, or permit facts.
- Do not make financial guarantees.
- Mark assumptions clearly.
- Use fake or anonymized property data for demos.
- Require human approval before publishing listings, investor docs, or stakeholder memos.

## Example Prompt

```text
Act as RealEstateOSGPT for a European SME real estate operator.

Goal:
[describe the real estate task]

Project context:
[property type, location, audience, constraints]

Return:
- recommended workflow
- required inputs
- draft output
- assumptions to verify
- human review point
- Notion tracking fields
- next action
```
