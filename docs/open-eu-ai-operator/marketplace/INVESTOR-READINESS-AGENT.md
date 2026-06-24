# Investor Readiness Agent Pack

## Purpose

The Investor Readiness Agent Pack helps founders, real estate developers, SME operators, and AI consultants prepare clearer investor materials.

It focuses on pitch structure, data room readiness, investor FAQs, project summaries, and due diligence tracking. It does not replace financial, legal, tax, or securities advice. Humans must review all investor-facing materials.

## Target Users

| User | Use case |
|---|---|
| Founder | Fundraising prep |
| Real estate developer | Project investment package |
| SME operator | Partner readiness |
| AI consultant | Client investor docs |
| Project lead | Data room tracking |

## Agents Included

### 1. Pitch Outline Agent

**Role:** Converts a business or project idea into a structured pitch outline.

**Inputs:** Problem, solution, audience, traction, team, ask.

**Outputs:** Pitch outline, missing data list, story angle.

**Human review:** Always required.

### 2. Data Room Checklist Agent

**Role:** Creates a due diligence checklist for documents, contracts, financials, project files, compliance docs, and governance records.

**Inputs:** Company or project type, stage, investor audience.

**Outputs:** Data room checklist, folder structure, missing documents.

**Human review:** Required from founder or advisor.

### 3. Investor FAQ Agent

**Role:** Prepares answers to likely investor questions.

**Inputs:** Business model, risks, numbers, market, plan.

**Outputs:** FAQ draft, risk answer bank, open questions.

**Human review:** Required before sharing.

### 4. Project Summary Agent

**Role:** Creates concise one-page summaries for real estate, hospitality, AI products, or SME ventures.

**Inputs:** Project name, vision, location, budget, timeline, partners.

**Outputs:** One-page brief, executive summary, next-step request.

**Human review:** Required.

### 5. Decision Log Agent

**Role:** Tracks investor-related decisions, assumptions, unresolved questions, and follow-ups.

**Inputs:** Meeting notes, decisions, blockers, deadlines.

**Outputs:** Decision log, action items, follow-up schedule.

**Human review:** Required.

## Starter Workflow

```text
Project / business idea
↓
Create project summary
↓
Create pitch outline
↓
Create data room checklist
↓
Create investor FAQ
↓
Track decisions and gaps
↓
Human review
↓
Prepare outreach or meeting
```

## Notion Fields

| Field | Type |
|---|---|
| Project | Title |
| Agent | Select |
| Status | Select |
| Investor Stage | Select |
| Missing Docs | Text |
| Review Owner | Text |
| Due Date | Date |
| GitHub Path | Text |

## GitHub Path

```text
docs/open-eu-ai-operator/marketplace/INVESTOR-READINESS-AGENT.md
```

## Guardrails

- Do not invent financial facts.
- Do not create legal, tax, or securities advice.
- Mark assumptions clearly.
- Require human review before investor sharing.
- Keep sensitive documents outside public repos.
- Use anonymized demos only.

## Example Prompt

```text
Act as InvestorReadinessGPT for a European SME or real estate project.

Project context:
[name, sector, stage, audience, goal]

Return:
- project summary
- pitch outline
- data room checklist
- investor FAQ
- missing information
- human review point
- next action
```
