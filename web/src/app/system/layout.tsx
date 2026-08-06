import { requireSession } from "@/api/core/require-session";
import { AppSidebar } from "@/components/app-sidebar";
import { QueryProvider } from "@/components/providers/query-provider";
import { SessionProvider } from "@/components/providers/session-provider";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TopbarStorage } from "../storage/_components/Topbar";

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
            <SidebarInset className="px-4 sm:px-8 pt-4 pb-6">
              <TopbarStorage />
              <div className="">
                {children}
              </div>
            </SidebarInset>
          </SidebarProvider>
        </TooltipProvider>
      </SessionProvider>
    </QueryProvider>
  );
}
