// ==============================================================================
// GoVPN Subscription API Clients Barrel Export
// ==============================================================================

import { subscriptionUserApi } from "./user.api";
import { subscriptionSellerApi } from "./seller.api";
import { subscriptionAdminApi } from "./admin.api";

export * from "./user.api";
export * from "./seller.api";
export * from "./admin.api";

export const subscriptionApi = {
  ...subscriptionUserApi,
  seller: subscriptionSellerApi,
  admin: subscriptionAdminApi,
};
