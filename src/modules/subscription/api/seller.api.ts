// ==============================================================================
// GoVPN Subscription Seller API Client (11 Endpoints)
// Synchronized with backendv2 seller subscription & tenant routes
// ==============================================================================

import { apiClient, ApiResponse } from "@/lib/api/http-client";
import { Subscription, Tenant, SellerStats } from "../types/subscription.types";
import {
  SellerCreateSubscriptionDto,
  SellerUpgradeSubscriptionDto,
  SellerCreateTenantDto,
  SellerUpdateTenantDto,
} from "../types/seller.types";

export const subscriptionSellerApi = {
  // 1. GET /api/seller/dashboard/stats
  getSellerStats: (): Promise<ApiResponse<SellerStats>> =>
    apiClient.get<SellerStats>("/api/seller/dashboard/stats"),

  // 2. POST /api/seller/subscription (Idempotent mutation)
  createCustomerSubscription: (
    data: SellerCreateSubscriptionDto,
    idempotencyKey?: string
  ): Promise<ApiResponse<Subscription>> =>
    apiClient.post<Subscription>("/api/seller/subscription", data, {
      headers: idempotencyKey ? { "X-Idempotency-Key": idempotencyKey } : undefined,
    }),

  // 3. POST /api/seller/subscription/upgrade (Idempotent mutation)
  upgradeCustomerSubscription: (
    data: SellerUpgradeSubscriptionDto,
    idempotencyKey?: string
  ): Promise<ApiResponse<Subscription>> =>
    apiClient.post<Subscription>("/api/seller/subscription/upgrade", data, {
      headers: idempotencyKey ? { "X-Idempotency-Key": idempotencyKey } : undefined,
    }),

  // 4. GET /api/seller/tenant
  getTenant: (): Promise<ApiResponse<Tenant>> =>
    apiClient.get<Tenant>("/api/seller/tenant"),

  // 5. POST /api/seller/tenant
  createTenant: (data: SellerCreateTenantDto): Promise<ApiResponse<Tenant>> =>
    apiClient.post<Tenant>("/api/seller/tenant", data),

  // 6. PUT /api/seller/tenant/:id
  updateTenant: (id: string | number, data: SellerUpdateTenantDto): Promise<ApiResponse<Tenant>> =>
    apiClient.put<Tenant>(`/api/seller/tenant/${id}`, data),
};
