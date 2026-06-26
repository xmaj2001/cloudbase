"use client";

import Link from "next/link";
import { DashboardShell as Shell, Section, ShellCard as Card } from "@/components/app/shell";
import { Button, FileCard, ProviderDot, StorageRing } from "@/components/app/bits";
import { providers, files, shares, providerLabel } from "@/lib/mock";
import { Upload, Share2, Sparkles, Send, Repeat, ChevronRight, Clock, CheckCircle2 } from "lucide-react";

const quickActions = [
  { icon: Upload, label: "Upload", to: "/app/files/upload" },
  { icon: Share2, label: "Share", to: "/app/share" },
  { icon: Sparkles, label: "Organize", to: "/app/automation" },
  { icon: Send, label: "Transfer", to: "/app/share" },
  { icon: Repeat, label: "Swap", to: "/app/trade" },
];

export default function DashboardPage() {
  return (
    <>
      <p className="-mt-2 mb-6 text-sm text-muted-foreground lg:mb-8">
        Your unified drive is healthy. 47 files organized last night.
      </p>

      {/* Storage widget */}
      <div className="mb-8 grid gap-4 lg:grid-cols-[auto_1fr]">
        <Card className="flex flex-col items-center justify-center !p-6 lg:w-[280px]">
          <StorageRing />
          <div className="mt-4 text-center text-xs text-muted-foreground">Total unified storage</div>
        </Card>
        <Card className="flex flex-col">
          <div className="mb-4 flex items-baseline justify-between">
            <h3 className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">By provider</h3>
            <Link href="/app/settings/storage" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
              Manage <ChevronRight size={12} strokeWidth={1.5} />
            </Link>
          </div>
          <div className="space-y-4">
            {providers.map((p) => {
              const pct = (p.used / p.total) * 100;
              return (
                <div key={p.id}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2"><ProviderDot p={p.id} /> {p.name}</span>
                    <span className="font-mono text-xs tabular-nums text-muted-foreground">{p.used} / {p.total} GB</span>
                  </div>
                  <div className="h-1 overflow-hidden rounded-full bg-surface-2">
                    <div className="h-full" style={{ width: `${pct}%`, background: p.color }} />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Quick actions */}
      <Section title="Quick actions">
        <div className="grid grid-cols-5 gap-2 lg:gap-3">
          {quickActions.map((q) => (
            <Link key={q.label} href={q.to} className="group flex flex-col items-center gap-2 rounded-lg border border-border bg-card py-4 text-xs transition-colors hover:border-[var(--color-ember)]/40">
              <q.icon size={20} strokeWidth={1.5} className="text-muted-foreground transition-colors group-hover:text-[var(--color-ember)]" />
              <span>{q.label}</span>
            </Link>
          ))}
        </div>
      </Section>

      {/* Recent files */}
      <Section title="Recent files" action={<Link href="/app/files" className="text-xs text-muted-foreground hover:text-foreground">View all</Link>}>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {files.slice(0, 8).map((f) => <FileCard key={f.id} f={f} />)}
        </div>
      </Section>

      {/* Active shares + automation */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">Active shares</h3>
            <Link href="/app/shares" className="text-xs text-muted-foreground hover:text-foreground">Manage</Link>
          </div>
          <ul className="-mx-2 divide-y divide-border">
            {shares.map((s) => (
              <li key={s.name} className="flex items-center justify-between gap-3 px-2 py-3 text-sm">
                <div className="min-w-0">
                  <div className="truncate font-medium">{s.name}</div>
                  <div className="text-[11px] text-muted-foreground">
                    {s.type} · {s.downloads} downloads
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-2 py-0.5 text-[10px] text-muted-foreground">
                  <Clock size={10} strokeWidth={1.5} /> expires {s.expiry}
                </span>
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">Automation</h3>
            <Link href="/app/automation" className="text-xs text-muted-foreground hover:text-foreground">View rules</Link>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Last run</span>
              <span className="inline-flex items-center gap-1.5"><CheckCircle2 size={14} strokeWidth={1.5} className="text-[var(--color-ember)]" /> 47 files · 2h ago</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Next scheduled run</span>
              <span className="font-mono tabular-nums">Tomorrow · 03:00</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Active rules</span>
              <span className="font-mono tabular-nums">4 of 5</span>
            </div>
            <Link href="/app/automation"><Button variant="secondary" size="sm" className="mt-2 w-full">Run organization now</Button></Link>
          </div>
        </Card>
      </div>
    </>
  );
}
