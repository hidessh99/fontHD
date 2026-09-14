// ==============================================================================
// GoVPN Kubernetes & Container Cloud Core Types
// Synchronized with backendv2 Kubernetes Deployment & Cluster Architecture
// ==============================================================================

export type K8sAppStatus = "RUNNING" | "PENDING" | "STOPPED" | "FAILED" | "CRASH_LOOP";

export interface K8sEnvVar {
  key: string;
  value: string;
}

export interface K8sSpec {
  id: string | number;
  name: string;
  cpu_cores: number; // e.g., 0.5, 1, 2
  ram_mb: number; // e.g., 512, 1024, 2048
  storage_gb: number; // e.g., 10, 20, 50
  price_monthly: number;
  is_active: boolean;
}

export interface K8sTemplate {
  id: string | number;
  name: string;
  slug: string;
  category: "DATABASE" | "WEB" | "VPN" | "CMS" | "DEVOPS";
  docker_image: string;
  default_port: number;
  default_env?: K8sEnvVar[];
  description?: string;
  icon_url?: string;
}

export interface K8sServer {
  id: string | number;
  name: string;
  node_ip: string;
  region: string;
  cluster_name: string;
  total_cpu: number;
  total_ram_gb: number;
  status: "READY" | "NOT_READY" | "MAINTENANCE";
  pod_count: number;
  created_at: string;
}

export interface K8sApp {
  id: string | number;
  user_id: string | number;
  name: string;
  namespace: string;
  pod_name?: string;
  template_id?: string | number;
  template_name?: string;
  docker_image: string;
  spec_id: string | number;
  spec?: K8sSpec;
  status: K8sAppStatus;
  external_url?: string;
  ports: number[];
  env_vars: K8sEnvVar[];
  cpu_usage_percent?: number;
  ram_usage_mb?: number;
  expires_at: string;
  created_at: string;
  updated_at?: string;
}

export interface K8sLogEntry {
  timestamp: string;
  message: string;
  stream: "stdout" | "stderr";
}
