import { z } from "zod";

export const CHAT_LIMITS = {
  maxMessages: 6,
  maxMessageCharacters: 2_000,
  maxConversationCharacters: 6_000,
  maxRequestBytes: 16_384,
} as const;

export const PUBLIC_ERROR_CODES = [
  "INVALID_REQUEST",
  "ORIGIN_NOT_ALLOWED",
  "PAYLOAD_TOO_LARGE",
  "RATE_LIMITED",
  "INTERNAL_ERROR",
  "PROVIDER_ERROR",
  "CHAT_DISABLED",
  "CONFIGURATION_ERROR",
  "PROVIDER_TIMEOUT",
] as const;

export type PublicErrorCode = (typeof PUBLIC_ERROR_CODES)[number];

const messageSchema = z
  .object({
    role: z.enum(["user", "assistant"]),
    content: z.string().trim().min(1).max(CHAT_LIMITS.maxMessageCharacters),
  })
  .strict();

export const chatRequestSchema = z
  .object({
    requestId: z.string().uuid().optional(),
    messages: z.array(messageSchema).min(1).max(CHAT_LIMITS.maxMessages),
  })
  .strict()
  .superRefine(({ messages }, context) => {
    const totalCharacters = messages.reduce((total, message) => total + message.content.length, 0);
    if (totalCharacters > CHAT_LIMITS.maxConversationCharacters) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Conversation exceeds ${CHAT_LIMITS.maxConversationCharacters} characters.`,
        path: ["messages"],
      });
    }

    messages.forEach((message, index) => {
      const expectedRole = index % 2 === 0 ? "user" : "assistant";
      if (message.role !== expectedRole) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Message ${index + 1} must use role ${expectedRole}.`,
          path: ["messages", index, "role"],
        });
      }
    });

    if (messages.at(-1)?.role !== "user") {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Conversation must end with a user message.",
        path: ["messages"],
      });
    }
  });

export type ChatRequest = z.infer<typeof chatRequestSchema>;
export type ChatMessage = ChatRequest["messages"][number];

export interface ChatSuccessResponse {
  ok: true;
  requestId: string;
  data: {
    message: { role: "assistant"; content: string };
    model: string;
    usage: { inputTokens: number; outputTokens: number };
  };
}

export interface ChatErrorResponse {
  ok: false;
  requestId: string;
  error: { code: PublicErrorCode; message: string };
}

export const PUBLIC_ERROR_MESSAGES: Record<PublicErrorCode, string> = {
  INVALID_REQUEST: "Please check your message and try again.",
  ORIGIN_NOT_ALLOWED: "This chat request is not allowed.",
  PAYLOAD_TOO_LARGE: "Please shorten the conversation and try again.",
  RATE_LIMITED: "Too many requests. Please wait and try again.",
  INTERNAL_ERROR: "The assistant could not respond. Please try again later.",
  PROVIDER_ERROR: "The assistant is temporarily unavailable. Please try again later.",
  CHAT_DISABLED: "Chat is temporarily unavailable.",
  CONFIGURATION_ERROR: "Chat is not configured yet.",
  PROVIDER_TIMEOUT: "The assistant took too long to respond. Please try again later.",
};
