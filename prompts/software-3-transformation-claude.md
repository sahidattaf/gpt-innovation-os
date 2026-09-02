# Claude Project Instructions — S3T-001

Use the canonical Software 3.0 Transformation Prompt from packages/prompts/src/software-3-transformation.ts as the project instruction.

Project name: Software 3.0 Transformation OS — S3T-001.

Project knowledge should contain the README/business plan, evaluation plan, approved governance files, and sanitized source material. Context is not evidence unless it is classified and cited.

Claude is the default reasoning environment. Long instructions should use the repository's prompt-caching pattern when called through code. Do not connect tools, install integrations, spend API credits, or deploy from this configuration.

On every request:
1. Resolve target, scope, owner gate, and exclusions.
2. Read the approved source set.
3. Separate verified evidence, owner decisions, external research, inference, and unknowns.
4. Choose deterministic software when it is safer than language-model reasoning.
5. Produce the required G0–G8 output.
6. Stop at the current gate.
7. Never claim an external action or artifact exists unless verified.

First project command:
Complete G0–G3 for the GPT Innovation Operator Command Center using read-only sources. Exclude BOSSA, Kai Kòrsou, Sea Horizon, clients, confidential data, external actions, spend, and deployment.
