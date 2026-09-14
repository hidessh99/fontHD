// ==============================================================================
// GoVPN Monitor Admin Role DTOs & Contracts (5 Endpoints + 2 Cronjobs)
// ==============================================================================

import { NodeStatus } from "./monitor.types";

export interface AdminCreateMonitorDto {
  name: string;
  host: string;
  port?: number;
  protocol: "ICMP" | "TCP" | "HTTP" | "GRPC";
  interval_seconds?: number;
  alert_threshold_ms?: number;
}

export interface AdminUpdateMonitorDto {
  name?: string;
  host?: string;
  port?: number;
  protocol?: "ICMP" | "TCP" | "HTTP" | "GRPC";
  interval_seconds?: number;
  alert_threshold_ms?: number;
  is_active?: boolean;
}

export interface AdminMonitorFilterParams {
  search?: string;
  status?: NodeStatus | "ALL";
  protocol?: "ICMP" | "TCP" | "HTTP" | "GRPC" | "ALL";
  page?: number;
  limit?: number;
  [key: string]: string | number | boolean | undefined;
}
