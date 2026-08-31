import { AppSidebar } from "@/components/system/app-sidebar";
import { QueryProvider } from "@/components/providers/query-provider";
import { SessionProvider } from "@/components/providers/session-provider";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TopbarStorage } from "./_components/Topbar";
import { requireSession } from "@/lib/features/core/require-session";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await requireSession("/system");
  return (
    <QueryProvider>
      <SessionProvider session={session}>
        <TooltipProvider>
          <SidebarProvider>
            <AppSidebar session={session} />
            <SidebarInset className="flex flex-col h-screen overflow-hidden bg-background">
              <div className="shrink-0 px-4 sm:px-6 lg:px-8">
                <TopbarStorage />
              </div>
              <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 pb-8 no-scrollbar">
                {children}
              </main>
            </SidebarInset>
          </SidebarProvider>
        </TooltipProvider>
      </SessionProvider>
    </QueryProvider>
  );
}
