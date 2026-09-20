# GPTI Chatbot Controlled Operations

**Status:** implementation review only; public activation is not authorized

**Owner gate:** GPTI-CHATBOT-CONNECT-2

**Data boundary:** synthetic messages only

## Default state

The route fails closed unless `CHATBOT_ENABLED` is exactly `true`. Keep it false or absent in every deployed environment until a separate credential/live-preview gate. Production activation requires another explicit owner gate.

## Required server configuration

| Variable | Controlled value |
|---|---|
| `ANTHROPIC_API_KEY` | Secret; server only; not authorized by this gate |
| `CLAUDE_MODEL` | `claude-haiku-4-5-20251001` |
| `CHATBOT_ENABLED` | `false` until separately approved |
| `CHATBOT_MAX_OUTPUT_TOKENS` | Integer from 1 through 512 |
| `CHATBOT_TIMEOUT_MS` | Integer from 1,000 through 20,000 |
| `CHATBOT_ALLOWED_ORIGINS` | Comma-separated exact HTTPS origins; no wildcard |
| `CHATBOT_LOG_CONTENT` | Absent or `false`; `true` fails closed |

Never use a `NEXT_PUBLIC_` variable for provider credentials or server controls.

## Synthetic preview checklist

1. Confirm the preview remains protected.
2. Confirm `CHATBOT_ENABLED=false` and `/api/chat` returns `503 CHAT_DISABLED` without a provider request.
3. Run install, lint, typecheck, tests, build, and secret scan.
4. Verify request validation, disallowed origin, disabled, missing configuration, provider error, timeout, and markup-as-text cases.
5. Confirm logs contain request ID, status, duration, model, and usage only—never message content, raw IP, credentials, cookies, or headers.
6. Do not enable a provider call without a separate owner gate.

## Public activation blockers

- Separate approval for credentials and one controlled live preview test.
- All synthetic fixtures passing.
- Vercel Firewall rule for `/api/chat`: 5 requests per minute per source IP, burst maximum 10, returning 429.
- Anthropic workspace monthly cap of USD 10 and owner review at USD 5.
- Preview evidence for mobile/desktop, keyboard, loading, success, and every public error state.
- Separate merge and public-activation gates.

## Privacy-safe monitoring

Expected structured log fields: event, request ID, route, outcome code, HTTP status, duration, model, and input/output token totals. Message content, system prompts, API keys, raw IP addresses, email, phone, cookies, and authorization headers are prohibited.

Pause immediately for secret exposure, content in logs, unexpected model or token counts, repeated 5xx/timeouts, rate-limit bypass, unexpected cost, unsafe commitments, or fabricated business claims.

## Disable and rollback

1. Set `CHATBOT_ENABLED=false` under a separately authorized environment change.
2. Confirm `/api/chat` returns `503 CHAT_DISABLED` without provider invocation.
3. Preserve privacy-safe request IDs and outcome logs.
4. Stop testing and public links/embedding.
5. Rotate a credential only if exposure is suspected and separately authorized.
6. Revert the implementation commit through a reviewed PR.
7. Re-run affected synthetic fixtures before requesting re-enable approval.

Before merge, rollback is simply closing the implementation PR; no runtime state or stored conversations exist.
