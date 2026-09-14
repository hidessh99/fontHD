// ==============================================================================
// GoVPN Kubernetes Admin API Client (12 Endpoints)
// Synchronized with backendv2 admin k8s routes
// ==============================================================================

import { apiClient, ApiResponse } from "@/lib/api/http-client";
import { K8sServer, K8sSpec, K8sTemplate } from "../types/k8s.types";
import {
  AdminCreateServerDto,
  AdminUpdateServerDto,
  AdminCreateSpecDto,
  AdminUpdateSpecDto,
  AdminCreateTemplateDto,
  AdminUpdateTemplateDto,
} from "../types/admin.types";

export const k8sAdminApi = {
  // === CLUSTER NODES / SERVERS (4 Endpoints) ===
  listServers: (): Promise<ApiResponse<K8sServer[]>> =>
    apiClient.get<K8sServer[]>("/api/kubernetes/servers"),

  createServer: (data: AdminCreateServerDto): Promise<ApiResponse<K8sServer>> =>
    apiClient.post<K8sServer>("/api/kubernetes/servers", data),

  updateServer: (id: string | number, data: AdminUpdateServerDto): Promise<ApiResponse<K8sServer>> =>
    apiClient.put<K8sServer>(`/api/kubernetes/servers/${id}`, data),

  deleteServer: (id: string | number): Promise<ApiResponse<{ deleted: boolean }>> =>
    apiClient.delete<{ deleted: boolean }>(`/api/kubernetes/servers/${id}`),

  // === RESOURCE SPECS / TIERS (4 Endpoints) ===
  listSpecs: (): Promise<ApiResponse<K8sSpec[]>> =>
    apiClient.get<K8sSpec[]>("/api/kubernetes/specs"),

  createSpec: (data: AdminCreateSpecDto): Promise<ApiResponse<K8sSpec>> =>
    apiClient.post<K8sSpec>("/api/kubernetes/specs", data),

  updateSpec: (id: string | number, data: AdminUpdateSpecDto): Promise<ApiResponse<K8sSpec>> =>
    apiClient.put<K8sSpec>(`/api/kubernetes/specs/${id}`, data),

  deleteSpec: (id: string | number): Promise<ApiResponse<{ deleted: boolean }>> =>
    apiClient.delete<{ deleted: boolean }>(`/api/kubernetes/specs/${id}`),

  // === APP TEMPLATES (4 Endpoints) ===
  listTemplates: (): Promise<ApiResponse<K8sTemplate[]>> =>
    apiClient.get<K8sTemplate[]>("/api/kubernetes/templates"),

  createTemplate: (data: AdminCreateTemplateDto): Promise<ApiResponse<K8sTemplate>> =>
    apiClient.post<K8sTemplate>("/api/kubernetes/templates", data),

  updateTemplate: (id: string | number, data: AdminUpdateTemplateDto): Promise<ApiResponse<K8sTemplate>> =>
    apiClient.put<K8sTemplate>(`/api/kubernetes/templates/${id}`, data),

  deleteTemplate: (id: string | number): Promise<ApiResponse<{ deleted: boolean }>> =>
    apiClient.delete<{ deleted: boolean }>(`/api/kubernetes/templates/${id}`),
};
