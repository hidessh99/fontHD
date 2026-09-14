// ==============================================================================
// GoVPN VPN Guest / Public API Client (14 Endpoints)
// Synchronized with backendv2 11-vpn catalog
// ==============================================================================

import { apiClient, ApiResponse } from "@/lib/api/http-client";
import {
  ServerNode,
  VpnAccount,
  VpnCountry,
  VpnServerType,
} from "../types/vpn.types";

export interface CreateFreeAccountDto {
  server_id: number;
  protocol: string;
  username: string;
  password?: string;
}

export const vpnGuestApi = {
  // 1. POST /api/account-free
  createFreeAccount: (
    data: CreateFreeAccountDto,
  ): Promise<ApiResponse<VpnAccount>> =>
    apiClient.post<VpnAccount>("/api/account-free", data),

  // 2. GET /api/free/countries
  getFreeCountries: (): Promise<ApiResponse<VpnCountry[]>> =>
    apiClient.get<VpnCountry[]>("/api/free/countries"),

  // 3. GET /api/free/server-free
  getFreeServers: (): Promise<ApiResponse<ServerNode[]>> =>
    apiClient.get<ServerNode[]>("/api/free/server-free"),

  // 4. GET /api/free/server-free/find
  findAvailableFreeServer: (params?: {
    country?: string;
    protocol?: string;
  }): Promise<ApiResponse<ServerNode>> =>
    apiClient.get<ServerNode>("/api/free/server-free/find", { params }),

  // 5. GET /api/free/server-type
  getFreeServerTypes: (): Promise<ApiResponse<VpnServerType[]>> =>
    apiClient.get<VpnServerType[]>("/api/free/server-type"),

  // 6. GET /api/server-free
  getServerFreeList: (): Promise<ApiResponse<ServerNode[]>> =>
    apiClient.get<ServerNode[]>("/api/server-free"),

  // 7. GET /api/server-free/:id
  getServerFreeById: (id: number | string): Promise<ApiResponse<ServerNode>> =>
    apiClient.get<ServerNode>(`/api/server-free/${id}`),

  // 8. GET /api/server-free/find
  findServerFree: (params?: {
    protocol?: string;
  }): Promise<ApiResponse<ServerNode>> =>
    apiClient.get<ServerNode>("/api/server-free/find", { params }),

  // 9. GET /api/vpn/countries
  getCountries: (): Promise<ApiResponse<VpnCountry[]>> =>
    apiClient.get<VpnCountry[]>("/api/vpn/countries"),

  // 10. POST /api/vpn/countries
  createCountry: (data: {
    name: string;
    code: string;
    flag_url?: string;
  }): Promise<ApiResponse<VpnCountry>> =>
    apiClient.post<VpnCountry>("/api/vpn/countries", data),

  // 11. GET /api/vpn/countries/:id
  getCountryById: (id: number | string): Promise<ApiResponse<VpnCountry>> =>
    apiClient.get<VpnCountry>(`/api/vpn/countries/${id}`),

  // 12. PUT /api/vpn/countries/:id
  updateCountry: (
    id: number | string,
    data: Partial<VpnCountry>,
  ): Promise<ApiResponse<VpnCountry>> =>
    apiClient.put<VpnCountry>(`/api/vpn/countries/${id}`, data),

  // 13. DELETE /api/vpn/countries/:id
  deleteCountry: (
    id: number | string,
  ): Promise<ApiResponse<{ deleted: boolean }>> =>
    apiClient.delete<{ deleted: boolean }>(`/api/vpn/countries/${id}`),

  // 14. GET /api/vpn/server-type
  getServerTypes: (): Promise<ApiResponse<VpnServerType[]>> =>
    apiClient.get<VpnServerType[]>("/api/vpn/server-type"),
};
