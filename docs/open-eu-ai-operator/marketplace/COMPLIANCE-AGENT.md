# Compliance Agent Pack

## Purpose

The Compliance Agent Pack helps SMEs document AI systems, map data usage, classify risks, and prepare for EU AI Act and GDPR readiness.

This pack is not legal advice. It gives operators a practical documentation layer so they can prepare for review, reduce risk, and know when to ask a qualified legal professional.

## Target Users

| User | Use case |
|---|---|
| AI consultant | Client compliance setup |
| SME owner | Internal AI governance |
| SaaS founder | EU product readiness |
| Agency operator | Repeatable delivery standards |
| Project manager | Documentation and audit trail |

## Agents Included

### 1. AI System Card Agent

**Role:** Creates one system card per AI system.

**Inputs:** System name, purpose, users, outputs, data used, risk notes.

**Outputs:** AI system card draft, review checklist, missing items.

**Human review:** Required before go-live.

### 2. Data Map Agent

**Role:** Maps personal data, purpose, legal basis, retention, and processors.

**Inputs:** Data fields, user groups, tools, storage, retention rules.

**Outputs:** Data map, processor list, risk notes.

**Human review:** Required from responsible person.

### 3. Risk Classification Agent

**Role:** Helps classify whether an AI workflow is minimal, limited, high-risk, or unacceptable.

**Inputs:** Use case, sector, affected users, decision impact.

**Outputs:** Risk tier recommendation, rationale, review flags.

**Human review:** Always required.

### 4. Transparency Notice Agent

**Role:** Drafts user-facing AI disclosure notices.

**Inputs:** AI role, user interaction, data usage, limitations.

**Outputs:** Plain-language notice, footer copy, chatbot disclosure.

**Human review:** Required before publication.

### 5. Incident Log Agent

**Role:** Creates a structured incident log for AI errors, bias issues, safety concerns, or user complaints.

**Inputs:** Incident description, date, affected system, severity, action taken.

**Outputs:** Incident record, escalation path, follow-up task.

**Human review:** Required.

## Starter Workflow

```text
AI system / workflow
↓
Create system card
↓
Create data map
↓
Classify risk
↓
Draft transparency notice
↓
Add incident log process
↓
Human review
↓
Go-live / hold
```

## Notion Fields

| Field | Type |
|---|---|
| AI System | Title |
| Risk Tier | Select |
| Data Map Complete | Checkbox |
| System Card Complete | Checkbox |
| Review Owner | Text |
| Last Reviewed | Date |
| Status | Select |
| GitHub Path | Text |

## GitHub Path

```text
docs/open-eu-ai-operator/marketplace/COMPLIANCE-AGENT.md
```

## Guardrails

- This is readiness guidance, not legal advice.
- Always escalate high-risk or unclear classifications.
- Do not store unnecessary private data.
- Keep audit logs for important AI-assisted outputs.
- Review quarterly or when a workflow changes.

## Example Prompt

```text
Act as ComplianceOSGPT for a European SME.

System context:
[name, purpose, users, outputs, data used]

Return:
- AI system card draft
- data map checklist
- risk classification recommendation
- human review point
- transparency notice draft
- missing information
- next action
```
