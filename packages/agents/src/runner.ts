import Anthropic from "@anthropic-ai/sdk";
import type { AgentConfig, AgentMessage, AgentResponse, AgentRunOptions } from "./types";

const DEFAULT_MODEL = "claude-haiku-4-5-20251001";
const DEFAULT_MAX_TOKENS = 512;

export function createAgent(config: AgentConfig) {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  return {
    async run(messages: AgentMessage[], options: AgentRunOptions = {}): Promise<AgentResponse> {
      const response = await client.messages.create(
        {
          model: config.model ?? process.env.CLAUDE_MODEL ?? DEFAULT_MODEL,
          max_tokens: options.maxTokens ?? config.maxTokens ?? DEFAULT_MAX_TOKENS,
          system: [
            {
              type: "text",
              text: config.systemPrompt,
              // Enable prompt caching for long system prompts
              ...(config.systemPrompt.length > 1024 ? { cache_control: { type: "ephemeral" } } : {}),
            },
          ],
          messages: messages.map((m) => ({ role: m.role, content: m.content })),
        },
        { signal: options.signal },
      );

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
