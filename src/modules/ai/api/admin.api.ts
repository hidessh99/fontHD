// ==============================================================================
// GoVPN AI Admin API Client (14 Endpoints + 1 Cronjob)
// Synchronized with backendv2 admin AI routes
// ==============================================================================

import { apiClient, ApiResponse } from "@/lib/api/http-client";
import { AiModel, AiProvider, AiWallet } from "../types/ai.types";
import {
  AdminCreateModelDto,
  AdminUpdateModelDto,
  AdminCreateProviderDto,
  AdminUpdateProviderDto,
  AdminWalletAdjustDto,
  AdminAiStats,
} from "../types/admin.types";

export const aiAdminApi = {
  // === AI MODELS (5 Endpoints) ===
  listModels: (): Promise<ApiResponse<AiModel[]>> =>
    apiClient.get<AiModel[]>("/api/admin/ai-models"),

  createModel: (data: AdminCreateModelDto): Promise<ApiResponse<AiModel>> =>
    apiClient.post<AiModel>("/api/admin/ai-models", data),

  getModel: (id: string | number): Promise<ApiResponse<AiModel>> =>
    apiClient.get<AiModel>(`/api/admin/ai-models/${id}`),

  updateModel: (
    id: string | number,
    data: AdminUpdateModelDto,
  ): Promise<ApiResponse<AiModel>> =>
    apiClient.put<AiModel>(`/api/admin/ai-models/${id}`, data),

  deleteModel: (
    id: string | number,
  ): Promise<ApiResponse<{ deleted: boolean }>> =>
    apiClient.delete<{ deleted: boolean }>(`/api/admin/ai-models/${id}`),

  // === AI PROVIDERS (5 Endpoints) ===
  listProviders: (): Promise<ApiResponse<AiProvider[]>> =>
    apiClient.get<AiProvider[]>("/api/admin/ai-providers"),

  createProvider: (
    data: AdminCreateProviderDto,
  ): Promise<ApiResponse<AiProvider>> =>
    apiClient.post<AiProvider>("/api/admin/ai-providers", data),

  getProvider: (id: string | number): Promise<ApiResponse<AiProvider>> =>
    apiClient.get<AiProvider>(`/api/admin/ai-providers/${id}`),

  updateProvider: (
    id: string | number,
    data: AdminUpdateProviderDto,
  ): Promise<ApiResponse<AiProvider>> =>
    apiClient.put<AiProvider>(`/api/admin/ai-providers/${id}`, data),

  deleteProvider: (
    id: string | number,
  ): Promise<ApiResponse<{ deleted: boolean }>> =>
    apiClient.delete<{ deleted: boolean }>(`/api/admin/ai-providers/${id}`),

  // === ANALYTICS & DASHBOARD (2 Endpoints) ===
  getDashboardStats: (): Promise<ApiResponse<AdminAiStats>> =>
    apiClient.get<AdminAiStats>("/api/admin/ai/dashboard/stats"),

  getModelAnalytics: (): Promise<ApiResponse<unknown>> =>
    apiClient.get("/api/admin/ai/analytics/models"),

  // === USER WALLETS ADMIN (2 Endpoints) ===
  listWallets: (): Promise<ApiResponse<AiWallet[]>> =>
    apiClient.get<AiWallet[]>("/api/admin/ai/wallets"),

  adjustWallet: (data: AdminWalletAdjustDto): Promise<ApiResponse<AiWallet>> =>
    apiClient.post<AiWallet>("/api/admin/ai/wallets/adjust", data),

  // === CRONJOB (1 Endpoint) ===
  cleanupUsageLogs: (): Promise<ApiResponse<{ cleaned_count: number }>> =>
    apiClient.get<{ cleaned_count: number }>("/api/cronjob/cleanup/ai-usage"),
};
