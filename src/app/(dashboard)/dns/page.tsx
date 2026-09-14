import { Metadata } from "next";
import { DnsManagerView } from "@/modules/dns/views/DnsManagerView";

export const metadata: Metadata = {
  title: "Manajemen DNS Cloudflare | GoVPN",
  description: "Kelola domain zona dan pemetaan DNS host VPN langsung ke Cloudflare",
};

export default function DnsPage() {
  return <DnsManagerView />;
}
