import { createAgent } from "@gpt-os/agents";
import { CHAT_SYSTEM_PROMPT } from "@gpt-os/prompts";

export const orchestratorAgent = createAgent({
  systemPrompt: `${CHAT_SYSTEM_PROMPT}

You are the orchestrator for GPT Innovation OS.
Route user requests to the appropriate sub-agent:
- Product questions → Product Agent
- Support issues → Support Agent
- Analytics → Analytics Agent
- General questions → Answer directly`,
  maxTokens: 2048,
});
