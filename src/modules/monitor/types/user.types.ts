// ==============================================================================
// GoVPN Monitor User Role DTOs & Contracts
// ==============================================================================

import { NodeStatus } from "./monitor.types";

export interface UserMonitorFilterParams {
  country?: string;
  status?: NodeStatus | "ALL";
  search?: string;
  [key: string]: string | number | boolean | undefined;
}
