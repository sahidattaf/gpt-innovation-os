# GPT Innovation Command Center — Operating SOP
**Version:** 1.0  
**Status:** S3-G5 Ratified  
**Owner:** Coach Sahid Attaf  
**Effective:** 2026-09-05

---

## 1. PURPOSE

This SOP defines the **owner command → evidence brief → approval packet** workflow for the GPT Innovation Operator Command Center pilot. It covers the 9-step process from command intake through owner approval decision.

---

## 2. SCOPE

**In Scope:**
- Owner command submission and normalization
- Validation and scope checking
- Evidence retrieval and classification
- AI reasoning over approved context
- Evidence brief generation
- Approval packet preparation
- Owner review and decision recording

**Explicitly Out of Scope:**
- External sending or publishing
- Deployment or production actions
- Autonomous execution after approval
- Client-facing delivery
- Credential generation
- Repository writes

---

## 3. CORE WORKFLOW: 9 STEPS

### **Step 1: COMMAND RECEIVED**

**Trigger:**  
Owner submits command via Notion form, structured prompt, or verified voice note.

**Actions:**
1. Generate unique Command ID: `GIC-YYYYMMDD-NNN`
2. Record timestamp
3. Classify input method (NOTION_FORM | STRUCTURED_PROMPT | VOICE_NOTE)
4. Set status: `RECEIVED`
5. Create audit event: `COMMAND_RECEIVED`

**Output:**  
Owner Command object with required fields validated present.

**Approval Gate:** None—informational.

---

### **Step 2: NORMALIZE INPUT**

**Trigger:**  
Command status: `RECEIVED`

**Actions:**
1. If voice input: run transcription + owner verification
   - Flag uncertain material content → `NEEDS_CLARIFICATION`
   - Prohibit guesses on names, numbers, deadlines, approval
2. Map input to canonical schema:
   - OBJECTIVE → `objective`
   - DELIVERABLE → `deliverable` (if provided)
   - IN SCOPE → `scope`
   - OUT OF SCOPE → `excluded_scope`
   - PERMITTED SOURCES → `permitted_sources`
3. Default priority: `NORMAL` (if not specified)
4. Validate all required fields present
5. Set status: `SCOPE_CHECK`
6. Create audit event: `COMMAND_NORMALIZED`

**Output:**  
Normalized Owner Command, ready for scope enforcement.

**Stop Condition:**  
If required fields missing → set status `NEEDS_CLARIFICATION`, return to owner.

---

### **Step 3: ENFORCE SCOPE & BLOCKING POLICY**

**Trigger:**  
Normalized command received

**Actions:**
1. **Blocked Entity Check:**
   - Scan objective, scope, permitted_sources for: BOSSA, Kai Kòrsou, Sea Horizon
   - If found → set status `BLOCKED_SCOPE`, create audit `SCOPE_CHECK` (BLOCKED)
   - Stop workflow. Return to owner with block notice.

2. **Blocked Data Class Check:**
   - Scan for: confidential_client_data, credentials, secrets, etc.
   - If suspected → set status `SCOPE_CHECK` (BLOCKED), create audit event
   - Stop workflow. Return to owner.

3. **Prohibited Action Check:**
   - Scan objective for: external_send, publish, deploy, production_write, etc.
   - If found → set status `NEEDS_CLARIFICATION`
   - Clarify permissible workflow boundary. Return to owner.

4. If all checks pass → set status: `SOURCE_CHECK`

**Output:**  
Command passes scope enforcement or is blocked/clarified.

---

### **Step 4: VERIFY PERMITTED SOURCES**

**Trigger:**  
Status: `SOURCE_CHECK`

**Actions:**
1. For each source in `permitted_sources`:
   - Match exactly against control-policy.yaml `permitted_sources` list
   - If exact match found → permission = ALLOW
   - If unknown → permission = OWNER_REVIEW
   
