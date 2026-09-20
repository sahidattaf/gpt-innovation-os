import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { runMock } = vi.hoisted(() => ({ runMock: vi.fn() }));

vi.mock("@gpt-os/agents", () => ({
  chatAgent: { run: runMock },
}));

import { APPROVED_MODEL } from "@/lib/chat-config";
import { POST } from "./route";

const allowedOrigin = "https://preview.example.test";

function enableValidConfiguration(): void {
  vi.stubEnv("CHATBOT_ENABLED", "true");
  vi.stubEnv("ANTHROPIC_API_KEY", "synthetic-test-key");
  vi.stubEnv("CLAUDE_MODEL", APPROVED_MODEL);
  vi.stubEnv("CHATBOT_ALLOWED_ORIGINS", allowedOrigin);
  vi.stubEnv("CHATBOT_LOG_CONTENT", "false");
  vi.stubEnv("CHATBOT_TIMEOUT_MS", "20000");
  vi.stubEnv("CHATBOT_MAX_OUTPUT_TOKENS", "512");
}

function request(body: unknown, options: { origin?: string; contentType?: string } = {}): Request {
  return new Request("https://widget.example.test/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": options.contentType ?? "application/json",
      Origin: options.origin ?? allowedOrigin,
    },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

describe("POST /api/chat with synthetic provider fixtures", () => {
  beforeEach(() => {
    enableValidConfiguration();
    vi.spyOn(console, "info").mockImplementation(() => undefined);
    runMock.mockResolvedValue({
      content: "A synthetic workflow answer.",
      inputTokens: 12,
      outputTokens: 8,
      model: APPROVED_MODEL,
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("CHAT-018 returns bounded provider output and usage", async () => {
    const response = await POST(request({ messages: [{ role: "user", content: "Synthetic restaurant workflow" }] }));
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(payload.data.model).toBe(APPROVED_MODEL);
    expect(payload.data.usage).toEqual({ inputTokens: 12, outputTokens: 8 });
    expect(runMock).toHaveBeenCalledTimes(1);
    expect(runMock).toHaveBeenCalledWith(
      [{ role: "user", content: "Synthetic restaurant workflow" }],
      expect.objectContaining({ maxTokens: 512 }),
    );
  });

  it("CHAT-003 returns INVALID_REQUEST without a provider call", async () => {
    const response = await POST(request({ messages: [{ role: "user", content: " " }] }));
    expect(response.status).toBe(400);
    expect((await response.json()).error.code).toBe("INVALID_REQUEST");
    expect(runMock).not.toHaveBeenCalled();
  });

  it("CHAT-011 sanitizes provider failures", async () => {
    runMock.mockRejectedValueOnce(new Error("synthetic provider secret detail"));
    const response = await POST(request({ messages: [{ role: "user", content: "Synthetic failure" }] }));
    const payload = await response.json();
    expect(response.status).toBe(502);
    expect(payload.error.code).toBe("PROVIDER_ERROR");
    expect(JSON.stringify(payload)).not.toContain("secret detail");
  });

  it("CHAT-012 aborts a timed-out provider call without retry", async () => {
    vi.useFakeTimers();
    vi.stubEnv("CHATBOT_TIMEOUT_MS", "1000");
    runMock.mockImplementationOnce((_: unknown, options: { signal: AbortSignal }) =>
      new Promise((_, reject) => options.signal.addEventListener("abort", () => reject(new Error("aborted")))),
    );

    const responsePromise = POST(request({ messages: [{ role: "user", content: "Synthetic timeout" }] }));
    await vi.advanceTimersByTimeAsync(1_000);
    const response = await responsePromise;
    expect(response.status).toBe(504);
    expect((await response.json()).error.code).toBe("PROVIDER_TIMEOUT");
    expect(runMock).toHaveBeenCalledTimes(1);
  });

  it("fails closed when provider usage or model violates the cost contract", async () => {
    runMock.mockResolvedValueOnce({
      content: "Synthetic answer",
      inputTokens: 12,
      outputTokens: 513,
      model: APPROVED_MODEL,
    });
    const response = await POST(request({ messages: [{ role: "user", content: "Synthetic cost test" }] }));
    expect(response.status).toBe(502);
    expect((await response.json()).error.code).toBe("PROVIDER_ERROR");
  });

  it("CHAT-013 fails closed when disabled", async () => {
    vi.stubEnv("CHATBOT_ENABLED", "false");
    const response = await POST(request({ messages: [{ role: "user", content: "Synthetic question" }] }));
    expect(response.status).toBe(503);
    expect((await response.json()).error.code).toBe("CHAT_DISABLED");
    expect(runMock).not.toHaveBeenCalled();
  });

  it("CHAT-014 fails closed for missing configuration", async () => {
    vi.stubEnv("ANTHROPIC_API_KEY", "");
    const response = await POST(request({ messages: [{ role: "user", content: "Synthetic question" }] }));
    expect(response.status).toBe(503);
    expect((await response.json()).error.code).toBe("CONFIGURATION_ERROR");
    expect(runMock).not.toHaveBeenCalled();
  });

  it("CHAT-015 rejects a disallowed origin", async () => {
    const response = await POST(request(
      { messages: [{ role: "user", content: "Synthetic question" }] },
      { origin: "https://unapproved.example.test" },
    ));
    expect(response.status).toBe(403);
    expect((await response.json()).error.code).toBe("ORIGIN_NOT_ALLOWED");
    expect(runMock).not.toHaveBeenCalled();
  });

  it("rejects invalid JSON and unsupported content types", async () => {
    const invalidJson = await POST(request("{", { contentType: "application/json" }));
    const wrongType = await POST(request("hello", { contentType: "text/plain" }));
    expect(invalidJson.status).toBe(400);
    expect(wrongType.status).toBe(400);
    expect(runMock).not.toHaveBeenCalled();
  });

  it("returns PAYLOAD_TOO_LARGE before provider invocation", async () => {
    const oversized = "x".repeat(16_385);
    const response = await POST(request(oversized));
    expect(response.status).toBe(413);
    expect((await response.json()).error.code).toBe("PAYLOAD_TOO_LARGE");
    expect(runMock).not.toHaveBeenCalled();
  });

  it("logs metadata without message content", async () => {
    const privateSyntheticText = "synthetic-do-not-log-123";
    await POST(request({ messages: [{ role: "user", content: privateSyntheticText }] }));
    const logged = JSON.stringify(vi.mocked(console.info).mock.calls);
    expect(logged).toContain("chat_request");
    expect(logged).not.toContain(privateSyntheticText);
  });
});
