# Setup Guide — GPT Innovation OS Sakana Architecture

## Goal

Set up GPT Innovation OS as a multi-agent business execution system using GitHub, Claude Code, Vercel, Supabase, Notion, Gmail, Google Calendar, and WhatsApp automation.

## Tool Roles

| Tool | Role |
| --- | --- |
| GitHub | Code, prompts, docs, schemas, and agent configs |
| Claude Code | Builder and refactor agent inside VS Code |
| ChatGPT | Strategy, architecture, prompt design, reviews, orchestration support |
| Vercel | Frontend deployment for dashboards and landing pages |
| Supabase | Database, auth, logs, orders, leads, KPIs, agent runs |
| Notion | Business command center, SOPs, roadmap, project dashboard |
| Gmail | Outreach, follow-ups, client communications |
| Google Calendar | Meetings, demos, reminders, launches |
| WhatsApp API | Customer ordering, hotel partner campaigns, lead capture |

## Recommended Folder Structure

```txt
gpt-innovation-os/
├── apps/
│   ├── command-center/
│   ├── bossa-fire-box/
│   ├── jobhunter-gpt/
│   └── real-estate-leasing/
├── agents/
│   ├── orchestrator/
│   ├── bossa/
│   ├── real-estate/
│   ├── hospitality-os/
│   ├── jobhunter-gpt/
│   ├── kai-korsou/
│   └── gpt-innovation/
├── prompts/
│   ├── orchestrator/
│   ├── builder/
│   ├── reviewer/
│   ├── sales/
│   ├── marketing/
│   └── notion/
├── supabase/
│   ├── schema.sql
│   ├── seed.sql
│   └── migrations/
├── docs/
│   └── gpt-innovation-os-sakana/
└── scripts/
    ├── sync-notion.ts
    ├── run-agent.ts
    ├── weekly-review.ts
    └── deploy-check.ts
```

## Local Configuration Checklist

Do not commit private credentials. Keep environment values only in your local machine, Vercel project settings, or a secure secret manager.

Required integrations:

- Supabase project connection
- Notion integration connection
- GitHub repository access
- Vercel project connection
- AI provider connections
- WhatsApp Business API connection
- Google Workspace connection

## Data Layer Tables

Minimum tables for the first version:

- `agent_runs` — stores every agent execution
- `agent_tasks` — stores business tasks assigned to agents
- `kpi_snapshots` — stores weekly metrics by business unit
- `agent_reviews` — stores quality review notes
- `business_units` — stores BOSSA, PISKA, JobHunterGPT, Kai Kòrsou, Hospitality OS, and GPT Innovation by Attaf

## Claude Code Build Command

```txt
You are working inside the repository sahidattaf/gpt-innovation-os.

Goal:
Implement the GPT Innovation OS Sakana architecture docs into a working multi-agent scaffold.

Tasks:
1. Read docs/gpt-innovation-os-sakana/README.md, setup.md, roadmap.md, agents.manifest.yaml, prompts.md, and notion-page.md.
2. Create an /agents directory with one folder per phase-1 agent.
3. Each agent folder must include README.md, prompt.md, config.yaml, and runbook.md.
4. Create /scripts/run-agent.ts as a placeholder runner.
5. Create /scripts/weekly-review.ts as a placeholder weekly review generator.
6. Create /apps/command-center placeholder Next.js dashboard spec if app exists; otherwise create docs/app-command-center-spec.md.
7. Do not delete existing files.
8. Commit changes with message: Scaffold GPT Innovation OS agent system.
```

## Notion Setup

Create a Notion page called:

```txt
GPT Innovation OS — Sakana AI Scientist Adaptation
```

Recommended sections:

1. Executive Summary
2. System Architecture
3. Business Units
4. Agent Registry
5. Core Operating Loop
6. Roadmap
7. Weekly Review
8. Prompt Library
9. KPI Dashboard
10. Open Questions

Use `notion-page.md` as the copy/paste source if direct Notion sync is not available.

## Deployment Workflow

```txt
Idea → Notion Task → GitHub Issue → Claude Code Build → Pull Request → Review → Merge → Vercel Deploy → Supabase Logs → Weekly KPI Review
```

## Done Criteria

- Architecture docs exist in GitHub.
- Notion command page exists.
- First 5 agents have prompt files.
- Supabase can store agent runs and tasks.
- Vercel can host one dashboard or landing page.
- Weekly review process exists.
