# Internal Recommendation — GIC-20261108-901 v2

**Subject:** KPI Section in Pilot Weekly Status Summary — Inclusion & Cadence
**Prepared by:** Operator Reasoning · Advisory Only · Pending Owner Review
**Status:** Not owner-approved

---

## Recommendation Summary

**Include a KPI section** in the pilot weekly status summary.
**Cadence:** Updated and published weekly (end of week); reviewed by owner at the weekly summary review.

---

## Objective 1 — Should the KPI Section Be Included?

### Recommendation: YES

**Governing decision (E-2 — OWNER_DECISION):** The owner has declared operational visibility as the Q4 priority. A KPI section directly serves this declared intent and is the strongest basis for this recommendation.

**Supporting context (E-1, E-3 — OWNER_UNVERIFIED_FACTS):** The weekly status summary currently has no KPI section (E-1), and a KPI ledger (`kpi-ledger.md`) is asserted to exist in the repository (E-3). If both are accurate, a gap exists between available data and its visibility in the summary — a gap the KPI section would close.

**Material conflict to preserve (C-1):** The relationship between `kpi-ledger.md` and the weekly summary is unresolved. The KPI section design should not assume the ledger is the source of record until that relationship is confirmed.

**Unknowns that do not block the recommendation but must be resolved in implementation:**

| Unknown | Impact if Unresolved |
|---|---|
| U-2: Content/structure of `kpi-ledger.md` | Section design may need revision once ledger is inspected |
| U-3: Which KPIs define "operational visibility" | Section will be incomplete without owner-defined metric list |
| U-1: Whether summary has ever linked to ledger | Determines whether integration is new work or a restoration |

---

## Objective 2 — What Cadence?

### Recommendation: Weekly update + weekly owner review (aligned to existing summary rhythm)

**Rationale:** The pilot summary is already weekly. Introducing a separate sub-cadence (e.g., bi-weekly review of the KPI section) adds coordination overhead with no evident benefit during a pilot phase. Aligning KPI updates to the existing weekly cycle keeps the process simple and directly supports continuous operational visibility (E-2).

**Proposed rhythm:**

| Step | Timing | Owner Action |
|---|---|---|
| KPI data gathered & section drafted | Mid-week | None required |
| KPI section published with weekly summary | End of week (e.g., Friday) | Review at summary read |
| Cadence itself reviewed | End of pilot | Owner decides whether to adjust frequency |

**AMB-02 note (non-blocking):** If the owner intends a mid-week update *in addition to* the end-of-week publication, that is feasible but adds a second touchpoint. This recommendation defaults to the simpler single-update model absent further direction.

---

## Options Considered

| Option | Pros | Cons |
|---|---|---|
| **Include KPI section (recommended)** | Directly serves E-2; closes visibility gap; leverages existing ledger asset | Requires resolving U-2, U-3 before section is meaningful |
| **Exclude KPI section** | No implementation work | Contradicts declared Q4 priority; leaves operational visibility gap |
| **Separate KPI report (not in summary)** | Keeps summary concise | Fragments information; reduces visibility at point of weekly review |

---

## Risks

| Risk | Likelihood | Mitigation |
|---|---|---|
| `kpi-ledger.md` does not exist or is outdated (E-3 unverified) | Medium | Verify file before designing section |
| KPI metrics undefined (U-3) | High | Owner to specify metric list before first publication |
| Page constraint exceeded (AMB-01) | Low | KPI section should be a compact table; confirm format with owner |

---

## Proposed Next Gate

1. **Owner confirms** metric list for "operational visibility" (resolves U-3).
2. **Artifact inspection** of `kpi-ledger.md` and current weekly summary (resolves U-1, U-2, C-1).
3. **Owner confirms** single end-of-week update model or requests mid-week addition (resolves AMB-02).
4. **Owner confirms** one-page constraint holds or adjusts (resolves AMB-01).

*This document is advisory. No action has been taken. Proceed to deterministic validation, then owner review.*