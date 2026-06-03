import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`Missing environment variable: ${key}`);
  return value;
}

export const db = createClient<Database>(
  requireEnv("NEXT_PUBLIC_SUPABASE_URL"),
  requireEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
);

export const adminDb = createClient<Database>(
  requireEnv("NEXT_PUBLIC_SUPABASE_URL"),
  requireEnv("SUPABASE_SERVICE_ROLE_KEY"),
  { auth: { autoRefreshToken: false, persistSession: false } },
);
