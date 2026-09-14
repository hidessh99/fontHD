import { Metadata } from "next";
import { ServersMonitorView } from "@/modules/monitor/views/ServersMonitorView";

export const metadata: Metadata = {
  title: "Telemetri Server & Monitoring | GoVPN",
  description: "Status latensi, beban CPU, pemakaian RAM, dan kesehatan node server GoVPN",
};

export default function MonitorPage() {
  return <ServersMonitorView />;
}
