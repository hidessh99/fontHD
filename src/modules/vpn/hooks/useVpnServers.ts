// ==============================================================================
// GoVPN VPN Servers Hook (Backward-compatible adapter to Pola C vpnUserApi)
// ==============================================================================

"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { ServerNode } from "../types/vpn.types";
import { vpnUserApi } from "../api/user.api";
import { toast } from "sonner";

export function useVpnServers(protocolFilter?: string) {
  const [servers, setServers] = useState<ServerNode[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("ALL");

  const loadServers = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await vpnUserApi.getMonthServersAvailable({
        protocol: protocolFilter,
      });
      setServers(res.payload || []);
    } catch {
      toast.error("Gagal memuat daftar server node");
    } finally {
      setIsLoading(false);
    }
  }, [protocolFilter]);

  useEffect(() => {
    loadServers();
  }, [loadServers]);

  const availableCountries = useMemo(() => {
    const set = new Set<string>();
    servers.forEach((s) => {
      if (s.country_code) set.add(s.country_code);
    });
    return Array.from(set);
  }, [servers]);

  const filteredServers = useMemo(() => {
    return servers.filter((s) => {
      const matchSearch =
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.ip.includes(searchQuery);
      const matchCountry =
        selectedCountry === "ALL" || s.country_code === selectedCountry;
      return matchSearch && matchCountry;
    });
  }, [servers, searchQuery, selectedCountry]);

  return {
    servers: filteredServers,
    allServers: servers,
    isLoading,
    searchQuery,
    setSearchQuery,
    selectedCountry,
    setSelectedCountry,
    availableCountries,
    refresh: loadServers,
  };
}
