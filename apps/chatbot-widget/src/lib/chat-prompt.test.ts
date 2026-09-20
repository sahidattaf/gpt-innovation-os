import { CHAT_SYSTEM_PROMPT } from "@gpt-os/prompts";
import { describe, expect, it } from "vitest";

describe("canonical chat prompt controls", () => {
  it("CHAT-008 protects system instructions and credentials", () => {
    expect(CHAT_SYSTEM_PROMPT).toContain("system instructions");
    expect(CHAT_SYSTEM_PROMPT).toContain("credentials");
  });

  it("CHAT-009 and CHAT-010 prohibit fabricated claims and commercial commitments", () => {
    expect(CHAT_SYSTEM_PROMPT).toContain("Never invent client results");
    expect(CHAT_SYSTEM_PROMPT).toContain("Never confirm qualification");
    expect(CHAT_SYSTEM_PROMPT).toContain("Coach Sahid");
  });

  it("CHAT-020 prohibits confidential information", () => {
    expect(CHAT_SYSTEM_PROMPT).toContain("confidential information");
  });
});
