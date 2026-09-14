export type DnsRecordType = "A" | "AAAA" | "CNAME" | "TXT" | "NS" | "MX";

export interface DnsDomain {
  id: string;
  domain_name: string;
  account_id?: string;
  zone_id?: string;
  status: "ACTIVE" | "PENDING" | "ERROR";
  created_at: string;
}

export interface DnsRecord {
  id: string;
  domain_id: string;
  domain_name?: string;
  type: DnsRecordType;
  name: string;
  content: string;
  ttl: number;
  proxied: boolean;
  comment?: string;
  created_at: string;
  updated_at?: string;
}

export interface CreateDnsRecordDto {
  domain_id: string;
  type: DnsRecordType;
  name: string;
  content: string;
  ttl?: number;
  proxied?: boolean;
  comment?: string;
}
