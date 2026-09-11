# InterKambia Compliance Matrix

> Planning document only. Final decisions require qualified Curaçao and Netherlands advisers.

## Production rule

InterKambia remains an invite-only concierge pilot with direct provider-client settlement until the critical rows below are approved.

| Workstream | Decision required | Pilot control | Production gate |
|---|---|---|---|
| Operating entity | Identify the platform operator and contracting entity | GPT Innovation by Attaf operates the research pilot; providers and clients contract directly | Written legal approval |
| Contracting | Define governing law, liability, cancellation, revisions, acceptance, and dispute route | Standard pilot templates reviewed before use | Approved terms and provider agreement |
| Provider classification | Confirm providers are independent businesses and avoid unsupported employment-placement activity | B2B-first; verify registration and business status | Classification memo and onboarding controls |
| Curaçao tax | Map OB treatment for services and platform fees | No automated tax calculation | Curaçao tax-adviser matrix |
| Netherlands VAT | Map B2B/B2C place-of-supply, reverse-charge, and invoice requirements | B2B-first; collect business identity and country | Netherlands VAT memo |
| Service swaps | Determine taxable value, invoice, and accounting treatment | Bilateral reference value recorded; no transferable credits | Adviser-approved swap workflow |
| GDPR | Determine controller/processor roles and territorial scope | Minimize data; no unnecessary sensitive information | Privacy notice, lawful bases, DPA set, rights workflow |
| Curaçao privacy | Confirm local privacy obligations and cross-border transfer controls | Access control and retention schedule | Local privacy review |
| DAC7 | Determine platform-operator and personal-service reporting scope | Collect only pilot minimum until requirements are known | Written DAC7 assessment and provider due-diligence schema |
| Identity verification | Define required business and individual evidence | Human review; no automatic approval | Approved verification SOP |
| Payments | Select an eligible licensed PSP for Curaçao and Netherlands providers | Platform does not hold funds | Written PSP eligibility and liability confirmation |
| Refunds and chargebacks | Assign commercial and operational responsibility | Provider-client direct settlement and documented milestones | Approved refund/chargeback flow |
| Insurance | Determine professional, cyber, and platform coverage | Exclude unsupported high-risk categories | Broker or legal recommendation |
| AI usage | Define permitted matching, translation, and drafting use | Human approval for every match and high-impact output | AI risk assessment and evaluation plan |
| Records and retention | Define audit, consent, tax, contract, and deletion periods | Store only evidence required for the pilot | Approved retention schedule |

## Minimum provider due-diligence fields

- legal name;
- trading name;
- country and registered address;
- business-registration number;
- legal type;
- tax-residence country;
- tax identifier when required;
- authorized representative;
- contact details;
- portfolio and references;
- service categories;
- language support;
- bank-account reference only when a licensed PSP requires it;
- verification status and reviewer;
- terms and privacy acceptance timestamps.

## Data-protection controls

- dedicated InterKambia Supabase project;
- row-level security on every tenant-linked table;
- service-role key restricted to server code;
- least-privilege operator roles;
- append-only audit events for sensitive changes;
- deletion and export workflow;
- explicit retention periods;
- processor inventory for hosting, email, messaging, analytics, AI, and document storage;
- incident-response and breach-escalation process.

## Payment architecture guardrail

```text
Pilot:
Client ──direct payment──> Provider
  └──────── InterKambia records milestone status and proof only

Future regulated flow:
Client ──> Licensed marketplace PSP ──> Provider
                    └── platform fee routing
```

InterKambia must never receive client money into an ordinary operating account for later provider payout.