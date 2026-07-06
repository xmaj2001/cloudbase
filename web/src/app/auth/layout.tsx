"use client";
import { AuthShell } from "@/components/auth/auth-shell";
import { AuthShellProvider } from "@/components/auth/auth-shell-context";
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
        <AuthShellProvider>
          <AuthShell>{children}</AuthShell>
        </AuthShellProvider>
      </TooltipProvider>
    </QueryProvider>
  );
}
