// ==============================================================================
// GoVPN IAM Domain Core Types & Entities
// Synchronized with backendv2 51 IAM Endpoints + 30 Legacy Endpoints
// ==============================================================================

export type UserRole =
  | "USER"
  | "SELLER"
  | "RESELLER"
  | "ADMIN"
  | "SUPERADMIN"
  | string;

export interface UserProfile {
  id: number | string;
  username: string;
  email: string;
  role: UserRole;
  balance?: number;
  income?: number;
  isActive?: boolean;
  isEmailVerified?: boolean;
  twoFactorEnabled?: boolean;
  avatarUrl?: string;
  phoneNumber?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthSession {
  token: string;
  refreshToken?: string;
  expiresAt?: string;
  user: UserProfile;
}

export interface UserDeviceSession {
  id: string | number;
  user_id: string | number;
  ip_address: string;
  user_agent: string;
  device_name?: string;
  browser?: string;
  os?: string;
  location?: string;
  is_current: boolean;
  last_active_at: string;
  created_at: string;
}

export interface UserAddress {
  id: string | number;
  user_id: string | number;
  title: string;
  recipient_name: string;
  phone_number: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state_province: string;
  postal_code: string;
  country: string;
  is_default: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface RoleEntity {
  id: string | number;
  name: string;
  slug: string;
  description?: string;
  permissions?: string[];
  user_count?: number;
  is_system?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface UserActivityLog {
  id: string | number;
  user_id: string | number;
  action: string;
  ip_address?: string;
  user_agent?: string;
  details?: Record<string, unknown> | string;
  created_at: string;
}

export interface UserAuditLog {
  id: string | number;
  admin_id?: string | number;
  target_user_id?: string | number;
  action: string;
  metadata?: string;
  created_at: string;
}

export interface TwoFactorSetupResponse {
  secret: string;
  qr_code_url: string;
  backup_codes: string[];
}

export interface TwoFactorVerifyDto {
  code: string;
  secret?: string;
}
