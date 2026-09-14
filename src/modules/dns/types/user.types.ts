// ==============================================================================
// GoVPN DNS User Role DTOs & Contracts (5 Endpoints)
// Synchronized with backendv2 user DNS routes
// ==============================================================================

import { DnsRecordType } from "./dns.types";

export interface CreateUserDnsRecordDto {
  domain_id: string | number;
  type: DnsRecordType;
  name: string;
  content: string;
  ttl?: number;
  proxied?: boolean;
  comment?: string;
}

export interface UpdateUserDnsRecordDto {
  content?: string;
  ttl?: number;
  proxied?: boolean;
  comment?: string;
}

export interface UserDnsFilterParams {
  domain_id?: string | number;
  type?: DnsRecordType;
  search?: string;
  [key: string]: string | number | boolean | undefined;
}
