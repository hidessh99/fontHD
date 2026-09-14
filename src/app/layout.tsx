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
        logo: `${siteUrl}/icon.svg`,
        sameAs: ["https://t.me/hidessh"],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "GoVPN",
        description:
          "Enterprise multi-protocol cloud tunneling, anti-DPI security, and high-speed VPN infrastructure.",
        publisher: { "@id": `${siteUrl}/#organization` },
        inLanguage: "en-US",
      },
      {
        "@type": "SoftwareApplication",
        name: "GoVPN Institutional",
        operatingSystem: "Windows, macOS, Linux, Android, iOS",
        applicationCategory: "SecurityApplication",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          ratingCount: "15420",
        },
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
