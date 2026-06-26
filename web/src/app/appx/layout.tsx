import { DashboardShell as Shell } from "@/components/app/shell";
import { QueryProvider } from "@/components/providers/query-provider";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Shell title="Good evening, Dana">
      <QueryProvider>{children}</QueryProvider>
    </Shell>
  );
}
