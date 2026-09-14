import { apiGet, apiPost, apiDelete } from "@/lib/api/http-client";
import {
  VpnAccount,
  ServerNode,
  CreateVpnAccountDto,
  VpnProtocol,
} from "../types/vpn.types";

export async function fetchVpnAccountsApi(
  protocol?: VpnProtocol | string,
): Promise<VpnAccount[]> {
  try {
    const res = await apiGet<VpnAccount[]>("/api/vpn-accounts-month", {
      params: protocol ? { protocol } : undefined,
    });
    return res.payload || (res.data as VpnAccount[]) || [];
  } catch {
    return [];
  }
}

export async function fetchServerNodesApi(
  protocol?: string,
): Promise<ServerNode[]> {
  try {
    const res = await apiGet<ServerNode[]>("/api/vpn-servers-month", {
      params: protocol ? { protocol } : undefined,
    });
    return res.payload || (res.data as ServerNode[]) || [];
  } catch {
    return [];
  }
}

export async function createVpnAccountApi(
  dto: CreateVpnAccountDto,
): Promise<VpnAccount> {
  const res = await apiPost<VpnAccount>("/api/vpn-accounts-month", dto, {
    idempotencyKey: `vpn-order-${Date.now()}`,
  });
  if (!res.payload && res.data) {
    return res.data as VpnAccount;
  }
  return res.payload as VpnAccount;
}

export async function createFreeVpnAccountApi(
  serverId: number,
  username: string,
  password: string,
): Promise<VpnAccount> {
  const res = await apiPost<VpnAccount>("/api/account-free", {
    server_id: serverId,
    username,
    password,
  });
  if (!res.payload && res.data) {
    return res.data as VpnAccount;
  }
  return res.payload as VpnAccount;
}

export async function renewVpnAccountApi(
  accountId: number | string,
  durationDays: number = 30,
): Promise<VpnAccount> {
  const res = await apiPost<VpnAccount>("/api/renew", {
    account_id: accountId,
    days: durationDays,
  });
  return res.payload || (res.data as VpnAccount);
}

export async function deleteVpnAccountApi(
  accountId: number | string,
): Promise<void> {
  await apiDelete(`/api/vpn-accounts-month/${accountId}`);
}
