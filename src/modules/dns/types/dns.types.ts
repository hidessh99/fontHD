// ==============================================================================
// GoVPN DNS Domain Core Types & Entities
// Synchronized with backendv2 19 Core DNS Endpoints + 18 Legacy Endpoints
// ==============================================================================

export type DnsRecordType = "A" | "AAAA" | "CNAME" | "TXT" | "NS" | "MX";

export interface DnsDomain {
  id: string | number;
  domain_name: string;
  account_id?: string | number;
  zone_id?: string;
  status: "ACTIVE" | "PENDING" | "ERROR" | string;
  created_at: string;
  updated_at?: string;
}

export interface DnsRecord {
  id: string | number;
  domain_id: string | number;
  domain_name?: string;
  user_id?: string | number;
  type: DnsRecordType;
  name: string;
  content: string;
  ttl: number;
  proxied: boolean;
  comment?: string;
  created_at: string;
  updated_at?: string;
}

export interface DnsAccount {
  id: string | number;
  name: string;
  email: string;
  api_key_masked?: string;
  account_id?: string;
  zone_count?: number;
  status?: "ACTIVE" | "ERROR" | string;
  created_at: string;
  updated_at?: string;
}
