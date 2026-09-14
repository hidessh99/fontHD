// ==============================================================================
// GoVPN Subscription User Role DTOs & Contracts (6 Endpoints)
// ==============================================================================

import { SubscriptionStatus } from "./subscription.types";

export interface CreateSubscriptionDto {
  plan_id: string | number;
  auto_renew?: boolean;
}

export interface UpgradeSubscriptionDto {
  new_plan_id: string | number;
}

export interface UserSubscriptionFilterParams {
  status?: SubscriptionStatus | "ALL";
  [key: string]: string | number | boolean | undefined;
}
