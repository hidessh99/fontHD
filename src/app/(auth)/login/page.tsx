// ==============================================================================
// GoVPN App Router: /login
// Implements Algorithm 4: Dynamic Island Route Splitting on Thin Server Component
// ==============================================================================

import { Suspense } from "react";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { IamSkeleton } from "@/modules/iam/components/shared/IamSkeleton";

const LoginView = dynamic(
  () =>
    import("@/modules/iam/views/guest/LoginView").then((mod) => mod.LoginView),
  {
    loading: () => <IamSkeleton />,
  },
);

export const metadata: Metadata = {
  title: "Sign In to Your Account | GoVPN Enterprise",
  description:
    "Log in to your GoVPN console to manage active tunneling protocols, cloud servers, billing invoices, and security credentials.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function LoginPage() {
  return (
    <Suspense fallback={<IamSkeleton />}>
      <LoginView />
    </Suspense>
  );
}
