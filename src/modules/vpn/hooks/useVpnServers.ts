"use client";

import { useState, useEffect, useCallback } from "react";
import { ServerNode } from "../types/vpn.types";
import { fetchServerNodesApi } from "../api/vpn.api";
import { toast } from "sonner";

export function useVpnServers(protocolFilter?: string) {
  const [servers, setServers] = useState<ServerNode[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string>("ALL");

  const loadServers = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchServerNodesApi(protocolFilter);
      setServers(data);
    } catch {
      toast.error("Gagal memuat daftar server");
    } finally {
      setIsLoading(false);
    }
  }, [protocolFilter]);

  useEffect(() => {
    loadServers();
  }, [loadServers]);

  const filteredServers = servers.filter((server) => {
    const matchesSearch =
      server.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      server.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      server.domain.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCountry =
      selectedCountry === "ALL" ||
      server.country_code.toUpperCase() === selectedCountry.toUpperCase();

    return matchesSearch && matchesCountry;
  });

  const availableCountries = Array.from(
    new Set(servers.map((s) => s.country_code).filter(Boolean)),
  );

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
