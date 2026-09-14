// ==============================================================================
// GoVPN Thin App Router: Superadmin Kubernetes Cluster Control Plane
// Algoritma 4: Dynamic Island Route Splitting with CLS = 0 Suspense Boundary
// ==============================================================================

import { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { K8sSkeleton } from "@/modules/kubernetes/components/shared/K8sSkeleton";

export const metadata: Metadata = {
  title: "Admin Kubernetes Cluster | GoVPN Institutional",
  description:
    "Kelola worker nodes bare-metal, paket kuota CPU/RAM, dan blueprint template aplikasi",
};

const DynamicAdminK8sView = dynamic(
  () => import("@/modules/kubernetes").then((mod) => mod.AdminK8sView),
  {
    loading: () => <K8sSkeleton />,
  },
);

export default function AdminKubernetesPage() {
  return (
    <Suspense fallback={<K8sSkeleton />}>
      <DynamicAdminK8sView />
    </Suspense>
  );
}
