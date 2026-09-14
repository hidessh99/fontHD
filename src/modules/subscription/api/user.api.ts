// ==============================================================================
// GoVPN Subscription User API Client (6 Endpoints + Idempotent Mutations)
// Synchronized with backendv2 user subscription routes
// ==============================================================================

import { apiClient, ApiResponse } from "@/lib/api/http-client";
import { Plan, Subscription, Tenant } from "../types/subscription.types";
import {
  CreateSubscriptionDto,
  UpgradeSubscriptionDto,
  UserSubscriptionFilterParams,
} from "../types/user.types";

export const subscriptionUserApi = {
  // 1. GET /api/plan
  getPlans: (): Promise<ApiResponse<Plan[]>> =>
    apiClient.get<Plan[]>("/api/plan"),

  // 2. GET /api/plan/:id
  getPlanById: (id: string | number): Promise<ApiResponse<Plan>> =>
    apiClient.get<Plan>(`/api/plan/${id}`),

  // 3. GET /api/subscription
  getSubscriptions: (
    params?: UserSubscriptionFilterParams,
  ): Promise<ApiResponse<Subscription[]>> =>
    apiClient.get<Subscription[]>("/api/subscription", { params }),

  // 4. GET /api/subscription/:id
  getSubscriptionById: (
    id: string | number,
  ): Promise<ApiResponse<Subscription>> =>
    apiClient.get<Subscription>(`/api/subscription/${id}`),

  // 5. POST /api/subscription (Idempotent mutation)
  createSubscription: (
    data: CreateSubscriptionDto,
    idempotencyKey?: string,
  ): Promise<ApiResponse<Subscription>> =>
    apiClient.post<Subscription>("/api/subscription", data, {
      headers: idempotencyKey
        ? { "X-Idempotency-Key": idempotencyKey }
        : undefined,
    }),

  // 6. POST /api/subscription/upgrade (Idempotent mutation)
  upgradeSubscription: (
    data: UpgradeSubscriptionDto,
    idempotencyKey?: string,
  ): Promise<ApiResponse<Subscription>> =>
    apiClient.post<Subscription>("/api/subscription/upgrade", data, {
      headers: idempotencyKey
        ? { "X-Idempotency-Key": idempotencyKey }
        : undefined,
    }),

  // 7. GET /api/tenant
  getTenants: (): Promise<ApiResponse<Tenant[]>> =>
    apiClient.get<Tenant[]>("/api/tenant"),

  // 8. GET /api/tenant/:id
  getTenantById: (id: string | number): Promise<ApiResponse<Tenant>> =>
    apiClient.get<Tenant>(`/api/tenant/${id}`),
};
