// ==============================================================================
// GoVPN App Router: /register
// Implements Algorithm 4: Dynamic Island Route Splitting on Thin Server Component
// ==============================================================================

import { Suspense } from "react";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { IamSkeleton } from "@/modules/iam/components/shared/IamSkeleton";

const RegisterView = dynamic(
  () =>
    import("@/modules/iam/views/guest/RegisterView").then(
      (mod) => mod.RegisterView,
    ),
  {
    loading: () => <IamSkeleton />,
  },
);

export const metadata: Metadata = {
  title: "Create an Enterprise Account | GoVPN Cloud",
  description:
    "Register for a free GoVPN account to deploy multi-protocol tunneling nodes, manage DNS zones, and access high-speed private VPN servers.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function RegisterPage() {
  return (
    <Suspense fallback={<IamSkeleton />}>
      <RegisterView />
    </Suspense>
  );
}
