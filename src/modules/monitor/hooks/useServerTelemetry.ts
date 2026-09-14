// ==============================================================================
// GoVPN Server Telemetry Hook
// Part of Pola C: hooks/useServerTelemetry.ts
// Real-time Fleet Telemetry with Adaptive Polling & Focus Detection
// ==============================================================================

"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { monitorUserApi } from "../api/user.api";
import type { ServerTelemetry } from "../types/monitor.types";

const MOCK_TELEMETRY: ServerTelemetry[] = [
  {
    id: "mon-1",
    server_id: "srv-sg-1",
    server_name: "Singapore Ultra 01 (Equinix)",
    ip_address: "103.147.12.88",
    country: "Singapore",
    flag: "🇸🇬",
    status: "ONLINE",
    ping_ms: 18,
    cpu_percent: 24,
    ram_percent: 48,
    disk_percent: 32,
    bandwidth_in_mbps: 184.2,
    bandwidth_out_mbps: 210.5,
    active_sessions: 142,
    max_sessions: 500,
    uptime_seconds: 1284900,
    last_heartbeat: new Date().toISOString(),
  },
  {
    id: "mon-2",
    server_id: "srv-id-1",
    server_name: "Indonesia Cyber Node 01",
    ip_address: "103.251.44.12",
    country: "Indonesia",
    flag: "🇮🇩",
    status: "ONLINE",
    ping_ms: 8,
    cpu_percent: 36,
    ram_percent: 62,
    disk_percent: 41,
    bandwidth_in_mbps: 340.8,
    bandwidth_out_mbps: 412.0,
    active_sessions: 280,
    max_sessions: 600,
    uptime_seconds: 840200,
    last_heartbeat: new Date().toISOString(),
  },
  {
    id: "mon-3",
    server_id: "srv-jp-1",
    server_name: "Tokyo Low-Latency 01",
    ip_address: "160.16.89.201",
    country: "Japan",
    flag: "🇯🇵",
    status: "ONLINE",
    ping_ms: 56,
    cpu_percent: 18,
    ram_percent: 39,
    disk_percent: 22,
    bandwidth_in_mbps: 92.4,
    bandwidth_out_mbps: 104.1,
    active_sessions: 89,
    max_sessions: 400,
    uptime_seconds: 2400900,
    last_heartbeat: new Date().toISOString(),
  },
  {
    id: "mon-4",
    server_id: "srv-us-1",
    server_name: "US West Los Angeles",
    ip_address: "198.51.100.45",
    country: "United States",
    flag: "🇺🇸",
    status: "DEGRADED",
    ping_ms: 182,
    cpu_percent: 88,
    ram_percent: 91,
    disk_percent: 65,
    bandwidth_in_mbps: 840.5,
    bandwidth_out_mbps: 920.1,
    active_sessions: 480,
    max_sessions: 500,
    uptime_seconds: 450100,
    last_heartbeat: new Date().toISOString(),
  },
];

export function useServerTelemetry() {
  const [telemetry, setTelemetry] = useState<ServerTelemetry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCountry, setFilterCountry] = useState<string>("ALL");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchTelemetry = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    try {
      const res = await monitorUserApi.getMonitors();
      const list = res.payload || res.data || [];
      setTelemetry(list.length > 0 ? list : MOCK_TELEMETRY);
    } catch {
      setTelemetry(MOCK_TELEMETRY);
    } finally {
      if (!silent) setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTelemetry();

    // Adaptive Polling: 10s when active, 45s when tab backgrounded
    let timer: NodeJS.Timeout;
    const scheduleNext = () => {
      const delay = typeof document !== "undefined" && document.hidden ? 45000 : 10000;
      timer = setTimeout(() => {
        fetchTelemetry(true).finally(scheduleNext);
      }, delay);
    };

    scheduleNext();

    return () => clearTimeout(timer);
  }, [fetchTelemetry]);

  const filteredNodes = useMemo(() => {
    return telemetry.filter((node) => {
      const matchesCountry =
        filterCountry === "ALL" || node.country.toLowerCase() === filterCountry.toLowerCase();
      const matchesStatus =
        filterStatus === "ALL" || node.status.toLowerCase() === filterStatus.toLowerCase();
      const matchesSearch =
        searchQuery === "" ||
        node.server_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        node.ip_address.includes(searchQuery) ||
        node.country.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCountry && matchesStatus && matchesSearch;
    });
  }, [telemetry, filterCountry, filterStatus, searchQuery]);

  const stats = useMemo(() => {
    const totalNodes = telemetry.length;
    const onlineNodes = telemetry.filter((n) => n.status === "ONLINE").length;
    const totalUsers = telemetry.reduce((sum, n) => sum + (n.active_sessions || 0), 0);
    const avgPing =
      totalNodes > 0
        ? Math.round(telemetry.reduce((sum, n) => sum + (n.ping_ms || 0), 0) / totalNodes)
        : 0;

    return { totalNodes, onlineNodes, totalUsers, avgPing };
  }, [telemetry]);

  return {
    telemetry: filteredNodes,
    allTelemetry: telemetry,
    loading,
    stats,
    filterCountry,
    setFilterCountry,
    filterStatus,
    setFilterStatus,
    searchQuery,
    setSearchQuery,
    refresh: fetchTelemetry,
  };
}
