// ==============================================================================
// GoVPN IAM Unified Module API Barrel (47 Frontend Endpoints)
// Synchronized with Pola C: Role-Partitioned Architecture
// ==============================================================================

import { iamGuestApi } from "./guest.api";
import { iamUserApi } from "./user.api";
import { iamAdminApi } from "./admin.api";

export const iamApi = {
  guest: iamGuestApi,
  user: iamUserApi,
  admin: iamAdminApi,
};

export { iamGuestApi, iamUserApi, iamAdminApi };
