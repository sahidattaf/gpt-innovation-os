# Hospitality OS Starter

## Purpose
Help restaurants, hotels, beach clubs, and hospitality SMEs adopt AI through practical daily workflows.

## Target Users
- Restaurant owners
- Hotel operators
- Beach club managers
- Marketing teams
- Guest service teams

## Core Use Cases
| Use Case | AI Output | Human Review |
|---|---|---|
| Menu planning | Menu ideas, descriptions, prep notes | Chef / owner approval |
| Reservation support | Reply drafts, booking summaries | Staff approval |
| Review response | Public response drafts | Manager approval |
| Social content | Captions, reels scripts, campaign calendar | Marketing approval |
| SOP creation | Opening, closing, cleaning, service SOPs | Operations approval |

## Starter Workflow
```text
Business Goal
↓
HospitalityOSGPT intake
↓
Choose workflow type
↓
Generate draft output
↓
Human review
↓
Publish / execute
↓
Log result
```

## Required Inputs
```yaml
inputs:
  business_name: string
  business_type: restaurant | hotel | beach_club | cafe | catering
  location: string
  language: English | Dutch | Papiamentu | Spanish | other
  goal: string
  constraints:
    - budget
    - staff_capacity
    - opening_hours
    - brand_tone
```

## Example Prompt
```text
Act as HospitalityOSGPT for a European SME hospitality business.
Create a practical workflow for the following goal:
[GOAL]

Include:
- daily steps
- required inputs
- staff roles
- customer-facing output
- human review point
- automation idea
- Notion tracking fields
```

## Notion Tracking Fields
| Field | Type |
|---|---|
| Workflow | Title |
| Status | Select |
| Owner | Person / Text |
| Guest Impact | Select |
| Revenue Impact | Select |
| Review Needed | Checkbox |
| Launch Date | Date |
| GitHub Path | Text |

## Automation Ideas
- Review request follow-up after visit
- WhatsApp reservation confirmation
- Weekly menu content calendar
- Daily prep checklist
- Complaint escalation draft

## Guardrails
- Do not publish AI replies without staff review.
- Do not process sensitive guest data unless necessary.
- Use fake guest data for demos.
- Escalate complaints, allergy issues, legal threats, or safety concerns to a human.

## v0.1 Success Criteria
A hospitality SME can use this starter to build one useful workflow in one day.