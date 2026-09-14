// ==============================================================================
// GoVPN AI User API Client (21 Endpoints)
// Synchronized with backendv2 AI Gateway & Keys Management
// ==============================================================================

import { apiClient, ApiResponse } from "@/lib/api/http-client";
import {
  AiApiKey,
  AiModel,
  AiProvider,
  AiUsageSummary,
  AiUsageLog,
  AiWallet,
  ChatCompletionDto,
  ChatCompletionResponse,
} from "../types/ai.types";
import {
  CreateApiKeyDto,
  TopupAiWalletDto,
  AiUsageFilterParams,
} from "../types/user.types";

export const aiUserApi = {
  // === API KEYS (4 Endpoints) ===
  listApiKeys: (): Promise<ApiResponse<AiApiKey[]>> =>
    apiClient.get<AiApiKey[]>("/api/ai/api-keys"),

  createApiKey: (data: CreateApiKeyDto): Promise<ApiResponse<AiApiKey>> =>
    apiClient.post<AiApiKey>("/api/ai/api-keys", data),

  deleteApiKey: (id: string | number): Promise<ApiResponse<{ deleted: boolean }>> =>
    apiClient.delete<{ deleted: boolean }>(`/api/ai/api-keys/${id}`),

  getFirstApiKey: (): Promise<ApiResponse<AiApiKey>> =>
    apiClient.get<AiApiKey>("/api/ai/api-keys/first"),

  // === MODELS & PROVIDERS (5 Endpoints) ===
  listModels: (): Promise<ApiResponse<AiModel[]>> =>
    apiClient.get<AiModel[]>("/api/ai/models"),

  listActiveModels: (): Promise<ApiResponse<AiModel[]>> =>
    apiClient.get<AiModel[]>("/api/ai/models-active"),

  getModel: (id: string | number): Promise<ApiResponse<AiModel>> =>
    apiClient.get<AiModel>(`/api/ai/models/${id}`),

  listProviders: (): Promise<ApiResponse<AiProvider[]>> =>
    apiClient.get<AiProvider[]>("/api/ai/providers"),

  getProvider: (id: string | number): Promise<ApiResponse<AiProvider>> =>
    apiClient.get<AiProvider>(`/api/ai/providers/${id}`),

  // === USAGE & METRICS (2 Endpoints) ===
  getUsageSummary: (): Promise<ApiResponse<AiUsageSummary>> =>
    apiClient.get<AiUsageSummary>("/api/ai/usage"),

  listUsageLogs: (params?: AiUsageFilterParams): Promise<ApiResponse<AiUsageLog[]>> =>
    apiClient.get<AiUsageLog[]>("/api/ai/usage/logs", { params }),

  // === WALLET (2 Endpoints) ===
  getWallet: (): Promise<ApiResponse<AiWallet>> =>
    apiClient.get<AiWallet>("/api/ai/wallet"),

  topupWallet: (data: TopupAiWalletDto): Promise<ApiResponse<AiWallet>> =>
    apiClient.post<AiWallet>("/api/ai/wallet/topup", data),

  // === OPENAI-COMPATIBLE GATEWAY (8 Endpoints) ===
  chatCompletion: (data: ChatCompletionDto): Promise<ApiResponse<ChatCompletionResponse>> =>
    apiClient.post<ChatCompletionResponse>("/api/ai/v1/chat/completions", data),

  createEmbeddings: (data: { model: string; input: string | string[] }): Promise<ApiResponse<unknown>> =>
    apiClient.post("/api/ai/v1/embeddings", data),

  generateImage: (data: { prompt: string; n?: number; size?: string }): Promise<ApiResponse<unknown>> =>
    apiClient.post("/api/ai/v1/images/generations", data),

  generateSpeech: (data: { model: string; input: string; voice: string }): Promise<ApiResponse<unknown>> =>
    apiClient.post("/api/ai/v1/audio/speech", data),

  transcribeAudio: (formData: FormData): Promise<ApiResponse<{ text: string }>> =>
    apiClient.post<{ text: string }>("/api/ai/v1/audio/transcriptions", formData),

  getGatewayModels: (): Promise<ApiResponse<{ data: AiModel[] }>> =>
    apiClient.get<{ data: AiModel[] }>("/api/ai/v1/models"),

  getGatewayModelById: (id: string | number): Promise<ApiResponse<AiModel>> =>
    apiClient.get<AiModel>(`/api/ai/v1/models/${id}`),
};
