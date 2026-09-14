// ==============================================================================
// GoVPN Monitor Admin API Client (5 Admin Endpoints + 2 Cronjobs)
// Synchronized with backendv2 admin monitor routes
// ==============================================================================

import { apiClient, ApiResponse } from "@/lib/api/http-client";
import { ServerTelemetry, MonitorTarget } from "../types/monitor.types";
import {
  AdminCreateMonitorDto,
  AdminUpdateMonitorDto,
  AdminMonitorFilterParams,
} from "../types/admin.types";

export const monitorAdminApi = {
  // 1. GET /api/admin/monitor
  getMonitors: (
    params?: AdminMonitorFilterParams,
  ): Promise<ApiResponse<MonitorTarget[]>> =>
    apiClient.get<MonitorTarget[]>("/api/admin/monitor", { params }),

  // 2. POST /api/admin/monitor
  createMonitor: (
    data: AdminCreateMonitorDto,
  ): Promise<ApiResponse<MonitorTarget>> =>
    apiClient.post<MonitorTarget>("/api/admin/monitor", data),

  // 3. GET /api/admin/monitor/:id
  getMonitorById: (id: string | number): Promise<ApiResponse<MonitorTarget>> =>
    apiClient.get<MonitorTarget>(`/api/admin/monitor/${id}`),

  // 4. PUT /api/admin/monitor/:id
  updateMonitor: (
    id: string | number,
    data: AdminUpdateMonitorDto,
  ): Promise<ApiResponse<MonitorTarget>> =>
    apiClient.put<MonitorTarget>(`/api/admin/monitor/${id}`, data),

  // 5. DELETE /api/admin/monitor/:id
  deleteMonitor: (
    id: string | number,
  ): Promise<ApiResponse<{ deleted: boolean }>> =>
    apiClient.delete<{ deleted: boolean }>(`/api/admin/monitor/${id}`),

  // === CRONJOB / SYSTEM ROUTINES (2 Endpoints) ===
  // 6. GET /api/cronjob/monitor/sync
  syncServersToMonitor: (): Promise<ApiResponse<{ synced_count: number }>> =>
    apiClient.get<{ synced_count: number }>("/api/cronjob/monitor/sync"),

  // 7. GET /api/cronjob/monitor/check-uptime
  checkUptime: (): Promise<ApiResponse<{ checked_count: number }>> =>
    apiClient.get<{ checked_count: number }>(
      "/api/cronjob/monitor/check-uptime",
    ),
};
