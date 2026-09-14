// ==============================================================================
// GoVPN VPN Domain Types & Contracts
// Synchronized with 11-vpn Postman Collection (96 Endpoints)
// ==============================================================================

export type VpnProtocol =
  | "ssh"
  | "vmess"
  | "vless"
  | "trojan"
  | "shadowsocks"
  | "wireguard"
  | "openvpn";

export interface VpnAccount {
  id: number | string;
  username: string;
  password?: string;
  uuid?: string;
  protocol: VpnProtocol;
  server_id: number;
  server_name?: string;
  server_host?: string;
  server_country?: string;
  server_country_code?: string;
  port?: number;
  tls_port?: number;
  config_url?: string; // vmess://, vless://, trojan://, ss://
  raw_config?: string; // OpenVPN .ovpn or WireGuard .conf
  status: "ACTIVE" | "EXPIRED" | "SUSPENDED" | string;
  expired_at: string;
  bandwidth_used?: number;
  bandwidth_limit?: number;
  created_at?: string;
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
  price_per_month?: number;
}

export interface CreateVpnAccountDto {
  server_id: number;
  protocol: string;
  username: string;
  password: string;
  duration_days?: number;
}

export interface RenewVpnAccountDto {
  account_id: number | string;
  duration_days: number;
}
