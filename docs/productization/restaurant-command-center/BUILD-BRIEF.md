# GPTI-RESTAURANT-PILOT-1 — Restaurant Command Center Build Brief

**Status:** Pilot — Planning  
**Owner gate:** GPTI-RESTAURANT-GITHUB-SPEC-2  
**Implementation status:** Documentation only; no application code authorized  
**Primary repository role:** GPT Innovation productization/governance  
**Hospitality implementation route:** Hospitality OS

## Purpose

Define the first controlled productization pilot derived from GPT Innovation Design System v7 as a reusable Restaurant Command Center concept using fictional demo data only.

This document does **not** authorize application implementation, deployment, production authentication, live integrations, client data, pricing changes, or client commitments.

## Repository routing decision

Inspection of the current repositories confirms:

- `gpt-innovation-os` is the appropriate versioned home for this productization specification and governance record.
- `hospitality-os-plugin` is the hospitality operating/skill layer and already covers restaurants, reservations, catering, guest experience, revenue, delivery, training, and command-center workflows.
- GPT Innovation repository governance explicitly routes hospitality-specific implementation to Hospitality OS and BOSSA-specific execution to the BOSSA repository.
- Therefore this branch contains **specification documents only**. No restaurant application code is added here.

## Pilot objective

Create a reusable restaurant operations template suitable for a future fictional-data internal pilot with these planned surfaces:

- Dashboard
- Leads / CRM
- Reservations
- Guests / contacts
- Catering inquiries
- Reviews
- Operations / tasks
- AI assistant / owner briefing

## Planned module scope

### Dashboard
- KPI cards
- Weekly activity
- Alerts
- AI recommendations

### Leads / CRM
- New inquiries
- Lead stage
- Follow-up
- Contact history

### Reservations
- Date and time
- Party size
- Status
- Guest notes

### Guests
- Profile
- Visit history
- Preferences

### Catering
- Inquiry
- Event
- Proposal status
- Follow-up

### Reviews
- Rating
- Platform
- Response status

### Operations
- Tasks
- Issues
- Shift notes

### AI assistant
- Daily summary
- Follow-up suggestions
- Owner briefing

## Explicit first-pilot exclusions

The following are outside this specification stage and require separate owner gates before any implementation:

- Live inventory
- POS
- Payments
- Live WhatsApp execution
- Reservation-platform synchronization
- Production authentication
- Production multi-tenancy
- Client-specific branding
- Live analytics
- Real customer/client data
- Production deployment

## Design-system dependency

Future UI implementation should inherit the approved GPT Innovation Design System v7 patterns for shared visual behavior and components. This specification does not duplicate or redefine the design system.

## Evidence boundary

Do not present demo values, example KPIs, testimonials, mock pricing, time savings, ROI, conversion changes, or response-time figures as verified business evidence.

## Related specification files

- [DATA-MODEL.md](DATA-MODEL.md)
- [INTEGRATIONS.md](INTEGRATIONS.md)
- [DEMO-DATA.md](DEMO-DATA.md)
- [ACCEPTANCE.md](ACCEPTANCE.md)

## Current gate boundary

Allowed in this branch:
- documentation
- architecture clarification
- fictional demo-data planning
- QA acceptance criteria
- implementation routing

Not allowed:
- application code
- database migrations
- environment variables
- production configuration
- deployment
- live connectors
- real client data
- pricing changes
- commercial commitments

## Next owner gate

A separate owner gate is required before any application build, preview deployment, database creation, live integration, or client-specific implementation.
