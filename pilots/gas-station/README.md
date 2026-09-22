# Gas Station Pilot — 30-Day Operating Plan

## Objective

Validate three measurable workflows at one gas-station location before expanding into forecasting or advanced automation:

1. Daily cash and POS reconciliation
2. Shift handover
3. Daily executive briefing

The pilot must improve record completeness, exception visibility, shift accountability, and owner decision speed while preserving human financial control.

## Scope boundaries

The pilot does not authorize automated:

- Fuel purchases
- Price changes
- Refunds or cash adjustments
- Credit-limit changes
- Payroll or staff discipline
- Safety or regulatory decisions

## Roles

| Role | Responsibility |
|---|---|
| Owner / executive sponsor | Approves scope, permissions, thresholds, and material decisions |
| Station manager | Owns daily completion and exception resolution |
| Shift supervisor | Completes shift checks, reconciliation, and handover |
| Cashier / operator | Records assigned totals and reports exceptions |
| GPT Innovation | Configures, trains, monitors adoption, and documents reusable learning |

## Workflow 1 — Daily cash and POS reconciliation

### Required inputs

- Business date and shift
- Opening cash float
- POS fuel sales
- Convenience-store sales
- Cash sales
- Card sales
- Other payment methods
- Refunds and approved adjustments
- Paid-outs or petty-cash movements
- Physical cash count
- Deposit amount
- Source-report references

### Core calculations

```text
expected_cash = opening_float + cash_sales - refunds - approved_paid_outs
cash_variance = physical_cash - expected_cash
payment_variance = pos_total - (cash_sales + card_sales + other_payments)
```

### Status model

- **Green:** complete and within an owner-approved tolerance
- **Amber:** complete, but explanation or manager review is pending
- **Red:** missing records, material unexplained variance, or failed close

AI may suggest likely causes but must never post or approve a financial adjustment.

## Workflow 2 — Shift handover

### Opening checks

- Prior handover acknowledged
- Cash float accepted
- Pumps and POS checked
- Safety and equipment issues reviewed
- Outstanding actions accepted
- Critical stock warnings reviewed

### Closing checks

- Reconciliation submitted
- POS close report referenced
- Pump, equipment, and safety issues logged
- Complaints and incidents logged
- Stock shortages recorded
- Site condition confirmed
- Open actions assigned with owner and due date

Red issues remain visible until acknowledged and resolved.

## Workflow 3 — Daily executive briefing

The owner briefing must contain:

1. Yesterday at a glance
2. Financial and operational exceptions
3. Missing records or failed controls
4. Incidents, maintenance, and stock warnings
5. Decisions requiring owner approval
6. Today's top three measurable priorities

Every recommendation must link to approved source records or clearly state that evidence is incomplete.

## 30-day plan

### Week 1 — Diagnose and baseline

- Confirm one pilot location
- Interview owner, manager, supervisors, and cashiers
- Map current close and handover processes
- Review sample POS reports and forms
- Establish baseline metrics

### Week 2 — Configure and train

- Configure templates
- Define owner-approved alert thresholds
- Create briefing format
- Train users
- Run two supervised test closes

### Week 3 — Controlled live pilot

- Use the workflow every shift
- Review records daily
- Correct confusing fields and process gaps
- Produce a morning briefing every operating day

### Week 4 — Stabilize and evaluate

- Measure adoption and impact
- Document controls and lessons
- Decide whether to continue, revise, or expand
- Produce a confidential result report and public-safe reusable case study

## Pilot KPIs

- Shift-handover completion rate
- Reconciliation completion rate
- Average close time
- Number and value of variances
- Variances explained within 24 hours
- Missing-source-record rate
- Overdue action count
- Briefing delivery rate
- Manager and owner adoption

## Expansion gate

Do not expand until:

- At least 14 consecutive operating days are complete
- Reconciliation records are reliable
- Users follow the workflow consistently
- Permissions and approval gates are documented
- The owner confirms measurable value

## Reuse path

Validated patterns can later support:

- Car-rental daily close and fleet handover
- Hardware and tire-store reconciliation
- Property-rental payment and maintenance briefings
- Other gas stations and convenience retailers
