"use client";


import { Logo } from "@/components/app/brand";
import { ArrowRight } from "lucide-react";
import Link from "next/link";



const groups: { title: string; items: { n: number; label: string; to: string }[] }[] = [
  {
    title: "Auth flow",
    items: [
      { n: 1, label: "Splash / Loading", to: "/splash" },
      { n: 2, label: "Onboarding", to: "/onboarding" },
      { n: 3, label: "Sign up", to: "/signup" },
      { n: 4, label: "Sign in", to: "/signin" },
      { n: 5, label: "Forgot password", to: "/forgot" },
      { n: 6, label: "Connect providers", to: "/connect" },
    ],
  },
  {
    title: "Main dashboard",
    items: [
      { n: 7, label: "Home / Dashboard", to: "/app" },
      { n: 8, label: "Dashboard — empty state", to: "/app/empty" },
    ],
  },
  {
    title: "File management",
    items: [
      { n: 9, label: "File explorer — grid", to: "/app/files" },
      { n: 10, label: "File explorer — list", to: "/app/files/list" },
      { n: 11, label: "File detail / preview", to: "/app/file/1" },
      { n: 12, label: "Folder view", to: "/app/files/folder" },
      { n: 13, label: "Search results", to: "/app/search" },
      { n: 14, label: "Upload flow", to: "/app/files/upload" },
      { n: 15, label: "Bulk actions", to: "/app/files/select" },
    ],
  },
  {
    title: "Automation",
    items: [
      { n: 16, label: "Automation hub", to: "/app/automation" },
      { n: 17, label: "Create / edit rule", to: "/app/automation/create" },
      { n: 18, label: "Automation history", to: "/app/automation/history" },
      { n: 19, label: "Scheduler", to: "/app/automation/scheduler" },
    ],
  },
  {
    title: "Sharing",
    items: [
      { n: 20, label: "Share modal", to: "/app/share" },
      { n: 21, label: "Active shares manager", to: "/app/shares" },
      { n: 22, label: "Share recipient view", to: "/s/abc123" },
    ],
  },
  {
    title: "Trading",
    items: [
      { n: 23, label: "Trade hub", to: "/app/trade" },
      { n: 24, label: "Create trade offer", to: "/app/trade/create" },
      { n: 25, label: "Trade detail", to: "/app/trade/t1" },
      { n: 26, label: "Incoming proposal", to: "/app/trade/incoming" },
      { n: 27, label: "Trade in progress", to: "/app/trade/progress" },
      { n: 28, label: "Trade complete", to: "/app/trade/complete" },
      { n: 29, label: "User reputation profile", to: "/app/profile/marina-k" },
    ],
  },
  {
    title: "Settings",
    items: [
      { n: 30, label: "Settings — main", to: "/app/settings" },
      { n: 31, label: "Account", to: "/app/settings/account" },
      { n: 32, label: "Storage providers", to: "/app/settings/storage" },
      { n: 33, label: "Automation defaults", to: "/app/settings/automation" },
      { n: 34, label: "Sharing defaults", to: "/app/settings/sharing" },
      { n: 35, label: "Notifications", to: "/app/settings/notifications" },
    ],
  },
  {
    title: "Notifications & activity",
    items: [
      { n: 36, label: "Notifications center", to: "/app/notifications" },
      { n: 37, label: "Activity log", to: "/app/activity" },
    ],
  },
  {
    title: "Analytics",
    items: [
      { n: 38, label: "Storage analytics", to: "/app/analytics" },
      { n: 39, label: "Activity analytics", to: "/app/analytics/activity" },
    ],
  },
  {
    title: "WhatsApp bot",
    items: [
      { n: 40, label: "Bot onboarding", to: "/app/whatsapp" },
      { n: 41, label: "Command reference", to: "/app/whatsapp/commands" },
    ],
  },
  {
    title: "Empty, error & system states (42 – 60)",
    items: [
      { n: 42, label: "Empty drive · No search · No trades · No notifications", to: "/app/empty" },
      { n: 46, label: "Errors: disconnected · upload · offline", to: "/app/errors" },
      { n: 49, label: "404 / expired link", to: "/expired/abc123" },
      { n: 50, label: "Toasts · dialogs · context menu · skeletons · drag-drop · progress", to: "/components" },
    ],
  },
];

export default function Catalogue() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Logo />
          <Link
            href="/app"
            className="inline-flex items-center gap-2 rounded-md bg-[var(--color-ember)] px-4 py-2 text-sm font-medium text-black hover:bg-[var(--color-ember)]/90"
          >
            Open app <ArrowRight size={16} strokeWidth={1.5} />
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 pb-16 pt-20">
        <div className="max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-ember)]" />
            60 screens · production-ready
          </div>
          <h1 className="font-display text-5xl font-semibold tracking-tight lg:text-7xl">
            One workspace.
            <br />
            <span className="text-[var(--color-ember)]">Every cloud.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
            CloudBridge unifies free storage from Telegram, Google Drive, OneDrive
            and Cloudinary into a single intelligent workspace. AI organizes files,
            secure links transfer them, reputation-scored users trade them.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/app" className="inline-flex h-11 items-center gap-2 rounded-md bg-[var(--color-ember)] px-5 text-sm font-medium text-black hover:bg-[var(--color-ember)]/90">
              Enter dashboard <ArrowRight size={16} strokeWidth={1.5} />
            </Link>
            <Link href="/splash" className="inline-flex h-11 items-center gap-2 rounded-md border border-border px-5 text-sm font-medium hover:bg-accent/10">
              Start from splash
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((g) => (
            <div key={g.title}>
              <h2 className="mb-3 font-display text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {g.title}
              </h2>
              <ul className="divide-y divide-border rounded-lg border border-border bg-card">
                {g.items.map((it) => (
                  <li key={it.n}>
                    <Link
                      href={it.to}
                      className="group flex items-center justify-between gap-4 px-4 py-3 text-sm transition-colors hover:bg-accent/10"
                    >
                      <span className="flex items-center gap-3">
                        <span className="w-6 text-right font-mono text-[10px] tabular-nums text-muted-foreground">
                          {String(it.n).padStart(2, "0")}
                        </span>
                        <span className="text-foreground">{it.label}</span>
                      </span>
                      <ArrowRight size={14} strokeWidth={1.5} className="text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 text-xs text-muted-foreground">
          <span>CloudBridge · Obsidian & Ember theme · 8pt grid</span>
          <span>v0.1 — preview build</span>
        </div>
      </footer>
    </div>
  );
}
