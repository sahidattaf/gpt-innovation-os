import { createAgent } from "./runner";

const SYSTEM_PROMPT = `You are a helpful AI assistant for GPT Innovation OS.
You help entrepreneurs discover, purchase, and operate AI-powered GPT products.
Be concise, practical, and action-oriented. Always suggest next steps.`;

export const chatAgent = createAgent({
  systemPrompt: SYSTEM_PROMPT,
  maxTokens: 2048,
});
