// ==============================================================================
// GoVPN Kubernetes User Role DTOs & Contracts (6 Endpoints)
// ==============================================================================

import { K8sEnvVar, K8sAppStatus } from "./k8s.types";

export interface DeployK8sAppDto {
  name: string;
  template_id?: string | number;
  docker_image: string;
  spec_id: string | number;
  ports?: number[];
  env_vars?: K8sEnvVar[];
}

export interface UpdateK8sAppEnvDto {
  env_vars: K8sEnvVar[];
}

export interface RenewK8sAppDto {
  months: number;
}

export interface UserK8sAppFilterParams {
  status?: K8sAppStatus | "ALL";
  search?: string;
  [key: string]: string | number | boolean | undefined;
}
