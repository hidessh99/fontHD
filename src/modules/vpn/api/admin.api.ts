// ==============================================================================
// GoVPN VPN Superadmin API Client (21 Endpoints)
// Synchronized with backendv2 11-vpn catalog
// ==============================================================================

import { apiClient, ApiResponse } from "@/lib/api/http-client";
import {
  ServerNode,
  VpnAccount,
  VpnServerConnect,
  VpnServerType,
} from "../types/vpn.types";
import {
  AdminCreateServerDto,
  AdminUpdateServerDto,
  CreateServerConnectDto,
  CreateServerTypeDto,
  TriggerPayasBillingResponse,
} from "../types/admin.types";

export const vpnAdminApi = {
  // === ADMIN FREE ACCOUNTS (2 Endpoints) ===
  // 1. GET /api/vpn/accounts/free
  getFreeAccounts: (params?: {
    page?: number;
    limit?: number;
  }): Promise<ApiResponse<VpnAccount[]>> =>
    apiClient.get<VpnAccount[]>("/api/vpn/accounts/free", { params }),

  // 2. DELETE /api/vpn/accounts/free/:id
  deleteFreeAccount: (
    id: number | string,
  ): Promise<ApiResponse<{ deleted: boolean }>> =>
    apiClient.delete<{ deleted: boolean }>(`/api/vpn/accounts/free/${id}`),

  // === PAYAS BILLING TRIGGER (1 Endpoint) ===
  // 3. POST /api/vpn/accounts/payas/billing
  triggerPayasBilling: (
    idempotencyKey?: string,
  ): Promise<ApiResponse<TriggerPayasBillingResponse>> =>
    apiClient.post<TriggerPayasBillingResponse>(
      "/api/vpn/accounts/payas/billing",
      {},
      { idempotencyKey },
    ),

  // === SERVER CONNECTS (3 Endpoints) ===
  // 4. POST /api/vpn/server-connects
  createServerConnect: (
    data: CreateServerConnectDto,
  ): Promise<ApiResponse<VpnServerConnect>> =>
    apiClient.post<VpnServerConnect>("/api/vpn/server-connects", data),

  // 5. PUT /api/vpn/server-connects/:id
  updateServerConnect: (
    id: number | string,
    data: Partial<CreateServerConnectDto>,
  ): Promise<ApiResponse<VpnServerConnect>> =>
    apiClient.put<VpnServerConnect>(`/api/vpn/server-connects/${id}`, data),

  // 6. DELETE /api/vpn/server-connects/:id
  deleteServerConnect: (
    id: number | string,
  ): Promise<ApiResponse<{ deleted: boolean }>> =>
    apiClient.delete<{ deleted: boolean }>(`/api/vpn/server-connects/${id}`),

  // === SERVER TYPES (3 Endpoints) ===
  // 7. POST /api/vpn/server-types
  createServerType: (
    data: CreateServerTypeDto,
  ): Promise<ApiResponse<VpnServerType>> =>
    apiClient.post<VpnServerType>("/api/vpn/server-types", data),

  // 8. PUT /api/vpn/server-types/:key_name
  updateServerType: (
    keyName: string,
    data: Partial<CreateServerTypeDto>,
  ): Promise<ApiResponse<VpnServerType>> =>
    apiClient.put<VpnServerType>(`/api/vpn/server-types/${keyName}`, data),

  // 9. DELETE /api/vpn/server-types/:key_name
  deleteServerType: (
    keyName: string,
  ): Promise<ApiResponse<{ deleted: boolean }>> =>
    apiClient.delete<{ deleted: boolean }>(`/api/vpn/server-types/${keyName}`),

  // === ADMIN SERVERS: ALWAYS (3 Endpoints) ===
  // 10. POST /api/vpn/servers/always
  createAlwaysServer: (
    data: AdminCreateServerDto,
  ): Promise<ApiResponse<ServerNode>> =>
    apiClient.post<ServerNode>("/api/vpn/servers/always", data),

  // 11. PUT /api/vpn/servers/always/:id
  updateAlwaysServer: (
    id: number | string,
    data: AdminUpdateServerDto,
  ): Promise<ApiResponse<ServerNode>> =>
    apiClient.put<ServerNode>(`/api/vpn/servers/always/${id}`, data),

  // 12. DELETE /api/vpn/servers/always/:id
  deleteAlwaysServer: (
    id: number | string,
  ): Promise<ApiResponse<{ deleted: boolean }>> =>
    apiClient.delete<{ deleted: boolean }>(`/api/vpn/servers/always/${id}`),

  // === ADMIN SERVERS: FREE (3 Endpoints) ===
  // 13. POST /api/vpn/servers/free
  createFreeServer: (
    data: AdminCreateServerDto,
  ): Promise<ApiResponse<ServerNode>> =>
    apiClient.post<ServerNode>("/api/vpn/servers/free", data),

  // 14. PUT /api/vpn/servers/free/:id
  updateFreeServer: (
    id: number | string,
    data: AdminUpdateServerDto,
  ): Promise<ApiResponse<ServerNode>> =>
    apiClient.put<ServerNode>(`/api/vpn/servers/free/${id}`, data),

  // 15. DELETE /api/vpn/servers/free/:id
  deleteFreeServer: (
    id: number | string,
  ): Promise<ApiResponse<{ deleted: boolean }>> =>
    apiClient.delete<{ deleted: boolean }>(`/api/vpn/servers/free/${id}`),

  // === ADMIN SERVERS: MONTH (3 Endpoints) ===
  // 16. POST /api/vpn/servers/month
  createMonthServer: (
    data: AdminCreateServerDto,
  ): Promise<ApiResponse<ServerNode>> =>
    apiClient.post<ServerNode>("/api/vpn/servers/month", data),

  // 17. PUT /api/vpn/servers/month/:id
  updateMonthServer: (
    id: number | string,
    data: AdminUpdateServerDto,
  ): Promise<ApiResponse<ServerNode>> =>
    apiClient.put<ServerNode>(`/api/vpn/servers/month/${id}`, data),

  // 18. DELETE /api/vpn/servers/month/:id
  deleteMonthServer: (
    id: number | string,
  ): Promise<ApiResponse<{ deleted: boolean }>> =>
    apiClient.delete<{ deleted: boolean }>(`/api/vpn/servers/month/${id}`),

  // === ADMIN SERVERS: PAYAS (3 Endpoints) ===
  // 19. POST /api/vpn/servers/payas
  createPayasServer: (
    data: AdminCreateServerDto,
  ): Promise<ApiResponse<ServerNode>> =>
    apiClient.post<ServerNode>("/api/vpn/servers/payas", data),

  // 20. PUT /api/vpn/servers/payas/:id
  updatePayasServer: (
    id: number | string,
    data: AdminUpdateServerDto,
  ): Promise<ApiResponse<ServerNode>> =>
    apiClient.put<ServerNode>(`/api/vpn/servers/payas/${id}`, data),

  // 21. DELETE /api/vpn/servers/payas/:id
  deletePayasServer: (
    id: number | string,
  ): Promise<ApiResponse<{ deleted: boolean }>> =>
    apiClient.delete<{ deleted: boolean }>(`/api/vpn/servers/payas/${id}`),
};
