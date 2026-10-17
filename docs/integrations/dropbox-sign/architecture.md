# Dropbox Sign Test Mode POC Architecture

## 1. Scope

This architecture is for a **synthetic-only GPT Innovation by Attaf Founding Pilot agreement** using Dropbox Sign Test Mode and embedded signing.

It is intentionally separated from production contracting, investor documents, pricing changes, and client data.

## 2. Logical architecture

```text
GPT Innovation Operator
        |
        v
GPTI internal POC page
        |
        | create synthetic request
        v
Server-side eSignature adapter
        |
        | server-only API credentials
        v
Dropbox Sign API (test_mode=1)
        |
        | embedded sign URL
        v
Embedded signer frame
        |
        | synthetic signer interaction
        v
Dropbox Sign callback
        |
        v
POST /api/integrations/dropbox-sign/callback
        |
        | verify authenticity + event allowlist
        v
Synthetic status store / audit record
```

## 3. Trust boundaries

### Browser
May receive:
- synthetic agreement display metadata;
- temporary embedded signing URL;
- non-sensitive synthetic workflow status.

Must never receive:
- Dropbox Sign API key;
- server secrets;
- raw callback verification secrets;
- real client contract data during this POC.

### Server
Responsible for:
- creating Test Mode requests;
- requesting embedded signing URLs;
- callback verification;
- event normalization;
- audit logging;
- rejecting non-test workflows.

### Dropbox Sign
External processor for:
- Test Mode signature request lifecycle;
- embedded signer experience;
- callback delivery.

## 4. Test API app design

Create a dedicated Dropbox Sign API app for this POC when the owner performs the authenticated account-side setup.

Recommended display name:

`GPT Innovation by Attaf — eSignature POC TEST`

Recommended constraints:

- Test Mode only.
- Separate `client_id` from future production apps.
- Callback points only to a protected preview/test endpoint.
- No production customer data.
- No investor documents.
- No production branding purchase required for this design gate.
- Any white-label options remain design values until plan eligibility is verified.

## 5. Embedded signing sequence

```text
1. Operator -> GPTI server:
   Create synthetic test agreement

2. GPTI server -> Dropbox Sign:
   Create embedded signature request
   test_mode = 1
   client_id = test API app
   signer = synthetic identity only

3. Dropbox Sign -> GPTI server:
   signature_request_id + signature_id

4. GPTI server -> Dropbox Sign:
   request embedded sign URL for signature_id

5. Dropbox Sign -> GPTI server:
   temporary sign_url

6. GPTI server -> Browser:
   return sign_url only

7. Browser:
   open Dropbox Sign embedded signer

8. Synthetic signer:
   completes test signing interaction

9. Dropbox Sign -> callback endpoint:
   signature / request event

10. GPTI server:
    verify callback authenticity
    allowlist event
    reject production/non-test identifiers
    update synthetic status
    write audit record
```

## 6. Callback design

Proposed endpoint:

`POST /api/integrations/dropbox-sign/callback`

Callback handler requirements:

1. Read raw request body before parsing if required by Dropbox Sign verification.
2. Verify the callback using Dropbox Sign's documented verification mechanism current at implementation time.
3. Reject requests that fail authenticity verification.
4. Permit only known event types.
5. Normalize external events into internal synthetic states.
6. Make processing idempotent using event/request identifiers.
7. Never trust status fields supplied by the browser.
8. Log only minimum metadata:
   - event type;
   - external request identifier;
   - received timestamp;
   - verification result;
   - normalized synthetic state.
9. Do not log:
   - API keys;
   - full document contents;
   - signatures;
   - signer secrets;
   - sensitive headers.
10. Return a minimal success response after accepted processing.

### Proposed event-state mapping

| External event category | Internal synthetic state |
|---|---|
| request created | `test_request_created` |
| signer viewed/opened | `test_signing_opened` |
| signer completed | `test_signed` |
| verified callback processed | `test_callback_verified` |
| request fully complete | `test_complete` |
| unknown/unapproved event | no state change; record rejection |

Exact Dropbox Sign event names must be confirmed against the current official API documentation during the implementation gate.

## 7. Security requirements

### Credentials
- API key is server-side only.
- Client ID may be configuration, but must not be treated as a secret substitute.
- Never commit credentials.
- Use environment variables in preview/test deployment.
- Rotate any credential exposed in logs, screenshots, tickets, or commits.

### Test-mode enforcement
The future adapter must fail closed unless all are true:

```text
DROPBOX_SIGN_TEST_MODE=true
document_classification=synthetic
workflow=founding-pilot-poc
environment!=production
```

The code should reject a request if a caller attempts to disable Test Mode under this POC gate.

### Data minimization
Use synthetic identities only, for example:

```text
Synthetic Signer
signer-test@example.invalid
```

Do not use a real email address because even a Test Mode request could create unwanted external delivery or records depending on API settings.

### Authorization
Future test routes must be inaccessible to the public. They require an owner-approved authentication boundary before deployment.

### CSRF / request integrity
Any browser-initiated create-request route must use the application's established anti-CSRF/request-integrity mechanism once such a mechanism exists.

### Rate limiting
Create-request and callback endpoints should have conservative rate controls to avoid accidental loops or abuse.

### Auditability
Every synthetic request must include a POC correlation ID such as:

`gpti-esign-poc-<uuid>`

### Document safety
The synthetic agreement must contain conspicuous non-binding language and no real commercial terms.

## 8. Branding design

Branding target:

**GPT Innovation by Attaf**

Design intent:
- GPT Innovation logo;
- approved GPT Innovation color palette;
- consistent signing-page appearance;
- no misleading claim that a test signature is legally operative.

Premium/white-label configuration is explicitly outside this gate. The POC records desired branding fields only; it does not purchase, enable, or represent Premium Branding as active.

## 9. Failure behavior

Fail closed on:

- missing API credentials;
- Test Mode not explicitly enabled;
- non-synthetic agreement classification;
- malformed callback;
- failed callback verification;
- unknown callback event;
- duplicate event that cannot be safely replayed;
- production environment;
- real signer data detected by validation rules.

The UI should show a generic POC error and a correlation ID, not provider secrets or raw responses.

## 10. Production promotion boundary

A separate owner gate is required before any of the following:

- paid Dropbox Sign plan;
- production API app;
- production credentials;
- live client agreements;
- external signer email;
- removal of test watermark;
- legal or commercial agreement approval;
- CRM/Notion production automation;
- production callback deployment;
- Premium Branding activation.
