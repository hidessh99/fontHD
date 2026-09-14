import { Metadata } from "next";
import { PrivacyView } from "@/components/public/PrivacyView";
import { env } from "@/lib/config/env";

const siteUrl = env.NEXT_PUBLIC_APP_URL || "https://hidessh.com";

export const metadata: Metadata = {
  title: "Privacy Policy & Zero-Logs Architecture — GoVPN Enterprise & Hide Group",
  description:
    "Official Privacy Policy and Zero-Logs RAM-only operating architecture for GoVPN by Hide Group. Compliant with Indonesian UU PDP No. 27/2022 and GDPR.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Privacy Policy & Zero-Logs Architecture — GoVPN Enterprise & Hide Group",
    description:
      "Official Privacy Policy and Zero-Logs RAM-only operating architecture for GoVPN by Hide Group. Compliant with Indonesian UU PDP No. 27/2022 and GDPR.",
    url: `${siteUrl}/privacy`,
    siteName: "GoVPN Enterprise",
    locale: "en_US",
    alternateLocale: ["id_ID"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy — GoVPN Enterprise",
    description:
      "RAM-only diskless node architecture, zero activity logging, and UU PDP / GDPR compliance.",
  },
};

export default function PrivacyPage() {
  const privacyJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Privacy Policy - GoVPN Enterprise",
    url: `${siteUrl}/privacy`,
    description:
      "Official privacy policy and RAM-only zero logs infrastructure policy for GoVPN operated by Hide Group.",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(privacyJsonLd) }}
      />
      <PrivacyView />
    </>
  );
}
