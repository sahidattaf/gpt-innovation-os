# Sahid AI Hub Architecture

Status: Plan Mode
Owner: Sahid Attaf
Planning issue: https://github.com/sahidattaf/gpt-innovation-os/issues/6

## Vision

Sahid AI Hub is the front door to the complete AI ecosystem. It should help different audiences quickly understand what exists, what is live, what is private, and where to go next.

## Audience paths

### Recruiters / AI hiring managers

Primary destination: JobHunterGPT.

They should see:
- Proof-of-work.
- Live demo.
- GitHub repo.
- 70 passing tests.
- Human-in-the-loop workflow.
- Clear safety rules.

### Restaurant and hospitality clients

Primary destinations: BOSSA Asado i Mar, BOSSA AI OS, Hospitality OS.

They should see:
- Restaurant website.
- AI operations systems.
- Marketing workflows.
- SOP and review automation potential.
- A clear path to book a consultation.

### Real estate / investor contacts

Primary destinations: Kai Kòrsou, Piskadera Marketplace, Jack Evertzberg Research.

They should see:
- Real estate intelligence.
- Development command center.
- Marketplace / project demos.
- Investor-ready project structure.

### Small businesses

Primary destinations: GPT Innovation by Attaf, AI Marketing Tools, GPT Marketplace.

They should see:
- AI automation services.
- Custom GPTs.
- Websites and dashboards.
- Chatbot widget.
- Practical business outcomes.

### Internal operator view

Primary destinations: Notion, GitHub, Vercel, Claude Design, Spark.

This view should stay private or semi-private.

## Hub structure

```text
Sahid AI Hub
├── Home
├── Projects
│   ├── Proof-of-Work
│   ├── Hospitality
│   ├── Real Estate / Kai Kòrsou
│   ├── GPT Innovation / AI Services
│   └── Infrastructure / Archive
├── GPTs
├── Live Apps
├── Design Systems
├── Notion Command Centers
└── Contact
```

## Public home layout

1. Hero section
   - Sahid AI Hub
   - Front door to AI projects, live apps, GPTs, hospitality systems, real estate intelligence, and proof-of-work prototypes.

2. Quick stats
   - Live Apps
   - GitHub Repos
   - Design Systems
   - Notion Command Centers
   - GPT Systems

3. Flagship project row
   - JobHunterGPT
   - BOSSA Asado i Mar
   - GPT OS Website
   - Piskadera Marketplace

4. Project zones
   - Proof-of-Work
   - Hospitality
   - Real Estate / Kai Kòrsou
   - GPT Innovation / AI Services
   - Infrastructure / Archive

5. Operating philosophy
   - Design first.
   - Build with tests.
   - Keep private data private.
   - Deploy proof.
   - Document the system.

## Project card schema

Each card should use this structure:

```text
Project Name
Zone
Status
One-line purpose
Public-safe description
Links:
- Website
- GitHub
- Notion
- GPT
- Design System
Visibility:
- Public
- Private
- Internal
```

## Data model for implementation

Recommended file:

```text
src/data/projects.ts
```

Recommended object shape:

```ts
export type HubProject = {
  id: string;
  name: string;
  zone: "proof-of-work" | "hospitality" | "real-estate" | "gpt-innovation" | "infrastructure";
  status: "live" | "repo" | "prototype" | "archive" | "planned";
  visibility: "public" | "private" | "hybrid" | "internal";
  description: string;
  websiteUrl?: string;
  githubUrl?: string;
  notionUrl?: string;
  gptUrl?: string;
  designSystem?: string;
  priority: number;
};
```

## Recommended technical stack

### Prototype layer

Use Spark first.

Purpose:
- Rapid layout exploration.
- Card system.
- Navigation logic.
- Visual structure.

### Production layer

Use Next.js + Tailwind in GitHub.

Purpose:
- Version control.
- Real deployment.
- Reusable data file.
- Vercel production hosting.

### Operations layer

Use Notion.

Purpose:
- Inventory.
- Roadmap.
- Visibility decisions.
- Project ownership.
- Manual link management.

## Privacy architecture

Public Hub must never expose:
- Private resumes.
- Private candidate profiles.
- Application packages.
- Certificate IDs.
- Private job descriptions.
- Internal GPT builder edit links.
- Client data.
- Private investor docs.

Public Hub may expose:
- Public Vercel URLs.
- Public GitHub repos.
- Public-safe Notion pages if explicitly shared.
- Public GPT share links.
- Claude Design public exports if safe.

## Build sequence

1. Approve inventory.
2. Generate Spark prototype.
3. Review layout and project zones.
4. Create production page in GitHub.
5. Add public project data file.
6. Run lint/build/test.
7. Deploy through Vercel.
8. Add Hub URL to Notion and GitHub issue.

## Decision log

| Decision | Recommendation | Status |
|---|---|---|
| Prototype tool | Spark | Proposed |
| Production repo | `sahidattaf/gpt-innovation-os` | Proposed |
| Dedicated repo later | `sahid-ai-hub` | Optional |
| Stack | Next.js + Tailwind | Proposed |
| Public/private data split | Public only on website, private in Notion | Required |
