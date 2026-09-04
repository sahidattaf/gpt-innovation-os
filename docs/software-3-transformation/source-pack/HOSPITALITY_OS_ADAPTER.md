# Hospitality OS Adapter

**Adapter status:** Documentation only  
**Source system:** `sahidattaf/hospitality-os-plugin`  
**Connection state:** Not runtime-integrated by this gate

## Purpose
Expose approved reusable hospitality capabilities to S3T without copying the plugin or granting it authority over project data.

## Capability domains
- guest and concierge workflows;
- restaurant and hotel SOP drafting;
- menu and revenue analysis;
- sales, marketing, delivery, and video workflow support;
- multilingual hospitality operations.

## Contract
**Inputs:** explicit project ID, active gate, approved source references, data classification, requested capability, and required output schema.  
**Outputs:** draft analysis or action proposal with evidence labels, risks, assumptions, and next approval.  
**Denied by default:** production writes, guest outreach, reservations, orders, pricing publication, financial commitments, personal data transfer, and cross-client access.

## Routing
S3T selects the capability. The project adapter supplies context. Hospitality OS produces a bounded draft. Human approval remains required for consequential action.

## Evidence needed before integration
Plugin manifest/version, enabled skill inventory, permission review, test fixtures, error behavior, rollback method, and repository status.
