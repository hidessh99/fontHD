// ==============================================================================
// GoVPN DNS Superadmin Role DTOs & Contracts (13 Endpoints)
// Synchronized with backendv2 admin DNS accounts, domains, and records
// ==============================================================================

import { DnsRecordType } from "./dns.types";

export interface AdminCreateDnsAccountDto {
  name: string;
  email: string;
  api_key: string;
  account_id?: string;
}

export interface AdminUpdateDnsAccountDto {
  name?: string;
  email?: string;
  api_key?: string;
  account_id?: string;
}

export interface AdminCreateDnsDomainDto {
  account_id: string | number;
  domain_name: string;
  zone_id?: string;
}

export interface AdminCreateDnsRecordDto {
  user_id?: string | number;
  domain_id: string | number;
  type: DnsRecordType;
  name: string;
  content: string;
  ttl?: number;
  proxied?: boolean;
  comment?: string;
}

export interface AdminDnsRecordFilterParams {
  user_id?: string | number;
  domain_id?: string | number;
  type?: DnsRecordType;
  search?: string;
  page?: number;
  limit?: number;
  [key: string]: string | number | boolean | undefined;
}
