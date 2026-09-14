// ==============================================================================
// GoVPN Public System Health API Client (4 Endpoints)
// Synchronized with backendv2 health & readiness probes
// ==============================================================================

import { apiClient, ApiResponse } from "@/lib/api/http-client";
import { SystemHealthResponse } from "../types/monitor.types";

export const monitorPublicApi = {
  // 1. GET /health
  getHealth: (): Promise<ApiResponse<SystemHealthResponse>> =>
    apiClient.get<SystemHealthResponse>("/health"),

  // 2. GET /health/liveness
  getLiveness: (): Promise<ApiResponse<{ status: string }>> =>
    apiClient.get<{ status: string }>("/health/liveness"),

  // 3. GET /health/readiness
  getReadiness: (): Promise<ApiResponse<SystemHealthResponse>> =>
    apiClient.get<SystemHealthResponse>("/health/readiness"),
};
