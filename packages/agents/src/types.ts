export interface AgentMessage {
  role: "user" | "assistant";
  content: string;
}

export interface AgentConfig {
  model?: string;
  systemPrompt: string;
  maxTokens?: number;
  temperature?: number;
}

export interface AgentResponse {
  content: string;
  inputTokens: number;
  outputTokens: number;
  model: string;
}
