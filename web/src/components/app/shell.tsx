"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home, Folder, Share2, Repeat, Settings, Search, Bell, Sparkles, BarChart3,
  MessageCircle, Activity, ChevronLeft,
} from "lucide-react";
import { Suspense, type ReactNode } from "react";
import { Logo, LogoMark } from "./brand";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/app", label: "Home", icon: Home, exact: true },
  { to: "/app/files", label: "Files", icon: Folder },
  { to: "/app/automation", label: "Automation", icon: Sparkles },
  { to: "/app/shares", label: "Shares", icon: Share2 },
  { to: "/app/trade", label: "Trade", icon: Repeat },
  { to: "/app/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/app/notifications", label: "Notifications", icon: Bell },
  { to: "/app/activity", label: "Activity", icon: Activity },
  { to: "/app/bot", label: "WhatsApp Bot", icon: MessageCircle },
  { to: "/app/settings", label: "Settings", icon: Settings },
];

const mobileNav = [
  { to: "/app", label: "Home", icon: Home, exact: true },
  { to: "/app/files", label: "Files", icon: Folder },
  { to: "/app/shares", label: "Share", icon: Share2 },
  { to: "/app/trade", label: "Trade", icon: Repeat },
  { to: "/app/settings", label: "Settings", icon: Settings },
];

export function DashboardShell({
  children,
  title,
  back,
}: {
  children: ReactNode;
  title?: string;
  back?: string;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col border-r border-border bg-sidebar/60 px-4 py-6 lg:flex">
        <Link href="/app" className="mb-8 inline-flex">
          <Logo />
        </Link>
        <nav className="flex flex-1 flex-col gap-0.5">
          {nav.map((n) => {
            const active = n.exact ? pathname === n.to : pathname.startsWith(n.to);
            return (
              <Link
                key={n.to}
                href={n.to}
                className={cn(
                  "group inline-flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent/10 hover:text-foreground",
                  active && "bg-accent/10 text-foreground"
                )}
              >
                <n.icon
                  size={18}
                  strokeWidth={1.5}
                  className={cn(active && "text-[var(--color-ember)]")}
                />
                <span>{n.label}</span>
                {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[var(--color-ember)]" />}
              </Link>
            );
          })}
        </nav>
        <div className="mt-4 rounded-lg border border-border p-3 text-xs text-muted-foreground">
          <div className="mb-1 text-foreground">⌘K</div>
          Quick search across every connected provider.
        </div>
      </aside>

      {/* Topbar (desktop) */}
      <header className="sticky top-0 z-30 hidden h-16 items-center gap-4 border-b border-border bg-background/80 px-6 backdrop-blur lg:ml-64 lg:flex">
        <div className="flex flex-1 items-center gap-2">
          {back && (
            <Link href={back} className="rounded-md p-2 text-muted-foreground hover:bg-accent/10 hover:text-foreground">
              <ChevronLeft size={18} strokeWidth={1.5} />
            </Link>
          )}
          {title && <h1 className="font-display text-lg font-semibold tracking-tight">{title}</h1>}
        </div>
        <div className="relative w-80">
          <Search size={16} strokeWidth={1.5} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            placeholder="Search every cloud…"
            className="h-9 w-full rounded-md border border-border bg-surface pl-9 pr-12 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <kbd className="absolute right-2 top-1/2 -translate-y-1/2 rounded border border-border bg-background px-1.5 py-0.5 text-[10px] text-muted-foreground">⌘K</kbd>
        </div>
        <Link href="/app/notifications" className="relative rounded-md p-2 text-muted-foreground hover:bg-accent/10 hover:text-foreground">
          <Bell size={18} strokeWidth={1.5} />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[var(--color-ember)]" />
        </Link>
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[var(--color-ember)] to-[var(--color-amber)] text-center text-xs font-semibold leading-8 text-black">
          DM
        </div>
      </header>

      {/* Mobile topbar */}
      <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-background/90 px-4 backdrop-blur lg:hidden">
        {back ? (
          <Link href={back} className="-ml-2 rounded-md p-2 text-muted-foreground">
            <ChevronLeft size={20} strokeWidth={1.5} />
          </Link>
        ) : (
          <LogoMark size={28} />
        )}
        <h1 className="flex-1 truncate font-display text-base font-semibold">
          {title ?? "CloudBase"}
        </h1>
        <Link href="/app/notifications" className="rounded-md p-2 text-muted-foreground">
          <Bell size={20} strokeWidth={1.5} />
        </Link>
      </header>

      <main className="animate-[cb-fade_0.2s_ease-out] px-4 pb-28 pt-4 lg:ml-64 lg:px-8 lg:pb-12 lg:pt-6">
        <Suspense fallback={<div
          className="
    flex items-center justify-center text-sm text-muted-foreground
    animate-[cb-fade_0.2s_ease-out]
  "
        >
          Carregando…
        </div>}>
          {children}
        </Suspense>
      </main>

      {/* Mobile bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-border bg-background/95 px-2 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2 backdrop-blur lg:hidden">
        {mobileNav.map((n) => {
          const active = n.exact ? pathname === n.to : pathname.startsWith(n.to);
          return (
            <Link
              key={n.to}
              href={n.to}
              className={cn(
                "flex flex-col items-center gap-1 rounded-md py-1.5 text-[10px]",
                active ? "text-foreground" : "text-muted-foreground"
              )}
            >
              <n.icon size={20} strokeWidth={1.5} className={cn(active && "text-[var(--color-ember)]")} />
              <span>{n.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export function Section({
  title, action, children, className,
}: { title?: string; action?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={cn("mb-8", className)}>
      {(title || action) && (
        <div className="mb-3 flex items-center justify-between">
          {title && <h2 className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">{title}</h2>}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

export function ShellCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-lg border border-border bg-card p-4 lg:p-5", className)}>
      {children}
    </div>
  );
}
