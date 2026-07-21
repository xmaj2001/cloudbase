import { getServerSession } from "@/api/core/get-session.server";
import { requireSession } from "@/api/core/require-session";
import { SidebarStorage } from "@/app/storage/_components/Sidebar";
import { TopbarStorage } from "@/app/storage/_components/Topbar";
import { QueryProvider } from "@/components/providers/query-provider";
import { SessionProvider } from "@/components/providers/session-provider";
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
          <div className="flex bg-background text-foreground min-h-screen">
            <SidebarStorage />
            <div className="flex-1 min-w-0">
              <TopbarStorage variant="brand" />
              {children}
            </div>
          </div>
        </TooltipProvider>
      </SessionProvider>
    </QueryProvider>
  );
}
