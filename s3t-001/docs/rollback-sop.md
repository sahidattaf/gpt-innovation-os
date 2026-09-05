# GPT Innovation Command Center — Rollback SOP
**Version:** 1.0  
**Status:** S3-G5 Ratified  
**Owner:** Coach Sahid Attaf  
**Effective:** 2026-09-05

---

## 1. PURPOSE

This SOP defines how to safely recover from failures, policy violations, incorrect versions, hallucinations, or owner reversals **without data loss** and while preserving the complete audit trail.

**Key principle:** Rollback never deletes history; it supersedes versions and restores prior valid state.

---

## 2. SCOPE

**Covered:**
- All approved commands during pilot (S3-G6)
- All versions of evidence briefs, approval packets
- All ownership or policy decisions requiring reversal
- Recovery from prompt regression or data corruption

**Not covered:**
- Complete data destruction (handled separately by owner gate)
- Recovery from infrastructure failure (backup/restore procedures)

---

## 3. ROLLBACK TRIGGERS

Execute rollback immediately if any of:

| Trigger | Category | Action |
|---------|----------|--------|
| Policy violation detected | Security | Immediate freeze |
| Incorrect source retrieved | Scope | Immediate freeze |
| Wrong packet version approved | Version control | Immediate freeze |
| Prompt regression observed | Quality | Immediate freeze |
| Approval mismatch (version changed) | Approval | Immediate freeze |
| Material hallucination in reasoning | Integrity | Immediate freeze |
| Owner explicitly reverses decision | Authority | Immediate freeze |
| Implementation defect discovered | Defect | Immediate freeze |

---

## 4. ROLLBACK PROCEDURE

### 4.1 FREEZE AFFECTED COMMAND

**Action:**
1. Set command status: `FROZEN_ROLLBACK`
2. Create audit event: `ROLLBACK` with reason
3. Record timestamp: `rollback_initiated_at`
4. Note: This status prevents further updates until rollback completes

---

### 4.2 IDENTIFY INVALID VERSION

**Action:**
1. Locate currently active version (evidence brief, approval packet, command state)
2. Mark as: `SUPERSEDED` or `INVALID`
3. Record: which validation failed, which step requires correction
4. Note: Never delete; only mark version as no longer authoritative

**Example:**
```
Command: GIC-20260903-001
Current Version: v3 (INVALID — hallucinated premise)
Mark Status: SUPERSEDED
Reason: operator-reasoning-v1 false claim about source availability
Corrected By: manual evidence review + owner confirmation
```

---

### 4.3 LOCATE LAST VALID VERSION

**Action:**
1. Review audit trail backwards through versions
2. Find last version marked: `APPROVED` AND `VALID`
3. Verify approval is not itself under dispute
4. Record: which version, when approved, by whom

**If no prior valid version exists:**
- Return command to: `READY_FOR_APPROVAL` with correction notes
- Proceed to Step 4.8

---

### 4.4 RESTORE LAST VALID VERSION

**Action:**
1. Set that version as active reference: `status: APPROVED`
2. Do NOT delete any intermediate versions
3. Update command metadata: `restored_from_version = <prior_version_id>`
4. Record restoration timestamp

**Audit trail example:**
```
Version v1: APPROVED (original)
Version v2: SUPERSEDED (hallucination introduced)
Version v3: INVALID (amplified hallucination)
---[ROLLBACK]---
Restored To: v1 (APPROVED, still valid)
Restoration Timestamp: 2026-09-05T14:32:00Z
```

---

### 4.5 RUN VALIDATION SUITE

**Action:**
1. Re-run all validations against restored version:
   - VAL-01: Required fields?
   - VAL-02: Scope blocked?
   - VAL-03: Source traceability?
   - VAL-04: Evidence classification complete?
   - VAL-05: Conflicts visible?
   - VAL-06: Approval packet complete?
   - VAL-07: Approval isolation (no execution)?

2. If validation fails → return to Step 4.8 (READY_FOR_APPROVAL with correction)

3. If validation passes → proceed to Step 4.6

---

### 4.6 MATERIAL CHANGE ASSESSMENT

**Question:** Did the restored version's meaning or recommendation change materially?

**If NO material change:**
- Approval from prior version remains valid
- Set status: `APPROVED`
- Proceed to Step 4.7

**If YES material change:**
- Old approval no longer applies
- Set status: `READY_FOR_APPROVAL`
- Return packet to owner for re-approval
- Proceed to Step 4.8

---

### 4.7 UPDATE STATUS & CLOSE ROLLBACK

**Action:**
1. Finalize command status:
   - If approval still valid → `APPROVED`
   - If owner re-approval needed → `READY_FOR_APPROVAL`

2. Create final audit event:
   - event_type: `ROLLBACK`
   - result: `SUCCESS`
   - status_before: `FROZEN_ROLLBACK`
   - status_after: (final status)
   - notes: "Restored to v{N}. Reason: {trigger}. Validation: PASS."

3. Record timestamp: `rollback_completed_at`

---

### 4.8 OWNER REVIEW & REAPPROVAL

**If step 4.6 → material change detected:**

1. Return corrected packet to owner with:
   - Summary of what changed
   - Why change was necessary (correction, hallucination fix, etc.)
   - Comparison to prior version if helpful

2. Owner must explicitly re-approve changed version

3. Upon re-approval:
   - Create new Approval Record (new version of packet)
   - Set status: `APPROVED`
   - Create audit event: `OWNER_APPROVAL` (post-rollback)

---

## 5. VERSION NUMBERING AFTER ROLLBACK

**Restored version keeps original number** (e.g., v1 restored from superseded v3 stays v1).

