// ==============================================================================
// GoVPN Kubernetes Admin Role DTOs & Contracts (12 Endpoints)
// ==============================================================================

import { K8sEnvVar } from "./k8s.types";

export interface AdminCreateServerDto {
  name: string;
  node_ip: string;
  region: string;
  cluster_name: string;
  total_cpu: number;
  total_ram_gb: number;
}

export interface AdminUpdateServerDto {
  name?: string;
  node_ip?: string;
  region?: string;
  cluster_name?: string;
  status?: "READY" | "NOT_READY" | "MAINTENANCE";
}

export interface AdminCreateSpecDto {
  name: string;
  cpu_cores: number;
  ram_mb: number;
  storage_gb: number;
  price_monthly: number;
  is_active?: boolean;
}

export interface AdminUpdateSpecDto {
  name?: string;
  cpu_cores?: number;
  ram_mb?: number;
  storage_gb?: number;
  price_monthly?: number;
  is_active?: boolean;
}

export interface AdminCreateTemplateDto {
  name: string;
  slug: string;
  category: "DATABASE" | "WEB" | "VPN" | "CMS" | "DEVOPS";
  docker_image: string;
  default_port: number;
  default_env?: K8sEnvVar[];
  description?: string;
  icon_url?: string;
}

export interface AdminUpdateTemplateDto {
  name?: string;
  slug?: string;
  category?: "DATABASE" | "WEB" | "VPN" | "CMS" | "DEVOPS";
  docker_image?: string;
  default_port?: number;
  default_env?: K8sEnvVar[];
  description?: string;
  icon_url?: string;
}
