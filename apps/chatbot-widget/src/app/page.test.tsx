import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import ChatWidgetPage from "./page";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

describe("chat widget", () => {
  it("CHAT-019 blocks a second submission while the first is active", async () => {
    let resolveResponse: ((response: Response) => void) | undefined;
    const fetchMock = vi.fn(() => new Promise<Response>((resolve) => { resolveResponse = resolve; }));
    vi.stubGlobal("fetch", fetchMock);
    render(<ChatWidgetPage />);

    const input = screen.getByLabelText("Message");
    fireEvent.change(input, { target: { value: "Synthetic question" } });
    fireEvent.click(screen.getByRole("button", { name: "Send" }));

    expect((screen.getByRole("button", { name: "Sending…" }) as HTMLButtonElement).disabled).toBe(true);
    fireEvent.keyDown(input, { key: "Enter" });
    expect(fetchMock).toHaveBeenCalledTimes(1);

    resolveResponse?.(new Response(JSON.stringify({
      ok: true,
      requestId: "00000000-0000-4000-8000-000000000000",
      data: {
        message: { role: "assistant", content: "Synthetic answer" },
        model: "claude-haiku-4-5-20251001",
        usage: { inputTokens: 2, outputTokens: 2 },
      },
    }), { status: 200, headers: { "Content-Type": "application/json" } }));

    await screen.findByText("Synthetic answer");
  });

  it("renders markup-like model output as text", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({
      ok: true,
      requestId: "00000000-0000-4000-8000-000000000000",
      data: {
        message: { role: "assistant", content: "<script>synthetic()</script>" },
        model: "claude-haiku-4-5-20251001",
        usage: { inputTokens: 2, outputTokens: 2 },
      },
    }), { status: 200, headers: { "Content-Type": "application/json" } })));
    render(<ChatWidgetPage />);

    fireEvent.change(screen.getByLabelText("Message"), { target: { value: "Synthetic markup test" } });
    fireEvent.click(screen.getByRole("button", { name: "Send" }));

    expect(await screen.findByText("<script>synthetic()</script>")).toBeTruthy();
    expect(document.querySelector("script")).toBeNull();
  });

  it("shows the public API error without exposing internals", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({
      ok: false,
      requestId: "00000000-0000-4000-8000-000000000000",
      error: { code: "CHAT_DISABLED", message: "Chat is temporarily unavailable." },
    }), { status: 503, headers: { "Content-Type": "application/json" } })));
    render(<ChatWidgetPage />);

    fireEvent.change(screen.getByLabelText("Message"), { target: { value: "Synthetic disabled test" } });
    fireEvent.click(screen.getByRole("button", { name: "Send" }));

    await waitFor(() => expect(screen.getByRole("alert").textContent).toBe("Chat is temporarily unavailable."));
  });
});