**If correction generates new content:**
- Create new version: v4 (following original sequence)
- Do NOT reuse superseded version numbers

**Example:**
```
GIC-20260903-001-AP-v1  (original, APPROVED)
GIC-20260903-001-AP-v2  (revision 1, APPROVED)
GIC-20260903-001-AP-v3  (hallucination, SUPERSEDED)
---[ROLLBACK]---
Restored: v2
If material change in correction:
GIC-20260903-001-AP-v4  (post-rollback correction)
```

---

## 6. SPECIFIC FAILURE SCENARIOS & RECOVERY

### Scenario A: Hallucinated Fact in Evidence Brief

**Trigger:** Evidence brief contains unsupported claim marked as VERIFIED_SOURCE but no citation.

**Recovery:**
1. Freeze command → mark brief as SUPERSEDED
2. Review evidence register for actual facts supporting objective
3. Regenerate brief using only verified evidence
4. Re-run validations (VAL-04: Evidence classification)
5. If original reasoning still sound → restore v1 approval
6. If reasoning depended on hallucination → generate v{N}, return for owner re-approval

---

### Scenario B: Wrong Version Approved

**Trigger:** Owner approves v1; meanwhile v2 is generated with material change; v2 is accidentally marked APPROVED.

**Recovery:**
1. Identify which approval is authentic (timestamp + method)
2. Mark incorrect approval as INVALID
3. Set v2 status: READY_FOR_APPROVAL (not approved)
4. Return v2 to owner for explicit re-approval (if different from v1)
5. Restore v1 as authoritative until owner affirms v2

---

### Scenario C: Policy Violation Post-Approval

**Trigger:** After approval recorded, audit discovers command referenced blocked entity or retrieved blocked data.

**Recovery:**
1. Immediate freeze → FROZEN_ROLLBACK
2. Confirm violation actually occurred (double-check audit)
3. Mark approval as INVALID (integrity compromised)
4. Determine how violation occurred (prompt bug, source mislabeled, etc.)
5. Correct underlying issue
6. Return command to READY_FOR_APPROVAL state
7. Owner re-reviews and re-approves if they choose to proceed

---

### Scenario D: Source Precedence Conflict Post-Decision

**Trigger:** Primary source contradicts secondary source; AI resolved by applying precedence rule; owner later questions if precedence was correct.

**Recovery:**
1. Freeze → FROZEN_ROLLBACK
2. Restore earlier version (before conflicting evidence was classified)
3. Re-surface conflict as UNRESOLVED
4. Generate new brief with conflict clearly flagged
5. Return to owner: "Conflict exists. Precedence rule applied as follows: {rule}. Do you want to override or accept?"
6. Owner decision drives forward

---

### Scenario E: Owner Reversal

**Trigger:** Owner explicitly says "Disregard prior approval. Reject this command."

**Recovery:**
1. Create audit event: `OWNER_REVERSAL`
2. Set command status: `REJECTED`
3. Mark prior approval record: `valid: false`
4. Record owner's reason
5. Preserve all versions and approval history
6. **STOP.** Pilot ends for this command; can be resubmitted as new command if owner wishes.

---

## 7. FALLBACK: NO VALID PRIOR VERSION

If rollback cannot restore a prior valid version (e.g., this is the first version and it's defective):

**Action:**
1. Freeze command
2. Create error audit event
3. Return command to owner with:
   - Clear description of defect
   - Recommendation: resubmit or abandon
4. Do not fabricate a "valid" version
5. Owner decides next step

---

## 8. AUDIT TRAIL DURING ROLLBACK

**All rollback operations are logged:**

```yaml
audit_event:
  event_type: ROLLBACK
  command_id: GIC-20260903-001
  timestamp: 2026-09-05T14:30:00Z
  actor: SYSTEM
  object_id: GIC-20260903-001-AP-v3
  status_before: APPROVED (but defective)
  status_after: SUPERSEDED
  reason: "Hallucinated premise in operator-reasoning output"
  recovery_action: "Restored v2 (prior valid version)"
  validation_result: PASS
  material_change_to_recommendation: NO
  prior_approval_validity: RETAINED
  result: SUCCESS
```

---

## 9. COST OF ROLLBACK

**Tracked separately:**
- Tokens used to detect issue
- Tokens used in rollback analysis
- Tokens in regeneration (if new version created)
- Wall-clock time from freeze to restoration

**Pilot instrumentation:** Record, but do not penalize command KPI (rollback cost attributed to system, not command processing).

---

## 10. POST-ROLLBACK REVIEW

After each rollback:

1. Record: What went wrong? Why wasn't it caught earlier?
2. Identify: Should validation have caught this?
3. Propose: Prompt enhancement, schema constraint, or policy adjustment?
4. **Do not immediately implement** — changes to prompts/policies require G6+ authorization.
5. Log as: Pilot improvement opportunity

---

## 11. NEVER

**These are non-negotiable:**

- ❌ Do not delete version history
- ❌ Do not hide rollback events from audit trail
- ❌ Do not fabricate "missing" prior versions
- ❌ Do not rollback approval without recording reason
- ❌ Do not re-approve old version without owner review (if material change)
- ❌ Do not disable audit logging during rollback
- ❌ Do not override owner decision during rollback (respect reversals)

---

## 12. VERSION CONTROL

**This SOP:**
- Version: 1.0
- Status: S3-G5 Ratified
- Effective: 2026-09-05
- Next review: Post-pilot G7 evaluation

**Change log:**
- v1.0: Initial specification from G5, section 62

---

## 13. OWNER REPRESENTATION

This SOP is approved as part of G5 specification by Coach Sahid Attaf.  
No rollback may disable audit or hide evidence.  
Every rollback is treated as a learning opportunity for system improvement.
