import { DashboardShell as Shell } from "@/components/app/shell";
import { AppSidebar } from "@/components/app-sidebar";
import { QueryProvider } from "@/components/providers/query-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class">
      <QueryProvider>
        <TooltipProvider>
          <SidebarProvider>
            <AppSidebar />
            {children}
          </SidebarProvider>
        </TooltipProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}
