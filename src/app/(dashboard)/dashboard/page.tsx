import type { Metadata } from "next";
import { DashboardOverviewView } from "@/modules/vpn/views/DashboardOverviewView";

export const metadata: Metadata = {
  title: "Console Overview | GoVPN",
  description: "Dasbor utama manajemen tunnel VPN dan infrastruktur cloud.",
};

export default function DashboardPage() {
  return <DashboardOverviewView />;
}
