# InterKambia Domain Model

## Design principles

1. Separate organizations from individual users.
2. Keep provider verification distinct from public profiles.
3. Separate service listings from client requests.
4. Store AI recommendations separately from human approvals.
5. Treat compliance, consent, and audit records as first-class data.
6. Keep payment records informational during the pilot; InterKambia does not custody funds.

## Core entities

### Organization

Represents a Curaçao or Netherlands business participating as a client, provider, partner, adviser, or platform operator.

Key fields:

- `id`
- `legal_name`
- `trading_name`
- `country`
- `legal_type`
- `registration_number`
- `tax_residence_country`
- `tax_identification_number`
- `registered_address`
- `status`

### User

An authenticated person connected to an organization.

Key fields:

- `id`
- `organization_id`
- `name`
- `email`
- `phone`
- `role`
- `preferred_language`
- `status`

### ProviderProfile

Private and public provider information, verification status, capacity, and risk.

Key fields:

- `organization_id`
- `verification_status`
- `service_categories`
- `languages`
- `portfolio_url`
- `capacity_notes`
- `references_complete`
- `tax_data_complete`
- `terms_signed_at`
- `risk_level`
- `approved_at`
- `approved_by`

### Service

A defined paid or swap offer.

Key fields:

- `provider_organization_id`
- `name`
- `category`
- `transaction_type`
- `description`
- `deliverables`
- `acceptance_criteria`
- `revision_limit`
- `delivery_days`
- `reference_value`
- `currency`
- `status`
- `risk_level`

### ClientRequest

A qualified need submitted by a client.

Key fields:

- `client_organization_id`
- `category`
- `transaction_type`
- `outcome`
- `deliverables`
- `budget_or_swap_value`
- `currency`
- `deadline`
- `languages`
- `data_sensitivity`
- `acceptance_criteria`
- `pipeline_stage`

### Match

A proposed or approved pairing between a request and provider.

Key fields:

- `request_id`
- `provider_organization_id`
- `service_id`
- `capability_score`
- `proof_score`
- `availability_score`
- `value_score`
- `language_score`
- `risk_score`
- `total_score`
- `ai_rationale`
- `operator_status`
- `approved_by`
- `approved_at`

### Proposal

The commercial or swap terms offered for a match.

Key fields:

- `match_id`
- `version`
- `scope`
- `price_or_reference_value`
- `currency`
- `timeline`
- `revision_limit`
- `cancellation_terms`
- `status`

### Agreement

A signed record of accepted terms. During the pilot, the provider and client contract directly.

Key fields:

- `proposal_id`
- `agreement_type`
- `governing_law`
- `signed_by_client_at`
- `signed_by_provider_at`
- `document_reference`
- `status`

### Milestone

A delivery checkpoint with acceptance evidence.

Key fields:

- `agreement_id`
- `name`
- `deliverables`
- `due_at`
- `reference_value`
- `submitted_at`
- `accepted_at`
- `status`

### Review

Structured completion feedback.

Key fields:

- `agreement_id`
- `reviewer_organization_id`
- `reviewed_organization_id`
- `quality_score`
- `communication_score`
- `timeliness_score`
- `comment`
- `moderation_status`

### Incident

A trust, safety, privacy, payment, delivery, or dispute escalation.

Key fields:

- `agreement_id`
- `incident_type`
- `severity`
- `description`
- `status`
- `owner_id`
- `resolution`
- `resolved_at`

### ComplianceCheck

A verification or legal-production gate.

Key fields:

- `organization_id`
- `check_type`
- `status`
- `risk_level`
- `evidence_reference`
- `reviewed_by`
- `reviewed_at`
- `expires_at`

### ConsentRecord

Evidence of privacy, marketing, and platform terms acceptance.

### AuditEvent

Append-only record of sensitive changes, approvals, and access.

## Relationship overview

```text
Organization
├── Users
├── ProviderProfile
├── Services
├── ClientRequests
├── ComplianceChecks
└── ConsentRecords

ClientRequest
└── Matches
    ├── Provider Organization
    ├── Service
    └── Proposal
        └── Agreement
            ├── Milestones
            ├── Reviews
            └── Incidents
```

## Isolation boundary

InterKambia should use a dedicated Supabase project. Shared UI or auth patterns may come from GPT Innovation OS, but marketplace identity, tax, compliance, request, agreement, review, and audit data must not be mixed into the generic storefront schema.