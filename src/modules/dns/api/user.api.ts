// ==============================================================================
// GoVPN DNS User API Client (5 Endpoints)
// Synchronized with backendv2 user DNS routes
// ==============================================================================

import { apiClient, ApiResponse } from "@/lib/api/http-client";
import { DnsDomain, DnsRecord } from "../types/dns.types";
import {
  CreateUserDnsRecordDto,
  UpdateUserDnsRecordDto,
  UserDnsFilterParams,
} from "../types/user.types";

export const dnsUserApi = {
  // 1. GET /api/dns/domains
  getDomains: (): Promise<ApiResponse<DnsDomain[]>> =>
    apiClient.get<DnsDomain[]>("/api/dns/domains"),

  // 2. GET /api/dns/records
  getRecords: (params?: UserDnsFilterParams): Promise<ApiResponse<DnsRecord[]>> =>
    apiClient.get<DnsRecord[]>("/api/dns/records", { params }),

  // 3. POST /api/dns/records
  createRecord: (data: CreateUserDnsRecordDto): Promise<ApiResponse<DnsRecord>> =>
    apiClient.post<DnsRecord>("/api/dns/records", data),

  // 4. PUT /api/dns/records/:id
  updateRecord: (id: string | number, data: UpdateUserDnsRecordDto): Promise<ApiResponse<DnsRecord>> =>
    apiClient.put<DnsRecord>(`/api/dns/records/${id}`, data),

  // 5. DELETE /api/dns/records/:id
  deleteRecord: (id: string | number): Promise<ApiResponse<{ deleted: boolean }>> =>
    apiClient.delete<{ deleted: boolean }>(`/api/dns/records/${id}`),
};
