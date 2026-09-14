// ==============================================================================
// GoVPN IAM Guest / Public Authentication DTOs (9 Endpoints)
// Synchronized with backendv2 guest/auth catalog
// ==============================================================================

export interface LoginRequest {
  username_or_email: string;
  password: string;
  two_factor_code?: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  referral_code?: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  new_password: string;
}

export interface VerifyEmailRequest {
  token: string;
}

export interface ResendVerifyRequest {
  email: string;
}
