# Supabase Schema — Open EU AI Operator

## Purpose
This schema gives the Open EU AI Operator a lightweight data layer for organizations, workflows, agents, tasks, and audit logs.

## Design Principles
- Multi-organization ready
- Privacy-aware
- Minimal personal data
- Audit-friendly
- Demo-safe by default

## Core Tables
```sql
create table organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  country text,
  sector text,
  created_at timestamptz default now()
);

create table users (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete cascade,
  name text,
  email text,
  role text default 'operator',
  created_at timestamptz default now()
);

create table workflows (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete cascade,
  name text not null,
  sector text,
  status text default 'draft',
  human_review_required boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table agents (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  purpose text,
  sector text,
  status text default 'draft',
  github_path text,
  created_at timestamptz default now()
);

create table agent_runs (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete cascade,
  workflow_id uuid references workflows(id) on delete set null,
  agent_id uuid references agents(id) on delete set null,
  run_status text default 'completed',
  input_summary text,
  output_summary text,
  human_review_status text default 'pending',
  created_at timestamptz default now()
);

create table tasks (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete cascade,
  workflow_id uuid references workflows(id) on delete set null,
  title text not null,
  status text default 'backlog',
  priority text default 'medium',
  owner text,
  due_date date,
  created_at timestamptz default now()
);

create table compliance_checks (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete cascade,
  workflow_id uuid references workflows(id) on delete cascade,
  framework text not null,
  check_name text not null,
  status text default 'not_started',
  notes text,
  created_at timestamptz default now()
);

create table audit_logs (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete cascade,
  actor text,
  action text not null,
  object_type text,
  object_id uuid,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);
```

## Recommended Indexes
```sql
create index idx_users_org on users(organization_id);
create index idx_workflows_org on workflows(organization_id);
create index idx_agent_runs_org on agent_runs(organization_id);
create index idx_agent_runs_workflow on agent_runs(workflow_id);
create index idx_tasks_org on tasks(organization_id);
create index idx_tasks_status on tasks(status);
create index idx_compliance_org on compliance_checks(organization_id);
create index idx_audit_org on audit_logs(organization_id);
```

## Demo Seed Data
```sql
insert into organizations (name, country, sector)
values ('Demo Hospitality SME', 'Netherlands', 'hospitality');

insert into agents (name, purpose, sector, status, github_path)
values
('HospitalityOSGPT', 'Hospitality workflow automation', 'hospitality', 'active', 'docs/open-eu-ai-operator/HOSPITALITY-OS-STARTER.md'),
('RealEstateOSGPT', 'Real estate workflow automation', 'real_estate', 'active', 'docs/open-eu-ai-operator/REAL-ESTATE-OS-STARTER.md'),
('MarketingOSGPT', 'Marketing workflow automation', 'marketing', 'active', 'docs/open-eu-ai-operator/MARKETING-OS-STARTER.md');
```

## Privacy Notes
- Avoid storing raw sensitive prompts.
- Store summaries instead of full private inputs when possible.
- Use fake demo data in public examples.
- Add row-level security before production use.

## v0.1 Success Criteria
A developer can create the core database structure and seed demo agents in one Supabase project.