import { Metadata } from "next";
import { TermsView } from "@/components/public/TermsView";
import { env } from "@/lib/config/env";

const siteUrl = env.NEXT_PUBLIC_APP_URL || "https://hidessh.com";

export const metadata: Metadata = {
  title: "Terms of Service & SLA — GoVPN Enterprise & Hide Group",
  description:
    "Official Terms of Service, 99.99% core network uptime SLA, Acceptable Use Policy (AUP), and multi-protocol tunneling rules for GoVPN by Hide Group.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "Terms of Service & SLA — GoVPN Enterprise & Hide Group",
    description:
      "Official Terms of Service, 99.99% core network uptime SLA, and Acceptable Use Policy (AUP) for GoVPN cloud tunneling.",
    url: `${siteUrl}/terms`,
    siteName: "GoVPN Enterprise",
    locale: "en_US",
    alternateLocale: ["id_ID"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service — GoVPN Enterprise",
    description:
      "Official service agreement, zero-abuse acceptable usage policies, and 99.99% core uptime SLA for GoVPN.",
  },
};

export default function TermsPage() {
  const termsJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Terms of Service - GoVPN Enterprise",
    url: `${siteUrl}/terms`,
    description:
      "Official terms of service and acceptable use policy for GoVPN cloud tunneling infrastructure operated by Hide Group.",
    publisher: {
      "@type": "Organization",
      name: "Hide Group / Hide Digital Security",
      url: siteUrl,
      logo: `${siteUrl}/icon.svg`,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Jl. Kampung Baris No.391, Karangturi, Kec. Semarang Tim.",
        addressLocality: "Semarang",
        addressRegion: "Jawa Tengah",
        postalCode: "50124",
        addressCountry: "ID",
      },
    },
    dateModified: "2026-09-14T00:00:00+07:00",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(termsJsonLd) }}
      />
      <TermsView />
    </>
  );
}
