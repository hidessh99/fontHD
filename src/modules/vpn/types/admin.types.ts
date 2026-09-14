// ==============================================================================
// GoVPN VPN Admin Role DTOs & Contracts (21 Endpoints)
// ==============================================================================

import { VpnProtocol } from "./vpn.types";

export interface AdminCreateServerDto {
  name: string;
  country: string;
  country_code: string;
  ip: string;
  domain: string;
  supported_protocols: VpnProtocol[];
  max_users: number;
  tier: "free" | "month" | "always" | "payas";
  price_per_month?: number;
  price_hourly?: number;
  root_password?: string;
}

export interface AdminUpdateServerDto extends Partial<AdminCreateServerDto> {
  is_online?: boolean;
}

export interface CreateServerConnectDto {
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

export interface CreateServerTypeDto {
  key_name: string;
  name: string;
  description?: string;
  is_active: boolean;
}

export interface TriggerPayasBillingResponse {
  total_processed: number;
  total_billed_amount: number;
  success_count: number;
  failure_count: number;
  executed_at: string;
}
