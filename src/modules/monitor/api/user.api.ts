// ==============================================================================
// GoVPN Monitor User API Client (2 Endpoints)
// Synchronized with backendv2 user monitor routes
// ==============================================================================

import { apiClient, ApiResponse } from "@/lib/api/http-client";
import { ServerTelemetry } from "../types/monitor.types";
import { UserMonitorFilterParams } from "../types/user.types";

export const monitorUserApi = {
  // 1. GET /api/monitor
  getMonitors: (
    params?: UserMonitorFilterParams,
  ): Promise<ApiResponse<ServerTelemetry[]>> =>
    apiClient.get<ServerTelemetry[]>("/api/monitor", { params }),

  // 2. GET /api/monitor/:id
  getMonitorById: (
    id: string | number,
  ): Promise<ApiResponse<ServerTelemetry>> =>
    apiClient.get<ServerTelemetry>(`/api/monitor/${id}`),
};