2. If any source = OWNER_REVIEW:
   - Set status: `NEEDS_SOURCE_APPROVAL`
   - Do NOT retrieve context
   - Return to owner for clarification
   - Create audit: `SOURCE_PERMISSION_CHECK` (NEEDS_REVIEW)

3. If all sources = ALLOW:
   - Set status: `CONTEXT_READY`
   - Create audit: `SOURCE_PERMISSION_CHECK` (ALLOWED)

**Output:**  
Command either approved for retrieval or flagged for owner review.

---

### **Step 5: RETRIEVE APPROVED CONTEXT**

**Trigger:**  
Status: `CONTEXT_READY`

**Actions:**
1. For each approved source:
   - Retrieve **minimum context necessary** for the command objective
   - Record: source_name, source_reference, source_version, retrieved_at
   - Do not retrieve blocked data
   
2. Maintain retrieval log (audit trail)

3. Set status: `ANALYSIS`

4. Create audit event: `CONTEXT_RETRIEVED`

**Output:**  
Approved context available for reasoning. All context carries source metadata.

---

### **Step 6: BUILD EVIDENCE REGISTER**

**Trigger:**  
Status: `ANALYSIS`

**Actions:**
1. For each material claim in retrieved context or owner command:
   - Assign evidence_id: `GIC-YYYYMMDD-NNN-ENNN`
   - Classify into exactly one category:
     - `VERIFIED_SOURCE` → claim comes from approved source with citation
     - `OWNER_DECISION` → explicit owner statement
     - `OWNER_UNVERIFIED_FACT` → owner-provided but not independently verified
     - `AI_INFERENCE` → conclusion drawn by AI reasoning (not fact)
     - `EXTERNAL_RESEARCH` → disabled for pilot
     - `UNKNOWN` → information genuinely unknown

2. For each evidence item:
   - Record claim, source, source_type, source_reference
   - Flag if contradicts another evidence item
   - Mark conflict_status if applicable

3. Create Conflict records for unresolved contradictions

4. Continue status: `ANALYSIS`

**Output:**  
Evidence Register with every material claim classified. Conflicts surfaced.

---

### **Step 7: AI REASONING OVER APPROVED CONTEXT**

**Trigger:**  
Evidence Register complete

**Actions:**
1. Invoke `operator-reasoning-v1` prompt:
   - Reasoning constraint: Only over allowed evidence/context
   - Forbidden: approval, tool execution, permission expansion, hiding evidence
   
2. Reasoning engine outputs:
   - Answer to owner objective
   - Identification of unknowns
   - Comparison of feasible options
   - Recommendation
   - Material assumptions
   - Risk assessment

3. Run instrumentation:
   - Capture model, tokens, cost (USD/XCG), duration
   - Create AI Run record

4. Set status: `VALIDATION`

5. Create audit event: `AI_REASONING_RUN`

**Output:**  
Structured reasoning result ready for brief generation.

---

### **Step 8: GENERATE EVIDENCE BRIEF**

**Trigger:**  
Status: `VALIDATION`

**Actions:**
1. Invoke `evidence-brief-v1` prompt:
   - Input: evidence register, reasoning output, conflicts
   - Output: compact brief with mandatory sections:
     - Command ID & Objective
     - Executive Finding
     - Verified Evidence (with citations)
     - Owner Decisions
     - Owner Unverified Facts
     - AI Inferences
     - Unknowns
     - Conflicts
     - Options
     - Recommendation
     - Risks
     - Proposed Next Gate

2. Run deterministic validations:
   - VAL-01: Required fields present?
   - VAL-02: Scope blocked? (Double-check)
   - VAL-03: Source traceability OK?
   - VAL-04: Evidence classification complete?
   - VAL-05: Conflicts visible?
   - If any validation fails → status `NEEDS_REVISION`, return to Step 6

3. If validations pass:
   - Set status: `READY_FOR_APPROVAL`
   - Create audit event: `EVIDENCE_BRIEF_CREATED`

**Output:**  
Evidence Brief, ready for approval packet packaging.

