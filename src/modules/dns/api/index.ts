// ==============================================================================
// GoVPN DNS Unified Module API Barrel (18 Frontend Endpoints)
// Synchronized with Pola C: Role-Partitioned Architecture
// ==============================================================================

import { dnsUserApi } from "./user.api";
import { dnsAdminApi } from "./admin.api";

export const dnsApi = {
  user: dnsUserApi,
  admin: dnsAdminApi,
};

export { dnsUserApi, dnsAdminApi };
