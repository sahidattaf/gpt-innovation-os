# Marketing OS Starter

## Purpose
Help European SMEs create AI-assisted marketing workflows that are practical, multilingual, and reviewable.

## Target Users
- Small business owners
- Marketing freelancers
- Restaurants and hotels
- Real estate teams
- Local service businesses

## Core Use Cases
| Use Case | AI Output | Human Review |
|---|---|---|
| Campaign planning | 30-day campaign map | Marketing lead approval |
| Social content | Captions, carousel text, reel scripts | Brand approval |
| Email outreach | Draft emails and follow-ups | Sales approval |
| Local SEO | Website section drafts, FAQ ideas | Owner approval |
| Offer packaging | Service bundle, pricing logic, landing page draft | Founder approval |

## Starter Workflow
```text
Business Offer
↓
MarketingOSGPT intake
↓
Audience + channel selection
↓
Content system draft
↓
Human brand review
↓
Schedule / publish
↓
Track response
```

## Required Inputs
```yaml
inputs:
  business_name: string
  offer: string
  audience: string
  location: string
  channels:
    - Instagram
    - Facebook
    - LinkedIn
    - TikTok
    - Email
    - Website
  language: English | Dutch | Papiamentu | Spanish | other
  tone: professional | friendly | luxury | local | playful
```

## Example Prompt
```text
Act as MarketingOSGPT for a European SME.
Create a 30-day marketing workflow for this offer:
[OFFER]

Include:
- target audience
- core message
- weekly themes
- content formats
- review points
- publishing checklist
- Notion tracking fields
```

## Notion Tracking Fields
| Field | Type |
|---|---|
| Campaign | Title |
| Channel | Select |
| Status | Select |
| Owner | Text |
| Publish Date | Date |
| Review Needed | Checkbox |
| Asset Link | URL |
| Result Notes | Text |

## Automation Ideas
- Weekly content calendar generation
- Caption repurposing across languages
- Follow-up email sequence drafts
- Review-to-content transformation
- Campaign performance summary

## Guardrails
- Do not publish AI content without human review.
- Do not make false claims or fake testimonials.
- Mark AI-generated content for review.
- Avoid copying copyrighted text.

## v0.1 Success Criteria
An SME can create and review one 30-day marketing plan in one day.