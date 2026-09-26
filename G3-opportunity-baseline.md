# G3 — Opportunity Baseline
**Project:** Software 3.0 Transformer (S3T) — S3T-001  
**Owner:** Coach Sahid Attaf  
**Gate:** G3 (Opportunity Prioritization & Pilot Selection)  
**Status:** DRAFT — pending owner scoring input  
**Date:** 2026-09-25  
**Evidence class:** OWNER_UNVERIFIED (scores pending) → OWNER_DECISION (after sign-off)

---

## 1. Purpose
Rank all candidate workflow opportunities for the GPT Innovation Operator Command Center pilot. Select ONE internal pilot. Capture pre-implementation baseline KPIs.

## 2. Scoring Framework
Each dimension is scored 1–5. Weighted total determines rank.

| Dimension | Weight | Definition |
|-----------|--------|------------|
| Business Value | 25% | Revenue / cost / strategic impact |
| Frequency | 15% | How often the workflow runs |
| Time Saved | 20% | Hours saved per execution × frequency |
| Readiness | 20% | Data, tools, permissions currently available |
| Risk (inverse) | 20% | 5 = low risk, 1 = high risk |

**Total Score** = (BV × 0.25) + (FQ × 0.15) + (TS × 0.20) + (RD × 0.20) + (RK × 0.20)

## 3. Opportunity Matrix

| # | Workflow Opportunity | BV | FQ | TS | RD | RK | Total | Rank |
|---|----------------------|----|----|----|----|----|-------|------|
| 1 | GPT Innovation Operator Command Center — daily ops briefing | _ | _ | _ | _ | _ | _ | _ |
| 2 | Notion ↔ GitHub evidence sync automation | _ | _ | _ | _ | _ | _ | _ |
| 3 | Prompt contract validation & version binding | _ | _ | _ | _ | _ | _ | _ |
| 4 | KPI ledger auto-capture from commands | _ | _ | _ | _ | _ | _ | _ |
| 5 | Rollback trigger & audit preservation | _ | _ | _ | _ | _ | _ | _ |
| 6 | Client intake & scope drafting (gated) | _ | _ | _ | _ | _ | _ | _ |
| 7 | Fixture-based evaluation harness (FIX-001–012) | _ | _ | _ | _ | _ | _ | _ |
| 8 | Security & permission enforcement test runner | _ | _ | _ | _ | _ | _ | _ |

**Instructions for owner:** Replace `_` with integer scores 1–5. Total is computed. Rank top → bottom.

## 4. Selected Pilot

**Pilot:** _________________________  
**Rationale:** _________________________  
**Owner sign-off:** ⬜ Pending  ⬜ Approved  
**Owner gate:** `OWNER GATE S3-G3-PILOT: APPROVED`

## 5. Pre-Implementation Baseline KPIs

Capture current state BEFORE automation. These are the "before" numbers.

| KPI | Current Baseline | Target (post-pilot) | Measurement Method |
|-----|------------------|---------------------|---------------------|
| Avg command processing time | ___ min | ___ min | Timestamp log per command |
| Rework rate | ___ % | < 5% | Output Queue count of returns |
| Evidence completeness | ___ % | ≥ 95% | Audit log review |
| Approval bypass incidents | ___ / week | 0 | Decision Log |
| Defects per 100 commands | ___ | < 2 | Post-release review |
| Cost per command (XCG) | ___ | ___ | AIRun cost log |
| Latency p95 (sec) | ___ | ___ | AIRun latency log |

## 6. Exclusions (per default controls)
- BOSSA, Kai Kòrsou, Sea Horizon
- Confidential client operations
- External sales / client delivery (separately gated)
- Any production system outside Command Center

## 7. Evidence & Sources
- Notion: Software 3.0 Transformation OS — S3T-001
- Repo: `sahidattaf/gpt-innovation-os`
- Fixtures: FIX-001 → FIX-012
- Operating SOPs: control-policy.yaml, contracts.schema.json

## 8. Next Gate
**G3 → G4:** Owner approval of ranked matrix + selected pilot.  
**Required evidence:** Signed scoring matrix + baseline KPI values.

---

## Papiamentu Summary
E dokumentu aki ta rankea tur oportunidat di workflow pa e pilot di GPT Innovation Operator Command Center. Kada oportunidat ta wordu puntuá riba 5 dimenshon. Esun ku puntahe mas haltu ta e pilot selektá. Antes di implementashon, e KPI-nan baseline ta wordu kapturá pa kompará despues. Aprobashon di doño ta nesesario pa pasa pa G4.
