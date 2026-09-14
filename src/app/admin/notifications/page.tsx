// ==============================================================================
// GoVPN Thin App Router: Superadmin Notification & Broadcast Queue
// Algoritma 4: Dynamic Island Route Splitting with CLS = 0 Suspense Boundary
// ==============================================================================

import { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { NotificationSkeleton } from "@/modules/notification/components/shared/NotificationSkeleton";

export const metadata: Metadata = {
  title: "Antrean Siaran & Notifikasi | GoVPN Superadmin",
  description: "Manajemen broadcast masal multi-saluran dan antrean worker asinkron",
};

const DynamicAdminNotificationView = dynamic(
  () => import("@/modules/notification").then((mod) => mod.AdminNotificationView),
  {
    loading: () => <NotificationSkeleton />,
  }
);

export default function AdminNotificationPage() {
  return (
    <Suspense fallback={<NotificationSkeleton />}>
      <DynamicAdminNotificationView />
    </Suspense>
  );
}
