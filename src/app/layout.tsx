import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { env } from "@/lib/config/env";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

const siteUrl = env.NEXT_PUBLIC_APP_URL || "https://hidessh.com";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "GoVPN — Enterprise Cloud Tunneling, Zero-Logs VPN & AI Gateway",
    template: "%s | GoVPN Enterprise",
  },
  description:
    "Enterprise-grade multi-protocol cloud tunneling (SSH, VMess, VLess Reality, Trojan, Shadowsocks, WireGuard) with military-grade encryption, zero-logs guarantee, global Anycast routing, and ultra-low gaming latency.",
  keywords: [
    "Enterprise VPN",
    "Cloud Tunneling Infrastructure",
    "VLess Reality",
    "V2Ray VMess",
    "Trojan VPN",
    "Shadowsocks 2022",
    "WireGuard Enterprise",
    "SSH Tunnel WebSocket",
    "Anti-DPI Bypass",
    "Zero Logs VPN",
    "Gaming VPN Low Ping",
    "Bypass Internet Censorship",
    "DNS Cloudflare Manager",
    "Kubernetes Container Deploy",
    "AI Gateway API",
    "Fastest VPN Asia Pacific",
    "Singapore Low Ping VPN",
    "Private Tunneling Protocol",
  ],
  authors: [{ name: "GoVPN Security Team", url: siteUrl }],
  creator: "GoVPN Institutional Infrastructure",
  publisher: "GoVPN Institutional Infrastructure",
  applicationName: "GoVPN Enterprise",
  generator: "Next.js 16",
  category: "technology",
  classification: "Network Security & Cloud Tunneling Infrastructure",
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
      "id-ID": "/",
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "GoVPN — Enterprise Cloud Tunneling & High-Speed VPN Infrastructure",
    description:
      "High-speed multi-protocol VPN tunneling (V2Ray, VLess, Trojan, Shadowsocks, WireGuard) with strict zero-logs policy, anti-DPI routing, and 99.99% uptime SLA.",
    url: siteUrl,
    siteName: "GoVPN Enterprise",
    locale: "en_US",
    alternateLocale: ["id_ID"],
    type: "website",
    images: [
      {
        url: "/icon.svg",
        width: 1200,
        height: 630,
        alt: "GoVPN Enterprise Cloud Tunneling & VPN Infrastructure",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GoVPN — Enterprise Cloud Tunneling & Zero-Logs VPN",
    description:
      "Enterprise-grade multi-protocol cloud tunneling (SSH, VMess, VLess, Trojan, WireGuard) with zero-logs guarantee and ultra-low gaming latency.",
    site: "@GoVPN_Net",
    creator: "@GoVPN_Net",
    images: ["/icon.svg"],
  },
  other: {
    "msapplication-TileColor": "#09090b",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const locale = cookieStore.get("govpn_locale")?.value || "en";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "GoVPN Enterprise",
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          "@id": `${siteUrl}/#logo`,
          url: `${siteUrl}/icon.svg`,
          caption: "GoVPN Enterprise Logo",
        },
        image: { "@id": `${siteUrl}/#logo` },
        description:
          "Enterprise multi-protocol cloud tunneling infrastructure, zero-logs VPN security, and AI Gateway services.",
        sameAs: [
          "https://t.me/hidessh",
          "https://github.com/wahidari",
          "https://twitter.com/GoVPN_Net",
        ],
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "customer support",
            email: "support@hidessh.com",
            availableLanguage: ["English", "Indonesian"],
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "GoVPN Enterprise",
        description:
          "High-speed multi-protocol cloud tunneling, anti-DPI security, and zero-logs VPN infrastructure.",
        publisher: { "@id": `${siteUrl}/#organization` },
        inLanguage: "en-US",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${siteUrl}/articles?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${siteUrl}/#software`,
        name: "GoVPN Enterprise Suite",
        operatingSystem: "Windows, macOS, Linux, Android, iOS, OpenWrt",
        applicationCategory: "SecurityApplication",
        applicationSubCategory: "VPN & Cloud Tunneling",
        description:
          "High-speed multi-protocol VPN tunneling suite supporting VLess Reality, VMess, Trojan, Shadowsocks, WireGuard, and SSH with zero logging.",
        softwareVersion: "2.4.0",
        offers: {
          "@type": "Offer",
          price: "0.00",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          ratingCount: "15420",
          bestRating: "5",
          worstRating: "1",
        },
        featureList: [
          "VLess XTLS Reality Protocol with Zero-Hop Handshake",
          "VMess Dynamic Multipath Routing with TLS Obfuscation",
          "Trojan-GFW HTTPS Camouflage Port 443",
          "WireGuard Native Linux Kernel Speed",
          "Shadowsocks 2022 AEAD High Throughput",
          "SSH Dropbear WebSocket Tunneling",
          "Strict Zero-Logs Guarantee on Ephemeral RAM Nodes",
          "Heuristic Anti-DPI Evasion & Anycast BGP Routing",
          "Instant Automated Provisioning via QR Code & Deep Link",
        ],
      },
    ],
  };

  return (
    <html lang={locale} suppressHydrationWarning className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans min-h-screen bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
