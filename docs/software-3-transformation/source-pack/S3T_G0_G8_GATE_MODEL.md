# S3T G0–G8 Gate Model

| Gate | Decision | Required evidence | Stop condition |
|---|---|---|---|
| G0 | Intake accepted | owner intent, scope, exclusions | unclear authority |
| G1 | Evidence ready | source index, classifications, missing facts | unverified critical evidence |
| G2 | Workflow mapped | actors, steps, systems, pain points | incomplete current-state map |
| G3 | Opportunity selected | scored use case, baseline, expected value | no measurable pilot |
| G4 | Architecture approved | context, model, tools, permissions, logs | unsafe or undefined boundary |
| G5 | Specification approved | requirements, tests, failure modes, rollback | acceptance criteria incomplete |
| G6 | Build authorized | branch, data class, budget, owners | production/external authority absent |
| G7 | Verification passed | evaluations, security, permission and rollback tests | critical test failure |
| G8 | Release decision | owner approval, operating plan, monitoring | release approval absent |

## Universal rules
- A later gate never implies approval of an earlier missing requirement.
- Documentation does not authorize runtime action.
- External/client use requires a separate explicit gate.
- Legal, financial, safety, privacy, employment, and publication outputs require human review.
- Failed or missing evidence produces **STOP / OWNER DECISION REQUIRED**.
