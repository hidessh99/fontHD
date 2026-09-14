import {
  AdminRouteGuard,
  AdminSidebar,
  AdminHeader,
} from "@/components/layout/admin";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminRouteGuard>
      <div className="flex h-screen overflow-hidden bg-background text-foreground">
        {/* Desktop Admin Sidebar */}
        <div className="hidden md:flex md:w-64 md:flex-col shrink-0">
          <AdminSidebar />
        </div>

        {/* Main Admin Content Area */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <AdminHeader />
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </AdminRouteGuard>
  );
}
