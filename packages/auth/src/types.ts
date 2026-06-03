export interface AuthUser {
  id: string;
  email: string | undefined;
  fullName: string | null;
  avatarUrl: string | null;
  createdAt: string;
}

export interface AuthSession {
  user: AuthUser;
  accessToken: string;
  expiresAt: number;
}
