# InterKambia Product Requirements

## 1. Product objective

Build the smallest trusted workflow that helps a qualified business client find, contract, and complete work with a verified provider across Curaçao and the Netherlands.

## 2. Pilot users

### Client

A business owner, manager, or procurement lead with a defined service need, budget or swap offer, timeline, and decision authority.

### Provider

A verified company, sole proprietor, or independent professional with proof of work, references, delivery capacity, and an approved service scope.

### Operator

The InterKambia human operator who qualifies requests, verifies providers, approves matches, monitors delivery, and handles escalation.

### Compliance reviewer

A legal, tax, privacy, accounting, or payment specialist who reviews high-risk decisions and production gates.

## 3. Core user journeys

### Provider journey

Application → screening → document review → verification → service profile → pilot activation → match → proposal → delivery → review.

### Client journey

Request → qualification → shortlist → proposal → agreement → delivery → acceptance → review.

### Service-swap journey

Request → bilateral match → reference-value agreement → deliverables → acceptance criteria → reciprocal delivery → completion.

## 4. MVP capabilities

- multilingual landing page in Papiamentu, Dutch, and English;
- provider application;
- client request intake;
- operator qualification workflow;
- verified provider directory;
- service catalog;
- human-assisted matching;
- proposal and milestone records;
- agreement templates;
- completion confirmation;
- reviews and incident flags;
- operator dashboard;
- email and WhatsApp notification adapters;
- audit trail for critical changes.

## 5. Explicit exclusions

The MVP does not include:

- platform-held escrow;
- automated payouts;
- automated dispute resolution;
- open public provider registration;
- consumer home services;
- medical, legal, financial, gambling, weapons, adult, or other regulated categories;
- cryptocurrency or transferable marketplace credits;
- native mobile applications;
- microservices or Kubernetes;
- government procurement workflows.

## 6. Matching model

AI can rank candidates, but the operator approves every pilot match.

| Factor | Weight |
|---|---:|
| Capability fit | 30% |
| Relevant proof of work | 20% |
| Availability | 15% |
| Budget or value fit | 15% |
| Language and cultural fit | 10% |
| Risk and reliability | 10% |

## 7. Trust controls

- invite-only pilot;
- verified identity and business status;
- portfolio and reference checks;
- category and risk review;
- clear deliverables and acceptance criteria;
- revision and cancellation rules;
- operator approval for every match;
- incident and dispute log;
- no platform custody of funds during the pilot.

## 8. Success metrics

### 30-day validation

- 15 Curaçao provider interviews;
- 10 Netherlands client interviews;
- five approved providers;
- five qualified clients;
- three validated service categories.

### 60-day pilot

- five completed matches;
- fewer than 5% material disputes;
- documented completion time and operator effort;
- evidence of willingness to pay.

### 90-day decision

Choose build, revise, or stop using demand, completion, repeat-use, unit-economics, compliance, and trust evidence.

## 9. Non-functional requirements

- data minimization;
- role-based access;
- server-only privileged credentials;
- full audit logging for verification and compliance changes;
- multilingual content quality review;
- accessible responsive interface;
- data isolation in a dedicated Supabase project;
- no AI output treated as final legal, tax, payment, or dispute advice.