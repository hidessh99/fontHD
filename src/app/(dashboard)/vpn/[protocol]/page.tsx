import type { Metadata } from "next";
import { VpnProtocolView } from "@/modules/vpn/views/VpnProtocolView";

interface PageProps {
  params: Promise<{ protocol: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { protocol } = await params;
  return {
    title: `Akun ${protocol.toUpperCase()} | GoVPN`,
    description: `Kelola dan buat akun tunneling protokol ${protocol.toUpperCase()} berkecepatan tinggi.`,
  };
}

export default async function VpnProtocolPage({ params }: PageProps) {
  const { protocol } = await params;
  return <VpnProtocolView protocol={protocol} />;
}
