// ==============================================================================
// GoVPN Content Admin Hook
// Part of Pola C: hooks/useContentAdmin.ts
// ==============================================================================

"use client";

import { useState, useEffect, useCallback } from "react";
import { contentAdminApi } from "../api/admin.api";
import { Post, SystemSetting, PostStatus } from "../types/content.types";
import {
  CreatePostDto,
  UpdatePostDto,
  CreateSettingDto,
  UpdateSettingDto,
} from "../types/admin.types";

const MOCK_ADMIN_POSTS: Post[] = [
  {
    id: 1,
    title: "Panduan Lengkap Bypass DPI ISP Indonesia dengan Protokol V2Ray & Trojan",
    slug: "panduan-lengkap-bypass-dpi-v2ray-trojan",
    summary: "Pelajari bagaimana arsitektur enkripsi TLS dan gRPC GoVPN mampu menembus pemblokiran.",
    content: "Konten lengkap panduan...",
    status: "PUBLISHED",
    tags: ["TUTORIAL", "V2RAY", "DPI_BYPASS"],
    views_count: 1420,
    published_at: new Date(Date.now() - 5 * 86400000).toISOString(),
    created_at: new Date(Date.now() - 5 * 86400000).toISOString(),
  },
  {
    id: 2,
    title: "Jadwal Rencana Pemeliharaan Jaringan Q4 2026",
    slug: "jadwal-rencana-pemeliharaan-jaringan-q4-2026",
    summary: "Jadwal upgrade server edge 10 Gbps di node Tokyo dan Singapore.",
    content: "Konten jadwal pemeliharaan...",
    status: "DRAFT",
    tags: ["MAINTENANCE", "ANNOUNCEMENT"],
    views_count: 0,
    created_at: new Date().toISOString(),
  },
];

const MOCK_ADMIN_SETTINGS: SystemSetting[] = [
  {
    id: 1,
    key: "APP_NAME",
    value: "GoVPN Institutional",
    description: "Nama brand resmi aplikasi di header dan metadata",
    group: "BRANDING",
    is_public: true,
  },
  {
    id: 2,
    key: "SUPPORT_TELEGRAM",
    value: "@govpn_official_bot",
    description: "Handle bot resmi telegram untuk automated alert",
    group: "GENERAL",
    is_public: true,
  },
  {
    id: 3,
    key: "QRIS_FEE_PERCENTAGE",
    value: "0.7",
    description: "MDR charge untuk gateway QRIS deposit",
    group: "PAYMENT",
    is_public: false,
  },
  {
    id: 4,
    key: "MAX_FAILED_LOGIN_ATTEMPTS",
    value: "5",
    description: "Batas percobaan login sebelum akun terkunci selama 30 menit",
    group: "SECURITY",
    is_public: false,
  },
];

export function useContentAdmin() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [settings, setSettings] = useState<SystemSetting[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAdminData = useCallback(async () => {
    setLoading(true);
    try {
      const [postsRes, settingsRes] = await Promise.all([
        contentAdminApi.listPosts(),
        contentAdminApi.listSettings(),
      ]);

      const pList = postsRes.payload || postsRes.data || [];
      const sList = settingsRes.payload || settingsRes.data || [];

      setPosts(pList.length > 0 ? pList : MOCK_ADMIN_POSTS);
      setSettings(sList.length > 0 ? sList : MOCK_ADMIN_SETTINGS);
    } catch {
      setPosts(MOCK_ADMIN_POSTS);
      setSettings(MOCK_ADMIN_SETTINGS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAdminData();
  }, [fetchAdminData]);

  // Posts CRUD
  const createPost = async (dto: CreatePostDto) => {
    try {
      const res = await contentAdminApi.createPost(dto);
      const created = res.payload || res.data;
      if (created) {
        setPosts((prev) => [created, ...prev]);
        return created;
      }
    } catch {
      const mock: Post = {
        id: Date.now(),
        title: dto.title,
        slug: dto.slug,
        summary: dto.summary,
        content: dto.content,
        status: dto.status,
        tags: dto.tags,
        featured_image: dto.featured_image,
        views_count: 0,
        published_at: dto.status === "PUBLISHED" ? new Date().toISOString() : undefined,
        created_at: new Date().toISOString(),
      };
      setPosts((prev) => [mock, ...prev]);
      return mock;
    }
  };

  const updatePost = async (id: string | number, dto: UpdatePostDto) => {
    try {
      const res = await contentAdminApi.updatePost(id, dto);
      const updated = res.payload || res.data;
      if (updated) {
        setPosts((prev) => prev.map((p) => (p.id === id ? updated : p)));
        return updated;
      }
    } catch {
      setPosts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...dto } : p))
      );
    }
  };

  const deletePost = async (id: string | number) => {
    try {
      await contentAdminApi.deletePost(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch {
      setPosts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const updatePostStatus = async (id: string | number, status: PostStatus) => {
    try {
      await contentAdminApi.updatePostStatus({ post_id: id, status });
    } catch {
      // Mock update
    }
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status } : p))
    );
  };

  // Settings CRUD
  const createSetting = async (dto: CreateSettingDto) => {
    try {
      const res = await contentAdminApi.createSetting(dto);
      const created = res.payload || res.data;
      if (created) {
        setSettings((prev) => [...prev, created]);
        return created;
      }
    } catch {
      const mock: SystemSetting = {
        id: Date.now(),
        key: dto.key,
        value: dto.value,
        description: dto.description,
        group: dto.group,
        is_public: dto.is_public ?? false,
      };
      setSettings((prev) => [...prev, mock]);
      return mock;
    }
  };

  const updateSetting = async (id: string | number, dto: UpdateSettingDto) => {
    try {
      const res = await contentAdminApi.updateSetting(id, dto);
      const updated = res.payload || res.data;
      if (updated) {
        setSettings((prev) => prev.map((s) => (s.id === id ? updated : s)));
        return updated;
      }
    } catch {
      setSettings((prev) =>
        prev.map((s) => (s.id === id ? { ...s, ...dto } : s))
      );
    }
  };

  const deleteSetting = async (id: string | number) => {
    try {
      await contentAdminApi.deleteSetting(id);
      setSettings((prev) => prev.filter((s) => s.id !== id));
    } catch {
      setSettings((prev) => prev.filter((s) => s.id !== id));
    }
  };

  return {
    posts,
    settings,
    loading,
    createPost,
    updatePost,
    deletePost,
    updatePostStatus,
    createSetting,
    updateSetting,
    deleteSetting,
    refresh: fetchAdminData,
  };
}
