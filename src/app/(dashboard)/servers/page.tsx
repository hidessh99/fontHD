import type { Metadata } from "next";
import { ServersView } from "@/modules/vpn/views/ServersView";

export const metadata: Metadata = {
  title: "Server Nodes & Telemetri | GoVPN",
  description: "Status ketersediaan server node global dan latency ping real-time.",
};

export default function ServersPage() {
  return <ServersView />;
}
