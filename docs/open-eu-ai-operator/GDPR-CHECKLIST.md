# GDPR Readiness Checklist

> This checklist is for operational readiness and education. It is not legal advice.

## 1. Data Inventory
- [ ] List all personal data collected.
- [ ] Identify why each data type is collected.
- [ ] Identify where data is stored.
- [ ] Identify who can access the data.
- [ ] Identify how long data is retained.

## 2. Lawful Basis
For every workflow, define the basis:

| Workflow | Data Used | Purpose | Lawful Basis | Retention |
|---|---|---|---|---|
| Lead capture | Name, email, phone | Follow-up | Consent / legitimate interest | TBD |
| Reservation | Name, phone, booking info | Service delivery | Contract | TBD |
| Marketing | Email, preference | Campaigns | Consent | TBD |

## 3. Consent
- [ ] Consent language is clear.
- [ ] Consent is optional where required.
- [ ] Withdrawal is possible.
- [ ] Marketing consent is separated from service communication.

## 4. Data Minimization
- [ ] Demo workflows use fake data.
- [ ] Agents do not request unnecessary personal data.
- [ ] Sensitive data is excluded unless absolutely required.

## 5. Access Control
- [ ] Admin access is limited.
- [ ] Staff permissions are role-based.
- [ ] Shared accounts are avoided.
- [ ] Offboarding removes access.

## 6. Data Subject Rights
Prepare a process for:
- [ ] Access request
- [ ] Correction request
- [ ] Deletion request
- [ ] Export request
- [ ] Objection request

## 7. Processor Map
| Tool | Purpose | Data Shared | Processor Agreement Needed |
|---|---|---|---|
| Notion | Project management | Business docs | Yes |
| Supabase | Database | App data | Yes |
| OpenAI / LLM provider | AI processing | Prompt data | Review needed |
| Email/CRM | Communication | Contact data | Yes |

## 8. Incident Response
- [ ] Name incident owner.
- [ ] Define escalation path.
- [ ] Keep incident log.
- [ ] Prepare user notification process.

## 9. AI-Specific Privacy Rules
- [ ] Avoid uploading private customer data into public prompts.
- [ ] Use anonymized examples for demos.
- [ ] Log agent outputs without sensitive raw inputs when possible.
- [ ] Review generated content before sending externally.

## v0.1 Output
Each business using Open EU AI Operator should have:
- Data map
- Tool map
- Access control map
- Retention notes
- Incident response owner
