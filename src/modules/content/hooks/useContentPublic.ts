// ==============================================================================
// GoVPN Public Content Hook
// Part of Pola C: hooks/useContentPublic.ts
// ==============================================================================

"use client";

import { useState, useEffect, useCallback } from "react";
import { contentPublicApi } from "../api/public.api";
import { Post, SystemSetting } from "../types/content.types";

const MOCK_PUBLIC_POSTS: Post[] = [
  {
    id: 1,
    title: "Panduan Lengkap Bypass DPI ISP Indonesia dengan Protokol V2Ray & Trojan",
    slug: "panduan-lengkap-bypass-dpi-v2ray-trojan",
    summary:
      "Pelajari bagaimana arsitektur enkripsi TLS dan gRPC GoVPN mampu menembus pemblokiran Deep Packet Inspection operator seluler secara stabil.",
    content: `## Pengantar Deep Packet Inspection (DPI)
ISP modern menggunakan teknik inspeksi paket data tingkat lanjut untuk memfilter trafik internet. Protokol standar seperti OpenVPN UDP atau SSH tunneling polos sangat mudah dideteksi melalui pola signature dan entropy handshake paket.

### Solusi GoVPN: Obfuscation Multi-Layer
Dengan mengombinasikan:
1. **TLS 1.3 Handshake Emulation**: Menyamarkan trafik VPN sebagai browsing HTTPS standar ke domain CDN ternama.
2. **WebSocket & gRPC Transport**: Multiplexing paket data ke port 443 tanpa jejak tunneling.
3. **Domain Fronting & Custom SNI**: Memastikan routing jalur aman tanpa pembatasan bandwidth (throttling).

Ikuti langkah instalasi aplikasi klien resmi GoVPN untuk menikmati koneksi internet tanpa batas dengan latency gaming rendah!`,
    featured_image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    author_name: "Tim Riset Jaringan GoVPN",
    status: "PUBLISHED",
    tags: ["TUTORIAL", "V2RAY", "DPI_BYPASS"],
    views_count: 1420,
    published_at: new Date(Date.now() - 5 * 86400000).toISOString(),
    created_at: new Date(Date.now() - 5 * 86400000).toISOString(),
  },
  {
    id: 2,
    title: "Optimalisasi Latency Rendah untuk Mobile Gaming Menggunakan Node Asia Pasifik",
    slug: "optimalisasi-latency-rendah-gaming-asia-pasifik",
    summary:
      "Rute langsung peering Tier-1 Singapore & Jakarta memangkas ping Mobile Legends dan PUBG Mobile hingga di bawah 25ms.",
    content: `## Tantangan Ping Tinggi pada Mobile Gaming
Jalur routing internasional yang berputar melalui Hong Kong atau US sering menyebabkan jitter dan spike ping pada game kompetitif.

### Backbone 10 Gbps GoVPN
Node kami terhubung langsung ke OpenIXP Jakarta dan Equinix Singapore (SG1), menjamin jalur terpendek (BGP shortest path) dengan latensi rata-rata:
- Jakarta - Singapore: ~12ms
- Surabaya - Singapore: ~22ms
- Medan - Singapore: ~18ms`,
    featured_image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
    author_name: "DevOps Infrastructure",
    status: "PUBLISHED",
    tags: ["GAMING", "INFRASTRUCTURE", "SPEED"],
    views_count: 980,
    published_at: new Date(Date.now() - 12 * 86400000).toISOString(),
    created_at: new Date(Date.now() - 12 * 86400000).toISOString(),
  },
];

export function useContentPublic(initialSlug?: string) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [settings, setSettings] = useState<SystemSetting[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [postsRes, settingsRes] = await Promise.all([
        contentPublicApi.getPosts(),
        contentPublicApi.getPublicSettings().catch(() => null),
      ]);

      const pList = postsRes.payload || postsRes.data || [];
      const sList = settingsRes?.payload || settingsRes?.data || [];

      setPosts(pList.length > 0 ? pList : MOCK_PUBLIC_POSTS);
      setSettings(sList);

      if (initialSlug) {
        const found = pList.find((p) => p.slug === initialSlug) ||
          MOCK_PUBLIC_POSTS.find((p) => p.slug === initialSlug);
        setSelectedPost(found || null);
      }
    } catch {
      setPosts(MOCK_PUBLIC_POSTS);
      if (initialSlug) {
        const found = MOCK_PUBLIC_POSTS.find((p) => p.slug === initialSlug);
        setSelectedPost(found || null);
      }
    } finally {
      setLoading(false);
    }
  }, [initialSlug]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const fetchPostBySlug = async (slug: string) => {
    try {
      const res = await contentPublicApi.getPostBySlug(slug);
      const post = res.payload || res.data;
      if (post) {
        setSelectedPost(post);
        return post;
      }
    } catch {
      const mock = MOCK_PUBLIC_POSTS.find((p) => p.slug === slug) || null;
      setSelectedPost(mock);
      return mock;
    }
  };

  return {
    posts,
    selectedPost,
    settings,
    loading,
    fetchPostBySlug,
    refresh: fetchData,
  };
}
