# InterKambia Foundation

InterKambia is a proposed invite-only B2B service corridor connecting verified businesses and professionals in Curaçao and the Netherlands.

## Current stage

**Phase 0 — validation and operating design**

The pilot is intentionally human-assisted. InterKambia does not hold client funds, automate disputes, or open public provider registration during the validation phase.

## Transaction modes

1. **Paid services** — fixed-price, milestone, or retained work settled directly between the client and provider during the pilot.
2. **Service swaps** — bilateral exchanges with defined deliverables, reference value, acceptance criteria, deadlines, and cancellation rules.

## Initial corridors

- AI, automation, websites, content, marketing systems, and remote administration
- Hospitality, tourism, Caribbean operations, supplier research, and local representation
- Netherlands expertise for Curaçao businesses, including training, procurement, systems, and sustainability

## Architecture decisions

- Business owner: GPT Innovation by Attaf
- Strategic link: Digital Kòrsou economic empowerment
- Code home: `apps/interkambia`
- Planning docs: `docs/interkambia`
- Database: dedicated InterKambia Supabase project
- Hosting target: Vercel
- Launch model: invite-only B2B concierge marketplace
- Pilot payments: direct provider-client settlement
- AI role: matching assistance, translation, proposal drafting, and risk flags
- Human role: verification, approval, disputes, and compliance decisions

## Documentation map

- [Product requirements](./PRD.md)
- [Domain model](./DOMAIN-MODEL.md)
- [Compliance matrix](./COMPLIANCE-MATRIX.md)
- [90-day pilot plan](./PILOT-PLAN.md)
- [Decision log](./DECISION-LOG.md)

## Notion source of truth

InterKambia Command Center:

https://app.notion.com/p/3a1a269fc947817e9298ffbb1721e890

## Build gate

No transaction automation or marketplace payment integration should be approved until:

- repeated demand is demonstrated;
- at least five pilot matches are completed;
- provider verification proves workable;
- unit economics are understood;
- entity, tax, privacy, DAC7, and payment-provider questions are resolved.