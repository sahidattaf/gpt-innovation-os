import { createAgent } from "./runner";
import { CHAT_SYSTEM_PROMPT } from "@gpt-os/prompts";

export const chatAgent = createAgent({
  systemPrompt: CHAT_SYSTEM_PROMPT,
  maxTokens: 512,
});
