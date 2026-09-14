// ==============================================================================
// GoVPN Kubernetes User API Client (6 Endpoints)
// Synchronized with backendv2 user k8s routes
// ==============================================================================

import { apiClient, ApiResponse } from "@/lib/api/http-client";
import { K8sApp, K8sLogEntry } from "../types/k8s.types";
import {
  DeployK8sAppDto,
  UpdateK8sAppEnvDto,
  RenewK8sAppDto,
  UserK8sAppFilterParams,
} from "../types/user.types";

export const k8sUserApi = {
  // 1. GET /api/kubernetes/apps
  getApps: (params?: UserK8sAppFilterParams): Promise<ApiResponse<K8sApp[]>> =>
    apiClient.get<K8sApp[]>("/api/kubernetes/apps", { params }),

  // 2. POST /api/kubernetes/deploy
  deployApp: (data: DeployK8sAppDto): Promise<ApiResponse<K8sApp>> =>
    apiClient.post<K8sApp>("/api/kubernetes/deploy", data),

  // 3. POST /api/kubernetes/apps/:id/restart
  restartApp: (id: string | number): Promise<ApiResponse<{ restarted: boolean }>> =>
    apiClient.post<{ restarted: boolean }>(`/api/kubernetes/apps/${id}/restart`),

  // 4. PUT /api/kubernetes/apps/:id/env
  updateEnv: (id: string | number, data: UpdateK8sAppEnvDto): Promise<ApiResponse<K8sApp>> =>
    apiClient.put<K8sApp>(`/api/kubernetes/apps/${id}/env`, data),

  // 5. PUT /api/kubernetes/apps/:id/renew
  renewApp: (id: string | number, data: RenewK8sAppDto): Promise<ApiResponse<K8sApp>> =>
    apiClient.put<K8sApp>(`/api/kubernetes/apps/${id}/renew`, data),

  // 6. GET /api/kubernetes/apps/:id/logs
  getAppLogs: (id: string | number): Promise<ApiResponse<K8sLogEntry[]>> =>
    apiClient.get<K8sLogEntry[]>(`/api/kubernetes/apps/${id}/logs`),
};
