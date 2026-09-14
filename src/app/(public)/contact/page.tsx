import { Metadata } from "next";
import { ContactUsView } from "@/components/public/ContactUsView";
import { env } from "@/lib/config/env";

const siteUrl = env.NEXT_PUBLIC_APP_URL || "https://hidessh.com";

export const metadata: Metadata = {
  title: "Contact Us — GoVPN Engineering & Customer Support Desk",
  description:
    "Contact GoVPN technical engineering desk, 24/7 WhatsApp hotline 0877111301818, Telegram @hidessh, and Hide Group operational headquarters in Semarang, Indonesia.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Us — GoVPN Engineering & Customer Support Desk",
    description:
      "Contact GoVPN technical engineering desk, 24/7 WhatsApp hotline 0877111301818, Telegram @hidessh, and Hide Group operational headquarters in Semarang, Indonesia.",
    url: `${siteUrl}/contact`,
    siteName: "GoVPN Enterprise",
    locale: "en_US",
    alternateLocale: ["id_ID"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us — GoVPN Enterprise Support",
    description:
      "Instant WhatsApp hotline, Telegram desk, and technical inquiry ticketing for GoVPN.",
  },
};

export default function ContactPage() {
  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Us - GoVPN Enterprise",
    url: `${siteUrl}/contact`,
    mainEntity: {
      "@type": "Organization",
      name: "Hide Group / Hide Digital Security",
      url: siteUrl,
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
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+62877111301818",
          contactType: "customer service",
          availableLanguage: ["Indonesian", "English"],
          areaServed: ["ID", "SG", "MY", "GLOBAL"],
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <ContactUsView />
    </>
  );
}
