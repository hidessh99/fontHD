// ==============================================================================
// GoVPN VPN Accounts Hook (Backward-compatible adapter to Pola C vpnUserApi)
// ==============================================================================

"use client";

import { useState, useEffect, useCallback } from "react";
import { VpnAccount, VpnProtocol } from "../types/vpn.types";
import { CreateVpnAccountDto } from "../types/user.types";
import { vpnUserApi } from "../api/user.api";
import { toast } from "sonner";

export function useVpnAccounts(initialProtocol?: VpnProtocol | string) {
  const [accounts, setAccounts] = useState<VpnAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMutating, setIsMutating] = useState(false);

  const loadAccounts = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await vpnUserApi.getMonthAccounts();
      const accList = res.payload || [];
      if (initialProtocol) {
        const p = initialProtocol.toLowerCase();
        setAccounts(accList.filter((a) => a.protocol.toLowerCase() === p));
      } else {
        setAccounts(accList);
      }
    } catch {
      toast.error("Gagal memuat daftar akun VPN");
    } finally {
      setIsLoading(false);
    }
  }, [initialProtocol]);

  useEffect(() => {
    loadAccounts();
  }, [loadAccounts]);

  const createAccount = async (dto: CreateVpnAccountDto): Promise<VpnAccount | null> => {
    setIsMutating(true);
    try {
      const res = await vpnUserApi.createMonthAccount(dto);
      if (res.payload) {
        toast.success(`Akun ${dto.protocol.toUpperCase()} berhasil dibuat!`);
        setAccounts((prev) => [res.payload!, ...prev]);
        return res.payload;
      }
      return null;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal membuat akun VPN";
      toast.error(msg);
      return null;
    } finally {
      setIsMutating(false);
    }
  };

  const renewAccount = async (accountId: number | string, days: number = 30): Promise<boolean> => {
    setIsMutating(true);
    try {
      const res = await vpnUserApi.renewMonthAccount(accountId, { account_id: accountId, duration_days: days });
      if (res.payload) {
        toast.success("Akun VPN berhasil diperpanjang!");
        setAccounts((prev) =>
          prev.map((acc) => (acc.id === accountId ? { ...acc, expired_at: res.payload!.expired_at } : acc)),
        );
        return true;
      }
      return false;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal memperpanjang akun";
      toast.error(msg);
      return false;
    } finally {
      setIsMutating(false);
    }
  };

  const deleteAccount = async (accountId: number | string): Promise<boolean> => {
    try {
      await vpnUserApi.deleteMonthAccount(accountId);
      toast.success("Akun VPN berhasil dihapus.");
      setAccounts((prev) => prev.filter((acc) => acc.id !== accountId));
      return true;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal menghapus akun";
      toast.error(msg);
      return false;
    }
  };

  return {
    accounts,
    isLoading,
    isMutating,
    refresh: loadAccounts,
    createAccount,
    renewAccount,
    deleteAccount,
  };
}
