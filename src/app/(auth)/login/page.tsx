import type { Metadata } from "next";
import { LoginView } from "@/modules/iam/views/LoginView";

export const metadata: Metadata = {
  title: "Masuk ke Akun | GoVPN",
  description: "Masuk ke platform tunneling dan infrastruktur cloud GoVPN.",
};

export default function LoginPage() {
  return <LoginView />;
}
