# Internal Recommendation
**Command ID:** GIC-20261108-901
**Subject:** Should the Pilot Weekly Status Summary Include a KPI Section?
**Prepared by:** Operator Reasoning Layer
**Status:** ADVISORY — Pending deterministic validation and owner review

---

## Recommendation

**Yes — add a KPI section to the weekly status summary, subject to one prerequisite verification.**

The evidence and owner-stated priorities support inclusion. However, one unresolved unknown (U-1) should be confirmed before implementation to avoid duplicating or fragmenting information already present in the repository.

---

## Basis for Recommendation

### Owner Priority (Verified Decision)
E-2 is classified as an **OWNER_DECISION**: operational visibility is the declared Q4 priority. A KPI section in the weekly status summary directly serves this priority by surfacing performance data at the cadence and location where the team already reviews progress. This is the strongest single input to the recommendation.

### Current State of the Summary (Asserted, Not Verified)
E-1 asserts the weekly status summary **currently has no KPI section**. This is classified as an **OWNER_UNVERIFIED_FACT** — it is treated as likely accurate but has not been confirmed by direct artifact inspection. The recommendation proceeds on this basis; if E-1 is incorrect and a KPI section already exists in some form, the recommendation would shift to a formatting or consolidation question rather than an addition question.

### Existing KPI Ledger (Asserted, Not Verified)
E-3 asserts that `kpi-ledger.md` exists in the repository. This is also an **OWNER_UNVERIFIED_FACT**. Its existence is relevant because it suggests KPI data is already being tracked somewhere — which is a prerequisite for a meaningful KPI section in the summary.

---

## Material Conflict / Tension

**C-1** flags a potential tension between E-1 and E-3: a KPI ledger exists, but the summary has no KPI section. These are not contradictory, but they raise a design question:

> Is the intent to **surface a subset of `kpi-ledger.md` within the summary**, or to **create a parallel KPI section** independent of the ledger?

This is not a blocker, but the answer shapes implementation. Surfacing from the ledger is preferable — it avoids data fragmentation and reduces maintenance burden.

---

## Unknowns That Remain Open

| Unknown | Impact on Recommendation |
|---------|--------------------------|
| **U-1** — Whether `kpi-ledger.md` is currently linked to or referenced in the summary | **Moderate.** Determines whether this is an addition or a visibility/formatting fix. Recommend confirming before drafting the section. |
| **U-2** — Format, completeness, and currency of `kpi-ledger.md` | **Moderate.** If the ledger is incomplete or stale, the KPI section will reflect that. A brief ledger review is warranted. |
| **U-3** — Which specific KPIs the owner considers relevant to "operational visibility" | **High for implementation, low for the go/no-go decision.** The recommendation to include a section stands regardless; the owner should specify which KPIs to surface before the section is drafted. |

---

## Options Compared

| Option | Alignment with E-2 | Risk | Notes |
|--------|-------------------|------|-------|
| **A — Add KPI section drawing from `kpi-ledger.md`** | High | Low | Preferred. Centralizes data, reduces duplication. Requires U-1 and U-2 resolved. |
| **B — Add KPI section as standalone (independent of ledger)** | High | Medium | Creates two parallel KPI records; maintenance risk over time. |
| **C — Do not add KPI section** | Low | Low | Inconsistent with E-2. Not recommended unless owner revises Q4 priority. |
| **D — Defer pending full verification of E-1 and E-3** | Neutral | Low | Acceptable if owner prefers certainty before action, but adds delay with no clear benefit given LOW-severity ambiguities. |

**Recommended path: Option A.**

---

## Proposed Next Gate

1. **Verify E-1** — Confirm the current weekly status summary contains no KPI section (direct artifact review).
2. **Verify E-3 / Resolve U-1 and U-2** — Confirm `kpi-ledger.md` exists, assess its completeness and currency, and determine whether it is already referenced in the summary.
3. **Owner input on U-3** — Owner to specify which KPIs should appear in the summary section (e.g., a short list drawn from the ledger).
4. **Draft the KPI section** — Once the above are confirmed, a draft section can be produced for owner review within the pilot summary.

---

## Inference Disclosure

The following are **AI inferences**, not verified facts:
- That surfacing data from an existing ledger is preferable to creating a parallel record (general practice inference; not owner-stated).
- That the ledger, if it exists and is current, would be a suitable source for the summary section.

No external sources were consulted. No owner approval has been granted or implied by this document.

---

*This recommendation is advisory. It must proceed to deterministic validation before owner review.*