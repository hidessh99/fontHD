// ==============================================================================
// GoVPN VPN User API Client (36 Endpoints)
// Synchronized with backendv2 11-vpn catalog
// ==============================================================================

import { apiClient, ApiResponse } from "@/lib/api/http-client";
import { ServerNode, VpnAccount, VpnServerConnect, VpnServerType } from "../types/vpn.types";
import {
  CreatePayasAccountDto,
  CreateVpnAccountDto,
  RenewVpnAccountDto,
  VpnAccountCheckResponse,
} from "../types/user.types";

export const vpnUserApi = {
  // === ALWAYS ACCOUNTS (6 Endpoints) ===
  // 1. GET /api/vpn/accounts/always
  getAlwaysAccounts: (): Promise<ApiResponse<VpnAccount[]>> =>
    apiClient.get<VpnAccount[]>("/api/vpn/accounts/always"),

  // 2. POST /api/vpn/accounts/always
  createAlwaysAccount: (data: CreateVpnAccountDto, idempotencyKey?: string): Promise<ApiResponse<VpnAccount>> =>
    apiClient.post<VpnAccount>("/api/vpn/accounts/always", data, { idempotencyKey }),

  // 3. GET /api/vpn/accounts/always/:id
  getAlwaysAccountById: (id: number | string): Promise<ApiResponse<VpnAccount>> =>
    apiClient.get<VpnAccount>(`/api/vpn/accounts/always/${id}`),

  // 4. DELETE /api/vpn/accounts/always/:id
  deleteAlwaysAccount: (id: number | string): Promise<ApiResponse<{ deleted: boolean }>> =>
    apiClient.delete<{ deleted: boolean }>(`/api/vpn/accounts/always/${id}`),

  // 5. GET /api/vpn/accounts/always/:id/check
  checkAlwaysAccount: (id: number | string): Promise<ApiResponse<VpnAccountCheckResponse>> =>
    apiClient.get<VpnAccountCheckResponse>(`/api/vpn/accounts/always/${id}/check`),

  // 6. POST /api/vpn/accounts/always/:id/renew
  renewAlwaysAccount: (id: number | string, data: RenewVpnAccountDto, idempotencyKey?: string): Promise<ApiResponse<VpnAccount>> =>
    apiClient.post<VpnAccount>(`/api/vpn/accounts/always/${id}/renew`, data, { idempotencyKey }),

  // === FREE ACCOUNTS (1 Endpoint) ===
  // 7. GET /api/vpn/accounts/free/:id
  getFreeAccountById: (id: number | string): Promise<ApiResponse<VpnAccount>> =>
    apiClient.get<VpnAccount>(`/api/vpn/accounts/free/${id}`),

  // === MONTH ACCOUNTS (6 Endpoints) ===
  // 8. GET /api/vpn/accounts/month
  getMonthAccounts: (): Promise<ApiResponse<VpnAccount[]>> =>
    apiClient.get<VpnAccount[]>("/api/vpn/accounts/month"),

  // 9. POST /api/vpn/accounts/month
  createMonthAccount: (data: CreateVpnAccountDto, idempotencyKey?: string): Promise<ApiResponse<VpnAccount>> =>
    apiClient.post<VpnAccount>("/api/vpn/accounts/month", data, { idempotencyKey }),

  // 10. GET /api/vpn/accounts/month/:id
  getMonthAccountById: (id: number | string): Promise<ApiResponse<VpnAccount>> =>
    apiClient.get<VpnAccount>(`/api/vpn/accounts/month/${id}`),

  // 11. DELETE /api/vpn/accounts/month/:id
  deleteMonthAccount: (id: number | string): Promise<ApiResponse<{ deleted: boolean }>> =>
    apiClient.delete<{ deleted: boolean }>(`/api/vpn/accounts/month/${id}`),

  // 12. GET /api/vpn/accounts/month/:id/check
  checkMonthAccount: (id: number | string): Promise<ApiResponse<VpnAccountCheckResponse>> =>
    apiClient.get<VpnAccountCheckResponse>(`/api/vpn/accounts/month/${id}/check`),

  // 13. POST /api/vpn/accounts/month/:id/renew
  renewMonthAccount: (id: number | string, data: RenewVpnAccountDto, idempotencyKey?: string): Promise<ApiResponse<VpnAccount>> =>
    apiClient.post<VpnAccount>(`/api/vpn/accounts/month/${id}/renew`, data, { idempotencyKey }),

  // === PAY-AS-YOU-GO ACCOUNTS (7 Endpoints) ===
  // 14. GET /api/vpn/accounts/payas
  getPayasAccounts: (): Promise<ApiResponse<VpnAccount[]>> =>
    apiClient.get<VpnAccount[]>("/api/vpn/accounts/payas"),

  // 15. POST /api/vpn/accounts/payas
  createPayasAccount: (data: CreatePayasAccountDto, idempotencyKey?: string): Promise<ApiResponse<VpnAccount>> =>
    apiClient.post<VpnAccount>("/api/vpn/accounts/payas", data, { idempotencyKey }),

  // 16. GET /api/vpn/accounts/payas/:id
  getPayasAccountById: (id: number | string): Promise<ApiResponse<VpnAccount>> =>
    apiClient.get<VpnAccount>(`/api/vpn/accounts/payas/${id}`),

  // 17. DELETE /api/vpn/accounts/payas/:id
  deletePayasAccount: (id: number | string): Promise<ApiResponse<{ deleted: boolean }>> =>
    apiClient.delete<{ deleted: boolean }>(`/api/vpn/accounts/payas/${id}`),

  // 18. PATCH /api/vpn/accounts/payas/:id/change-status
  changePayasStatus: (id: number | string, data: { status: "ACTIVE" | "PAUSED" }): Promise<ApiResponse<VpnAccount>> =>
    apiClient.patch<VpnAccount>(`/api/vpn/accounts/payas/${id}/change-status`, data),

  // 19. GET /api/vpn/accounts/payas/:id/check
  checkPayasAccount: (id: number | string): Promise<ApiResponse<VpnAccountCheckResponse>> =>
    apiClient.get<VpnAccountCheckResponse>(`/api/vpn/accounts/payas/${id}/check`),

  // 20. POST /api/vpn/accounts/payas/:id/pause
  pausePayasAccount: (id: number | string, idempotencyKey?: string): Promise<ApiResponse<VpnAccount>> =>
    apiClient.post<VpnAccount>(`/api/vpn/accounts/payas/${id}/pause`, {}, { idempotencyKey }),

  // === SERVER CONNECTS (2 Endpoints) ===
  // 21. GET /api/vpn/server-connects
  getServerConnects: (params?: { server_id?: number; protocol?: string }): Promise<ApiResponse<VpnServerConnect[]>> =>
    apiClient.get<VpnServerConnect[]>("/api/vpn/server-connects", { params }),

  // 22. GET /api/vpn/server-connects/:id
  getServerConnectById: (id: number | string): Promise<ApiResponse<VpnServerConnect>> =>
    apiClient.get<VpnServerConnect>(`/api/vpn/server-connects/${id}`),

  // === SERVER TYPES (2 Endpoints) ===
  // 23. GET /api/vpn/server-types
  getServerTypes: (): Promise<ApiResponse<VpnServerType[]>> =>
    apiClient.get<VpnServerType[]>("/api/vpn/server-types"),

  // 24. GET /api/vpn/server-types/:key_name
  getServerTypeByKey: (keyName: string): Promise<ApiResponse<VpnServerType>> =>
    apiClient.get<VpnServerType>(`/api/vpn/server-types/${keyName}`),

  // === USER SERVERS: ALWAYS (3 Endpoints) ===
  // 25. GET /api/vpn/servers/always
  getAlwaysServers: (): Promise<ApiResponse<ServerNode[]>> =>
    apiClient.get<ServerNode[]>("/api/vpn/servers/always"),

  // 26. GET /api/vpn/servers/always/:id
  getAlwaysServerById: (id: number | string): Promise<ApiResponse<ServerNode>> =>
    apiClient.get<ServerNode>(`/api/vpn/servers/always/${id}`),

  // 27. GET /api/vpn/servers/always/available
  getAlwaysServersAvailable: (params?: { protocol?: string; country?: string }): Promise<ApiResponse<ServerNode[]>> =>
    apiClient.get<ServerNode[]>("/api/vpn/servers/always/available", { params }),

  // === USER SERVERS: FREE (3 Endpoints) ===
  // 28. GET /api/vpn/servers/free
  getFreeServers: (): Promise<ApiResponse<ServerNode[]>> =>
    apiClient.get<ServerNode[]>("/api/vpn/servers/free"),

  // 29. GET /api/vpn/servers/free/:id
  getFreeServerById: (id: number | string): Promise<ApiResponse<ServerNode>> =>
    apiClient.get<ServerNode>(`/api/vpn/servers/free/${id}`),

  // 30. GET /api/vpn/servers/free/available
  getFreeServersAvailable: (params?: { protocol?: string; country?: string }): Promise<ApiResponse<ServerNode[]>> =>
    apiClient.get<ServerNode[]>("/api/vpn/servers/free/available", { params }),

  // === USER SERVERS: MONTH (3 Endpoints) ===
  // 31. GET /api/vpn/servers/month
  getMonthServers: (): Promise<ApiResponse<ServerNode[]>> =>
    apiClient.get<ServerNode[]>("/api/vpn/servers/month"),

  // 32. GET /api/vpn/servers/month/:id
  getMonthServerById: (id: number | string): Promise<ApiResponse<ServerNode>> =>
    apiClient.get<ServerNode>(`/api/vpn/servers/month/${id}`),

  // 33. GET /api/vpn/servers/month/available
  getMonthServersAvailable: (params?: { protocol?: string; country?: string }): Promise<ApiResponse<ServerNode[]>> =>
    apiClient.get<ServerNode[]>("/api/vpn/servers/month/available", { params }),

  // === USER SERVERS: PAYAS (3 Endpoints) ===
  // 34. GET /api/vpn/servers/payas
  getPayasServers: (): Promise<ApiResponse<ServerNode[]>> =>
    apiClient.get<ServerNode[]>("/api/vpn/servers/payas"),

  // 35. GET /api/vpn/servers/payas/:id
  getPayasServerById: (id: number | string): Promise<ApiResponse<ServerNode>> =>
    apiClient.get<ServerNode>(`/api/vpn/servers/payas/${id}`),

  // 36. GET /api/vpn/servers/payas/available
  getPayasServersAvailable: (params?: { protocol?: string; country?: string }): Promise<ApiResponse<ServerNode[]>> =>
    apiClient.get<ServerNode[]>("/api/vpn/servers/payas/available", { params }),
};
