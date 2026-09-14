// ==============================================================================
// GoVPN DNS Superadmin API Client (13 Endpoints)
// Synchronized with backendv2 admin DNS accounts, domains, and records
// ==============================================================================

import { apiClient, ApiResponse } from "@/lib/api/http-client";
import {
  DnsAccount,
  DnsDomain,
  DnsRecord,
} from "../types/dns.types";
import {
  AdminCreateDnsAccountDto,
  AdminUpdateDnsAccountDto,
  AdminCreateDnsDomainDto,
  AdminCreateDnsRecordDto,
  AdminDnsRecordFilterParams,
} from "../types/admin.types";

export const dnsAdminApi = {
  // === CLOUDFLARE ACCOUNTS (5 Endpoints) ===
  // 1. GET /api/admin/dns/accounts
  getAccounts: (): Promise<ApiResponse<DnsAccount[]>> =>
    apiClient.get<DnsAccount[]>("/api/admin/dns/accounts"),

  // 2. POST /api/admin/dns/accounts
  createAccount: (data: AdminCreateDnsAccountDto): Promise<ApiResponse<DnsAccount>> =>
    apiClient.post<DnsAccount>("/api/admin/dns/accounts", data),

  // 3. GET /api/admin/dns/accounts/:id
  getAccountById: (id: string | number): Promise<ApiResponse<DnsAccount>> =>
    apiClient.get<DnsAccount>(`/api/admin/dns/accounts/${id}`),

  // 4. PUT /api/admin/dns/accounts/:id
  updateAccount: (id: string | number, data: AdminUpdateDnsAccountDto): Promise<ApiResponse<DnsAccount>> =>
    apiClient.put<DnsAccount>(`/api/admin/dns/accounts/${id}`, data),

  // 5. DELETE /api/admin/dns/accounts/:id
  deleteAccount: (id: string | number): Promise<ApiResponse<{ deleted: boolean }>> =>
    apiClient.delete<{ deleted: boolean }>(`/api/admin/dns/accounts/${id}`),

  // === ROOT DOMAINS / ZONES (3 Endpoints) ===
  // 6. GET /api/admin/dns/domains
  getDomains: (): Promise<ApiResponse<DnsDomain[]>> =>
    apiClient.get<DnsDomain[]>("/api/admin/dns/domains"),

  // 7. POST /api/admin/dns/domains
  createDomain: (data: AdminCreateDnsDomainDto): Promise<ApiResponse<DnsDomain>> =>
    apiClient.post<DnsDomain>("/api/admin/dns/domains", data),

  // 8. DELETE /api/admin/dns/domains/:id
  deleteDomain: (id: string | number): Promise<ApiResponse<{ deleted: boolean }>> =>
    apiClient.delete<{ deleted: boolean }>(`/api/admin/dns/domains/${id}`),

  // === GLOBAL DNS RECORDS (5 Endpoints) ===
  // 9. GET /api/admin/dns/records
  getRecords: (params?: AdminDnsRecordFilterParams): Promise<ApiResponse<DnsRecord[]>> =>
    apiClient.get<DnsRecord[]>("/api/admin/dns/records", { params }),

  // 10. POST /api/admin/dns/records
  createRecord: (data: AdminCreateDnsRecordDto): Promise<ApiResponse<DnsRecord>> =>
    apiClient.post<DnsRecord>("/api/admin/dns/records", data),

  // 11. PUT /api/admin/dns/records/:id
  updateRecord: (id: string | number, data: Partial<AdminCreateDnsRecordDto>): Promise<ApiResponse<DnsRecord>> =>
    apiClient.put<DnsRecord>(`/api/admin/dns/records/${id}`, data),

  // 12. DELETE /api/admin/dns/records/:id
  deleteRecord: (id: string | number): Promise<ApiResponse<{ deleted: boolean }>> =>
    apiClient.delete<{ deleted: boolean }>(`/api/admin/dns/records/${id}`),

  // 13. POST /api/admin/dns/records/cleanup
  cleanupExpiredRecords: (): Promise<ApiResponse<{ cleaned_count: number }>> =>
    apiClient.post<{ cleaned_count: number }>("/api/admin/dns/records/cleanup"),
};
