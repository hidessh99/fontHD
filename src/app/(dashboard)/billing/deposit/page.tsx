import { Metadata } from "next";
import { DepositView } from "@/modules/finance/views/DepositView";

export const metadata: Metadata = {
  title: "Deposit Saldo | GoVPN",
  description: "Pengisian saldo akun GoVPN melalui QRIS instan dan Virtual Account",
};

export default function DepositPage() {
  return <DepositView />;
}
