// ==============================================================================
// GoVPN Thin App Router: User Server Telemetry & Health Monitoring
// Algoritma 4: Dynamic Island Route Splitting with CLS = 0 Suspense Boundary
// ==============================================================================

import { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { MonitorSkeleton } from "@/modules/monitor/components/shared/MonitorSkeleton";

export const metadata: Metadata = {
  title: "Telemetri Server & Monitoring | GoVPN Institutional",
  description:
    "Status latensi, beban CPU, pemakaian RAM, dan kesehatan node server GoVPN",
};

const DynamicServersMonitorView = dynamic(
  () => import("@/modules/monitor").then((mod) => mod.ServersMonitorView),
  {
    loading: () => <MonitorSkeleton />,
  },
);

export default function MonitorPage() {
  return (
    <Suspense fallback={<MonitorSkeleton />}>
      <DynamicServersMonitorView />
    </Suspense>
  );
}
