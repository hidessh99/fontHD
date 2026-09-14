// ==============================================================================
// GoVPN VPN User Role DTOs & Contracts (36 Endpoints)
// ==============================================================================

import { VpnAccount, VpnProtocol } from "./vpn.types";

export interface CreateVpnAccountDto {
  server_id: number;
  protocol: VpnProtocol;
  username: string;
  password?: string;
  duration_days?: number;
}

export interface CreatePayasAccountDto {
  server_id: number;
  protocol: VpnProtocol;
  username: string;
  password?: string;
}

export interface RenewVpnAccountDto {
  account_id: number | string;
  duration_days: number;
}

export interface ChangePayasStatusDto {
  status: "ACTIVE" | "PAUSED";
}

export interface VpnAccountCheckResponse {
  is_valid: boolean;
  is_active: boolean;
  is_online: boolean;
  bandwidth_remaining_bytes?: number;
  expires_in_seconds?: number;
  status: string;
}

export interface UserVpnFilters {
  protocol?: VpnProtocol;
  status?: string;
  search?: string;
  tier?: "always" | "month" | "payas" | "free";
}
