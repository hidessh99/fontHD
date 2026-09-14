// ==============================================================================
// GoVPN Kubernetes API Clients Barrel Export
// ==============================================================================

import { k8sUserApi } from "./user.api";
import { k8sAdminApi } from "./admin.api";

export * from "./user.api";
export * from "./admin.api";

export const k8sApi = {
  ...k8sUserApi,
  admin: k8sAdminApi,
};
