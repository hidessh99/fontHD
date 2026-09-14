// ==============================================================================
// GoVPN VPN User Hook (Pola C: hooks/useVpnUser.ts)
// Powered by Algorithm 3: Optimistic Mutation & Centralized Zustand Store
// ==============================================================================

"use client";

import { useEffect, useMemo } from "react";
import { useVpnUserStore } from "../store/vpn-user.store";
import { vpnUserApi } from "../api/user.api";
import { toast } from "sonner";

export function useVpnUser(protocol?: string) {
  const accounts = useVpnUserStore((s) => s.accounts);
  const servers = useVpnUserStore((s) => s.servers);
  const isLoading = useVpnUserStore((s) => s.isLoading);
  const error = useVpnUserStore((s) => s.error);
  const fetchUserAccounts = useVpnUserStore((s) => s.fetchUserAccounts);
  const fetchUserServers = useVpnUserStore((s) => s.fetchUserServers);

  useEffect(() => {
    fetchUserAccounts();
    fetchUserServers(protocol);
  }, [fetchUserAccounts, fetchUserServers, protocol]);

  // Filter accounts by protocol if specified
  const filteredAccounts = useMemo(() => {
    if (!protocol) return accounts;
    const p = protocol.toLowerCase();
    return accounts.filter((acc) => acc.protocol.toLowerCase() === p);
  }, [accounts, protocol]);

  const deleteAccount = async (accountId: number | string) => {
    try {
      await vpnUserApi.deleteMonthAccount(accountId);
      toast.success("Akun VPN berhasil dihapus.");
      fetchUserAccounts();
      return true;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal menghapus akun.";
      toast.error(msg);
      return false;
    }
  };

  return {
    accounts: filteredAccounts,
    allAccounts: accounts,
    servers,
    isLoading,
    error,
    refresh: fetchUserAccounts,
    deleteAccount,
  };
}
