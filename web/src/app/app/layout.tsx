import { AppSidebar } from "@/components/app-sidebar";
import { DashboardShell as Shell } from "@/components/app/shell";
import { QueryProvider } from "@/components/providers/query-provider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <TooltipProvider>
        <SidebarProvider>
          <AppSidebar />
          {children}
        </SidebarProvider>
      </TooltipProvider>
    </QueryProvider>
  );
}
