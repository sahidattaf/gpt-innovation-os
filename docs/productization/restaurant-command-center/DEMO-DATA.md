# Restaurant Command Center — Fictional Demo Data Plan

**Status:** Approved for planning only  
**Real client data:** Prohibited at this stage

## Fictional business identity

Use:

**Caribbean Ember Grill — Demo Restaurant**

This name is a fictional demo identity for internal productization work. It must not be presented as an actual client or operating business.

## Proposed deterministic seed

| Dataset | Target |
| --- | ---: |
| Locations | 1 |
| Team members | 6 |
| Contacts | 40 |
| Open leads | 12 |
| Reservations | 35 |
| Catering inquiries | 7 |
| Reviews | 24 |
| Tasks | 18 |
| AI recommendations | 6 |

## Required labeling

Every future pilot screen that uses this data should visibly display:

> **DEMO DATA — NOT LIVE**

## Data-generation rules

- Use fictional names and contact information.
- Do not copy BOSSA guests, staff, suppliers, leads, menu facts, pricing, reservations, or operational records.
- Do not copy any GPT Innovation prospect/client record.
- Do not include real phone numbers, email addresses, addresses, payment data, credentials, or private URLs.
- Make the seed deterministic and resettable.
- Keep example review text synthetic.
- Keep AI recommendations synthetic and traceable to fictional records.

## Claim-safety rules

The following must remain explicitly fictional or placeholder unless separately verified:

- revenue
- conversion rate
- response time
- occupancy/table-turn metrics
- hours saved
- cost savings
- ROI
- review uplift
- sales uplift
- testimonials
- package pricing

Example design-system values such as `+18%`, `12 hrs`, or `<30s` must never be converted into proof or marketing claims by this pilot.

## Reset requirement

Any later implementation should provide a documented method to restore the entire pilot dataset to a known baseline without touching production or live systems.

## Out of scope

No database seeding script is authorized by this documentation gate.
