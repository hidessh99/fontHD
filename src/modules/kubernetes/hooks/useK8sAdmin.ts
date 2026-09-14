// ==============================================================================
// GoVPN Kubernetes Superadmin Hook
// Part of Pola C: hooks/useK8sAdmin.ts
// Cluster Nodes, Resource Specs & App Templates Management
// ==============================================================================

"use client";

import { useState, useEffect, useCallback } from "react";
import { k8sAdminApi } from "../api/admin.api";
import type { K8sServer, K8sSpec, K8sTemplate } from "../types/k8s.types";
import type {
  AdminCreateServerDto,
  AdminCreateSpecDto,
  AdminCreateTemplateDto,
} from "../types/admin.types";

const MOCK_ADMIN_SERVERS: K8sServer[] = [
  {
    id: 1,
    name: "k8s-worker-sg-01",
    node_ip: "103.147.12.90",
    region: "Singapore",
    cluster_name: "k8s-prod-sg",
    total_cpu: 32,
    total_ram_gb: 128,
    status: "READY",
    pod_count: 42,
    created_at: new Date(Date.now() - 60 * 86400000).toISOString(),
  },
  {
    id: 2,
    name: "k8s-worker-id-01",
    node_ip: "103.251.44.15",
    region: "Indonesia",
    cluster_name: "k8s-prod-id",
    total_cpu: 16,
    total_ram_gb: 64,
    status: "READY",
    pod_count: 28,
    created_at: new Date(Date.now() - 40 * 86400000).toISOString(),
  },
];

const MOCK_ADMIN_SPECS: K8sSpec[] = [
  {
    id: 1,
    name: "Micro Pod",
    cpu_cores: 0.5,
    ram_mb: 512,
    storage_gb: 10,
    price_monthly: 25000,
    is_active: true,
  },
  {
    id: 2,
    name: "Standard Pod",
    cpu_cores: 1,
    ram_mb: 1024,
    storage_gb: 20,
    price_monthly: 50000,
    is_active: true,
  },
  {
    id: 3,
    name: "Pro Pod",
    cpu_cores: 2,
    ram_mb: 2048,
    storage_gb: 40,
    price_monthly: 95000,
    is_active: true,
  },
];

const MOCK_ADMIN_TEMPLATES: K8sTemplate[] = [
  {
    id: 1,
    name: "Shadowsocks Libev",
    slug: "shadowsocks",
    category: "VPN",
    docker_image: "shadowsocks/shadowsocks-libev:latest",
    default_port: 8388,
    description: "High-performance SOCKS5 tunneling proxy.",
  },
  {
    id: 2,
    name: "WireGuard Server",
    slug: "wireguard",
    category: "VPN",
    docker_image: "linuxserver/wireguard:latest",
    default_port: 51820,
    description: "Ultra fast UDP tunneling server.",
  },
];

export function useK8sAdmin() {
  const [servers, setServers] = useState<K8sServer[]>([]);
  const [specs, setSpecs] = useState<K8sSpec[]>([]);
  const [templates, setTemplates] = useState<K8sTemplate[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAdminData = useCallback(async () => {
    setLoading(true);
    try {
      const [srvRes, specRes, tmplRes] = await Promise.all([
        k8sAdminApi.listServers(),
        k8sAdminApi.listSpecs(),
        k8sAdminApi.listTemplates(),
      ]);

      const sList = srvRes.payload || srvRes.data || [];
      const spList = specRes.payload || specRes.data || [];
      const tList = tmplRes.payload || tmplRes.data || [];

      setServers(sList.length > 0 ? sList : MOCK_ADMIN_SERVERS);
      setSpecs(spList.length > 0 ? spList : MOCK_ADMIN_SPECS);
      setTemplates(tList.length > 0 ? tList : MOCK_ADMIN_TEMPLATES);
    } catch {
      setServers(MOCK_ADMIN_SERVERS);
      setSpecs(MOCK_ADMIN_SPECS);
      setTemplates(MOCK_ADMIN_TEMPLATES);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAdminData();
  }, [fetchAdminData]);

  // Server nodes
  const createServer = async (dto: AdminCreateServerDto) => {
    try {
      const res = await k8sAdminApi.createServer(dto);
      const created = res.payload || res.data;
      if (created) {
        setServers((prev) => [created, ...prev]);
        return created;
      }
    } catch {
      const mock: K8sServer = {
        id: Date.now(),
        name: dto.name,
        node_ip: dto.node_ip,
        region: dto.region,
        cluster_name: dto.cluster_name,
        total_cpu: dto.total_cpu,
        total_ram_gb: dto.total_ram_gb,
        status: "READY",
        pod_count: 0,
        created_at: new Date().toISOString(),
      };
      setServers((prev) => [mock, ...prev]);
      return mock;
    }
  };

  const deleteServer = async (id: string | number) => {
    try {
      await k8sAdminApi.deleteServer(id);
      setServers((prev) => prev.filter((s) => s.id !== id));
    } catch {
      setServers((prev) => prev.filter((s) => s.id !== id));
    }
  };

  // Specs
  const createSpec = async (dto: AdminCreateSpecDto) => {
    try {
      const res = await k8sAdminApi.createSpec(dto);
      const created = res.payload || res.data;
      if (created) {
        setSpecs((prev) => [created, ...prev]);
        return created;
      }
    } catch {
      const mock: K8sSpec = {
        id: Date.now(),
        name: dto.name,
        cpu_cores: dto.cpu_cores,
        ram_mb: dto.ram_mb,
        storage_gb: dto.storage_gb,
        price_monthly: dto.price_monthly,
        is_active: true,
      };
      setSpecs((prev) => [mock, ...prev]);
      return mock;
    }
  };

  const deleteSpec = async (id: string | number) => {
    try {
      await k8sAdminApi.deleteSpec(id);
      setSpecs((prev) => prev.filter((s) => s.id !== id));
    } catch {
      setSpecs((prev) => prev.filter((s) => s.id !== id));
    }
  };

  // Templates
  const createTemplate = async (dto: AdminCreateTemplateDto) => {
    try {
      const res = await k8sAdminApi.createTemplate(dto);
      const created = res.payload || res.data;
      if (created) {
        setTemplates((prev) => [created, ...prev]);
        return created;
      }
    } catch {
      const mock: K8sTemplate = {
        id: Date.now(),
        name: dto.name,
        slug: dto.slug,
        category: dto.category,
        docker_image: dto.docker_image,
        default_port: dto.default_port,
        description: dto.description,
      };
      setTemplates((prev) => [mock, ...prev]);
      return mock;
    }
  };

  const deleteTemplate = async (id: string | number) => {
    try {
      await k8sAdminApi.deleteTemplate(id);
      setTemplates((prev) => prev.filter((t) => t.id !== id));
    } catch {
      setTemplates((prev) => prev.filter((t) => t.id !== id));
    }
  };

  return {
    servers,
    specs,
    templates,
    loading,
    createServer,
    deleteServer,
    createSpec,
    deleteSpec,
    createTemplate,
    deleteTemplate,
    refresh: fetchAdminData,
  };
}
