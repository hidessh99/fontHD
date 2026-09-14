// ==============================================================================
// GoVPN IAM Superadmin Role DTOs & Contracts (20 Endpoints)
// Synchronized with backendv2 admin/users/roles/activity/logs
// ==============================================================================

import { UserRole } from "./iam.types";

export interface AdminUserFilterParams {
  search?: string;
  role?: string;
  is_active?: boolean;
  page?: number;
  limit?: number;
  [key: string]: string | number | boolean | undefined;
}

export interface AdminUserUpdateDto {
  username?: string;
  email?: string;
  role?: UserRole;
  is_active?: boolean;
  is_email_verified?: boolean;
}

export interface AdminAdjustBalanceDto {
  user_id: string | number;
  amount: number;
  reason?: string;
}

export interface AdminAdjustIncomeDto {
  user_id: string | number;
  amount: number;
  reason?: string;
}

export interface AdminChangeRoleDto {
  user_id: string | number;
  role: UserRole;
}

export interface AdminRoleCreateDto {
  name: string;
  slug: string;
  description?: string;
  permissions?: string[];
}

export interface AdminRoleUpdateDto {
  name?: string;
  description?: string;
  permissions?: string[];
}

export interface AdminStatsResponse {
  total_users: number;
  active_users: number;
  total_sellers: number;
  total_admins: number;
  system_load: number;
}