---

### **Step 9: APPROVAL PACKET & OWNER DECISION**

**Trigger:**  
Status: `READY_FOR_APPROVAL`

**Actions:**

**9A: Packet Generation**
1. Invoke `approval-packet-v1` prompt:
   - Do NOT pre-fill APPROVE
   - Include:
     - Command ID, exact packet version
     - Decision Required section (blank for owner)
     - Executive recommendation
     - Evidence summary
     - Key unknowns
     - Material risks
     - Alternatives
     - Expected outcomes
     - KPI/cost implications
     - Proposed next gate

2. Version packet: `GIC-YYYYMMDD-NNN-AP-v1` (incremented if revisions occur)

3. Set status: `READY_FOR_APPROVAL`

4. Create audit event: `APPROVAL_PACKET_CREATED`

**Output:** Approval Packet with all decision context. Awaiting owner.

---

**9B: Owner Review & Decision**
1. Owner reviews packet (no time limit specified in pilot)

2. Owner makes decision:
   - `APPROVED` → proceed to 9C
   - `REVISE` → return to Step 6 with revision notes
   - `REJECTED` → set status `REJECTED`, create audit event `OWNER_REJECTION`, STOP

**Acceptance criteria for approval:**
- Owner explicitly states "Approved" or equivalent semantic approval
- Decision tied to exact packet version
- Approver identity clear (must be Coach Sahid during pilot)
- Method recorded (CHAT | NOTION | SIGNED_PDF)

3. If approval ambiguous (e.g., "Looks good") → remain at `READY_FOR_APPROVAL`, await clarification

---

**9C: Register Approval**
1. Create Approval Record:
   - approval_id: unique
   - command_id: exact match
   - packet_version: exact version (non-transitive)
   - decision: APPROVED
   - approver: Coach Sahid
   - timestamp: exact moment
   - method: registration method
   - valid: true

2. Set command status: `APPROVED`

3. Create audit event: `OWNER_APPROVAL`

4. **STOP.** Pilot does not proceed to execution.

**Output:** Immutable approval record, version-bound to specific packet.

---

## 4. WORKFLOW DIAGRAM

```
OWNER COMMAND
     │
     ▼
NORMALIZE INPUT
(voice + field validation)
     │
     ▼
ENFORCE SCOPE & BLOCKING
(BOSSA? Credentials? Prohibited action?)
     │
     ├─── BLOCKED ────────────► STOP
     │
     ▼
VERIFY PERMITTED SOURCES
(exact match + owner review if unknown)
     │
     ├─── NEEDS_SOURCE_APPROVAL ──► STOP
     │
     ▼
RETRIEVE APPROVED CONTEXT
(minimum necessary)
     │
     ▼
BUILD EVIDENCE REGISTER
(classify every material claim)
     │
     ▼
AI REASONING
(operator-reasoning-v1)
     │
     ▼
GENERATE EVIDENCE BRIEF
(run validations)
     │
     ├─── VALIDATION FAILS ──► REVISE ──┐
     │                                    │
     ▼                                    │
APPROVAL PACKET READY                     │
(decision context, no pre-fill)           │
     │                                    │
     ▼                                    │
OWNER REVIEW                              │
     │                                    │
 ┌───┼────────┬──────────────────────────┘
 ▼   ▼        ▼
 NO  REVISE  APPROVED
 │    │         │
STOP  └─LOOP    ▼
             REGISTER APPROVAL
             (version-bound)
                 │
                STOP
```

---

## 5. KPI CAPTURE

For each command, record at end of workflow:

### 5.1 Time-per-Request

```
processing_time = READY_FOR_APPROVAL_timestamp - RECEIVED_timestamp
owner_review_time = DECISION_timestamp - READY_FOR_APPROVAL_timestamp
```

**Pilot target:** <30 minutes processing (excludes owner review).

---

### 5.2 Rework Rate

```
rework_rate = (commands revised after first brief ÷ commands submitted) × 100
```

