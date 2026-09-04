# S3T System Overview

**Control ID:** S3T-SOURCEPACK-1  
**Status:** Internal controlled source  
**Owner:** Coach Sahid Attaf  
**Repository owner:** GPT Innovation by Attaf

## Purpose
Software 3.0 Transformation OS is the shared governance and transformation layer for approved projects. It analyzes workflows, assigns the correct combination of human judgment, deterministic software, AI models, tools, and evidence, and advances work only through explicit G0–G8 gates.

## Architecture
- **S3T Core:** gates, evidence rules, KPIs, evaluations, prompt policy, and monthly portfolio review.
- **Project adapters:** project-specific scope, authorities, sources, risks, KPIs, and stop conditions.
- **Execution systems:** domain applications and plugins such as Hospitality OS and BOSSA AI OS.
- **Systems of record:** GitHub for versioned code and documentation; Notion for decisions, portfolio status, tasks, and KPI evidence.
- **Human control:** Coach Sahid approves high-impact actions and every gate that expands authority.

## Operating rule
Do not duplicate the complete S3T core in each project. Each project receives a lightweight adapter that references this core.

## Current authorization
Documentation and registration only. No deployment, production data change, external integration, Claude configuration, secrets, or merge is authorized by S3T-SOURCEPACK-1.
