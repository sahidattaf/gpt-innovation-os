# GPTI-ESIGN-POC-1 Acceptance Evidence

## Current evidence status

This gate authorizes design and Test Mode POC preparation only.

### Evidence already established

| Check | Status | Evidence |
|---|---|---|
| Correct project selected | PASS | `sahidattaf/gpt-innovation-os` |
| Isolated feature branch required | PASS | `feat/gpti-esign-poc-1` |
| Production purchase prohibited | PASS | documented boundary |
| Production signature requests prohibited | PASS | documented boundary |
| Real contracts prohibited | PASS | synthetic document only |
| Investor documents prohibited | PASS | documented boundary |
| Real client data prohibited | PASS | synthetic identity requirement |
| Commercial-term changes prohibited | PASS | synthetic agreement contains no commercial terms |
| Embedded signing architecture defined | PASS | `architecture.md` |
| Callback architecture defined | PASS | `architecture.md` |
| Security requirements defined | PASS | `architecture.md` |
| Test API app configuration defined | PASS | `test-app.example.json` |

## Live Test Mode acceptance cases

These remain **NOT RUN** until an authenticated Dropbox Sign test API app and a protected preview endpoint exist under a separate implementation/setup step.

| ID | Test | Expected result |
|---|---|---|
| DS01 | Create synthetic embedded request | request created with Test Mode enabled |
| DS02 | Confirm request cannot disable Test Mode | request rejected locally |
| DS03 | Retrieve embedded sign URL | temporary test sign URL returned |
| DS04 | Open embedded signer | signer loads without exposing secrets |
| DS05 | Complete synthetic signing | test completion event generated |
| DS06 | Receive authentic callback | callback accepted after verification |
| DS07 | Replay same callback | handled idempotently; no duplicate transition |
| DS08 | Send forged callback | rejected; no state change |
| DS09 | Send unknown event | rejected/ignored; no privileged state change |
| DS10 | Attempt real signer data | validation rejects input |
| DS11 | Attempt production environment | workflow fails closed |
| DS12 | Inspect logs | no API key, document body, signature, or sensitive headers present |

## Pass rule

The POC may be called **Test Mode technically validated** only when DS01–DS12 all pass with captured evidence.

Until then, status is:

**DESIGN COMPLETE — LIVE TEST MODE EXECUTION PENDING AUTHENTICATED TEST APP + PROTECTED PREVIEW**

## Required evidence package for future execution

Capture:

1. API app name and non-secret client ID reference.
2. Screenshot showing Test Mode/test application context with secrets redacted.
3. Protected preview URL.
4. DS01–DS12 result table.
5. Callback verification evidence with secrets redacted.
6. One embedded signer screenshot showing the synthetic document and test indication.
7. One negative-test screenshot/log excerpt for forged callback rejection.
8. Confirmation that no production email, client data, investor document, plan purchase, or contract execution occurred.

## Owner-gate boundary after PASS

A new owner gate is required before:
- plan purchase/upgrade;
- production app creation;
- production credentials;
- live signer use;
- real contracts;
- CRM/Notion production writes;
- Premium Branding activation;
- merge/promotion to production.
