// ==============================================================================
// GoVPN VPN Domain Core Types & Entities
// Synchronized with backendv2 96 VPN Endpoints
// ==============================================================================

export type VpnProtocol =
  | "ssh"
  | "vmess"
  | "vless"
  | "trojan"
  | "shadowsocks"
  | "wireguard"
  | "openvpn";

export type VpnAccountTier = "free" | "month" | "always" | "payas";

export interface VpnCountry {
  id: number | string;
  name: string;
  code: string;
  flag_url?: string;
  total_servers?: number;
  created_at?: string;
  updated_at?: string;
}

export interface VpnServerType {
  id?: number;
  key_name: string;
  name: string;
  description?: string;
  is_active: boolean;
  created_at?: string;
}

export interface VpnServerConnect {
  id: number | string;
  server_id: number;
  name: string;
  domain: string;
  port: number;
  protocol: VpnProtocol;
  tls_enabled: boolean;
  sni?: string;
  path?: string;
  network?: "tcp" | "ws" | "grpc" | "h2";
}

export interface ServerNode {
  id: number;
  name: string;
  country: string;
  country_code: string;
  flag_url?: string;
  ip: string;
  domain: string;
  supported_protocols: string[];
  latency_ms: number;
  is_online: boolean;
  current_users: number;
  max_users: number;
  tier: VpnAccountTier;
  price_per_month?: number;
  price_hourly?: number;
  seller_id?: number | null;
  server_type?: string;
  created_at?: string;
  updated_at?: string;
}

export interface VpnAccount {
  id: number | string;
  username: string;
  password?: string;
  uuid?: string;
  protocol: VpnProtocol;
  tier: VpnAccountTier;
  server_id: number;
  server_name?: string;
  server_host?: string;
  server_country?: string;
  server_country_code?: string;
  port?: number;
  tls_port?: number;
  config_url?: string; // vmess://, vless://, trojan://, ss://
  raw_config?: string; // OpenVPN .ovpn or WireGuard .conf
  status: "ACTIVE" | "EXPIRED" | "SUSPENDED" | "PAUSED" | string;
  expired_at: string;
  uptime_seconds?: number;
  bandwidth_used?: number;
  bandwidth_limit?: number;
  hourly_cost?: number;
  created_at?: string;
  last_checked_at?: string;
}
