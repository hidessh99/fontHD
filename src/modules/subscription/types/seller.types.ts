// ==============================================================================
// GoVPN Subscription Seller / Reseller Role DTOs & Contracts (11 Endpoints)
// ==============================================================================

export interface SellerCreateSubscriptionDto {
  customer_user_id: string | number;
  plan_id: string | number;
  auto_renew?: boolean;
}

export interface SellerUpgradeSubscriptionDto {
  subscription_id: string | number;
  new_plan_id: string | number;
}

export interface SellerCreateTenantDto {
  name: string;
  subdomain: string;
  custom_domain?: string;
  logo_url?: string;
  primary_color?: string;
}

export interface SellerUpdateTenantDto {
  name?: string;
  subdomain?: string;
  custom_domain?: string;
  logo_url?: string;
  primary_color?: string;
}
