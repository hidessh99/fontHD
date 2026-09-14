// ==============================================================================
// GoVPN Subscription Admin API Client (23 Endpoints)
// Synchronized with backendv2 admin subscription & tenant routes
// ==============================================================================

import { apiClient, ApiResponse } from "@/lib/api/http-client";
import { Plan, Subscription, Tenant } from "../types/subscription.types";
import {
  AdminCreatePlanDto,
  AdminUpdatePlanDto,
  AdminChangeSubscriptionPlanDto,
  AdminUpdateSubscriptionStatusDto,
  AdminCreateTenantDto,
  AdminUpdateTenantDto,
} from "../types/admin.types";

export const subscriptionAdminApi = {
  // === PLANS MANAGEMENT (5 Endpoints) ===
  listPlans: (): Promise<ApiResponse<Plan[]>> =>
    apiClient.get<Plan[]>("/api/admin/plan"),

  createPlan: (data: AdminCreatePlanDto): Promise<ApiResponse<Plan>> =>
    apiClient.post<Plan>("/api/admin/plan", data),

  getPlan: (id: string | number): Promise<ApiResponse<Plan>> =>
    apiClient.get<Plan>(`/api/admin/plan/${id}`),

  updatePlan: (id: string | number, data: AdminUpdatePlanDto): Promise<ApiResponse<Plan>> =>
    apiClient.put<Plan>(`/api/admin/plan/${id}`, data),

  deletePlan: (id: string | number): Promise<ApiResponse<{ deleted: boolean }>> =>
    apiClient.delete<{ deleted: boolean }>(`/api/admin/plan/${id}`),

  // === GLOBAL SUBSCRIPTIONS (6 Endpoints) ===
  listSubscriptions: (): Promise<ApiResponse<Subscription[]>> =>
    apiClient.get<Subscription[]>("/api/admin/subscription"),

  getSubscription: (id: string | number): Promise<ApiResponse<Subscription>> =>
    apiClient.get<Subscription>(`/api/admin/subscription/${id}`),

  updateSubscription: (id: string | number, data: Partial<Subscription>): Promise<ApiResponse<Subscription>> =>
    apiClient.put<Subscription>(`/api/admin/subscription/${id}`, data),

  deleteSubscription: (id: string | number): Promise<ApiResponse<{ deleted: boolean }>> =>
    apiClient.delete<{ deleted: boolean }>(`/api/admin/subscription/${id}`),

  changeSubscriptionPlan: (
    id: string | number,
    data: AdminChangeSubscriptionPlanDto
  ): Promise<ApiResponse<Subscription>> =>
    apiClient.patch<Subscription>(`/api/admin/subscription/${id}/change-plan`, data),

  updateSubscriptionStatus: (
    data: AdminUpdateSubscriptionStatusDto
  ): Promise<ApiResponse<Subscription>> =>
    apiClient.patch<Subscription>("/api/admin/subscription/status", data),

  // === TENANTS MANAGEMENT (4 Endpoints) ===
  listTenants: (): Promise<ApiResponse<Tenant[]>> =>
    apiClient.get<Tenant[]>("/api/admin/tenant"),

  getTenant: (id: string | number): Promise<ApiResponse<Tenant>> =>
    apiClient.get<Tenant>(`/api/admin/tenant/${id}`),

  updateTenant: (id: string | number, data: AdminUpdateTenantDto): Promise<ApiResponse<Tenant>> =>
    apiClient.put<Tenant>(`/api/admin/tenant/${id}`, data),

  deleteTenant: (id: string | number): Promise<ApiResponse<{ deleted: boolean }>> =>
    apiClient.delete<{ deleted: boolean }>(`/api/admin/tenant/${id}`),
};
