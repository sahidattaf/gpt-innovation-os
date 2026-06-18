# EU AI Act Readiness Checklist

> This checklist is for practical readiness and education. It is not legal advice.

## 1. Use Case Classification
For each AI workflow, classify the use case:

| Workflow | Sector | User | Risk Notes | Human Review Needed |
|---|---|---|---|---|
| Marketing content | SME marketing | Owner / marketer | Low-risk content generation | Yes before publishing |
| Reservation support | Hospitality | Staff / guest | Customer service support | Yes for complaints |
| Real estate listing drafts | Real estate | Broker / developer | Must avoid misleading claims | Yes before publishing |
| Investor draft docs | Business development | Founder | Financial claims need review | Yes always |

## 2. Transparency
- [ ] Users know when AI is used.
- [ ] AI-generated content is reviewed before publication.
- [ ] Public-facing chatbots identify themselves as AI assistants.
- [ ] Business decisions are not delegated blindly to AI.

## 3. Human Oversight
- [ ] Assign a human owner per workflow.
- [ ] Require review before external sending.
- [ ] Define when the AI must escalate.
- [ ] Keep final responsibility with the business operator.

## 4. Data Governance
- [ ] Use anonymized demo data.
- [ ] Avoid sensitive personal data unless necessary.
- [ ] Keep prompt logs only when useful and permitted.
- [ ] Separate test data from production data.

## 5. Content Safety
- [ ] Check for false claims.
- [ ] Check for discriminatory language.
- [ ] Check for misleading financial promises.
- [ ] Check for copyrighted material issues.

## 6. Documentation
Each agent should document:

```yaml
ai_system_card:
  name: Agent name
  purpose: What it does
  intended_users: Who should use it
  limitations: What it should not do
  required_human_review: When humans must approve
  data_used: Data categories
  output_types: Docs, checklists, campaigns, dashboards
```

## 7. SME Deployment Rule
Default rule for Open EU AI Operator:

```text
AI can draft, organize, summarize, classify, and recommend.
Humans approve, publish, sign, hire, fire, diagnose, invest, and legally commit.
```

## 8. v0.1 Safety Gate
Before a workflow becomes public:
- [ ] Agent purpose is clear.
- [ ] Input data is minimal.
- [ ] Output limitations are stated.
- [ ] Human review rule is defined.
- [ ] Compliance notes are included.
