import { requireSession } from "@/api/core/require-session";
import { AppSidebar } from "@/components/app-sidebar";
import { QueryProvider } from "@/components/providers/query-provider";
import { SessionProvider } from "@/components/providers/session-provider";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await requireSession("/storage");
  return (
    <QueryProvider>
      <SessionProvider session={session}>
        <TooltipProvider>
          <SidebarProvider>
            <AppSidebar session={session} />
            <SidebarInset>
              <div className="p-4 pt-0">
                {children}
              </div>
            </SidebarInset>
          </SidebarProvider>
        </TooltipProvider>
      </SessionProvider>
    </QueryProvider>
  );
}
