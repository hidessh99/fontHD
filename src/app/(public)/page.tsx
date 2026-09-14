import React from "react";
import type { Metadata } from "next";
import {
  LandingHero,
  LandingStats,
  LandingProtocols,
  LandingFeatures,
  LandingWhyUs,
  LandingTrustPayments,
  LandingFaq,
  LandingCta,
} from "@/components/landing";

export const metadata: Metadata = {
  title: "GoVPN — Next-Gen Cloud Tunneling & Enterprise VPN Infrastructure",
  description:
    "Deploy high-speed tunneling across 6 protocols (SSH, VMess, VLess Reality, Trojan, Shadowsocks, WireGuard). 100% zero-logs guarantee, Cloudflare BGP Anycast routing, and instant automated provisioning.",
  keywords: [
    "High Speed VPN",
    "VLess Reality Tunnel",
    "V2Ray VMess Server",
    "Trojan-Go VPN",
    "Shadowsocks 2022",
    "WireGuard VPN Config",
    "SSH WebSocket CDN",
    "Gaming VPN Low Latency",
    "Anti-DPI Bypass",
    "Cloudflare DNS Manager",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "GoVPN — Next-Gen Cloud Tunneling & Enterprise VPN Infrastructure",
    description:
      "Enterprise-grade VPN & SSH tunneling service with banking-level encryption, multi-protocol suite, and ultra-low gaming latency.",
    url: "/",
    siteName: "GoVPN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GoVPN — Next-Gen Cloud Tunneling & Enterprise VPN",
    description:
      "Deploy high-speed tunneling across 6 protocols with 100% zero-logs guarantee and ultra-low gaming latency.",
  },
};

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <LandingHero />

      {/* Floating Metrics & Network Telemetry Bar */}
      <LandingStats />

      {/* 6 Protocol Showcase (SSH, VMess, VLess, Trojan, Shadowsocks, WireGuard) */}
      <LandingProtocols />

      {/* 6 Architectural Pillars & Engineering Features */}
      <LandingFeatures />

      {/* Why Choose GoVPN (Quality Differentiators) */}
      <LandingWhyUs />

      {/* Trust Guarantees & Multi-Gateway Payments Grid */}
      <LandingTrustPayments />

      {/* Interactive Accordion FAQ */}
      <LandingFaq />

      {/* High-Conversion Final CTA Banner */}
      <LandingCta />
    </div>
  );
}
