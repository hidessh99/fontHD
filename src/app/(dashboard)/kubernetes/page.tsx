// ==============================================================================
// GoVPN Thin App Router: User Kubernetes Container Apps Dashboard
// Algoritma 4: Dynamic Island Route Splitting with CLS = 0 Suspense Boundary
// ==============================================================================

import { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { K8sSkeleton } from "@/modules/kubernetes/components/shared/K8sSkeleton";

export const metadata: Metadata = {
  title: "Aplikasi Kontainer Kubernetes | GoVPN Institutional",
  description: "Kelola deployment pod kontainer, streaming logs, dan konfigurasi environment",
};

const DynamicK8sAppsView = dynamic(
  () => import("@/modules/kubernetes").then((mod) => mod.K8sAppsView),
  {
    loading: () => <K8sSkeleton />,
  }
);

export default function KubernetesPage() {
  return (
    <Suspense fallback={<K8sSkeleton />}>
      <DynamicK8sAppsView />
    </Suspense>
  );
}
