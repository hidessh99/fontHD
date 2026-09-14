import { httpClient } from "@/lib/api/http-client";
import type { DnsDomain, DnsRecord, CreateDnsRecordDto } from "../types/dns.types";

export const dnsApi = {
  getDomains: async () => {
    return httpClient.get<DnsDomain[]>("/api/dns/domains");
  },

  getRecords: async (params?: { domain_id?: string }) => {
    return httpClient.get<DnsRecord[]>("/api/dns/records", { params });
  },

  createRecord: async (data: CreateDnsRecordDto) => {
    return httpClient.post<DnsRecord>("/api/dns/records", data);
  },

  updateRecord: async (id: string, data: Partial<CreateDnsRecordDto>) => {
    return httpClient.put<DnsRecord>(`/api/dns/records/${id}`, data);
  },

  deleteRecord: async (id: string) => {
    return httpClient.delete<{ success: boolean }>(`/api/dns/records/${id}`);
  },
};