Track reason:
- SCOPE_CLARIFICATION
- EVIDENCE_INCOMPLETE
- CONFLICT_UNRESOLVED
- VALIDATION_FAILURE
- VOICE_UNCERTAINTY

**Pilot target:** <20% rework.

---

### 5.3 Follow-up Questions

```
follow_up_questions = count of owner clarifications before READY_FOR_APPROVAL
```

By category:
- MISSING_FIELD
- AMBIGUOUS_SCOPE
- SOURCE_PERMISSION
- CONFLICT
- VOICE_UNCERTAINTY

**Pilot target:** ≤1 per command average.

---

### 5.4 Evidence Completeness

```
evidence_completeness = (material_claims_with_valid_classification ÷ total_material_claims) × 100
```

**Pilot target:** ≥95%

---

### 5.5 Approval Bypass Count

```
approval_bypass_count = gated transitions without valid owner approval
```

**Pilot target:** 0 (any value >0 = critical failure).

---

### 5.6 Cost Instrumentation

Capture per AI run:
- Model identifier
- Input tokens
- Output tokens
- Estimated USD cost (reference)
- Estimated XCG cost (primary)
- Stage (NORMALIZE | VALIDATE | ANALYZE | REASON | BRIEF | PACKET)

**Pilot target:** <1.00 XCG per command (baseline setting).

---

## 6. REVISION LOOP

If status = `NEEDS_REVISION`:

1. Record revision trigger (which validation failed, which conflict, etc.)
2. Return evidence + reasoning to appropriate stage
3. Owner or system clarifies / resolves issue
4. Increment packet version: `v1` → `v2`
5. Regenerate brief and packet
6. Return to Step 8 (validation)
7. **Previous approval does not carry forward.** v2 requires fresh approval.

---

## 7. CRITICAL FAILURE CASES

If any of these occur, **fail the command immediately:**

1. Blocked data enters model context
2. Owner approval is fabricated
3. System attempts downstream execution
4. Credentials/secrets appear in prompts or logs
5. Unsupported AI inference marked as verified fact
6. Approval from one version attached to another version
7. Audit record silently overwritten

**Result:** Status = `ERROR`, create critical audit event, return to owner.

---

## 8. STOP CONDITIONS

Workflow stops and returns to owner if:

- Required field missing
- Voice input ambiguous (no guessing)
- Blocked scope detected
- Unknown source (not ALLOW)
- Context unavailable (material)
- Evidence conflict unresolvable
- Validation fails
- Owner decides REVISE or REJECT
- Any critical failure
- Policy engine fail-closed

**Rule:** When in doubt, DENY and return to owner.

---

## 9. AUDIT TRAIL

**Mandatory events logged at each step:**

- COMMAND_RECEIVED
- COMMAND_NORMALIZED
- VOICE_VERIFIED (if applicable)
- REQUIRED_FIELD_CHECK
- SCOPE_CHECK
- SOURCE_PERMISSION_CHECK
- CONTEXT_RETRIEVED
- EVIDENCE_REGISTER_CREATED
- AI_REASONING_RUN
- EVIDENCE_BRIEF_CREATED
- VALIDATION_RUN
- APPROVAL_PACKET_CREATED
- OWNER_APPROVAL
- OWNER_REVISION (if applicable)
- OWNER_REJECTION (if applicable)
- ERROR (if applicable)

Each event includes: timestamp, actor, event_type, result, notes, policy rule applied.

---

## 10. VERSION CONTROL

**This SOP document:**
- Version: 1.0
- Status: S3-G5 Ratified
- Effective: 2026-09-05
- Next review: Post-pilot G7 evaluation

**Change log:**
- v1.0: Initial specification from G5

---

## 11. OWNER APPROVAL REPRESENTATION

This SOP represents the workflow approved in G5 by Coach Sahid Attaf.  
Formal authorization: S3-G5 gate acceptance + separate G6 approval gate if build authorized.

**External execution:** DISABLED during pilot.
