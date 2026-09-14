// ==============================================================================
// GoVPN Finance Unified Module API Barrel (48 Frontend Endpoints)
// Synchronized with Pola C: Role-Partitioned Architecture
// ==============================================================================

import { financeUserApi } from "./user.api";
import { financeSellerApi } from "./seller.api";
import { financeAdminApi } from "./admin.api";

export const financeApi = {
  user: financeUserApi,
  seller: financeSellerApi,
  admin: financeAdminApi,
};

export { financeUserApi, financeSellerApi, financeAdminApi };
