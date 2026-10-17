// SERVER-SIDE ONLY.
// This module is protected by the `server-only` package. Next.js will throw a
// build-time error if any Client Component (or file reachable from one) imports
// this path. Never re-export adminDb from a public entry point.
import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";
import { requireEnv } from "./client";

let _adminDb: SupabaseClient<Database> | null = null;

// Lazy construction: the client is created on first access, not at import time.
// This prevents the service-role secret from being demanded during module
// evaluation in contexts that never call getAdminDb().
export function getAdminDb(): SupabaseClient<Database> {
  if (!_adminDb) {
    _adminDb = createClient<Database>(
      requireEnv("NEXT_PUBLIC_SUPABASE_URL"),
      requireEnv("SUPABASE_SERVICE_ROLE_KEY"),
      { auth: { autoRefreshToken: false, persistSession: false } },
    );
  }
  return _adminDb;
}
