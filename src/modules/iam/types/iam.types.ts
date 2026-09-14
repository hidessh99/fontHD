// ==============================================================================
// GoVPN IAM Domain Types & Contracts
// Synchronized with 05-iam Postman Collection
// ==============================================================================

export interface LoginRequest {
  username_or_email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface AuthSession {
  token: string;
  refreshToken?: string;
  expiresAt?: string;
  user: UserProfile;
}

export interface UserProfile {
  id: number | string;
  username: string;
  email: string;
  role: "USER" | "SELLER" | "ADMIN" | "SUPERADMIN" | string;
  balance?: number;
  isActive?: boolean;
  isEmailVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ChangePasswordRequest {
  old_password: string;
  new_password: string;
}

export interface ApiKeyItem {
  id: number | string;
  name: string;
  keyPrefix: string;
  createdAt: string;
  lastUsedAt?: string;
}
