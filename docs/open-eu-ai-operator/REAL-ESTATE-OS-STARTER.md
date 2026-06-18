# Real Estate OS Starter

## Purpose
Help real estate developers, brokers, property managers, and investment teams use AI for structured property workflows.

## Target Users
- Real estate developers
- Brokers
- Property managers
- Investor relations teams
- Marketing teams

## Core Use Cases
| Use Case | AI Output | Human Review |
|---|---|---|
| Listing preparation | Listing description, feature summary, social copy | Broker / owner approval |
| Investor readiness | Data room checklist, pitch outline, FAQ | Founder / advisor approval |
| Site analysis | Assumption map, risk questions, opportunity list | Developer approval |
| Lead follow-up | Email / WhatsApp drafts | Sales approval |
| Project tracking | Milestones, decision log, stakeholder map | Project lead approval |

## Starter Workflow
```text
Property / Project Goal
↓
RealEstateOSGPT intake
↓
Classify workflow
↓
Generate structured output
↓
Human review
↓
Publish / send / execute
↓
Log result and next action
```

## Required Inputs
```yaml
inputs:
  project_name: string
  property_type: residential | commercial | hospitality | mixed_use | land
  location: string
  audience: buyer | renter | investor | partner | internal_team
  goal: string
  available_data:
    - size
    - zoning_notes
    - amenities
    - price_or_budget
    - timeline
```

## Example Prompt
```text
Act as RealEstateOSGPT for a European real estate SME.
Create a structured workflow for this goal:
[GOAL]

Include:
- required property inputs
- stakeholder roles
- output template
- human review point
- risk questions
- Notion tracking fields
```

## Notion Tracking Fields
| Field | Type |
|---|---|
| Property / Project | Title |
| Workflow Type | Select |
| Status | Select |
| Owner | Text |
| Audience | Select |
| Review Needed | Checkbox |
| Next Action | Text |
| GitHub Path | Text |

## Automation Ideas
- Weekly lead follow-up list
- Listing content generator
- Investor FAQ builder
- Stakeholder decision log
- Document tracker

## Guardrails
- Do not invent legal, zoning, financial, or ownership facts.
- Mark assumptions clearly.
- Human review is required before publishing listings or investor materials.
- Use fake or anonymized project data for demos.

## v0.1 Success Criteria
A real estate SME can create one listing, investor checklist, or project workflow in one day.