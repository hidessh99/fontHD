import { Metadata } from "next";
import { AboutView } from "@/components/public/AboutView";
import { env } from "@/lib/config/env";

const siteUrl = env.NEXT_PUBLIC_APP_URL || "https://hidessh.com";

export const metadata: Metadata = {
  title: "About Us — GoVPN High-Performance Cloud Tunneling & Hide Group",
  description:
    "Company profile, BGP Tier-1 Anycast architecture, 99.99% SLA, and zero-logs engineering history of GoVPN by Hide Group in Semarang, Indonesia.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Us — GoVPN High-Performance Cloud Tunneling & Hide Group",
    description:
      "Company profile, BGP Tier-1 Anycast architecture, 99.99% SLA, and zero-logs engineering history of GoVPN by Hide Group in Semarang, Indonesia.",
    url: `${siteUrl}/about`,
    siteName: "GoVPN Enterprise",
    locale: "en_US",
    alternateLocale: ["id_ID"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us — GoVPN Enterprise",
    description:
      "High-throughput multi-protocol tunneling infrastructure, RAM-only architecture, and global Tier-1 peering.",
  },
};

export default function AboutPage() {
  const aboutJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Us - GoVPN Enterprise",
    url: `${siteUrl}/about`,
    description:
      "Corporate profile and engineering architecture of GoVPN, an enterprise-grade cloud tunneling infrastructure provider operated by Hide Group.",
    mainEntity: {
      "@type": "Organization",
      name: "Hide Group / Hide Digital Security",
      url: siteUrl,
      logo: `${siteUrl}/icon.svg`,
      telephone: "+62877111301818",
      email: "support@hidessh.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Jl. Kampung Baris No.391, Karangturi, Kec. Semarang Tim.",
        addressLocality: "Semarang",
        addressRegion: "Jawa Tengah",
        postalCode: "50124",
        addressCountry: "ID",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      <AboutView />
    </>
  );
}
