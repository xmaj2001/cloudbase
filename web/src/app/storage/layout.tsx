"use client";
import { SidebarStorage } from "@/components/dashboad/Sidebar";
import { QueryProvider } from "@/components/providers/query-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [active, setActive] = useState("all");

  return (
    <QueryProvider>
      <TooltipProvider>
        <div className="flex bg-background text-foreground min-h-screen">
          <SidebarStorage active={active} setActive={setActive} />
          <div className="flex-1 min-w-0">{children}</div>
        </div>
      </TooltipProvider>
    </QueryProvider>
  );
}
