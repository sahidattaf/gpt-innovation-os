# Contributing to Open EU AI Operator

Thank you for helping build an open-source AI operator layer for European SMEs.

## Contribution Areas

| Area | Examples |
|---|---|
| Agents | New prompts, system cards, routing logic |
| Workflows | Hospitality, real estate, marketing, compliance workflows |
| Templates | Notion, Supabase, Markdown, YAML, JSON |
| Docs | Setup guides, examples, explainers |
| Compliance | Practical checklists, documentation patterns |
| Demos | SME examples using fake data |

## Contribution Rules

### 1. Use fake or anonymized data
Do not submit customer names, emails, phone numbers, contracts, medical data, financial account details, or private business records.

### 2. Keep outputs practical
Every contribution should help a real SME operator do something useful.

### 3. Include human review gates
If a workflow creates public, legal, financial, hiring, customer, or investor-facing content, include a human approval step.

### 4. Do not claim legal advice
Compliance documents may support readiness, but they are not legal advice.

### 5. Prefer reusable formats
Good contributions often include:
- Markdown docs
- YAML agent cards
- JSON config examples
- SQL schema examples
- Notion-ready tables

## File Naming
Use clear names:

```text
AGENT-NAME.md
WORKFLOW-NAME.md
CHECKLIST-NAME.md
TEMPLATE-NAME.yaml
schema-name.sql
```

## Pull Request Checklist
Before opening a pull request:

- [ ] The file has a clear purpose.
- [ ] No private data is included.
- [ ] The workflow has a human review point.
- [ ] The content is useful for SMEs.
- [ ] Compliance claims are cautious.
- [ ] The contribution fits the roadmap.

## Local Review
For documentation-only changes:

```bash
git status
git diff
git add docs/open-eu-ai-operator/
git commit -m "Improve Open EU AI Operator docs"
git push origin your-branch
```

## Community Standard
Build with clarity, privacy, usefulness, and respect for local European business contexts.
