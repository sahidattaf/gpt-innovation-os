import Anthropic from "@anthropic-ai/sdk";
import type { AgentConfig, AgentMessage, AgentResponse } from "./types";

const DEFAULT_MODEL = "claude-sonnet-4-6";
const DEFAULT_MAX_TOKENS = 4096;

export function createAgent(config: AgentConfig) {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  return {
    async run(messages: AgentMessage[]): Promise<AgentResponse> {
      const response = await client.messages.create({
        model: config.model ?? process.env.CLAUDE_MODEL ?? DEFAULT_MODEL,
        max_tokens: config.maxTokens ?? DEFAULT_MAX_TOKENS,
        system: [
          {
            type: "text",
            text: config.systemPrompt,
            // Enable prompt caching for long system prompts
            ...(config.systemPrompt.length > 1024 ? { cache_control: { type: "ephemeral" } } : {}),
          },
        ],
        messages: messages.map((m) => ({ role: m.role, content: m.content })),
      });

      const content = response.content
        .filter((b) => b.type === "text")
        .map((b) => (b as { type: "text"; text: string }).text)
        .join("");

      return {
        content,
        inputTokens: response.usage.input_tokens,
        outputTokens: response.usage.output_tokens,
        model: response.model,
      };
    },
  };
}
