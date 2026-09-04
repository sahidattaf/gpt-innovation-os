# GPT Innovation OS Adapter

**Role:** S3T implementation owner and reusable technical layer

## Responsibilities
- maintain the canonical S3T prompt and controlled source pack;
- version adapters, evaluation fixtures, and provider policies;
- enforce feature-branch and pull-request review;
- keep Notion business controls linked to GitHub evidence;
- prevent secrets and private Notion URLs from entering the public repository;
- expose reusable components without duplicating domain applications.

## Interface
Every request supplies: project ID, gate, objective, authoritative sources, evidence classes, allowed actions, prohibited actions, KPIs, and output contract.

Every response supplies: evidence-backed findings, assumptions, risks, gate status, proposed next action, and explicit stop condition.

## Provider boundary
Claude may remain the preferred reasoning environment, but this gate does not configure Claude. NVIDIA NIM and other providers require separate approved evaluation contracts and credentials handling.

## Change control
Main is not edited directly. Source-pack work is proposed on a feature branch, validated by CI, and stopped before merge.
