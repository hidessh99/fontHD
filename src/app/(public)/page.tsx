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
    "Enterprise-grade VPN & SSH tunneling service with banking encryption, multi-protocols (V2Ray, VLess Reality, Trojan, Shadowsocks, WireGuard), and ultra-low gaming latency.",
  openGraph: {
    title: "GoVPN — Next-Gen Cloud Tunneling & Enterprise VPN Infrastructure",
    description:
      "Enterprise-grade VPN & SSH tunneling service with banking encryption, multi-protocols, and ultra-low gaming latency.",
    type: "website",
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
