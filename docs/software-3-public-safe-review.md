# Public-safe change review checklist

This checklist describes **review requirements**, not test results.

- [ ] Confirm the target branch is not the protected/default branch.
- [ ] Verify changed paths are new and limited to `skills/software-3-public-safe/` and `docs/software-3-public-safe-*.md`.
- [ ] Verify no private plugin archive, internal governing prompt, owner-gate register, customer/client records, telemetry, hidden URLs, tokens, secrets, keys or credentials are committed.
- [ ] Check no existing `s3t-001/` controls or `AGENTS.md` governance were overwritten.
- [ ] Parse the JSON schema and synthetic test case list.
- [ ] Verify all synthetic cases remain `executed: false` until genuinely exercised and logged; no test passes are claimed.
- [ ] Independently review whether any new wording implies connection, installation, production deployment or autonomous authority; remove such wording.
- [ ] Obtain explicit owner approval before pull request, merge, publication beyond this feature branch, or operational integration.

## Scope record
A separate owner decision authorized a **public-safe feature branch only**. This does not authorize merging into the default branch, creating or publishing a release, adding external integrations, or distributing the private plugin source.

## Reversal
Before merge: delete or abandon the feature branch after approval. If later merged under another owner gate: revert that merge or the scoped commit(s) through normal review. Never force-push the default branch.
