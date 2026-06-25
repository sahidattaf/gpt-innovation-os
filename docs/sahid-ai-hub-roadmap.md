# Sahid AI Hub Roadmap

Status: Plan Mode
Owner: Sahid Attaf
Planning issue: https://github.com/sahidattaf/gpt-innovation-os/issues/6

## Goal

Turn Sahid’s AI ecosystem into one clear front door for proof-of-work, client acquisition, investor readiness, hospitality systems, real estate intelligence, and internal operations.

## Phase 0 — Discovery and inventory

Status: In progress

Deliverables:
- GitHub planning issue.
- Notion planning page.
- Project inventory document.
- Architecture document.
- Roadmap document.
- Spark prototype prompt.

Acceptance criteria:
- Top 10 projects selected.
- Public/private visibility drafted.
- Vercel URLs listed.
- GitHub repos listed.
- Missing Notion and GPT links marked `TBD`.

## Phase 1 — Spark prototype

Status: Next

Goal:
Create the first visual version of the Sahid AI Hub in Spark.

Prompt input:
- Use `docs/sahid-ai-hub-inventory.md`.
- Use `docs/sahid-ai-hub-architecture.md`.
- Use public-safe links only.

Expected output:
- Responsive dashboard prototype.
- Project cards grouped by zone.
- Hero section.
- Quick stats.
- Public-safe links.
- Clear CTA: Explore Projects / Book Consultation / View Proof-of-Work.

Approval checklist:
- The Hub feels like an executive AI command center.
- The cards are easy to understand.
- JobHunterGPT is clearly proof-of-work.
- BOSSA and hospitality are clearly business units.
- Kai Kòrsou / PISKA is clearly real estate/investor focused.
- GPT Innovation by Attaf is clearly the parent business.

## Phase 2 — Production build

Status: Planned

Goal:
Build the real web version after Spark prototype is approved.

Recommended repo:
- `sahidattaf/gpt-innovation-os`

Optional later repo:
- `sahid-ai-hub`

Suggested stack:
- Next.js
- Tailwind
- Static data file
- Vercel deployment

Deliverables:
- `src/data/projects.ts`
- Hub homepage
- Project zones
- Project card component
- Filter/search by category
- Public-safe links only

Validation:
- `npm run lint`
- `npm run build`
- Manual link check
- Privacy review

## Phase 3 — Notion operating dashboard

Status: Planned

Goal:
Use Notion as the internal control layer for the Hub.

Deliverables:
- Project inventory database.
- Views by zone.
- Views by status.
- Views by visibility.
- Views by next action.
- Links to GitHub issue and production Hub.

Database fields:
- Project
- Zone
- Status
- Visibility
- Vercel URL
- GitHub Repo
- Notion URL
- GPT URL
- Design System
- Priority
- Notes

## Phase 4 — Revenue layer

Status: Planned

Goal:
Turn the Hub from portfolio into sales engine.

Revenue paths:
- AI websites.
- Custom GPTs.
- Monthly AI support.
- BOSSA / Hospitality OS packages.
- JobHunterGPT services.
- Real estate investor materials.
- AI training and workshops.
- GPT marketplace.

Hub CTAs:
- Book AI consultation.
- View proof-of-work.
- Request custom GPT.
- Explore hospitality systems.
- Explore real estate intelligence.

## Phase 5 — Automation layer

Status: Future

Goal:
Connect the Hub to operational workflows.

Possible automations:
- GitHub project status sync.
- Vercel deployment status sync.
- Notion project database sync.
- GPT link registry.
- Monthly project report.
- Lead capture.
- Newsletter / update flow.

## Immediate next step

Create the Spark prototype from the approved prompt and inventory.

Do not add private links yet.
Do not expose GPT builder links.
Do not expose private Notion pages unless explicitly shared.
