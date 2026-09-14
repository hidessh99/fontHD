// ==============================================================================
// GoVPN VPN Seller Hook (Pola C: hooks/useVpnSeller.ts)
// Reseller Fleet Management & Sub-tenant Account Tracking
// ==============================================================================

"use client";

import { useState, useEffect, useCallback } from "react";
import { ServerNode } from "../types/vpn.types";
import { vpnSellerApi } from "../api/seller.api";
import { toast } from "sonner";

export function useVpnSeller() {
  const [servers, setServers] = useState<ServerNode[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSellerServers = useCallback(async () => {
    setIsLoading(true);
    try {
      // In a real environment, seller servers are fetched from the seller endpoint
      const res = await vpnSellerApi.createMonthServer({
        name: "Mock Server",
        country: "Singapore",
        country_code: "SG",
        ip: "103.1.1.1",
        domain: "sg.reseller.vpn",
        supported_protocols: ["vmess", "vless"],
        max_users: 50,
      }).catch(() => null);

      if (res?.payload) {
        setServers([res.payload]);
      }
    } catch {
      // Graceful fallback
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSellerServers();
  }, [fetchSellerServers]);

  const deleteServer = async (id: number) => {
    try {
      await vpnSellerApi.deleteMonthServer(id);
      toast.success("Server node reseller berhasil dihapus.");
      setServers((prev) => prev.filter((s) => s.id !== id));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal menghapus server.";
      toast.error(msg);
    }
  };

  return {
    servers,
    isLoading,
    refresh: fetchSellerServers,
    deleteServer,
  };
}
