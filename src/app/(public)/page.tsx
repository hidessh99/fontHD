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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What are the key differences between SSH, VMess, VLess Reality, and Trojan?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SSH Dropbear is ideal for TCP tunneling with custom payloads and standard ports. VMess (V2Ray) uses dynamic multi-path routing to bypass complex firewall filtering. VLess Reality is the next-generation protocol operating without personal domain requirements at native Linux kernel speed. Trojan camouflages entire traffic as standard HTTPS port 443 web browsing, making it nearly impossible for ISP firewalls to detect or throttle.",
      },
    },
    {
      "@type": "Question",
      name: "Which client applications are recommended for GoVPN accounts?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For Android, we recommend v2rayNG, Sing-box, NekoBox, or HTTP Custom. For iOS / iPhone, Shadowrocket, Sing-box, and FoXray work best. For Windows and Mac, v2rayN, Nekoray, Clash Verge Rev, and the official WireGuard client are fully supported.",
      },
    },
    {
      "@type": "Question",
      name: "Is there any bandwidth throttle (FUP) or speed cap per account?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. All regular and VIP GoVPN accounts connect to dedicated 10 Gbps uplink ports with no hidden Fair Usage Policies (FUP). Maximum speed depends solely on your local ISP or cellular signal conditions.",
      },
    },
    {
      "@type": "Question",
      name: "How can I become a GoVPN Reseller Partner and what are the perks?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Simply sign up and head to the Reseller Partner Portal. Partners enjoy wholesale discounts up to 30%, instant REST API account minting, custom sub-tenants, and automated commission withdrawals directly to bank accounts or e-wallets.",
      },
    },
    {
      "@type": "Question",
      name: "Does GoVPN keep logs of the websites I visit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Strictly NO. We adhere to a rigid Zero-Logs Policy. Our edge servers operate entirely within ephemeral RAM disk operating systems where volatile memory is regularly purged and no browsing history, DNS queries, or user IP addresses are ever stored on disk.",
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
