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
  title: "GoVPN — Ultra-Fast, Private VPN & 1-Click Cloud Tunneling",
  description:
    "Experience true internet freedom with GoVPN. Bypass ISP throttling, stream 4K movies with zero buffering, and game with low ping. 100% RAM-only zero logs policy across Android, iOS, Windows, and Mac.",
  keywords: [
    "High Speed VPN",
    "Gaming VPN Low Ping",
    "Stream Netflix 4K VPN",
    "VLess Reality Tunnel",
    "WireGuard Fast Config",
    "Zero Logs VPN",
    "Bypass School WiFi Blocks",
    "Fastest VPN Asia",
    "1 Click VPN Setup",
    "Anti DPI Bypass",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "GoVPN — Ultra-Fast, Private VPN & 1-Click Cloud Tunneling",
    description:
      "One-click internet freedom. Stream 4K without buffering, play with ultra-low ping, and protect your privacy with 100% strict zero logs.",
    url: "/",
    siteName: "GoVPN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GoVPN — Ultra-Fast, Private VPN & 1-Click Cloud Tunneling",
    description:
      "Bypass ISP blocks, stream 4K movies with zero buffering, and game with low ping. 100% RAM-only zero logs.",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do I need technical skills to use GoVPN?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not at all! Getting started takes less than a minute. Simply create your free account, scan the provided QR code with any supported app (like v2rayNG on Android or Sing-box on iPhone/PC), and tap connect. That's it!",
      },
    },
    {
      "@type": "Question",
      name: "Can GoVPN unblock streaming sites and social media apps?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! GoVPN effortlessly unblocks Netflix, Disney+, YouTube, Discord, Reddit, TikTok, and ChatGPT on restricted school, campus, or workplace Wi-Fi networks without being detected.",
      },
    },
    {
      "@type": "Question",
      name: "Will GoVPN slow down my internet or give me high gaming ping?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Actually, many users experience faster speeds! Because we route your traffic directly through high-speed Tier-1 data highways, we frequently bypass local ISP congestion, giving gamers lower ping and smoother 4K streaming.",
      },
    },
    {
      "@type": "Question",
      name: "Does GoVPN track or record what websites I visit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Never. We enforce an audited Zero-Logs Policy backed by RAM-only servers. Nothing is ever written to hard drives, meaning no browsing history, DNS lookups, or IP addresses are ever saved.",
      },
    },
    {
      "@type": "Question",
      name: "Can I earn money by becoming a Reseller Partner?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! If you want to start your own VPN business or sell accounts to friends and clients, our Reseller Portal gives you wholesale pricing up to 30% off, automated REST API key creation, and instant payouts.",
      },
    },
  ],
};

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
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
