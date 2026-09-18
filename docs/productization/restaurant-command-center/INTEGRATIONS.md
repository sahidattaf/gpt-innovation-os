# Restaurant Command Center — Integration Requirements

**Status:** Candidate requirements only  
**Live integrations:** Not authorized

## Principle

An integration listed here is a possible future requirement, not evidence that it exists, is configured, or is production-ready.

The current `hospitality-os-plugin` repository explicitly states that it does not bundle WhatsApp, POS, reservation, purchasing, or inventory connectors. Its connector behavior is session-dependent and owner-gated.

## Pilot-stage mocked interfaces

For the first fictional-data pilot, use only mock or local deterministic interfaces:

| Capability | Pilot treatment |
| --- | --- |
| Restaurant records | Fictional JSON or deterministic seed |
| AI | Mocked responses initially |
| Messaging | Mock WhatsApp conversation UI only |
| Reservations | Seeded records |
| Reviews | Seeded records |
| Analytics | Derived only from fictional data |

## Future integration candidates

Each item below requires its own evidence review and owner gate before implementation or configuration:

### Data and backend
- Supabase or another approved persistent data layer

### Messaging
- WhatsApp Cloud API
- Email / Resend

### AI
- OpenAI
- Claude

### Business systems
- Reservation platform
- POS
- Stripe or other approved payments
- Inventory or purchasing systems

### Business context and operations
- Notion
- Google Reviews / Maps

## Integration acceptance questions

Before any candidate is implemented:

1. What exact business workflow requires it?
2. Is there an authoritative source for the integration contract?
3. What data enters and leaves the system?
4. Does it handle guest, staff, payment, or other sensitive information?
5. What credentials are required and where will they be stored?
6. What failure behavior is required?
7. What human approval remains mandatory?
8. What test/sandbox environment is available?
9. What production action would require a separate owner gate?
10. What is the rollback path?

## No implied capability

This specification does not claim:

- live WhatsApp access
- live reservation availability
- payment processing
- POS connectivity
- production email delivery
- production AI access
- Google API access
- Notion synchronization
- Supabase availability

## Routing

Hospitality-specific implementation should be routed to Hospitality OS. GPT Innovation retains productization, governance, packaging, and approved evidence control.
