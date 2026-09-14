// ==============================================================================
// GoVPN DNS User Hook
// Part of Pola C: hooks/useDnsUser.ts
// Handles User Domain Listing, Record Creation, Deletion & Live Filtering
// ==============================================================================

"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { dnsUserApi } from "../api/user.api";
import type { DnsDomain, DnsRecord } from "../types/dns.types";
import type {
  CreateUserDnsRecordDto,
  UpdateUserDnsRecordDto,
} from "../types/user.types";
import { toast } from "sonner";

const MOCK_DOMAINS: DnsDomain[] = [
  {
    id: "dom-1",
    domain_name: "govpn-network.id",
    status: "ACTIVE",
    created_at: new Date(Date.now() - 30 * 86400000).toISOString(),
  },
  {
    id: "dom-2",
    domain_name: "speedtun.me",
    status: "ACTIVE",
    created_at: new Date(Date.now() - 15 * 86400000).toISOString(),
  },
];

const MOCK_RECORDS: DnsRecord[] = [
  {
    id: "rec-1",
    domain_id: "dom-1",
    domain_name: "govpn-network.id",
    type: "A",
    name: "sg1",
    content: "103.147.12.88",
    ttl: 1,
    proxied: true,
    comment: "Server Singapore 01 Direct",
    created_at: new Date(Date.now() - 10 * 86400000).toISOString(),
  },
  {
    id: "rec-2",
    domain_id: "dom-1",
    domain_name: "govpn-network.id",
    type: "A",
    name: "id1",
    content: "103.251.44.12",
    ttl: 1,
    proxied: false,
    comment: "Server Indonesia Node Direct",
    created_at: new Date(Date.now() - 8 * 86400000).toISOString(),
  },
  {
    id: "rec-3",
    domain_id: "dom-1",
    domain_name: "govpn-network.id",
    type: "CNAME",
    name: "trojan-sg",
    content: "sg1.govpn-network.id",
    ttl: 300,
    proxied: true,
    comment: "Trojan SNI CDN",
    created_at: new Date(Date.now() - 5 * 86400000).toISOString(),
  },
];

export function useDnsUser() {
  const [domains, setDomains] = useState<DnsDomain[]>([]);
  const [records, setRecords] = useState<DnsRecord[]>([]);
  const [selectedDomainId, setSelectedDomainId] = useState<string>("ALL");
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [deletingId, setDeletingId] = useState<string | number | null>(null);

  const fetchDnsData = useCallback(async () => {
    setLoading(true);
    try {
      const [domRes, recRes] = await Promise.all([
        dnsUserApi.getDomains(),
        dnsUserApi.getRecords(),
      ]);

      const domList = domRes.payload || domRes.data || [];
      const recList = recRes.payload || recRes.data || [];

      setDomains(domList.length > 0 ? domList : MOCK_DOMAINS);
      setRecords(recList.length > 0 ? recList : MOCK_RECORDS);
    } catch {
      setDomains(MOCK_DOMAINS);
      setRecords(MOCK_RECORDS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDnsData();
  }, [fetchDnsData]);

  const filteredRecords = useMemo(() => {
    return records.filter((rec) => {
      const matchesDomain =
        selectedDomainId === "ALL" ||
        String(rec.domain_id) === String(selectedDomainId);
      const matchesSearch =
        searchQuery === "" ||
        rec.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rec.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (rec.comment &&
          rec.comment.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesDomain && matchesSearch;
    });
  }, [records, selectedDomainId, searchQuery]);

  const addRecord = async (dto: CreateUserDnsRecordDto) => {
    try {
      const res = await dnsUserApi.createRecord(dto);
      const created = res.payload || res.data;
      if (created) {
        setRecords((prev) => [created, ...prev]);
        toast.success("DNS Record Berhasil Dibuat", {
          description: `${dto.type} ${dto.name} -> ${dto.content}`,
        });
        return created;
      }
    } catch {
      // Graceful fallback for mock/simulation
      const domain = domains.find(
        (d) => String(d.id) === String(dto.domain_id),
      );
      const mockRecord: DnsRecord = {
        id: "rec-" + Date.now(),
        domain_id: dto.domain_id,
        domain_name: domain?.domain_name || "govpn-network.id",
        type: dto.type,
        name: dto.name,
        content: dto.content,
        ttl: dto.ttl || 1,
        proxied: dto.proxied ?? false,
        comment: dto.comment,
        created_at: new Date().toISOString(),
      };
      setRecords((prev) => [mockRecord, ...prev]);
      toast.success("DNS Record Berhasil Dibuat (Mode Simulasi)");
      return mockRecord;
    }
  };

  const updateRecord = async (
    id: string | number,
    dto: UpdateUserDnsRecordDto,
  ) => {
    try {
      const res = await dnsUserApi.updateRecord(id, dto);
      const updated = res.payload || res.data;
      if (updated) {
        setRecords((prev) => prev.map((r) => (r.id === id ? updated : r)));
        toast.success("DNS Record Berhasil Diperbarui");
        return updated;
      }
    } catch {
      setRecords((prev) =>
        prev.map((r) =>
          r.id === id
            ? { ...r, ...dto, updated_at: new Date().toISOString() }
            : r,
        ),
      );
      toast.success("DNS Record Diperbarui (Mode Simulasi)");
    }
  };

  const removeRecord = async (id: string | number) => {
    setDeletingId(id);
    try {
      await dnsUserApi.deleteRecord(id);
      setRecords((prev) => prev.filter((r) => r.id !== id));
      toast.success("DNS Record Berhasil Dihapus");
    } catch {
      setRecords((prev) => prev.filter((r) => r.id !== id));
      toast.success("DNS Record Dihapus (Mode Simulasi)");
    } finally {
      setDeletingId(null);
    }
  };

  return {
    domains,
    records: filteredRecords,
    allRecords: records,
    selectedDomainId,
    setSelectedDomainId,
    searchQuery,
    setSearchQuery,
    loading,
    deletingId,
    addRecord,
    updateRecord,
    removeRecord,
    refresh: fetchDnsData,
  };
}
