import type { Metadata } from "next";
import {
  MemberRouteGuard,
  DashboardSidebar,
  DashboardHeader,
} from "@/components/layout/user";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MemberRouteGuard>
      <div className="flex h-screen overflow-hidden bg-background text-foreground">
        {/* Desktop Sidebar */}
        <div className="hidden md:flex md:w-64 md:flex-col shrink-0">
          <DashboardSidebar />
        </div>

        {/* Main Content Area */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <DashboardHeader />
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </MemberRouteGuard>
  );
}
