// ==============================================================================
// GoVPN Subscription Admin Role DTOs & Contracts (23 Endpoints)
// ==============================================================================

import { BillingCycle, SubscriptionStatus } from "./subscription.types";

export interface AdminCreatePlanDto {
  name: string;
  slug: string;
  description?: string;
  price: number;
  currency?: string;
  billing_cycle: BillingCycle;
  max_devices: number;
  bandwidth_gb: number;
  is_active?: boolean;
  features: string[];
}

export interface AdminUpdatePlanDto {
  name?: string;
  slug?: string;
  description?: string;
  price?: number;
  currency?: string;
  billing_cycle?: BillingCycle;
  max_devices?: number;
  bandwidth_gb?: number;
  is_active?: boolean;
  features?: string[];
}

export interface AdminChangeSubscriptionPlanDto {
  plan_id: string | number;
}

export interface AdminUpdateSubscriptionStatusDto {
  subscription_id: string | number;
  status: SubscriptionStatus;
}

export interface AdminCreateTenantDto {
  seller_id: string | number;
  name: string;
  subdomain: string;
  custom_domain?: string;
}

export interface AdminUpdateTenantDto {
  name?: string;
  subdomain?: string;
  custom_domain?: string;
  status?: "ACTIVE" | "SUSPENDED";
}
