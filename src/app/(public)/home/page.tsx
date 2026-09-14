import { Metadata } from "next";
import { HomeLandingView } from "@/components/public/HomeLandingView";
import { env } from "@/lib/config/env";

const siteUrl = env.NEXT_PUBLIC_APP_URL || "https://hidessh.com";

export const metadata: Metadata = {
  title: "GoVPN — Fast & Secure Cloud Tunneling | Freedom Surfing",
  description:
    "Unlock all websites, boost your internet speed, and surf safely with our high-quality premium servers. Free and VIP SSH, VMess, VLess, and Trojan accounts.",
  alternates: {
    canonical: "/home",
  },
  openGraph: {
    title: "GoVPN — Fast & Secure Cloud Tunneling | Freedom Surfing",
    description:
      "Unlock all websites, boost your internet speed, and surf safely with our high-quality premium servers.",
    url: `${siteUrl}/home`,
    siteName: "GoVPN Enterprise",
    locale: "en_US",
    alternateLocale: ["id_ID"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GoVPN — Fast & Secure Cloud Tunneling",
    description:
      "Unlock all websites, boost your internet speed, and surf safely with high-quality tunneling accounts.",
  },
};

export default function HomePage() {
  const homeJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "GoVPN - Fast & Secure Cloud Tunneling",
    url: `${siteUrl}/home`,
    description:
      "Unlock all websites, boost your internet speed, and surf safely with our high-quality premium servers.",
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
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
      <HomeLandingView />
    </>
  );
}
