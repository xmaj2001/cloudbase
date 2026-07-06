import {
  Home,
  Clock,
  Share2,
  Sparkles,
  Trash2,
  Plus,
  Settings,
  Archive,
  Code2,
  Database,
  FileText,
  Film,
  HardDrive,
  ImageIcon,
  Music,
  Send,
  Cloud,
} from "lucide-react";
import Link from "next/link";

// ─── mocked data ──────────────────────────────────────────────
type Driver = {
  id: string;
  type: "GOOGLE_DRIVE" | "ONEDRIVE" | "TELEGRAM" | "MEGA" | "VPS";
  displayName: string;
  status: "ACTIVE" | "SYNCING" | "ERROR";
  space: { totalGb: number; usedGb: number };
};

const drivers: Driver[] = [
  {
    id: "drv-1",
    type: "GOOGLE_DRIVE",
    displayName: "Google Drive · Pessoal",
    status: "ACTIVE",
    space: { totalGb: 15, usedGb: 0.8 },
  },
  {
    id: "drv-2",
    type: "GOOGLE_DRIVE",
    displayName: "Google Drive · Trabalho",
    status: "ACTIVE",
    space: { totalGb: 15, usedGb: 2.2 },
  },
  {
    id: "drv-3",
    type: "GOOGLE_DRIVE",
    displayName: "Google Drive · Backup",
    status: "SYNCING",
    space: { totalGb: 15, usedGb: 0 },
  },
  {
    id: "drv-4",
    type: "ONEDRIVE",
    displayName: "OneDrive · Microsoft",
    status: "ACTIVE",
    space: { totalGb: 5, usedGb: 0.1 },
  },
  {
    id: "drv-5",
    type: "MEGA",
    displayName: "MEGA · Encriptado",
    status: "ACTIVE",
    space: { totalGb: 20, usedGb: 0.3 },
  },
  {
    id: "drv-6",
    type: "TELEGRAM",
    displayName: "Telegram · @meu_storage",
    status: "ACTIVE",
    space: { totalGb: 9999, usedGb: 1.5 },
  },
  {
    id: "drv-7",
    type: "VPS",
    displayName: "VPS Hetzner · 200GB",
    status: "ACTIVE",
    space: { totalGb: 200, usedGb: 22 },
  },
];

type LogicalSpace = { id: string; name: string; sizeGb: number; usedGb: number; members: number; emoji: string };
const logicalSpaces: LogicalSpace[] = [
  { id: "ls-1", name: "Projecto Alpha", sizeGb: 50, usedGb: 18.4, members: 4, emoji: "▲" },
  { id: "ls-2", name: "Família Silva", sizeGb: 100, usedGb: 67.1, members: 6, emoji: "◆" },
  { id: "ls-3", name: "Cliente Lisboa", sizeGb: 20, usedGb: 3.2, members: 2, emoji: "●" },
];



const driverIcon = (t: Driver["type"]) =>
  t === "TELEGRAM" ? Send : t === "VPS" ? HardDrive : t === "MEGA" ? Database : Cloud
export function SidebarStorage({
  active,
  setActive,
}: {
  active: string;
  setActive: (s: string) => void;
}) {
  const items = [
    { id: "all", label: "Todos os ficheiros", icon: Home },
    { id: "explore", label: "Explorador", icon: Home },
    { id: "recent", label: "Recentes", icon: Clock },
    { id: "shared", label: "Partilhados", icon: Share2 },
    { id: "ai", label: "Sugestões IA", icon: Sparkles },
    { id: "trash", label: "Lixeira", icon: Trash2 },
  ];
  return (
    <aside className="w-64 shrink-0 border-r border-hairline h-screen sticky top-0 flex flex-col bg-background">
      <Link
        href="/"
        className="flex items-center gap-2.5 px-5 h-16 border-b border-hairline"
      >
        <img src={"./logo.png"} alt="" className="h-7 w-7" />
        <span className="font-medium tracking-tight">CloudBase</span>
      </Link>
      <div className="p-3 space-y-0.5">
        {items.map((it) => (
          <button
            key={it.id}
            onClick={() => setActive(it.id)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
              active === it.id
                ? "bg-foreground text-background"
                : "hover:bg-surface-2 text-foreground"
            }`}
          >
            <it.icon className="size-4" />
            {it.label}
          </button>
        ))}
      </div>

      <div className="px-5 mt-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
            Drivers
          </span>
          <button className="text-muted-foreground hover:text-foreground">
            <Plus className="size-3.5" />
          </button>
        </div>
        <ul className="space-y-1.5">
          {drivers.slice(0, 5).map((d) => {
            const Icon = driverIcon(d.type);
            return (
              <li
                key={d.id}
                className="flex items-center gap-2 text-[13px] py-1"
              >
                <Icon className="size-3.5 text-muted-foreground shrink-0" />
                <span className="truncate">
                  {d.displayName.split(" · ")[0]}
                </span>
                {d.status === "SYNCING" && (
                  <span className="ml-auto size-1.5 rounded-full bg-foreground animate-pulse" />
                )}
              </li>
            );
          })}
          <li className="text-[12px] text-muted-foreground">
            + {drivers.length - 5} mais
          </li>
        </ul>
      </div>

      <div className="px-5 mt-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
            Spaces lógicos
          </span>
          <button className="text-muted-foreground hover:text-foreground">
            <Plus className="size-3.5" />
          </button>
        </div>
        <ul className="space-y-1.5">
          {logicalSpaces.map((s) => (
            <li key={s.id}>
              <button className="w-full flex items-center gap-2 text-[13px] py-1.5 hover:text-foreground text-muted-foreground transition-colors">
                <span className="mono text-foreground">{s.emoji}</span>
                <span className="truncate">{s.name}</span>
                <span className="ml-auto mono text-[10px]">
                  {s.usedGb.toFixed(0)}/{s.sizeGb}G
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto p-5 border-t border-hairline">
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:bg-surface-2">
          <Settings className="size-4" /> Definições
        </button>
      </div>
    </aside>
  );
}
