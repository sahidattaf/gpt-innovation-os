# Notion Database Blueprints

## Required Databases

### Products
| Property | Type | Description |
|----------|------|-------------|
| Name | Title | Product name |
| Description | Rich Text | Product description |
| Price | Number | Price in USD cents |
| Category | Select | productivity, marketing, sales, etc. |
| Active | Checkbox | Whether product is listed |
| Stripe ID | Text | Stripe product ID |

### Clients
| Property | Type | Description |
|----------|------|-------------|
| Name | Title | Client name |
| Email | Email | Contact email |
| Plan | Select | free, starter, pro, enterprise |
| Status | Select | active, churned, trial |
| MRR | Number | Monthly recurring revenue |

### Orders
| Property | Type | Description |
|----------|------|-------------|
| Order ID | Title | Unique order identifier |
| Client | Relation | → Clients |
| Product | Relation | → Products |
| Status | Select | pending, complete, refunded |
| Amount | Number | Amount in USD cents |
| Date | Date | Order date |

## Setup Instructions

1. Create a Notion integration at notion.so/my-integrations
2. Copy the integration token to `NOTION_API_KEY` in `.env.local`
3. Create each database and share it with your integration
4. Copy each database ID to the appropriate env var
