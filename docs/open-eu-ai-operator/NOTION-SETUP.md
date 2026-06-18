# Notion Setup Guide

## Purpose
This guide mirrors the GitHub module into a Notion workspace so operators can manage execution without losing the open-source documentation structure.

## Recommended Notion Structure
```text
Open EU AI Operator — Command Center
├── Mission
├── Strategic Pillars
├── GitHub Links
├── Sprint Tracker
├── Agent Registry
├── Roadmap
├── Compliance Center
├── Decision Log
└── Launch Notes
```

## Databases

### Task Tracker
Properties:
- Task — title
- Status — Backlog, In Progress, Done, Blocked
- Priority — High, Medium, Low
- Owner — text
- Area — GitHub, Notion, Compliance, Agents, Launch
- Due Date — date
- GitHub Path — text
- Notes — text

### Agent Registry
Properties:
- Agent — title
- Status — Draft, Testing, Active
- Sector — Hospitality, Real Estate, Marketing, Compliance, Investor Readiness
- Inputs — text
- Outputs — text
- Human Review Required — checkbox
- GitHub Path — text

### Decision Log
Properties:
- Decision — title
- Date — date
- Area — select
- Reason — text
- Impact — text
- Revisit Date — date

## Views
- Sprint Board grouped by Status
- Today Until Beach filtered by Due Date
- Compliance Tasks filtered by Area = Compliance
- Launch Tasks filtered by Area = Launch

## Operating Rhythm

### Morning
- Open Sprint Board
- Move today tasks to In Progress
- Work only the top 3 priority tasks

### Midday
- Update blockers
- Commit GitHub docs
- Refresh Decision Log

### End of Sprint
- Mark completed tasks Done
- Open PR or merge if ready
- Write next-session notes

## Notion ↔ GitHub Rule
GitHub is the source of truth for public open-source docs.
Notion is the command center for execution, task tracking, and internal decisions.
