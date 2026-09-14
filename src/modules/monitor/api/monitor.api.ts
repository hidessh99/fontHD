import { httpClient } from "@/lib/api/http-client";
import type { ServerTelemetry, SystemHealthResponse } from "../types/monitor.types";

export const monitorApi = {
  getMonitors: async () => {
    return httpClient.get<ServerTelemetry[]>("/api/monitor");
  },

  getMonitorById: async (id: string) => {
    return httpClient.get<ServerTelemetry>(`/api/monitor/${id}`);
  },

  getAdminMonitors: async () => {
    return httpClient.get<ServerTelemetry[]>("/api/admin/monitor");
  },

  getHealth: async () => {
    return httpClient.get<SystemHealthResponse>("/health");
  },
};
