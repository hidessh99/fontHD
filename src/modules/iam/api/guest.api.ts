// ==============================================================================
// GoVPN IAM Guest / Public Authentication API Client (9 Endpoints)
// Synchronized with backendv2 01-auth catalog
// ==============================================================================

import { apiClient, ApiResponse } from "@/lib/api/http-client";
import { AuthSession } from "../types/iam.types";
import {
  LoginRequest,
  RegisterRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  VerifyEmailRequest,
  ResendVerifyRequest,
} from "../types/guest.types";

export const iamGuestApi = {
  // 1. POST /api/auth/login
  login: (data: LoginRequest): Promise<ApiResponse<AuthSession>> =>
    apiClient.post<AuthSession>("/api/auth/login", data),

  // 2. POST /api/auth/register
  register: (data: RegisterRequest): Promise<ApiResponse<AuthSession>> =>
    apiClient.post<AuthSession>("/api/auth/register", data),

  // 3. POST /api/auth/forgot-password
  forgotPassword: (data: ForgotPasswordRequest): Promise<ApiResponse<{ message: string }>> =>
    apiClient.post<{ message: string }>("/api/auth/forgot-password", data),

  // 4. POST /api/auth/reset-password
  resetPassword: (data: ResetPasswordRequest): Promise<ApiResponse<{ message: string }>> =>
    apiClient.post<{ message: string }>("/api/auth/reset-password", data),

  // 5. GET /api/auth/verify
  verifyEmail: (params: VerifyEmailRequest): Promise<ApiResponse<{ verified: boolean }>> =>
    apiClient.get<{ verified: boolean }>("/api/auth/verify", { params: { token: params.token } }),

  // 6. GET /api/auth/resend-verify
  resendVerifyGet: (email: string): Promise<ApiResponse<{ sent: boolean }>> =>
    apiClient.get<{ sent: boolean }>("/api/auth/resend-verify", { params: { email } }),

  // 7. POST /api/auth/verify/resend
  resendVerifyPost: (data: ResendVerifyRequest): Promise<ApiResponse<{ sent: boolean }>> =>
    apiClient.post<{ sent: boolean }>("/api/auth/verify/resend", data),

  // 8. POST /api/auth/verify-password
  verifyPassword: (data: ResetPasswordRequest): Promise<ApiResponse<{ valid: boolean }>> =>
    apiClient.post<{ valid: boolean }>("/api/auth/verify-password", data),

  // 9. GET /api/auth/google/login
  getGoogleLoginUrl: (): string => "/api/auth/google/login",
};
