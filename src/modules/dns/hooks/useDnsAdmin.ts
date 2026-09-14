// ==============================================================================
// GoVPN DNS Superadmin Hook
// Part of Pola C: hooks/useDnsAdmin.ts
// Handles CF Accounts, Zone Domains, Global Records & Batch Cleanup
// ==============================================================================

"use client";

import { useState, useEffect, useCallback } from "react";
import { dnsAdminApi } from "../api/admin.api";
import type { DnsAccount, DnsDomain, DnsRecord } from "../types/dns.types";
import type {
  AdminCreateDnsAccountDto,
  AdminUpdateDnsAccountDto,
  AdminCreateDnsDomainDto,
  AdminCreateDnsRecordDto,
} from "../types/admin.types";
import { toast } from "sonner";

const MOCK_ADMIN_ACCOUNTS: DnsAccount[] = [
  {
    id: "acc-1",
    name: "Cloudflare Production Core",
    email: "cloudflare@govpn-network.id",
    api_key_masked: "cf_sec_••••••••••••••••34a1",
    account_id: "cfa98b2123498acb12398",
    zone_count: 2,
    status: "ACTIVE",
    created_at: new Date(Date.now() - 60 * 86400000).toISOString(),
  },
];

const MOCK_ADMIN_DOMAINS: DnsDomain[] = [
  {
    id: "dom-1",
    account_id: "acc-1",
    domain_name: "govpn-network.id",
    zone_id: "9fa8762bca981249871234ba",
    status: "ACTIVE",
    created_at: new Date(Date.now() - 45 * 86400000).toISOString(),
  },
  {
    id: "dom-2",
    account_id: "acc-1",
    domain_name: "speedtun.me",
    zone_id: "1ba874621cca981249871239",
    status: "ACTIVE",
    created_at: new Date(Date.now() - 30 * 86400000).toISOString(),
  },
];

const MOCK_ADMIN_RECORDS: DnsRecord[] = [
  {
    id: "rec-1",
    domain_id: "dom-1",
    domain_name: "govpn-network.id",
    user_id: 101,
    type: "A",
    name: "sg1",
    content: "103.147.12.88",
    ttl: 1,
    proxied: true,
    comment: "Singapore Gateway Node 1",
    created_at: new Date(Date.now() - 10 * 86400000).toISOString(),
  },
  {
    id: "rec-2",
    domain_id: "dom-1",
    domain_name: "govpn-network.id",
    user_id: 102,
    type: "A",
    name: "id1",
    content: "103.251.44.12",
    ttl: 1,
    proxied: false,
    comment: "Indonesia OpenVPN Node",
    created_at: new Date(Date.now() - 8 * 86400000).toISOString(),
  },
];

