# GPTI eSignature POC — Dropbox Sign Test Mode

**Owner Gate:** GPTI-ESIGN-POC-1  
**Status:** Design/Test Mode only  
**Repository:** `sahidattaf/gpt-innovation-os`  
**Scope:** GPT Innovation by Attaf synthetic Founding Pilot agreement workflow

## Purpose

Validate the architecture for an embedded, branded eSignature workflow before any production purchase, production signature request, client contact, or legally binding use.

## Hard boundaries

This POC must not:

- purchase or upgrade a Dropbox Sign plan;
- send production signature requests;
- execute a real contract;
- use real client, investor, or confidential data;
- change GPT Innovation commercial terms;
- contact clients or investors;
- store API keys, passwords, or signer secrets in Git;
- merge or deploy without a separate owner gate.

## Proposed flow

1. Internal operator selects a synthetic agreement.
2. Server creates a Dropbox Sign signature request with `test_mode=1`.
3. Server requests an embedded sign URL for the synthetic signer.
4. Browser renders the Dropbox Sign embedded signer.
5. Dropbox Sign posts callback events to a server endpoint.
6. Callback verifier validates authenticity before changing synthetic status.
7. Internal status progresses only through synthetic states such as:
   - `draft`
   - `test_request_created`
   - `test_signing_opened`
   - `test_signed`
   - `test_callback_verified`
   - `test_complete`
8. No production status or legal-completion state exists in this POC.

## POC artifacts

- `architecture.md` — system architecture, embedded signing sequence, callback design, security controls.
- `test-app.example.json` — non-secret API app configuration example.
- `synthetic-founding-pilot-agreement.md` — deliberately non-binding synthetic test document.
- `acceptance-evidence.md` — evidence checklist and pass/fail criteria.

## Environment variable design

Variables are documented only. Do not populate secrets in Git.

```text
DROPBOX_SIGN_API_KEY=
DROPBOX_SIGN_CLIENT_ID=
DROPBOX_SIGN_TEST_MODE=true
DROPBOX_SIGN_CALLBACK_URL=
DROPBOX_SIGN_APP_BASE_URL=
```

A later implementation gate must add any runtime code and update `.env.example` only after confirming the exact SDK/API integration pattern.

## Human-review boundary

Any future production agreement must be approved by the owner and, where appropriate, legal counsel before it is sent for signature. This POC provides workflow plumbing only; it does not determine contract language, commercial terms, legal sufficiency, or enforceability.
