// ==============================================================================
// GoVPN VPN Admin Hook (Pola C: hooks/useVpnAdmin.ts)
// Superadmin Fleet Oversight & Billing Trigger Execution
// ==============================================================================

"use client";

import { useState, useCallback } from "react";
import { vpnAdminApi } from "../api/admin.api";
import { toast } from "sonner";
import { TriggerPayasBillingResponse } from "../types/admin.types";

export function useVpnAdmin() {
  const [isBilling, setIsBilling] = useState(false);

  const triggerHourlyBilling = useCallback(async (): Promise<TriggerPayasBillingResponse | null> => {
    setIsBilling(true);
    try {
      const res = await vpnAdminApi.triggerPayasBilling();
      if (res.payload) {
        toast.success(`Billing berhasil diproses: Rp ${res.payload.total_billed_amount.toLocaleString()}`);
        return res.payload;
      }
      return null;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal mengeksekusi billing.";
      toast.error(msg);
      return null;
    } finally {
      setIsBilling(false);
    }
  }, []);

  return {
    isBilling,
    triggerHourlyBilling,
  };
}
