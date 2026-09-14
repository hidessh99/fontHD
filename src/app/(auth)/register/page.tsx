import type { Metadata } from "next";
import { RegisterView } from "@/modules/iam/views/RegisterView";

export const metadata: Metadata = {
  title: "Daftar Akun Baru | GoVPN",
  description: "Daftar akun GoVPN untuk mendapatkan akses VPN berkecepatan tinggi.",
};

export default function RegisterPage() {
  return <RegisterView />;
}
