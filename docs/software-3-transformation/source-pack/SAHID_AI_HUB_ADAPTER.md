# Sahid AI Hub Adapter

**Adapter status:** Documentation and read-only portfolio reference  
**Source repository:** [sahidattaf/sahid-ai-hub](https://github.com/sahidattaf/sahid-ai-hub)  
**Source branch reviewed:** `master`  
**Runtime authority:** None under S3T-SOURCEPACK-1/2

## Verified repository role
Sahid AI Hub is a public Next.js 16 portfolio and infrastructure command center. Its repository contains an executive dashboard, project registry, project/live-app views, GitHub and Vercel status views, integrations specifications, revenue categories, and a roadmap.

## S3T role
Use Sahid AI Hub as a read-only portfolio-observability source that helps S3T:
- discover registered projects and their declared repositories;
- compare declared project state with GitHub, Vercel, Notion, and owner evidence;
- identify stale links, duplicate projects, conflicting status labels, and missing next actions;
- prepare portfolio-level monthly review inputs.

It does not replace GPT Innovation OS, Notion decision records, domain repositories, or owner approval gates.

## Evidence controls
Repository labels such as `Live`, `Prototype`, `Planning`, visibility, priority, revenue potential, health score, and next action are **declared registry metadata**. They are not automatically verified proof of:
- production readiness;
- paying clients or revenue;
- legal, security, privacy, or operational approval;
- complete integrations;
- successful commercial validation.

The README statement “All proof is in production” is a repository claim and must be reconciled against controlled evidence before reuse in an owner report or external communication.

## Technical observations
- Stack declared in the repository: Next.js 16, React 19, TypeScript, Tailwind CSS v4, and Vercel.
- `data/project-registry.ts` is the application’s source of truth for ten declared projects.
- GitHub and Vercel tokens are documented as server-side environment variables; no credential values were read or copied.
- `AGENTS.md` requires agents to consult the installed Next.js documentation before code changes because framework conventions may differ.

## Adapter contract
**Inputs:** read-only repository metadata, project ID, evidence cutoff, active S3T gate, and requested comparison.  
**Outputs:** portfolio reconciliation report with source links, timestamps, discrepancies, confidence, and owner decisions required.  
**Denied by default:** repository writes, deployment actions, environment-variable access, status promotion, publication, outreach, and cross-project data movement.

## Reconciliation priority
1. Verify repository and deployment existence.
2. Compare Sahid AI Hub registry metadata with the authoritative domain repository and Notion record.
3. Label differences; never silently overwrite.
4. Escalate status, revenue, production, or readiness conflicts to Coach Sahid.
5. Propose changes under a separate project-specific owner gate.

## Current conclusion
Approved as a controlled read-only S3T portfolio adapter. No runtime connection, deployment, Sahid AI Hub modification, or external publication is authorized.
