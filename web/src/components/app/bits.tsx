import * as React from "react";
import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";
import { providers, providerLabel } from "@/lib/mock";

export type Provider = string;
export type FileItem = {
  id: string;
  name: string;
  type: string;
  provider: Provider;
  size: string;
  date: string;
};

export function fileIconName(type: string): string {
  const t = type.toLowerCase();
  if (t.includes('spreadsheet') || t.includes('excel')) return "FileSpreadsheet";
  if (t.includes('video') || t.includes('mp4')) return "Video";
  if (t.includes('doc') || t.includes('pdf')) return "FileText";
  if (t.includes('archive') || t.includes('zip')) return "Archive";
  if (t.includes('design') || t.includes('fig')) return "PenTool";
  if (t.includes('img') || t.includes('image')) return "Image";
  return "File";
}

export function ProviderDot({ p, size = 8 }: { p: Provider; size?: number }) {
  const color = providers.find((x) => x.id === p)?.color ?? "var(--color-muted-foreground)";
  return <span style={{ background: color, width: size, height: size }} className="inline-block rounded-full" title={providerLabel(p)} />;
}

export function ProviderBadge({ p }: { p: Provider }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/60 px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
      <ProviderDot p={p} />
      {providerLabel(p)}
    </span>
  );
}

export function FileIcon({ type, size = 18, className }: { type: FileItem["type"]; size?: number; className?: string }) {
  const iconName = fileIconName(type);
  const Comp = (Icons as any)[iconName] ?? Icons.File;
  return <Comp size={size} strokeWidth={1.5} className={className} />;
}

export function FileCard({ f, onSelect, selected }: { f: FileItem; onSelect?: () => void; selected?: boolean }) {
  return (
    <div
      className={cn(
        "group relative flex flex-col rounded-lg border border-border bg-card p-3 transition-colors hover:border-[var(--color-ember)]/40",
        selected && "border-[var(--color-ember)]"
      )}
      onClick={onSelect}
    >
      <div className="mb-3 flex aspect-[4/3] items-center justify-center rounded-md bg-surface text-muted-foreground">
        <FileIcon type={f.type} size={28} className="text-muted-foreground" />
      </div>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="truncate text-sm font-medium text-foreground">{f.name}</div>
          <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <ProviderDot p={f.provider} />
            <span>{f.size}</span>
            <span>·</span>
            <span>{f.date}</span>
          </div>
        </div>
        <Icons.MoreHorizontal size={16} strokeWidth={1.5} className="shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
    </div>
  );
}

export function FileRow({ f }: { f: FileItem }) {
  return (
    <div className="group grid grid-cols-[1fr_auto] items-center gap-3 border-b border-border px-3 py-3 last:border-0 hover:bg-accent/5 lg:grid-cols-[minmax(0,2fr)_120px_100px_140px_120px_60px]">
      <div className="flex min-w-0 items-center gap-3">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-surface text-muted-foreground">
          <FileIcon type={f.type} size={16} />
        </div>
        <div className="min-w-0">
          <div className="truncate text-sm font-medium">{f.name}</div>
          <div className="text-[11px] text-muted-foreground lg:hidden">{f.size} · {f.date}</div>
        </div>
      </div>
      <div className="hidden text-xs uppercase tracking-wider text-muted-foreground lg:block">{f.type}</div>
      <div className="hidden text-xs text-muted-foreground lg:block">{f.size}</div>
      <div className="hidden lg:block"><ProviderBadge p={f.provider} /></div>
      <div className="hidden text-xs text-muted-foreground lg:block">{f.date}</div>
      <div className="hidden justify-end text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 lg:flex">
        <Icons.MoreHorizontal size={16} strokeWidth={1.5} />
      </div>
      <Icons.MoreHorizontal size={16} strokeWidth={1.5} className="text-muted-foreground lg:hidden" />
    </div>
  );
}

export function StorageRing({ size = 200, stroke = 14 }: { size?: number; stroke?: number }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  let acc = 0;
  const totalUsed = providers.reduce((sum, p) => sum + p.used, 0);
  const totalAvail = providers.reduce((sum, p) => sum + p.total, 0);
  return (
    <div className="relative inline-flex" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--color-surface-2)" strokeWidth={stroke} />
        {providers.map((p) => {
          const frac = p.used / totalAvail;
          const dash = frac * c;
          const el = (
            <circle
              key={p.id}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={p.color}
              strokeWidth={stroke}
              strokeDasharray={`${dash} ${c - dash}`}
              strokeDashoffset={-acc}
              strokeLinecap="butt"
            />
          );
          acc += dash;
          return el;
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="font-display text-3xl font-semibold tracking-tight">{totalUsed.toFixed(1)}<span className="text-base text-muted-foreground"> GB</span></div>
        <div className="text-xs text-muted-foreground">of {totalAvail} GB unified</div>
      </div>
    </div>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost" | "destructive"; size?: "sm" | "md" | "lg" }) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer";
  const sizes = { sm: "h-8 px-3 text-xs", md: "h-10 px-4 text-sm", lg: "h-12 px-6 text-sm" };
  const variants = {
    primary: "bg-[var(--color-ember)] text-black hover:bg-[var(--color-ember)]/90",
    secondary: "border border-border bg-transparent text-foreground hover:bg-accent/10",
    ghost: "text-muted-foreground hover:bg-accent/10 hover:text-foreground",
    destructive: "bg-destructive/15 text-destructive hover:bg-destructive/25 border border-destructive/30",
  };
  return (
    <button className={cn(base, sizes[size], variants[variant], className)} {...props}>
      {children}
    </button>
  );
}

export function Field({
  label, hint, error, children,
}: { label: string; hint?: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-muted-foreground">{label}</span>
      {children}
      {hint && !error && <span className="mt-1 block text-[11px] text-muted-foreground">{hint}</span>}
      {error && <span className="mt-1 block text-[11px] text-destructive">{error}</span>}
    </label>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "h-10 w-full rounded-md border border-border bg-surface px-3 text-sm placeholder:text-muted-foreground focus:border-[var(--color-ember)]/60 focus:outline-none focus:ring-2 focus:ring-ring",
        props.className
      )}
    />
  );
}

export function Toggle({ on }: { on?: boolean }) {
  return (
    <span className={cn("relative inline-flex h-5 w-9 items-center rounded-full transition-colors", on ? "bg-[var(--color-ember)]" : "bg-surface-2 border border-border")}>
      <span className={cn("inline-block h-4 w-4 transform rounded-full bg-foreground transition-transform", on ? "translate-x-4" : "translate-x-0.5")} />
    </span>
  );
}

export function Chip({ active, children, onClick }: { active?: boolean; children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition-colors cursor-pointer",
        active
          ? "border-[var(--color-ember)]/60 bg-[var(--color-ember)]/10 text-foreground"
          : "border-border bg-transparent text-muted-foreground hover:text-foreground"
      )}
    >
      {children}
    </button>
  );
}

export function EmptyState({
  icon: Icon = Icons.Inbox,
  title, body, action,
}: { icon?: any; title: string; body: string; action?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-card/40 px-6 py-16 text-center">
      <div className="mb-4 grid h-14 w-14 place-items-center rounded-full border border-border bg-surface text-muted-foreground">
        <Icon size={24} strokeWidth={1.5} />
      </div>
      <h3 className="font-display text-lg font-semibold tracking-tight">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">{body}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-2 font-display text-2xl font-semibold tracking-tight">{value}</div>
      {hint && <div className="mt-1 text-xs text-muted-foreground">{hint}</div>}
    </div>
  );
}
