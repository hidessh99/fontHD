// ==============================================================================
// GoVPN Thin App Router: Superadmin Server Fleet Telemetry & Monitoring
// Algoritma 4: Dynamic Island Route Splitting with CLS = 0 Suspense Boundary
// ==============================================================================

import { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { MonitorSkeleton } from "@/modules/monitor/components/shared/MonitorSkeleton";

export const metadata: Metadata = {
  title: "Admin Server Fleet Telemetry | GoVPN Institutional",
  description:
    "Kontrol pemantauan node server VPN, alerting threshold, dan sinkronisasi berkala",
};

const DynamicAdminMonitorView = dynamic(
  () => import("@/modules/monitor").then((mod) => mod.AdminMonitorView),
  {
    loading: () => <MonitorSkeleton />,
  },
);

export default function AdminMonitorPage() {
  return (
    <Suspense fallback={<MonitorSkeleton />}>
      <DynamicAdminMonitorView />
    </Suspense>
  );
}
