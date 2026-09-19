# S3T Controlled Source Index

**Pack version:** 1.2  
**Gate:** S3T-SOURCEPACK-1/2; control alignment under S3T-CONTROL-ALIGN-1  
**Classification:** Internal operating guidance suitable for the public repository; no secrets or live data  
**Canonical branch:** `main`  
**Last reviewed:** 2026-09-19

| File | Authority | Purpose |
|---|---|---|
| S3T_SYSTEM_OVERVIEW.md | Core | architecture and boundaries |
| S3T_G0_G8_GATE_MODEL.md | Core | transformation approval gates |
| S3T_KPI_DICTIONARY.md | Core | KPI definitions and reporting rules |
| S3T_PROJECT_REGISTRY.md | Registry | project participation and connection state |
| S3T_EVIDENCE_POLICY.md | Core | evidence and data controls |
| S3T_MONTHLY_REVIEW_TEMPLATE.md | Template | recurring governance review |
| HOSPITALITY_OS_ADAPTER.md | Adapter | reusable hospitality capability boundary |
| BOSSA_AI_OS_ADAPTER.md | Adapter | BOSSA demo/read-only boundary |
| GPT_INNOVATION_OS_ADAPTER.md | Adapter | implementation-owner contract |
| SAHID_AI_HUB_ADAPTER.md | Adapter | portfolio observability and evidence reconciliation |
| SOURCE_INDEX.md | Index | pack manifest and precedence |

## Reconciled control status

- `main` is the canonical version-controlled source.
- PR #11 is the historical initial S3T package.
- PR #18 is the merged controlled source-pack successor.
- PR #20 represents the owner-approved G6 controlled build.
- G5 is ratified as `S3-G5-v1.0` through approval record `GIC-20260905-PRIORITY-001`.
- G7B evidence is limited to FIX-005, FIX-006, and FIX-007; it does not establish complete G7 acceptance.
- No originating version-bound G8 owner gate was located during S3T-RECONCILE-1. G8, production, external, client, and autonomous-action authority must not be inferred.

## Precedence

The canonical Software 3.0 prompt and version-bound approved owner gates override examples in this pack. Project-specific verified evidence overrides generic adapter descriptions. The S3T Owner Gate & Decision Log records the reconciled gate history. If controlled sources conflict, stop and request an owner decision.

## Update process

Change via feature branch and pull request; record material decisions in Notion; update version/date; rerun applicable validation; never treat an unmerged draft, a documentation artifact, or a limited evaluation result as production or G8 authority.
