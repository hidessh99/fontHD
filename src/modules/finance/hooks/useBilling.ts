// ==============================================================================
// GoVPN Finance Legacy Adapter Hook
// Part of Pola C: hooks/useBilling.ts
// Bridges backward compatibility to useFinanceUser
// ==============================================================================

"use client";

import { useFinanceUser } from "./useFinanceUser";

export function useBilling() {
  const finance = useFinanceUser();

  return {
    ...finance,
    pollingActive: finance.isPollingActive,
  };
}
