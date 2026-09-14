export type NodeStatus = "ONLINE" | "DEGRADED" | "OFFLINE" | "MAINTENANCE";

export interface ServerTelemetry {
  id: string;
  server_id: string;
  server_name: string;
  ip_address: string;
  country: string;
  city?: string;
  flag?: string;
  status: NodeStatus;
  ping_ms: number;
  cpu_percent: number;
  ram_percent: number;
  disk_percent: number;
  bandwidth_in_mbps: number;
  bandwidth_out_mbps: number;
  active_sessions: number;
  max_sessions: number;
  uptime_seconds: number;
  last_heartbeat: string;
}

export interface PingHistoryPoint {
  timestamp: string;
  ping_ms: number;
}

export interface SystemHealthResponse {
  status: "ok" | "degraded" | "error";
  uptime: number;
  timestamp: string;
  services: {
    database: boolean;
    redis: boolean;
    kubernetes: boolean;
    vpn_engine: boolean;
  };
}
