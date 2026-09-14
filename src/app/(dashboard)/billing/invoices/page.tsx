import { Metadata } from "next";
import { BillingInvoicesView } from "@/modules/finance/views/BillingInvoicesView";

export const metadata: Metadata = {
  title: "Faktur & Tagihan | GoVPN",
  description: "Daftar invoice, riwayat pembayaran, dan mutasi saldo GoVPN",
};

export default function InvoicesPage() {
  return <BillingInvoicesView />;
}
