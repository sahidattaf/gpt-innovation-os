# S3T KPI Dictionary

Targets are acceptance thresholds, not claims of achieved performance.

| KPI | Definition | Target | Evidence source | Owner |
|---|---|---:|---|---|
| Evidence classification completeness | classified sources / reviewed sources | 100% | source index | Project owner |
| Unauthorized actions | actions outside the active gate | 0 | decision and action logs | Coach Sahid |
| High-impact review coverage | reviewed high-impact outputs / high-impact outputs | 100% | approval log | Coach Sahid |
| Grounding pass rate | supported material claims / tested material claims | >=95% | evaluation fixtures | S3T operator |
| Critical hallucinations | unsupported critical claims | 0 | evaluation report | S3T operator |
| Workflow cycle-time change | baseline time vs controlled pilot time | establish baseline first | workflow log | Project owner |
| Gate traceability | deliverables linked to gate evidence | 100% | Notion/GitHub | S3T operator |
| Rollback readiness | tested rollback controls / required controls | 100% before G8 | verification report | Technical owner |

## Reporting
Report numerator, denominator, measurement date, source, and confidence. Write **Actual unavailable** when evidence is absent. Never convert a target into an actual.
