// ==============================================================================
// GoVPN VPN Seller / Reseller Role DTOs & Contracts (12 Endpoints)
// ==============================================================================

export interface CreateSellerServerDto {
  name: string;
  country: string;
  country_code: string;
  ip: string;
  domain: string;
  supported_protocols: string[];
  max_users: number;
  price_per_month?: number;
  price_hourly?: number;
}

export interface UpdateSellerServerDto extends Partial<CreateSellerServerDto> {
  is_online?: boolean;
}

export interface ResellerVpnQuota {
  total_quota: number;
  used_quota: number;
  remaining_quota: number;
  active_sub_clients: number;
}

export interface SubTenantVpnSummary {
  tenant_id: string;
  tenant_name: string;
  total_accounts: number;
  active_accounts: number;
  monthly_bandwidth_bytes: number;
}
