import { createClient } from "./client";
import type { AuthUser, AuthSession } from "./types";

export async function getSession(): Promise<AuthSession | null> {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getSession();

  if (error || !data.session) return null;

  const { session } = data;
  return {
    user: mapUser(session.user),
    accessToken: session.access_token,
    expiresAt: session.expires_at ?? 0,
  };
}

export async function getUser(): Promise<AuthUser | null> {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) return null;
  return mapUser(data.user);
}

export async function signOut(): Promise<void> {
  const supabase = createClient();
  await supabase.auth.signOut();
}

function mapUser(user: { id: string; email?: string; user_metadata?: Record<string, unknown>; created_at: string }): AuthUser {
  return {
    id: user.id,
    email: user.email,
    fullName: (user.user_metadata?.["full_name"] as string) ?? null,
    avatarUrl: (user.user_metadata?.["avatar_url"] as string) ?? null,
    createdAt: user.created_at,
  };
}
