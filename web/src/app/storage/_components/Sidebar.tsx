"use client";

import {
  Home,
  Clock,
  Share2,
  Sparkles,
  Trash2,
  Plus,
  Settings,
  HardDrive,
  Database,
  Send,
  Cloud,
  FolderTree,
  Globe2,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // 💡 Ganha acesso à rota atual do browser
import { cn } from "@/lib/utils";
import { driverIcon } from "@/lib/utils/driver"; // Reutiliza a função de ícones que já tens
import { useUser } from "@/hooks/use-user";
import { useDrivers } from "@/api/drivers";
import { DriverIcon } from "@/components/drivers/driver-icon";

// Estrutura unificada dos links principais da Sidebar
const NAV_ITEMS = [
  { id: "all", label: "Todos os ficheiros", icon: Home, href: "/storage" },
  {
    id: "explore",
    label: "Explorador",
    icon: FolderTree,
    href: "/storage/explorer",
  },
  {
    id: "drivers",
    label: "Os Meus Drivers",
    icon: HardDrive,
    href: "/storage/drivers",
  },
  {
    id: "public",
    label: "Área Pública",
    icon: Globe2,
    href: "/storage/public",
  },
  { id: "recent", label: "Recentes", icon: Clock, href: "/storage/recent" },
  { id: "shared", label: "Partilhados", icon: Share2, href: "/storage/shared" },
  { id: "ai", label: "Sugestões IA", icon: Sparkles, href: "/storage/ai" },
  { id: "trash", label: "Lixeira", icon: Trash2, href: "/storage/trash" },
];

export function SidebarStorage() {
  const pathname = usePathname(); // 💡 Captura o path ativo (Ex: "/storage/explorer")
  const { userId } = useUser();
  const { data: realDrivers = [] } = useDrivers();

  // Mock provisório enquanto não crias os Spaces Lógicos no backend
  const logicalSpaces = [
    {
      id: "ls-1",
      name: "Projecto Alpha",
      sizeGb: 50,
      usedGb: 18.4,
      emoji: "▲",
    },
    {
      id: "ls-2",
      name: "Família Silva",
      sizeGb: 100,
      usedGb: 67.1,
      emoji: "◆",
    },
  ];

  return (
    <aside className="w-64 shrink-0 border-r border-hairline h-screen sticky top-0 flex flex-col bg-background select-none">
      {/* Brand Logo */}
      <Link
        href="/storage"
        className="flex items-center gap-2.5 px-5 h-16 border-b border-hairline"
      >
        <img src="/logo.png" alt="CloudBase" className="h-7 w-7" />
        <span className="font-medium tracking-tight">CloudBase</span>
      </Link>

      {/* Navegação Principal */}
      <nav className="p-3 space-y-0.5">
        {NAV_ITEMS.map((item) => {
          // 💡 Verifica se a rota atual bate exatamente com o link ou se começa por ele
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all",
                isActive
                  ? "bg-foreground text-background"
                  : "hover:bg-surface-2 text-muted-foreground hover:text-foreground",
              )}
            >
              <item.icon className="size-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Secção de Drivers Conectados (Dinâmica do Banco de Dados) */}
      <div className="px-5 mt-4 flex-1 overflow-y-auto no-scrollbar space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/80">
              Drivers Ativos
            </span>
            <Link
              href="/storage/drivers"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Plus className="size-3.5" />
            </Link>
          </div>

          <ul className="space-y-1">
            {realDrivers.slice(0, 5).map((d) => {
              return (
                <li
                  key={d.id}
                  className="flex items-center gap-2.5 text-[13px] py-1 text-muted-foreground font-sans"
                >
                  <DriverIcon
                    type={d.type}
                    className="size-3.5 text-muted-foreground/70 shrink-0"
                  />
                  <span className="truncate text-foreground/90">
                    {d.displayName}
                  </span>
                  {d.status === "SYNCING" && (
                    <span className="ml-auto size-1.5 rounded-full bg-amber-500 animate-pulse" />
                  )}
                </li>
              );
            })}
            {realDrivers.length > 5 && (
              <Link
                href="/storage/drivers"
                className="text-[11px] font-medium text-muted-foreground hover:underline block pt-1"
              >
                + {realDrivers.length - 5} mais drivers
              </Link>
            )}
          </ul>
        </div>

        {/* Secção de Spaces Lógicos */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/80">
              Spaces Lógicos
            </span>
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              <Plus className="size-3.5" />
            </button>
          </div>
          <ul className="space-y-1">
            {logicalSpaces.map((s) => (
              <li key={s.id}>
                <button className="w-full flex items-center gap-2 text-[13px] py-1 hover:text-foreground text-muted-foreground transition-all group text-left">
                  <span className="text-foreground/80 font-mono group-hover:scale-110 transition-transform">
                    {s.emoji}
                  </span>
                  <span className="truncate flex-1">{s.name}</span>
                  <span className="mono text-[10px] opacity-60">
                    {s.usedGb.toFixed(0)}G
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer / Definições Finais */}
      <div className="p-3 border-t border-hairline bg-surface-1/10">
        <Link
          href="/storage/settings"
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-surface-2 transition-colors"
        >
          <Settings className="size-4" /> Definições
        </Link>
      </div>
    </aside>
  );
}
