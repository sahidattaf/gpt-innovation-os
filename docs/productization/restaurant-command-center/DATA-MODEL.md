# Restaurant Command Center — Proposed Data Model

**Status:** Planning only  
**Data classification:** Fictional demo schema proposal  
**Production database:** Not authorized

## Design goals

The proposed model should:

1. support a generic restaurant command-center pilot;
2. remain organization-aware from the start;
3. avoid hard-coding BOSSA or any real client;
4. support deterministic fictional seed data;
5. document future tenant-boundary needs without claiming multi-tenancy exists.

## Proposed entities

### Organization and access context
- `organizations`
- `locations`
- `users`
- `memberships`

### CRM
- `contacts`
- `leads`
- `lead_activities`

### Reservations and guests
- `reservations`
- `guests`

### Catering
- `catering_inquiries`
- `catering_events`

### Reviews and operations
- `reviews`
- `tasks`
- `notifications`

### AI and audit
- `ai_recommendations`
- `ai_activity_logs`
- `audit_logs`

## Relationship outline

```text
organization
├── locations
├── memberships
├── contacts
│   └── leads
│       └── lead_activities
├── reservations
│   └── guests
├── catering_inquiries
│   └── catering_events
├── reviews
├── tasks
├── notifications
├── ai_recommendations
├── ai_activity_logs
└── audit_logs
```

## Common tenant-owned fields

Where applicable, future persistent records should include:

- `organization_id`
- `created_at`
- `updated_at`
- `created_by`
- `status`

These fields express a future boundary requirement. They do not prove that authorization, RLS, tenant isolation, or production multi-tenancy are implemented.

## Status vocabularies

### Lead
- `NEW`
- `QUALIFIED`
- `FOLLOW_UP`
- `PROPOSAL`
- `WON`
- `LOST`

### Reservation
- `PENDING`
- `CONFIRMED`
- `SEATED`
- `COMPLETED`
- `CANCELLED`
- `NO_SHOW`

### Catering
- `NEW`
- `DISCOVERY`
- `COSTING`
- `PROPOSAL`
- `APPROVED`
- `DECLINED`
- `COMPLETED`

## Security and privacy requirements for any later implementation

Before persistent or live data is introduced, a separately approved implementation must define and test:

- authentication
- authorization
- organization/tenant boundaries
- access roles
- auditability
- deletion/retention rules
- sensitive-field handling
- public/admin route protection
- secret management

## Out of scope

This document does not define production SQL, Supabase migrations, RLS policies, indexes, database credentials, or client-specific records.
