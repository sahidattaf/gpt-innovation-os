import { describe, expect, it } from "vitest";
import { APPROVED_MODEL, ChatConfigurationError, readChatConfig } from "./chat-config";

const validEnvironment = (): Record<string, string | undefined> => ({
  CHATBOT_ENABLED: "true",
  ANTHROPIC_API_KEY: "synthetic-test-key",
  CLAUDE_MODEL: APPROVED_MODEL,
  CHATBOT_ALLOWED_ORIGINS: "https://preview.example.test",
  CHATBOT_LOG_CONTENT: "false",
});

describe("chat configuration", () => {
  it("CHAT-013 disables chat without requiring credentials", () => {
    expect(readChatConfig({ CHATBOT_ENABLED: "false" }).enabled).toBe(false);
  });

  it("CHAT-014 fails closed when required enabled configuration is absent", () => {
    expect(() => readChatConfig({ CHATBOT_ENABLED: "true" })).toThrow(ChatConfigurationError);
  });

  it("allows only the approved model", () => {
    expect(() => readChatConfig({ ...validEnvironment(), CLAUDE_MODEL: "unapproved" })).toThrow(ChatConfigurationError);
  });

  it("prohibits content logging", () => {
    expect(() => readChatConfig({ ...validEnvironment(), CHATBOT_LOG_CONTENT: "true" })).toThrow(ChatConfigurationError);
  });

  it("enforces output and timeout bounds", () => {
    expect(() => readChatConfig({ ...validEnvironment(), CHATBOT_MAX_OUTPUT_TOKENS: "513" })).toThrow(ChatConfigurationError);
    expect(() => readChatConfig({ ...validEnvironment(), CHATBOT_TIMEOUT_MS: "20001" })).toThrow(ChatConfigurationError);
  });

  it("accepts exact HTTPS origins and localhost only", () => {
    expect(readChatConfig(validEnvironment()).allowedOrigins.has("https://preview.example.test")).toBe(true);
    expect(() => readChatConfig({ ...validEnvironment(), CHATBOT_ALLOWED_ORIGINS: "http://public.example.test" })).toThrow(ChatConfigurationError);
  });
});
