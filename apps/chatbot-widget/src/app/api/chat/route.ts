import { chatAgent } from "@gpt-os/agents";
import {
  CHAT_LIMITS,
  PUBLIC_ERROR_MESSAGES,
  chatRequestSchema,
  type ChatErrorResponse,
  type ChatSuccessResponse,
  type PublicErrorCode,
} from "@/lib/chat-contract";
import { ChatConfigurationError, readChatConfig } from "@/lib/chat-config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const NO_STORE_HEADERS = { "Cache-Control": "no-store" } as const;

function errorResponse(code: PublicErrorCode, status: number, requestId: string): Response {
  const body: ChatErrorResponse = {
    ok: false,
    requestId,
    error: { code, message: PUBLIC_ERROR_MESSAGES[code] },
  };
  return Response.json(body, { status, headers: NO_STORE_HEADERS });
}

function logOutcome(fields: {
  requestId: string;
  code: string;
  status: number;
  startedAt: number;
  model?: string;
  inputTokens?: number;
  outputTokens?: number;
}): void {
  console.info(JSON.stringify({
    event: "chat_request",
    requestId: fields.requestId,
    route: "/api/chat",
    outcomeCode: fields.code,
    status: fields.status,
    durationMs: Date.now() - fields.startedAt,
    model: fields.model,
    inputTokens: fields.inputTokens,
    outputTokens: fields.outputTokens,
  }));
}

export async function POST(request: Request): Promise<Response> {
  const startedAt = Date.now();
  let requestId = crypto.randomUUID();

  const finishError = (code: PublicErrorCode, status: number): Response => {
    logOutcome({ requestId, code, status, startedAt });
    return errorResponse(code, status, requestId);
  };

  let config;
  try {
    config = readChatConfig();
  } catch (error: unknown) {
    if (error instanceof ChatConfigurationError) return finishError("CONFIGURATION_ERROR", 503);
    return finishError("INTERNAL_ERROR", 500);
  }

  if (!config.enabled) return finishError("CHAT_DISABLED", 503);

  const origin = request.headers.get("origin");
  if (!origin || !config.allowedOrigins.has(origin)) return finishError("ORIGIN_NOT_ALLOWED", 403);

  const contentType = request.headers.get("content-type")?.split(";", 1)[0]?.trim();
  if (contentType !== "application/json") return finishError("INVALID_REQUEST", 400);

  const contentLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(contentLength) && contentLength > CHAT_LIMITS.maxRequestBytes) {
    return finishError("PAYLOAD_TOO_LARGE", 413);
  }

  let body: unknown;
  try {
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > CHAT_LIMITS.maxRequestBytes) {
      return finishError("PAYLOAD_TOO_LARGE", 413);
    }
    body = JSON.parse(rawBody) as unknown;
  } catch {
    return finishError("INVALID_REQUEST", 400);
  }

  const parsed = chatRequestSchema.safeParse(body);
  if (!parsed.success) return finishError("INVALID_REQUEST", 400);
  requestId = parsed.data.requestId ?? requestId;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), config.timeoutMs);

  try {
    const result = await chatAgent.run(parsed.data.messages, {
      signal: controller.signal,
      maxTokens: config.maxOutputTokens,
    });
    if (
      result.model !== config.model ||
      result.outputTokens > config.maxOutputTokens ||
      result.inputTokens < 0 ||
      result.outputTokens < 0 ||
      result.content.trim().length === 0
    ) {
      throw new Error("Provider response violated the controlled response contract.");
    }
    const response: ChatSuccessResponse = {
      ok: true,
      requestId,
      data: {
        message: { role: "assistant", content: result.content },
        model: result.model,
        usage: { inputTokens: result.inputTokens, outputTokens: result.outputTokens },
      },
    };
    logOutcome({
      requestId,
      code: "OK",
      status: 200,
      startedAt,
      model: result.model,
      inputTokens: result.inputTokens,
      outputTokens: result.outputTokens,
    });
    return Response.json(response, { headers: NO_STORE_HEADERS });
  } catch {
    return finishError(controller.signal.aborted ? "PROVIDER_TIMEOUT" : "PROVIDER_ERROR", controller.signal.aborted ? 504 : 502);
  } finally {
    clearTimeout(timeout);
  }
}
