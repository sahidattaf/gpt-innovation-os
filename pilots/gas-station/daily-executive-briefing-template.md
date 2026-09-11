# Gas Station Daily Executive Briefing

> Business date: {{business_date}}  
> Location: {{location_name}}  
> Prepared at: {{prepared_at}}  
> Data completeness: {{complete | partial | insufficient}}

## 1. Yesterday at a glance

| Metric | Result | Status |
|---|---:|---|
| Total POS sales | {{total_pos_sales}} | {{status}} |
| Fuel sales | {{fuel_sales}} | {{status}} |
| Convenience-store sales | {{store_sales}} | {{status}} |
| Cash sales | {{cash_sales}} | {{status}} |
| Card and other payments | {{non_cash_sales}} | {{status}} |
| Cash variance | {{cash_variance}} | {{status}} |
| Payment variance | {{payment_variance}} | {{status}} |
| Completed shifts | {{completed_shifts}} / {{expected_shifts}} | {{status}} |

## 2. Exceptions requiring attention

{{#each exceptions}}
- **{{severity}} — {{title}}**  
  Evidence: {{source_reference}}  
  Owner: {{action_owner}}  
  Due: {{due_at}}  
  Recommended next step: {{recommendation}}
{{/each}}

When there are no exceptions, state: `No material exceptions were reported from the approved source records.`

## 3. Shift handover and operations

- Unacknowledged handovers: {{unacknowledged_handovers}}
- Pump or POS issues: {{equipment_issues}}
- Safety or customer incidents: {{incidents}}
- Stock warnings: {{stock_warnings}}
- Overdue actions: {{overdue_actions}}

## 4. Owner decisions required

{{#each decisions}}
### {{decision_title}}

- **Issue:** {{issue}}
- **Evidence:** {{evidence}}
- **Recommendation:** {{recommendation}}
- **Risk of delay:** {{risk}}
- **Decision deadline:** {{deadline}}
- **Approval required from:** {{approver}}
{{/each}}

The briefing must never represent a recommendation as an approved financial or operational decision.

## 5. Today's top three priorities

1. {{priority_1}}
2. {{priority_2}}
3. {{priority_3}}

Each priority must have an owner, measurable outcome, and due time.

## 6. Data-quality note

{{data_quality_note}}

If records are incomplete, identify exactly what is missing and do not estimate financial values unless the owner has approved an explicit estimation method.
