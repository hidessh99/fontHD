// ==============================================================================
// GoVPN Subscription, Plan & Multi-Tenant Core Types
// Synchronized with backendv2 Subscription & Tenant Architecture
// ==============================================================================

export type SubscriptionStatus = "ACTIVE" | "PENDING" | "EXPIRED" | "CANCELLED" | "TRIAL";

export type BillingCycle = "MONTHLY" | "QUARTERLY" | "SEMI_ANNUAL" | "ANNUAL";

export interface Plan {
  id: string | number;
  name: string;
  slug: string;
  description?: string;
  price: number;
  currency: string;
  billing_cycle: BillingCycle;
  max_devices: number;
  bandwidth_gb: number; // 0 for unlimited
  is_active: boolean;
  features: string[];
  created_at: string;
  updated_at?: string;
}

export interface Subscription {
  id: string | number;
  user_id: string | number;
  plan_id: string | number;
  plan?: Plan;
  status: SubscriptionStatus;
  start_date: string;
  end_date: string;
  auto_renew: boolean;
  seller_id?: string | number;
  created_at: string;
  updated_at?: string;
}

export interface Tenant {
  id: string | number;
  seller_id: string | number;
  name: string;
  subdomain: string;
  custom_domain?: string;
  logo_url?: string;
  primary_color?: string;
  status: "ACTIVE" | "SUSPENDED";
  created_at: string;
  updated_at?: string;
}

export interface SellerStats {
  seller_tier: string;
  total_customers: number;
  active_subscriptions: number;
  total_revenue: number;
  commission_rate: number;
  pending_commission: number;
}
