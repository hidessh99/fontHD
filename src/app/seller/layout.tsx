import React from "react";
import { SellerRouteGuard } from "@/components/layout/shared/SellerRouteGuard";
import { SellerSidebar } from "@/components/layout/SellerSidebar";
import { SellerHeader } from "@/components/layout/SellerHeader";

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
