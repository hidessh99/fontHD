// ==============================================================================
// GoVPN Thin App Router: User Notifications
// Algoritma 4: Dynamic Island Route Splitting with CLS = 0 Suspense Boundary
// ==============================================================================

import { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { NotificationSkeleton } from "@/modules/notification/components/shared/NotificationSkeleton";

export const metadata: Metadata = {
  title: "Pusat Notifikasi | GoVPN Institutional",
  description: "Pemberitahuan pembaruan server, invoice, dan status akun VPN Anda",
};

const DynamicNotificationsView = dynamic(
  () => import("@/modules/notification").then((mod) => mod.NotificationsView),
  {
    loading: () => <NotificationSkeleton />,
  }
);

export default function NotificationsPage() {
  return (
    <Suspense fallback={<NotificationSkeleton />}>
      <DynamicNotificationsView />
    </Suspense>
  );
}