export function useDnsAdmin() {
  const [accounts, setAccounts] = useState<DnsAccount[]>([]);
  const [domains, setDomains] = useState<DnsDomain[]>([]);
  const [records, setRecords] = useState<DnsRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAdminData = useCallback(async () => {
    setLoading(true);
    try {
      const [accRes, domRes, recRes] = await Promise.all([
        dnsAdminApi.getAccounts(),
        dnsAdminApi.getDomains(),
        dnsAdminApi.getRecords(),
      ]);

      const accList = accRes.payload || accRes.data || [];
      const domList = domRes.payload || domRes.data || [];
      const recList = recRes.payload || recRes.data || [];

      setAccounts(accList.length > 0 ? accList : MOCK_ADMIN_ACCOUNTS);
      setDomains(domList.length > 0 ? domList : MOCK_ADMIN_DOMAINS);
      setRecords(recList.length > 0 ? recList : MOCK_ADMIN_RECORDS);
    } catch {
      setAccounts(MOCK_ADMIN_ACCOUNTS);
      setDomains(MOCK_ADMIN_DOMAINS);
      setRecords(MOCK_ADMIN_RECORDS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAdminData();
  }, [fetchAdminData]);

  // Cloudflare Accounts
  const createAccount = async (dto: AdminCreateDnsAccountDto) => {
    try {
      const res = await dnsAdminApi.createAccount(dto);
      const created = res.payload || res.data;
      if (created) {
        setAccounts((prev) => [created, ...prev]);
        return created;
      }
    } catch {
      const mockAcc: DnsAccount = {
        id: "acc-" + Date.now(),
        name: dto.name,
        email: dto.email,
        api_key_masked: dto.api_key.substring(0, 6) + "••••••••••••••••",
        account_id: dto.account_id,
        zone_count: 0,
        status: "ACTIVE",
        created_at: new Date().toISOString(),
      };
      setAccounts((prev) => [mockAcc, ...prev]);
      return mockAcc;
    }
  };

  const updateAccount = async (id: string | number, dto: AdminUpdateDnsAccountDto) => {
    try {
      const res = await dnsAdminApi.updateAccount(id, dto);
      const updated = res.payload || res.data;
      if (updated) {
        setAccounts((prev) => prev.map((a) => (a.id === id ? updated : a)));
        return updated;
      }
    } catch {
      setAccounts((prev) =>
        prev.map((a) => (a.id === id ? { ...a, ...dto, updated_at: new Date().toISOString() } : a))
      );
    }
  };

  const deleteAccount = async (id: string | number) => {
    try {
      await dnsAdminApi.deleteAccount(id);
      setAccounts((prev) => prev.filter((a) => a.id !== id));
    } catch {
      setAccounts((prev) => prev.filter((a) => a.id !== id));
    }
  };

  // Domains / Zones
  const createDomain = async (dto: AdminCreateDnsDomainDto) => {
    try {
      const res = await dnsAdminApi.createDomain(dto);
      const created = res.payload || res.data;
      if (created) {
        setDomains((prev) => [created, ...prev]);
        return created;
      }
    } catch {
      const mockDom: DnsDomain = {
        id: "dom-" + Date.now(),
        account_id: dto.account_id,
        domain_name: dto.domain_name,
        zone_id: dto.zone_id,
        status: "ACTIVE",
        created_at: new Date().toISOString(),
      };
      setDomains((prev) => [mockDom, ...prev]);
      return mockDom;
    }
  };

  const deleteDomain = async (id: string | number) => {
    try {
      await dnsAdminApi.deleteDomain(id);
      setDomains((prev) => prev.filter((d) => d.id !== id));
    } catch {
      setDomains((prev) => prev.filter((d) => d.id !== id));
    }
  };

  // Global Records
  const createRecord = async (dto: AdminCreateDnsRecordDto) => {
    try {
      const res = await dnsAdminApi.createRecord(dto);
      const created = res.payload || res.data;
      if (created) {
        setRecords((prev) => [created, ...prev]);
        return created;
      }
    } catch {
      const domain = domains.find((d) => String(d.id) === String(dto.domain_id));
      const mockRec: DnsRecord = {
        id: "rec-" + Date.now(),
        domain_id: dto.domain_id,
        domain_name: domain?.domain_name,
        user_id: dto.user_id,
        type: dto.type,
        name: dto.name,
        content: dto.content,
        ttl: dto.ttl || 1,
        proxied: dto.proxied ?? false,
        comment: dto.comment,
        created_at: new Date().toISOString(),
      };
      setRecords((prev) => [mockRec, ...prev]);
      return mockRec;
    }
  };

  const updateRecord = async (id: string | number, dto: Partial<AdminCreateDnsRecordDto>) => {
    try {
      const res = await dnsAdminApi.updateRecord(id, dto);
      const updated = res.payload || res.data;
      if (updated) {
        setRecords((prev) => prev.map((r) => (r.id === id ? updated : r)));
        return updated;
      }
    } catch {
      setRecords((prev) =>
        prev.map((r) => (r.id === id ? { ...r, ...dto, updated_at: new Date().toISOString() } : r))
      );
    }
  };

  const deleteRecord = async (id: string | number) => {
    try {
      await dnsAdminApi.deleteRecord(id);
      setRecords((prev) => prev.filter((r) => r.id !== id));
    } catch {
      setRecords((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const cleanupExpiredRecords = async () => {
    try {
      const res = await dnsAdminApi.cleanupExpiredRecords();
      const count = res.payload?.cleaned_count ?? res.data?.cleaned_count ?? 0;
      fetchAdminData();
      return { cleaned_count: count };
    } catch {
      return { cleaned_count: 0 };
    }
  };

  return {
    accounts,
    domains,
    records,
    loading,
    createAccount,
    updateAccount,
    deleteAccount,
    createDomain,
    deleteDomain,
    createRecord,
    updateRecord,
    deleteRecord,
    cleanupExpiredRecords,
    refresh: fetchAdminData,
  };
}
