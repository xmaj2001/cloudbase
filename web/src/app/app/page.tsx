"use client";
import { HeaderStorage } from "@/components/dashboad/header";
import { LogicalSpaceBanner } from "@/components/dashboad/LogicalSpaceBanner";
import { StorageBar } from "@/components/dashboad/StorageBar";
import { motion } from "framer-motion";
import {
  Home,
  FileText,
  Image as ImageIcon,
  Film,
  Music,
  Archive,
  Share2,
  MessageSquare,
  HardDrive,
  Search,
  Settings,
  Bell,
  ArrowUpRight,
  Cloud,
  Database,
  Send,
  Upload,
  Info,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const nav = [
  { icon: Home, label: "Overview", active: true },
  { icon: FileText, label: "Documents" },
  { icon: ImageIcon, label: "Images" },
  { icon: Film, label: "Videos" },
  { icon: Music, label: "Audio" },
  { icon: Archive, label: "Archives" },
  { icon: Share2, label: "Shared" },
  { icon: MessageSquare, label: "Activity" },
  { icon: HardDrive, label: "Drivers" },
];

const kpis = [
  {
    label: "Armazenamento Total",
    sub: "(agregado)",
    value: "2.4 TB",
    delta: "+18%",
    icon: Database,
  },
  {
    label: "Ficheiros",
    value: "8,472",
    delta: "+2.4%",
    icon: FileText,
    deltaNeg: false,
  },
  { label: "Fragmentos Activos", value: "1,203", delta: "+35%", icon: Archive },
  { label: "Uploads Hoje", value: "142", delta: "+12%", icon: Upload },
];

const insights = [
  {
    icon: Cloud,
    label: "Google Drive",
    value: "12.4 GB",
    tone: "a",
    delta: "+35%",
    last: "+40%",
  },
  {
    icon: Send,
    label: "Telegram",
    value: "48.9 GB",
    tone: "b",
    delta: "+22%",
    last: "+18%",
  },
  {
    icon: Cloud,
    label: "OneDrive",
    value: "6.2 GB",
    tone: "c",
    delta: "+8%",
    last: "+12%",
  },
  {
    icon: ImageIcon,
    label: "Cloudinary",
    value: "3.1 GB",
    tone: "d",
    delta: "+15%",
    last: "+20%",
  },
  {
    icon: HardDrive,
    label: "Local Cache",
    value: "890 MB",
    tone: "e",
    delta: "+5%",
    last: "+7%",
  },
];

const files = [
  {
    id: "F001",
    name: "projeto-final.psd",
    type: "Fragmentado",
    driver: "GDrive · Telegram",
    note: "Dividido em 4 fragmentos de 25MB. Reconstituição verificada e íntegra.",
    status: "Sincronizado",
    tone: "ok",
  },
  {
    id: "F002",
    name: "reuniao-Q3.mp4",
    type: "Directo",
    driver: "Telegram",
    note: "Upload directo. Reproduzível em stream via proxy.",
    status: "Pendente",
    tone: "warn",
  },
  {
    id: "F003",
    name: "backup-2026.zip",
    type: "Fragmentado",
    driver: "GDrive · OneDrive · Local",
    note: "Fragmentos ainda não replicados em todos os nós.",
    status: "Falhou",
    tone: "err",
  },
  {
    id: "F004",
    name: "logo-cloudbase.svg",
    type: "Directo",
    driver: "Cloudinary",
    note: "Optimizado e servido via CDN pública.",
    status: "Aprovado",
    tone: "good",
  },
];

const toneBar: Record<string, string> = {
  a: "bg-foreground/70",
  b: "bg-foreground/55",
  c: "bg-foreground/40",
  d: "bg-foreground/30",
  e: "bg-foreground/20",
};

const statusChip: Record<string, string> = {
  ok: "border-foreground/30 text-foreground",
  warn: "border-foreground/20 text-muted-foreground",
  err: "border-destructive/40 text-destructive",
  good: "border-foreground/40 text-foreground",
};

export default function StorageNew() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      {/* Top bar */}
      <header className="max-w-350 m-auto flex items-center gap-4 rounded-2xl bg-background px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-16 rounded-md grid place-items-center text-background text-[10px] mono">
            <Image
              src="/logo.png"
              alt="CloudBase"
              width={16}
              height={16}
              className="h-7 w-7"
            />
          </div>
          <span className="display text-lg leading-none">CloudBase</span>
        </Link>

        <nav className="mx-auto flex items-center gap-1 rounded-full border border-hairline bg-surface-2/60 p-1">
          {nav.map((n) => (
            <button
              key={n.label}
              className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs transition-all ${
                n.active
                  ? "bg-foreground text-background shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <n.icon className="h-3.5 w-3.5" />
              {n.active && <span className="mono">{n.label}</span>}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2 rounded-full border border-hairline bg-surface-2/60 px-3 py-1.5 text-xs text-muted-foreground w-64">
            <Search className="h-3.5 w-3.5" />
            <span>Procurar ficheiros...</span>
            <span className="ml-auto mono text-[10px] border border-hairline rounded px-1">
              ⌘K
            </span>
          </div>
          <button className="h-9 w-9 grid place-items-center rounded-full border border-hairline">
            <Settings className="h-4 w-4" />
          </button>
          <button className="h-9 w-9 grid place-items-center rounded-full border border-hairline">
            <Bell className="h-4 w-4" />
          </button>
          <div className="h-9 w-9 rounded-full bg-foreground text-background grid place-items-center mono text-xs">
            AK
          </div>
        </div>
      </header>

      <main className="p-8 space-y-8 max-w-350 m-auto">
        <HeaderStorage />
        <StorageBar />
        <LogicalSpaceBanner />
      </main>

      {/* Ask bar */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-lg px-6">
        <div className="mx-auto max-w-lg rounded-full border border-hairline bg-surface shadow-[0_20px_40px_-20px_rgba(0,0,0,0.3)] flex items-center gap-3 px-2 py-2">
          <div className="h-9 w-9 rounded-full bg-foreground text-background grid place-items-center">
            <Upload className="h-4 w-4" />
          </div>
          <input
            placeholder="Perguntar ou procurar nos seus ficheiros..."
            className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
          />
          <button className="h-9 w-9 grid place-items-center rounded-full border border-hairline">
            <Search className="h-4 w-4" />
          </button>
          <button className="h-9 w-9 grid place-items-center rounded-full bg-foreground text-background">
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function Section({
  title,
  period,
  children,
}: {
  title: string;
  period?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-4 rounded-2xl border border-hairline bg-surface-2/40 p-4 md:p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1.5">
          <h2 className="text-base font-medium">{title}</h2>
          <Info className="h-3.5 w-3.5 text-muted-foreground" />
        </div>
        <div className="flex items-center gap-2">
          {period && (
            <button className="flex items-center gap-1.5 rounded-full border border-hairline bg-background px-3 py-1 text-[11px] text-muted-foreground">
              {period} <span className="opacity-60">▾</span>
            </button>
          )}
          <button className="h-7 w-7 grid place-items-center rounded-full border border-hairline bg-background">
            <ArrowUpRight className="h-3 w-3" />
          </button>
        </div>
      </div>
      {children}
    </section>
  );
}
