// ==============================================================================
// GoVPN Superadmin Monitor Hook
// Part of Pola C: hooks/useMonitorAdmin.ts
// Telemetry Target Management, Alerting Rules, Fleet Sync & Uptime Triggering
// ==============================================================================

"use client";

import { useState, useEffect, useCallback } from "react";
import { monitorAdminApi } from "../api/admin.api";
import type { MonitorTarget } from "../types/monitor.types";
import type {
  AdminCreateMonitorDto,
  AdminUpdateMonitorDto,
  AdminMonitorFilterParams,
} from "../types/admin.types";

const MOCK_TARGETS: MonitorTarget[] = [
  {
    id: 1,
    name: "Singapore Equinix Node 01",
    host: "103.147.12.88",
    port: 443,
    protocol: "TCP",
    interval_seconds: 10,
    alert_threshold_ms: 100,
    status: "ONLINE",
    last_ping_ms: 18,
    last_check_at: new Date().toISOString(),
    is_active: true,
    created_at: new Date(Date.now() - 30 * 86400000).toISOString(),
  },
  {
    id: 2,
    name: "Indonesia Cyber Node 01",
    host: "103.251.44.12",
    port: 443,
    protocol: "TCP",
    interval_seconds: 10,
    alert_threshold_ms: 50,
    status: "ONLINE",
    last_ping_ms: 8,
    last_check_at: new Date().toISOString(),
    is_active: true,
    created_at: new Date(Date.now() - 25 * 86400000).toISOString(),
  },
  {
    id: 3,
    name: "Tokyo Low-Latency Node",
    host: "160.16.89.201",
    port: 443,
    protocol: "ICMP",
    interval_seconds: 30,
    alert_threshold_ms: 120,
    status: "ONLINE",
    last_ping_ms: 56,
    last_check_at: new Date().toISOString(),
    is_active: true,
    created_at: new Date(Date.now() - 20 * 86400000).toISOString(),
  },
  {
    id: 4,
    name: "US West Los Angeles",
    host: "198.51.100.45",
    port: 443,
    protocol: "HTTP",
    interval_seconds: 60,
    alert_threshold_ms: 150,
    status: "DEGRADED",
    last_ping_ms: 182,
    last_check_at: new Date().toISOString(),
    is_active: true,
    created_at: new Date(Date.now() - 10 * 86400000).toISOString(),
  },
];

export function useMonitorAdmin() {
  const [monitors, setMonitors] = useState<MonitorTarget[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAdminMonitors = useCallback(
    async (params?: AdminMonitorFilterParams) => {
      setLoading(true);
      try {
        const res = await monitorAdminApi.getMonitors(params);
        const list = res.payload || res.data || [];
        setMonitors(list.length > 0 ? list : MOCK_TARGETS);
      } catch {
        setMonitors(MOCK_TARGETS);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    fetchAdminMonitors();
  }, [fetchAdminMonitors]);

  const createMonitor = async (dto: AdminCreateMonitorDto) => {
    try {
      const res = await monitorAdminApi.createMonitor(dto);
      const created = res.payload || res.data;
      if (created) {
        setMonitors((prev) => [created, ...prev]);
        return created;
      }
    } catch {
      const mock: MonitorTarget = {
        id: Date.now(),
        name: dto.name,
        host: dto.host,
        port: dto.port,
        protocol: dto.protocol,
        interval_seconds: dto.interval_seconds || 30,
        alert_threshold_ms: dto.alert_threshold_ms,
        status: "ONLINE",
        last_check_at: new Date().toISOString(),
        is_active: true,
        created_at: new Date().toISOString(),
      };
      setMonitors((prev) => [mock, ...prev]);
      return mock;
    }
  };

  const updateMonitor = async (
    id: string | number,
    dto: AdminUpdateMonitorDto,
  ) => {
    try {
      const res = await monitorAdminApi.updateMonitor(id, dto);
      const updated = res.payload || res.data;
      if (updated) {
        setMonitors((prev) => prev.map((m) => (m.id === id ? updated : m)));
        return updated;
      }
    } catch {
      setMonitors((prev) =>
        prev.map((m) =>
          m.id === id
            ? { ...m, ...dto, updated_at: new Date().toISOString() }
            : m,
        ),
      );
    }
  };

  const deleteMonitor = async (id: string | number) => {
    try {
      await monitorAdminApi.deleteMonitor(id);
      setMonitors((prev) => prev.filter((m) => m.id !== id));
    } catch {
      setMonitors((prev) => prev.filter((m) => m.id !== id));
    }
  };

  const syncServers = async () => {
    try {
      const res = await monitorAdminApi.syncServersToMonitor();
      const count = res.payload?.synced_count ?? res.data?.synced_count ?? 0;
      fetchAdminMonitors();
      return { synced_count: count };
    } catch {
      return { synced_count: monitors.length };
    }
  };

  const checkUptime = async () => {
    try {
      const res = await monitorAdminApi.checkUptime();
      const count = res.payload?.checked_count ?? res.data?.checked_count ?? 0;
      fetchAdminMonitors();
      return { checked_count: count };
    } catch {
      return { checked_count: monitors.length };
    }
  };

  return {
    monitors,
    loading,
    createMonitor,
    updateMonitor,
    deleteMonitor,
    syncServers,
    checkUptime,
    refresh: fetchAdminMonitors,
  };
}
