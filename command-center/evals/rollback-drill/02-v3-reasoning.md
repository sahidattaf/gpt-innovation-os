# Internal Recommendation — GIC-20261108-901 v3

**Subject:** KPI Section in Pilot Weekly Status Summary — Inclusion & Cadence
**Status:** Advisory — Pending deterministic validation and owner review
**Scope:** GPT Innovation Command Center only

---

## 1. Recommendation Summary

| Question | Recommendation |
|---|---|
| Include a KPI section in the weekly status summary? | **Yes — include** |
| Update frequency | **Weekly, aligned to summary publication** |
| Review frequency | **Weekly, at the same cadence as the summary** |

---

## 2. Basis for Inclusion Recommendation

**Supporting the recommendation:**

- **E-2 (Owner Decision):** The owner has declared operational visibility as the Q4 priority. A KPI section directly serves this declared objective. This is the strongest input available and carries decision authority.
- **E-1 (Owner-Unverified Fact):** The weekly status summary currently has no KPI section. If accurate, a gap exists between the stated priority (E-2) and the current artifact. Adding a KPI section closes that gap.
- **E-3 (Owner-Unverified Fact):** A `kpi-ledger.md` file is asserted to exist in the repository. If verified, this suggests KPI data is already being tracked and could be surfaced into the summary with low additional overhead.

**Material conflict to disclose (C-1):**
The relationship between `kpi-ledger.md` (E-3) and the status summary (E-1) is unresolved. Two scenarios are possible:

> **Scenario A:** The ledger is a standalone artifact; adding a KPI section to the summary requires a new section drawing from it.
> **Scenario B:** The ledger is intended to serve as the KPI section; the gap is one of integration, not creation.

*This recommendation proceeds on Scenario A as the conservative default.* If Scenario B is confirmed, implementation effort is lower and the recommendation to include is reinforced.

---

## 3. Cadence Recommendation

The owner command explicitly requires both an **update cadence** and a **review cadence**.

**Update cadence — Weekly**
- Rationale: The host artifact is a *weekly* status summary. KPI data updated at a different frequency would create a mismatch between the summary's rhythm and its KPI section, reducing coherence and trust in the document.
- *Inference flagged:* The specific KPIs to be tracked are unknown (U-3). If any KPI is only measurable at a lower frequency (e.g., monthly), a hybrid approach — weekly section published, with a note indicating the next refresh date for slower metrics — would preserve cadence alignment without forcing artificial data.

**Review cadence — Weekly**
- Rationale: Aligning review to the update cycle ensures the KPI section is acted upon, not merely published. Weekly review is consistent with the operational visibility priority (E-2) and the pilot nature of the summary, where early feedback loops are valuable.
- *Inference flagged:* No stakeholder list or review process is defined in the evidence. The recommendation assumes the existing summary audience constitutes the review group. Owner should confirm.

---

## 4. Risks and Unknowns

| Risk / Unknown | Severity | Mitigation |
|---|---|---|
| U-1: `kpi-ledger.md` content and existence unverified | Medium | Verify file before implementation; if absent, KPI data source must be identified |
| U-3: Specific KPIs undefined | Medium | Owner to define minimum KPI set before section is drafted |
| C-1: Ledger-to-summary relationship unresolved | Low–Medium | Inspect both artifacts together; resolve Scenario A vs. B |
| Slower-frequency KPIs may not fit weekly update | Low | Use inline refresh-date notation for any sub-weekly metrics |
| One-page constraint (AMB-02) | Low | Both recommendations fit within this page; owner may confirm no expansion needed |

---

## 5. Proposed Next Gate

1. **Owner confirms** the specific KPIs required for operational visibility (resolves U-3).
2. **Artifact inspection** of `kpi-ledger.md` and the current weekly status summary (resolves U-1, C-1).
3. **Owner confirms** review audience for the KPI section.
4. Proceed to deterministic validation, then owner approval before any changes to the summary artifact.

---

*This output is advisory. No artifact has been modified. No scope has been extended. No owner approval has been granted or implied.*