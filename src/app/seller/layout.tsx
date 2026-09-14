import type { Metadata } from "next";
import {
  SellerRouteGuard,
  SellerSidebar,
  SellerHeader,
} from "@/components/layout/seller";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SellerRouteGuard>
      <div className="flex h-screen overflow-hidden bg-background text-foreground">
        {/* Desktop Seller Sidebar */}
        <div className="hidden md:flex md:w-64 md:flex-col shrink-0">
          <SellerSidebar />
        </div>

        {/* Main Seller Content Area */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <SellerHeader />
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </SellerRouteGuard>
  );
}
