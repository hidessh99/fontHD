// ==============================================================================
// GoVPN VPN Unified Module API Barrel (96 Endpoints)
// Synchronized with Pola C: Role-Partitioned Architecture
// ==============================================================================

import { vpnGuestApi } from "./guest.api";
import { vpnUserApi } from "./user.api";
import { vpnSellerApi } from "./seller.api";
import { vpnAdminApi } from "./admin.api";

export const vpnApi = {
  guest: vpnGuestApi,
  user: vpnUserApi,
  seller: vpnSellerApi,
  admin: vpnAdminApi,
};

export { vpnGuestApi, vpnUserApi, vpnSellerApi, vpnAdminApi };
