// ==============================================================================
// GoVPN IAM User API Client (18 Endpoints)
// Synchronized with backendv2 02-users & user/auth catalog
// ==============================================================================

import { apiClient, ApiResponse } from "@/lib/api/http-client";
import {
  UserProfile,
  UserDeviceSession,
  UserAddress,
} from "../types/iam.types";
import {
  UpdateProfileDto,
  ChangePasswordRequest,
  UserAddressDto,
  UserStatsResponse,
} from "../types/user.types";

export const iamUserApi = {
  // === PROFILE & AUTH (6 Endpoints) ===
  // 1. GET /api/users/profile
  getProfile: (): Promise<ApiResponse<UserProfile>> =>
    apiClient.get<UserProfile>("/api/users/profile"),

  // 2. PUT /api/users/:id
  updateProfile: (id: string | number, data: UpdateProfileDto): Promise<ApiResponse<UserProfile>> =>
    apiClient.put<UserProfile>(`/api/users/${id}`, data),

  // 3. GET /api/users/:id
  getUserById: (id: string | number): Promise<ApiResponse<UserProfile>> =>
    apiClient.get<UserProfile>(`/api/users/${id}`),

  // 4. DELETE /api/users/:id
  deleteAccount: (id: string | number): Promise<ApiResponse<{ deleted: boolean }>> =>
    apiClient.delete<{ deleted: boolean }>(`/api/users/${id}`),

  // 5. PUT /api/users/change-password
  changePassword: (data: ChangePasswordRequest): Promise<ApiResponse<{ success: boolean }>> =>
    apiClient.put<{ success: boolean }>("/api/users/change-password", data),

  // 6. GET /api/users/dashboard/stats
  getDashboardStats: (): Promise<ApiResponse<UserStatsResponse>> =>
    apiClient.get<UserStatsResponse>("/api/users/dashboard/stats"),

  // === SESSION MANAGEMENT (4 Endpoints) ===
  // 7. GET /api/auth/sessions
  getActiveSessions: (): Promise<ApiResponse<UserDeviceSession[]>> =>
    apiClient.get<UserDeviceSession[]>("/api/auth/sessions"),

  // 8. GET /api/users/sessions (alias)
  getUserSessions: (): Promise<ApiResponse<UserDeviceSession[]>> =>
    apiClient.get<UserDeviceSession[]>("/api/users/sessions"),

  // 9. POST /api/auth/logout
  logout: (): Promise<ApiResponse<{ logged_out: boolean }>> =>
    apiClient.post<{ logged_out: boolean }>("/api/auth/logout"),

  // 10. POST /api/auth/sessions/logout-all
  logoutAllSessions: (): Promise<ApiResponse<{ revoked_count: number }>> =>
    apiClient.post<{ revoked_count: number }>("/api/auth/sessions/logout-all"),

  // 11. POST /api/users/logout-all (alias)
  userLogoutAll: (): Promise<ApiResponse<{ revoked_count: number }>> =>
    apiClient.post<{ revoked_count: number }>("/api/users/logout-all"),

  // === USER ADDRESS BOOK (7 Endpoints) ===
  // 12. GET /api/users/address
  getAddressList: (): Promise<ApiResponse<UserAddress[]>> =>
    apiClient.get<UserAddress[]>("/api/users/address"),

  // 13. POST /api/users/address
  createAddress: (data: UserAddressDto): Promise<ApiResponse<UserAddress>> =>
    apiClient.post<UserAddress>("/api/users/address", data),

  // 14. GET /api/users/address/:id
  getAddressById: (id: string | number): Promise<ApiResponse<UserAddress>> =>
    apiClient.get<UserAddress>(`/api/users/address/${id}`),

  // 15. PUT /api/users/address/:id
  updateAddress: (id: string | number, data: Partial<UserAddressDto>): Promise<ApiResponse<UserAddress>> =>
    apiClient.put<UserAddress>(`/api/users/address/${id}`, data),

  // 16. DELETE /api/users/address/:id
  deleteAddress: (id: string | number): Promise<ApiResponse<{ deleted: boolean }>> =>
    apiClient.delete<{ deleted: boolean }>(`/api/users/address/${id}`),

  // 17. POST /api/users/address/upsert
  upsertAddress: (data: UserAddressDto): Promise<ApiResponse<UserAddress>> =>
    apiClient.post<UserAddress>("/api/users/address/upsert", data),

  // 18. GET /api/users/address/user
  getAddressByUserId: (): Promise<ApiResponse<UserAddress[]>> =>
    apiClient.get<UserAddress[]>("/api/users/address/user"),
};
