const APPROVED_MODEL = "claude-haiku-4-5-20251001";
const DEFAULT_MAX_OUTPUT_TOKENS = 512;
const DEFAULT_TIMEOUT_MS = 20_000;

export interface ChatConfig {
  enabled: boolean;
  model: typeof APPROVED_MODEL;
  maxOutputTokens: number;
  timeoutMs: number;
  allowedOrigins: ReadonlySet<string>;
}

export class ChatConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ChatConfigurationError";
  }
}

type ChatEnvironment = Record<string, string | undefined>;

function parseBoundedInteger(
  value: string | undefined,
  fallback: number,
  minimum: number,
  maximum: number,
  name: string,
): number {
  if (value === undefined || value === "") return fallback;
  if (!/^\d+$/.test(value)) throw new ChatConfigurationError(`${name} must be an integer.`);
  const parsed = Number(value);
  if (parsed < minimum || parsed > maximum) {
    throw new ChatConfigurationError(`${name} is outside the approved range.`);
  }
  return parsed;
}

function parseOrigins(value: string | undefined): ReadonlySet<string> {
  if (!value) throw new ChatConfigurationError("CHATBOT_ALLOWED_ORIGINS is required.");
  const origins = value.split(",").map((origin) => origin.trim()).filter(Boolean);
  if (origins.length === 0) throw new ChatConfigurationError("At least one origin is required.");

  for (const origin of origins) {
    let parsed: URL;
    try {
      parsed = new URL(origin);
    } catch {
      throw new ChatConfigurationError("CHATBOT_ALLOWED_ORIGINS contains an invalid URL.");
    }
    if (parsed.origin !== origin || (parsed.protocol !== "https:" && parsed.hostname !== "localhost")) {
      throw new ChatConfigurationError("Allowed origins must be exact HTTPS origins or localhost.");
    }
  }
  return new Set(origins);
}

export function readChatConfig(environment: ChatEnvironment = process.env): ChatConfig {
  const enabled = environment.CHATBOT_ENABLED === "true";
  if (!enabled) {
    return {
      enabled: false,
      model: APPROVED_MODEL,
      maxOutputTokens: DEFAULT_MAX_OUTPUT_TOKENS,
      timeoutMs: DEFAULT_TIMEOUT_MS,
      allowedOrigins: new Set<string>(),
    };
  }

  if (!environment.ANTHROPIC_API_KEY) {
    throw new ChatConfigurationError("ANTHROPIC_API_KEY is required when chat is enabled.");
  }
  if (environment.CLAUDE_MODEL !== APPROVED_MODEL) {
    throw new ChatConfigurationError("CLAUDE_MODEL is not approved.");
  }
  if (environment.CHATBOT_LOG_CONTENT === "true") {
    throw new ChatConfigurationError("Content logging is prohibited.");
  }

  return {
    enabled: true,
    model: APPROVED_MODEL,
    maxOutputTokens: parseBoundedInteger(
      environment.CHATBOT_MAX_OUTPUT_TOKENS,
      DEFAULT_MAX_OUTPUT_TOKENS,
      1,
      DEFAULT_MAX_OUTPUT_TOKENS,
      "CHATBOT_MAX_OUTPUT_TOKENS",
    ),
    timeoutMs: parseBoundedInteger(
      environment.CHATBOT_TIMEOUT_MS,
      DEFAULT_TIMEOUT_MS,
      1_000,
      DEFAULT_TIMEOUT_MS,
      "CHATBOT_TIMEOUT_MS",
    ),
    allowedOrigins: parseOrigins(environment.CHATBOT_ALLOWED_ORIGINS),
  };
}

export { APPROVED_MODEL };
