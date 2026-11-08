# Command Center Pilot Rollback SOP

## Triggers
Rollback/freeze on policy violation, incorrect source, wrong packet version, approval mismatch, material hallucination, prompt regression, implementation defect, or owner reversal.

## Procedure
1. Freeze the affected Command ID.
2. Mark the affected version INVALID or SUPERSEDED; do not delete history.
3. Identify the last valid version.
4. Restore that version as the active reference.
5. Record rollback reason and actor in the audit trail.
6. Re-run deterministic validations.
7. Return to READY_FOR_APPROVAL if the decision artifact materially changed.
8. Require fresh owner approval for the new/materially changed packet version.

## Notion schema rollback
The G6A schema extension added fields only. Do not remove them during ordinary rollback. A schema-removal action requires a separate owner gate because it can destroy control metadata.

## GitHub rollback
The controlled build is isolated on branch `s3-g6-command-center-pilot`. Do not merge to `main` without a later explicit gate. Reversal can therefore be achieved by leaving the branch unmerged or by reverting specific commits under separate authorization.

## Safety invariant
Rollback must never erase the historical evidence/audit record merely to make the current state appear clean.
