import { DashboardSidebar } from "./DashboardSidebar";

export function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex w-full bg-background">
      <DashboardSidebar />
      <main className="flex-1 lg:ml-0 mt-16 lg:mt-0">
        <div className="p-4 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
