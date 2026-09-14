// ==============================================================================
// GoVPN IAM Superadmin API Client (20 Endpoints)
// Synchronized with backendv2 admin/users/roles/activity/logs catalog
// ==============================================================================

import { apiClient, ApiResponse } from "@/lib/api/http-client";
import {
  UserProfile,
  RoleEntity,
  UserActivityLog,
  UserAuditLog,
} from "../types/iam.types";
import {
  AdminUserFilterParams,
  AdminUserUpdateDto,
  AdminAdjustBalanceDto,
  AdminAdjustIncomeDto,
  AdminChangeRoleDto,
  AdminRoleCreateDto,
  AdminRoleUpdateDto,
  AdminStatsResponse,
} from "../types/admin.types";

export const iamAdminApi = {
  // === DASHBOARD STATS (1 Endpoint) ===
  // 1. GET /api/admin/dashboard/stats
  getDashboardStats: (): Promise<ApiResponse<AdminStatsResponse>> =>
    apiClient.get<AdminStatsResponse>("/api/admin/dashboard/stats"),

  // === ADMIN USERS (9 Endpoints) ===
  // 2. GET /api/admin/user
  getUserList: (params?: AdminUserFilterParams): Promise<ApiResponse<UserProfile[]>> =>
    apiClient.get<UserProfile[]>("/api/admin/user", { params }),

  // 3. GET /api/admin/user/:id
  getUserById: (id: string | number): Promise<ApiResponse<UserProfile>> =>
    apiClient.get<UserProfile>(`/api/admin/user/${id}`),

  // 4. PUT /api/admin/user/:id
  updateUser: (id: string | number, data: AdminUserUpdateDto): Promise<ApiResponse<UserProfile>> =>
    apiClient.put<UserProfile>(`/api/admin/user/${id}`, data),

  // 5. DELETE /api/admin/user/:id
  deleteUser: (id: string | number): Promise<ApiResponse<{ deleted: boolean }>> =>
    apiClient.delete<{ deleted: boolean }>(`/api/admin/user/${id}`),

  // 6. PATCH /api/admin/user/change-role
  changeUserRole: (data: AdminChangeRoleDto): Promise<ApiResponse<UserProfile>> =>
    apiClient.patch<UserProfile>("/api/admin/user/change-role", data),

  // 7. POST /api/admin/user/add-balance (Idempotent)
  addBalance: (data: AdminAdjustBalanceDto, idempotencyKey?: string): Promise<ApiResponse<UserProfile>> =>
    apiClient.post<UserProfile>("/api/admin/user/add-balance", data, { idempotencyKey }),

  // 8. POST /api/admin/user/reduce-balance (Idempotent)
  reduceBalance: (data: AdminAdjustBalanceDto, idempotencyKey?: string): Promise<ApiResponse<UserProfile>> =>
    apiClient.post<UserProfile>("/api/admin/user/reduce-balance", data, { idempotencyKey }),

  // 9. POST /api/admin/user/add-income (Idempotent)
  addIncome: (data: AdminAdjustIncomeDto, idempotencyKey?: string): Promise<ApiResponse<UserProfile>> =>
    apiClient.post<UserProfile>("/api/admin/user/add-income", data, { idempotencyKey }),

  // 10. POST /api/admin/user/reduce-income (Idempotent)
  reduceIncome: (data: AdminAdjustIncomeDto, idempotencyKey?: string): Promise<ApiResponse<UserProfile>> =>
    apiClient.post<UserProfile>("/api/admin/user/reduce-income", data, { idempotencyKey }),

  // === ROLE MANAGEMENT (5 Endpoints) ===
  // 11. GET /api/admin/role
  getRoleList: (): Promise<ApiResponse<RoleEntity[]>> =>
    apiClient.get<RoleEntity[]>("/api/admin/role"),

  // 12. POST /api/admin/role
  createRole: (data: AdminRoleCreateDto): Promise<ApiResponse<RoleEntity>> =>
    apiClient.post<RoleEntity>("/api/admin/role", data),

  // 13. GET /api/admin/role/:id
  getRoleById: (id: string | number): Promise<ApiResponse<RoleEntity>> =>
    apiClient.get<RoleEntity>(`/api/admin/role/${id}`),

  // 14. PUT /api/admin/role/:id
  updateRole: (id: string | number, data: AdminRoleUpdateDto): Promise<ApiResponse<RoleEntity>> =>
    apiClient.put<RoleEntity>(`/api/admin/role/${id}`, data),

  // 15. DELETE /api/admin/role/:id
  deleteRole: (id: string | number): Promise<ApiResponse<{ deleted: boolean }>> =>
    apiClient.delete<{ deleted: boolean }>(`/api/admin/role/${id}`),

  // === USER ACTIVITIES & LOGS (5 Endpoints) ===
  // 16. GET /api/admin/user-activity
  getUserActivities: (params?: { user_id?: string | number }): Promise<ApiResponse<UserActivityLog[]>> =>
    apiClient.get<UserActivityLog[]>("/api/admin/user-activity", { params }),

  // 17. GET /api/admin/user-activity/:id
  getUserActivityById: (id: string | number): Promise<ApiResponse<UserActivityLog>> =>
    apiClient.get<UserActivityLog>(`/api/admin/user-activity/${id}`),

  // 18. DELETE /api/admin/user-activity/:id
  deleteUserActivity: (id: string | number): Promise<ApiResponse<{ deleted: boolean }>> =>
    apiClient.delete<{ deleted: boolean }>(`/api/admin/user-activity/${id}`),

  // 19. GET /api/admin/user-log
  getUserLogs: (params?: { user_id?: string | number }): Promise<ApiResponse<UserAuditLog[]>> =>
    apiClient.get<UserAuditLog[]>("/api/admin/user-log", { params }),

  // 20. GET /api/admin/user-log/:id
  getUserLogById: (id: string | number): Promise<ApiResponse<UserAuditLog>> =>
    apiClient.get<UserAuditLog>(`/api/admin/user-log/${id}`),
};
