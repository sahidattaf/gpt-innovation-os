# GPT Innovation OS — Sakana AI Scientist Adaptation

> A multi-agent business execution architecture inspired by Sakana AI's AI Scientist loop: idea → experiment → execution → analysis → review → improvement.

## Purpose

GPT Innovation OS turns Sahid Attaf's business ecosystem into a coordinated AI operating system. Instead of using one chatbot for everything, the system uses many specialist agents that collaborate across strategy, building, marketing, sales, finance, operations, and review.

## Core Philosophy

Sakana AI's AI Scientist is built around an autonomous research loop. GPT Innovation OS adapts that loop from scientific discovery into business execution.

| Sakana AI Scientist | GPT Innovation OS |
| --- | --- |
| Generate research idea | Generate business opportunity |
| Write experiment code | Build website, landing page, automation, CRM, content, or dashboard |
| Run experiment | Launch workflow, campaign, sales process, or product test |
| Analyze results | Read KPIs, leads, orders, bookings, reviews, and revenue |
| Write paper | Create Notion report, PDF, pitch deck, SOP, dashboard, or GitHub documentation |
| Peer review | Controller Agent and Quality Reviewer Agent audit the output |
| Improve next version | Claude Code updates repo, GitHub tracks changes, Vercel redeploys |

## Architecture

```txt
GPT Innovation OS
│
├── 01. Orchestrator Layer
│   ├── CEO Agent
│   ├── Strategy Agent
│   ├── Controller Agent
│   └── Quality Reviewer Agent
│
├── 02. Business Units
│   ├── BOSSA Asado i Mar
│   ├── PISKA / Real Estate
│   ├── JobHunterGPT
│   ├── Kai Kòrsou
│   ├── Hospitality OS
│   └── GPT Innovation by Attaf
│
├── 03. Execution Agents
│   ├── Sales Agents
│   ├── Marketing Agents
│   ├── Finance Agents
│   ├── Legal/Admin Agents
│   ├── Website Agents
│   ├── Content Agents
│   ├── WhatsApp Agents
│   └── Research Agents
│
├── 04. Tools
│   ├── GitHub
│   ├── Claude Code
│   ├── Vercel
│   ├── Supabase
│   ├── Notion
│   ├── Google Drive
│   ├── Gmail
│   └── WhatsApp API
│
└── 05. Memory + Review
    ├── Notion Knowledge Base
    ├── Supabase Database
    ├── GitHub Repo History
    ├── Agent Logs
    └── KPI Dashboards
```

## Core Operating Loop

```txt
1. Idea Agent
   Finds opportunity:
   "BOSSA Fire Box hotel campaign"

2. Planning Agent
   Creates plan:
   landing page + WhatsApp flow + hotel flyer

3. Builder Agent
   Uses Claude Code + GitHub:
   builds the app/component

4. Deploy Agent
   Pushes to Vercel

5. Database Agent
   Stores leads/orders in Supabase

6. Notion Agent
   Updates project board and SOP

7. Review Agent
   Checks quality, brand, KPI, mistakes

8. Strategy Agent
   Decides next improvement
```

## Initial Business Unit Swarms

### BOSSA Fire Box System

```txt
BOSSA Fire Box System
│
├── Menu Engineer Agent
├── Pricing Agent
├── Food Cost Agent
├── Packaging Agent
├── Hotel Sales Agent
├── WhatsApp Ordering Agent
├── Social Media Agent
├── QR Poster Agent
├── Review Request Agent
└── Weekly KPI Agent
```

Outputs:

- Landing page
- Hotel sales kit PDF
- WhatsApp order flow
- QR poster
- Instagram content
- Supabase order table
- Notion launch dashboard
- Weekly sales report

### Real Estate / PISKA Swarm

- Leasing Strategy Agent
- Tenant Outreach Agent
- Investor Pitch Agent
- Property Listing Agent
- Tourism Corridor Research Agent
- Commercial Unit Pricing Agent
- Document Generator Agent
- CRM Update Agent

### GPT Innovation by Attaf Swarm

- Client Intake Agent
- Proposal Agent
- Website Builder Agent
- AI Tools Research Agent
- Demo Producer Agent
- Delivery Manager Agent
- Support Agent
- Case Study Agent

### JobHunterGPT Swarm

- Resume Agent
- Job Search Agent
- ATS Keyword Agent
- Application Tracker Agent
- Cover Letter Agent
- Interview Prep Agent
- Follow-up Email Agent
- Analytics Agent

## Tech Stack

```yaml
frontend:
  - Next.js
  - Tailwind CSS
  - Vercel

backend:
  - Supabase
  - PostgreSQL
  - Edge Functions

ai_building:
  - Claude Code
  - ChatGPT
  - GitHub Copilot/Codex

workspace:
  - Notion
  - Google Drive
  - Gmail
  - Google Calendar

automation:
  - WhatsApp Business API
  - Make
  - Zapier
  - n8n
  - Cron jobs

memory_and_review:
  - Notion knowledge base
  - Supabase logs
  - GitHub commit history
  - KPI dashboards
  - weekly controller review
```

## Recommended Start

Do not start with 100 agents immediately. Start with 25 strong agents, validate the loop, then scale.

```txt
Phase 1: 25 Agents
Phase 2: 50 Agents
Phase 3: 100+ Agents
```

## First 5 Agents

1. CEO Orchestrator Agent
2. BOSSA Growth Agent
3. Real Estate Leasing Agent
4. Website Builder Agent
5. Notion Controller Agent

## Repository Folder

```txt
docs/gpt-innovation-os-sakana/
├── README.md
├── setup.md
├── roadmap.md
├── agents.manifest.yaml
├── prompts.md
└── notion-page.md
```

## Next Action

Use `setup.md` to wire the repo, Notion workspace, Supabase tables, Vercel deployment, and Claude Code build loop.
