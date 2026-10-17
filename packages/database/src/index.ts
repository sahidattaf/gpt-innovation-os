export { getDb, requireEnv } from "./client";
export type { Database, Tables } from "./types";
// getAdminDb is intentionally absent from this public entry.
// Use: import { getAdminDb } from "@gpt-os/database/admin"  (server-only)
