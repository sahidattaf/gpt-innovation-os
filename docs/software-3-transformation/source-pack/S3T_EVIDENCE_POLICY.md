# S3T Evidence Policy

## Authority order
1. Verified project sources
2. Explicit owner decisions
3. Approved plans and specifications
4. Draft working documents
5. General model knowledge

## Classes
- **Verified:** traceable to a controlled source and reviewed.
- **Owner-provided:** explicit statement awaiting independent verification where required.
- **Derived:** calculation or inference with inputs and method shown.
- **Assumption:** unverified working premise.
- **Target:** desired future measure, never an actual.
- **Draft:** incomplete and non-authoritative.
- **External reference:** third-party material requiring source/date.
- **Unavailable:** evidence not supplied.

## Data boundaries
- Do not copy secrets, credentials, tokens, personal data, client-confidential material, or private operational records into this public repository.
- Adapters contain metadata and control rules, not live project datasets.
- Cross-project retrieval is denied unless the active owner gate explicitly names both source and destination.
- When evidence conflicts, stop and surface the conflict; do not silently reconcile it.

## Citation rule
Material claims must link to their controlled source or be labeled by evidence class.
