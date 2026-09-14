// ==============================================================================
// GoVPN VPN Seller / Reseller API Client (12 Endpoints)
// Synchronized with backendv2 11-vpn catalog
// ==============================================================================

import { apiClient, ApiResponse } from "@/lib/api/http-client";
import { ServerNode } from "../types/vpn.types";
import {
  CreateSellerServerDto,
  UpdateSellerServerDto,
} from "../types/seller.types";

export const vpnSellerApi = {
  // === RESELLER SERVERS: ALWAYS (4 Endpoints) ===
  // 1. POST /api/seller/vpn/servers/always
  createAlwaysServer: (
    data: CreateSellerServerDto,
    idempotencyKey?: string,
  ): Promise<ApiResponse<ServerNode>> =>
    apiClient.post<ServerNode>("/api/seller/vpn/servers/always", data, {
      idempotencyKey,
    }),

  // 2. GET /api/seller/vpn/servers/always/:id
  getAlwaysServerById: (
    id: number | string,
  ): Promise<ApiResponse<ServerNode>> =>
    apiClient.get<ServerNode>(`/api/seller/vpn/servers/always/${id}`),

  // 3. PUT /api/seller/vpn/servers/always/:id
  updateAlwaysServer: (
    id: number | string,
    data: UpdateSellerServerDto,
  ): Promise<ApiResponse<ServerNode>> =>
    apiClient.put<ServerNode>(`/api/seller/vpn/servers/always/${id}`, data),

  // 4. DELETE /api/seller/vpn/servers/always/:id
  deleteAlwaysServer: (
    id: number | string,
  ): Promise<ApiResponse<{ deleted: boolean }>> =>
    apiClient.delete<{ deleted: boolean }>(
      `/api/seller/vpn/servers/always/${id}`,
    ),

  // === RESELLER SERVERS: MONTH (4 Endpoints) ===
  // 5. POST /api/seller/vpn/servers/month
  createMonthServer: (
    data: CreateSellerServerDto,
    idempotencyKey?: string,
  ): Promise<ApiResponse<ServerNode>> =>
    apiClient.post<ServerNode>("/api/seller/vpn/servers/month", data, {
      idempotencyKey,
    }),

  // 6. GET /api/seller/vpn/servers/month/:id
  getMonthServerById: (id: number | string): Promise<ApiResponse<ServerNode>> =>
    apiClient.get<ServerNode>(`/api/seller/vpn/servers/month/${id}`),

  // 7. PUT /api/seller/vpn/servers/month/:id
  updateMonthServer: (
    id: number | string,
    data: UpdateSellerServerDto,
  ): Promise<ApiResponse<ServerNode>> =>
    apiClient.put<ServerNode>(`/api/seller/vpn/servers/month/${id}`, data),

  // 8. DELETE /api/seller/vpn/servers/month/:id
  deleteMonthServer: (
    id: number | string,
  ): Promise<ApiResponse<{ deleted: boolean }>> =>
    apiClient.delete<{ deleted: boolean }>(
      `/api/seller/vpn/servers/month/${id}`,
    ),

  // === RESELLER SERVERS: PAYAS (4 Endpoints) ===
  // 9. POST /api/seller/vpn/servers/payas
  createPayasServer: (
    data: CreateSellerServerDto,
    idempotencyKey?: string,
  ): Promise<ApiResponse<ServerNode>> =>
    apiClient.post<ServerNode>("/api/seller/vpn/servers/payas", data, {
      idempotencyKey,
    }),

  // 10. GET /api/seller/vpn/servers/payas/:id
  getPayasServerById: (id: number | string): Promise<ApiResponse<ServerNode>> =>
    apiClient.get<ServerNode>(`/api/seller/vpn/servers/payas/${id}`),

  // 11. PUT /api/seller/vpn/servers/payas/:id
  updatePayasServer: (
    id: number | string,
    data: UpdateSellerServerDto,
  ): Promise<ApiResponse<ServerNode>> =>
    apiClient.put<ServerNode>(`/api/seller/vpn/servers/payas/${id}`, data),

  // 12. DELETE /api/seller/vpn/servers/payas/:id
  deletePayasServer: (
    id: number | string,
  ): Promise<ApiResponse<{ deleted: boolean }>> =>
    apiClient.delete<{ deleted: boolean }>(
      `/api/seller/vpn/servers/payas/${id}`,
    ),
};
