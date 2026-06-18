# AI System Card Template

Use one card per deployed AI system. Complete all sections before go-live.
File under: `docs/systems/<system-slug>/SYSTEM-CARD.md`

---

## System Identity

| Field | Value |
|---|---|
| **System name** | |
| **Version** | |
| **Operator** | |
| **Deployment date** | |
| **Last reviewed** | |
| **Responsible person** | |
| **Contact** | |

---

## Purpose and Functionality

### What does this system do?

<!-- One paragraph. Plain language. Assume the reader is not technical. -->

### What decisions does it make or inform?

<!-- List each decision type. Note whether the output is a recommendation or a final decision. -->

### What does it explicitly NOT do?

<!-- Scope boundaries. Reduces misuse. -->

---

## Risk Classification (EU AI Act)

| Field | Value |
|---|---|
| **Risk tier** | ☐ Minimal  ☐ Limited  ☐ High  ☐ Unacceptable |
| **Classification rationale** | |
| **Sector / use case** | |
| **Affects fundamental rights?** | ☐ Yes  ☐ No |
| **Used in employment, credit, education, or law enforcement?** | ☐ Yes  ☐ No |

> If High risk: conformity assessment, technical documentation, and registration in the EU AI database are required before deployment.

---

## Data

### Input data

| Data type | Source | Personal data? | Legal basis (if personal) |
|---|---|---|---|
| | | ☐ Yes  ☐ No | |
| | | ☐ Yes  ☐ No | |

### Output data

| Output type | Stored? | Retention period | Who can access? |
|---|---|---|---|
| | ☐ Yes  ☐ No | | |

### Training data (if applicable)

| Field | Value |
|---|---|
| Training data source | |
| Personal data in training set? | ☐ Yes  ☐ No  ☐ Unknown |
| Bias assessment completed? | ☐ Yes  ☐ No  ☐ N/A |

---

## Human Oversight

| Field | Value |
|---|---|
| **Human-in-the-loop?** | ☐ Always  ☐ On exception  ☐ Never |
| **Who reviews AI outputs before they reach end users?** | |
| **Escalation path when output is uncertain or incorrect?** | |
| **Can a human override or reject the AI output?** | ☐ Yes  ☐ No |

---

## Transparency Obligations

| Obligation | Status |
|---|---|
| Users are informed they are interacting with an AI | ☐ Done  ☐ Pending  ☐ N/A |
| Disclosure is visible before first interaction | ☐ Done  ☐ Pending  ☐ N/A |
| Output is labelled as AI-generated where required | ☐ Done  ☐ Pending  ☐ N/A |
| Privacy notice references this system | ☐ Done  ☐ Pending  ☐ N/A |

---

## Limitations and Known Risks

<!-- List known failure modes, edge cases, or accuracy limitations. Be specific. -->

| Risk | Likelihood | Mitigation |
|---|---|---|
| | ☐ Low  ☐ Med  ☐ High | |
| | ☐ Low  ☐ Med  ☐ High | |

---

## Incident Log

| Date | Description | Severity | Resolved? |
|---|---|---|---|
| | | ☐ Low  ☐ Med  ☐ High | ☐ Yes  ☐ No |

---

## Review History

| Date | Reviewer | Changes |
|---|---|---|
| | | |

---

## Sign-off

By completing this card, the responsible person confirms that the system has been assessed against the obligations listed above and that the information is accurate to the best of their knowledge.

| Field | Value |
|---|---|
| **Name** | |
| **Role** | |
| **Date** | |
