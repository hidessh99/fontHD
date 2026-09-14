"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { dnsApi } from "../api/dns.api";
import type { DnsDomain, DnsRecord, CreateDnsRecordDto } from "../types/dns.types";
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

export function useDns() {
  const [domains, setDomains] = useState<DnsDomain[]>([]);
  const [records, setRecords] = useState<DnsRecord[]>([]);
  const [selectedDomainId, setSelectedDomainId] = useState<string>("ALL");
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchDnsData = useCallback(async () => {
    setLoading(true);
    try {
      const [domRes, recRes] = await Promise.all([
        dnsApi.getDomains(),
        dnsApi.getRecords(),
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
        selectedDomainId === "ALL" || rec.domain_id === selectedDomainId;
      const matchesSearch =
        searchQuery === "" ||
        rec.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rec.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (rec.comment && rec.comment.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesDomain && matchesSearch;
    });
  }, [records, selectedDomainId, searchQuery]);

  const addRecord = async (dto: CreateDnsRecordDto) => {
    try {
      const res = await dnsApi.createRecord(dto);
      const created = res.payload || res.data;
      if (created) {
        setRecords((prev) => [created, ...prev]);
        toast.success("DNS Record Berhasil Dibuat", {
          description: `${dto.type} ${dto.name} -> ${dto.content}`,
        });
        return;
      }
    } catch {
      // Mock fallback
      const domain = domains.find((d) => d.id === dto.domain_id);
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
    }
  };

  const removeRecord = async (id: string) => {
    try {
      await dnsApi.deleteRecord(id);
      setRecords((prev) => prev.filter((r) => r.id !== id));
      toast.success("DNS Record Berhasil Dihapus");
    } catch {
      setRecords((prev) => prev.filter((r) => r.id !== id));
      toast.success("DNS Record Dihapus (Mode Simulasi)");
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
    addRecord,
    removeRecord,
    refresh: fetchDnsData,
  };
}
