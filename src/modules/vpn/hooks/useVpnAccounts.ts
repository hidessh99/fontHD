"use client";

import { useState, useEffect, useCallback } from "react";
import { VpnAccount, CreateVpnAccountDto, VpnProtocol } from "../types/vpn.types";
import {
  fetchVpnAccountsApi,
  createVpnAccountApi,
  renewVpnAccountApi,
  deleteVpnAccountApi,
} from "../api/vpn.api";
import { toast } from "sonner";

export function useVpnAccounts(initialProtocol?: VpnProtocol | string) {
  const [accounts, setAccounts] = useState<VpnAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMutating, setIsMutating] = useState(false);

  const loadAccounts = useCallback(async (proto?: string) => {
    setIsLoading(true);
    try {
      const data = await fetchVpnAccountsApi(proto || initialProtocol);
      setAccounts(data);
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
      const newAcc = await createVpnAccountApi(dto);
      toast.success(`Akun ${dto.protocol.toUpperCase()} berhasil dibuat!`);
      setAccounts((prev) => [newAcc, ...prev]);
      return newAcc;
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
      const updated = await renewVpnAccountApi(accountId, days);
      toast.success("Akun VPN berhasil diperpanjang!");
      setAccounts((prev) =>
        prev.map((acc) => (acc.id === accountId ? { ...acc, expired_at: updated.expired_at } : acc)),
      );
      return true;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal memperpanjang akun";
      toast.error(msg);
      return false;
    } finally {
      setIsMutating(false);
    }
  };

  const deleteAccount = async (accountId: number | string): Promise<boolean> => {
    setIsMutating(true);
    try {
      await deleteVpnAccountApi(accountId);
      toast.success("Akun VPN berhasil dihapus");
      setAccounts((prev) => prev.filter((acc) => acc.id !== accountId));
      return true;
    } catch {
      toast.error("Gagal menghapus akun VPN");
      return false;
    } finally {
      setIsMutating(false);
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
