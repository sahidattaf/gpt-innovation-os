# BOSSA AI OS Adapter

**Adapter status:** Demo/read-only reference  
**Production authority:** None under S3T-SOURCEPACK-1

## Purpose
Describe how S3T may evaluate BOSSA AI OS workflows without changing BOSSA operations or data.

## Candidate domains
CRM, reservations, orders, menu and costing, kitchen, inventory, suppliers, reviews, marketing, finance, and staff.

## Current evidence boundary
The visible BOSSA application identifies its CRM as demo/read-only and uses fictional leads. This adapter does not assert that “Soon” modules, live organization features, or production integrations are available.

## Contract
**Allowed now:** document workflow candidates, map gates, define test cases, and reference public/demo behavior.  
**Prohibited:** create or update leads, alter menu/prices, access guest data, publish content, send messages, make reservations/orders, change production configuration, or deploy.

## Future pilot prerequisites
- separate BOSSA owner gate;
- authoritative BOSSA source index;
- named pilot workflow and baseline;
- privacy and permission review;
- synthetic test data;
- acceptance tests and rollback;
- explicit production decision after G7.
