// ==============================================================================
// GoVPN Monitor API Clients Barrel Export
// ==============================================================================

import { monitorPublicApi } from "./public.api";
import { monitorUserApi } from "./user.api";
import { monitorAdminApi } from "./admin.api";

export * from "./public.api";
export * from "./user.api";
export * from "./admin.api";

export const monitorApi = {
  ...monitorPublicApi,
  ...monitorUserApi,
  admin: monitorAdminApi,
};
