// ==============================================================================
// GoVPN IAM User Role DTOs & Contracts (18 Endpoints)
// Synchronized with backendv2 user/profile/sessions/addresses
// ==============================================================================

export interface UpdateProfileDto {
  username?: string;
  email?: string;
  phone_number?: string;
  avatar_url?: string;
}

export interface ChangePasswordRequest {
  old_password: string;
  new_password: string;
}

export interface UserAddressDto {
  title: string;
  recipient_name: string;
  phone_number: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state_province: string;
  postal_code: string;
  country: string;
  is_default?: boolean;
}

export interface UserStatsResponse {
  active_accounts: number;
  total_spent: number;
  balance: number;
  last_login_at?: string;
  active_sessions_count: number;
}

export interface SessionRevokeDto {
  session_id: string | number;
}
