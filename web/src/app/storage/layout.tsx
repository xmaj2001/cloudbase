import { SidebarStorage } from "@/components/dashboad/Sidebar";
import { TopbarStorage } from "@/components/dashboad/Topbar";
import { QueryProvider } from "@/components/providers/query-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <TooltipProvider>
        <div className="flex bg-background text-foreground min-h-screen">
          <SidebarStorage />
          <div className="flex-1 min-w-0">
            <TopbarStorage variant="brand" />
            {children}
          </div>
        </div>
      </TooltipProvider>
    </QueryProvider>
  );
}
