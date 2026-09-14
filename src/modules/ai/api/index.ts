// ==============================================================================
// GoVPN AI API Clients Barrel Export
// ==============================================================================

import { aiUserApi } from "./user.api";
import { aiAdminApi } from "./admin.api";

export * from "./user.api";
export * from "./admin.api";

export const aiApi = {
  ...aiUserApi,
  admin: aiAdminApi,
};
