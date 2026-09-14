// ==============================================================================
// GoVPN App Router: /settings
// Implements Algorithm 4: Dynamic Island Route Splitting on Thin Server Component
// ==============================================================================

import { Suspense } from "react";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { IamSkeleton } from "@/modules/iam/components/shared/IamSkeleton";

const UserProfileSettingsView = dynamic(
  () =>
    import("@/modules/iam/views/user/UserProfileSettingsView").then(
      (mod) => mod.UserProfileSettingsView
    ),
  {
    loading: () => <IamSkeleton />,
  }
);

export const metadata: Metadata = {
  title: "Pengaturan & Keamanan Akun | GoVPN",
  description: "Kelola profil akun, autentikasi dua faktor (2FA), sesi aktif, dan buku alamat.",
};

export default function SettingsPage() {
  return (
    <Suspense fallback={<IamSkeleton />}>
      <UserProfileSettingsView />
    </Suspense>
  );
}
