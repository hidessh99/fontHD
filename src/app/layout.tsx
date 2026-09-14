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
    default: "GoVPN - Enterprise Tunneling, Cloud Infrastructure & AI Gateway",
    template: "%s | GoVPN",
  },
  description:
    "GoVPN (HideSSH) adalah platform infrastruktur jaringan tunneling multi-protokol (SSH, VMess, VLess, Trojan, Shadowsocks, WireGuard), DNS Cloudflare, Kubernetes container deploy, dan AI Gateway berkecepatan tinggi.",
  applicationName: "GoVPN",
  generator: "Next.js 16",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const locale = cookieStore.get("govpn_locale")?.value || "en";

  return (
    <html lang={locale} suppressHydrationWarning className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans min-h-screen bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
