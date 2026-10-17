import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";

export function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`Missing environment variable: ${key}`);
  return value;
}

let _db: SupabaseClient<Database> | null = null;

// Lazy construction: the client is created on first access, not at import time.
// This prevents NEXT_PUBLIC_* vars from being demanded in build contexts that
// bundle but do not invoke this module (e.g. Server Components that import
// only types, or test environments using synthetic values).
export function getDb(): SupabaseClient<Database> {
  if (!_db) {
    _db = createClient<Database>(
      requireEnv("NEXT_PUBLIC_SUPABASE_URL"),
      requireEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
    );
  }
  return _db;
}
