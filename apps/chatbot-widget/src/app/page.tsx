"use client";

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { CHAT_LIMITS, type ChatErrorResponse, type ChatMessage, type ChatSuccessResponse } from "@/lib/chat-contract";

const COOLDOWN_MS = 5_000;

export default function ChatWidgetPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [isCoolingDown, setIsCoolingDown] = useState(false);
  const cooldownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (cooldownTimer.current) clearTimeout(cooldownTimer.current);
  }, []);

  const canSend = input.trim().length > 0 && !isSending && !isCoolingDown;

  async function sendMessage(event?: FormEvent): Promise<void> {
    event?.preventDefault();
    const content = input.trim();
    if (!content || isSending || isCoolingDown) return;

    if (content.length > CHAT_LIMITS.maxMessageCharacters) {
      setError(`Messages must be ${CHAT_LIMITS.maxMessageCharacters.toLocaleString()} characters or fewer.`);
      return;
    }

    const userMessage: ChatMessage = { role: "user", content };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setError(null);
    setIsSending(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const payload = (await response.json()) as ChatSuccessResponse | ChatErrorResponse;
      if (!response.ok || !payload.ok) {
        setError(payload.ok ? "The assistant could not respond." : payload.error.message);
        return;
      }
      setMessages((current) => [...current, payload.data.message]);
    } catch {
      setError("The assistant could not be reached. Please try again later.");
    } finally {
      setIsSending(false);
      setIsCoolingDown(true);
      cooldownTimer.current = setTimeout(() => setIsCoolingDown(false), COOLDOWN_MS);
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>): void {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void sendMessage();
    }
  }

  return (
    <main className="flex h-screen flex-col bg-gray-50">
      <header className="border-b border-gray-200 bg-white px-4 py-3">
        <h1 className="text-sm font-semibold text-gray-900">GPT Innovation by Attaf — AI Discovery Assistant</h1>
        <p className="mt-1 text-xs text-gray-600">Do not submit confidential, personal, payment, medical, or legal information.</p>
      </header>

      <section aria-label="Conversation" aria-live="polite" className="flex-1 overflow-y-auto p-4">
        <div className="mx-auto max-w-2xl space-y-4">
          <div className="max-w-xs rounded-lg bg-blue-600 px-4 py-3 text-sm text-white">
            Hi! I can help you explore a practical, human-controlled AI workflow. What business process would you like to improve?
          </div>
          {messages.map((message, index) => (
            <div
              className={`max-w-xl rounded-lg px-4 py-3 text-sm ${
                message.role === "user" ? "ml-auto bg-gray-900 text-white" : "bg-blue-600 text-white"
              }`}
              key={`${message.role}-${index}`}
            >
              {message.content}
            </div>
          ))}
          {isSending ? <p className="text-sm text-gray-600">Assistant is thinking…</p> : null}
          {error ? <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p> : null}
        </div>
      </section>

      <form onSubmit={(event) => void sendMessage(event)} className="border-t border-gray-200 bg-white p-4">
        <div className="mx-auto flex max-w-2xl gap-2">
          <label className="sr-only" htmlFor="chat-message">Message</label>
          <textarea
            id="chat-message"
            rows={2}
            maxLength={CHAT_LIMITS.maxMessageCharacters}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a synthetic test message…"
            className="flex-1 resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={!canSend}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSending ? "Sending…" : isCoolingDown ? "Wait…" : "Send"}
          </button>
        </div>
        <p className="mx-auto mt-2 max-w-2xl text-xs text-gray-500">Enter sends · Shift+Enter adds a new line · Maximum 2,000 characters</p>
      </form>
    </main>
  );
}
