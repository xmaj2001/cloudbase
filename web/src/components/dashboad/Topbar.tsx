import {
  Home,
  FileText,
  ImageIcon,
  Film,
  Music,
  Archive,
  Share2,
  MessageSquare,
  HardDrive,
  Search,
  Settings,
  Bell,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "../mode-toggle";

const nav = [
  { icon: Home, label: "Storage", active: true },
  { icon: FileText, label: "Documents" },
  { icon: ImageIcon, label: "Images" },
  { icon: Film, label: "Videos" },
  { icon: Music, label: "Audio" },
  { icon: Archive, label: "Archives" },
  { icon: Share2, label: "Shared" },
  { icon: MessageSquare, label: "Activity" },
  { icon: HardDrive, label: "Drivers" },
];

interface TopbarStorageProps {
  variant?: "default" | "brand";
}

export function TopbarStorage({ variant }: TopbarStorageProps) {
  return (
    <header className={`max-w-350 sticky top-0 m-auto flex ${variant === "brand" ? "justify-between" : ""} items-center gap-4 rounded-2xl bg-background/80 backdrop-blur z-20 px-4 py-3`}>
      {variant === "brand" ? (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Storage</span>
          <ChevronRight className="size-3.5 text-muted-foreground" />
          <span className="font-medium">Todos os ficheiros</span>
        </div>
      ) : (
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
      )}

      {variant !== "brand" && (
        <nav className="mx-auto flex items-center gap-1 rounded-full border border-hairline bg-background/60 p-1">
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
      )}

      <div className="flex items-center gap-2">
        <div className="hidden md:flex items-center gap-2 rounded-full border border-hairline bg-background/60 px-3 py-1.5 text-xs text-muted-foreground w-64">
          <Search className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-muted-foreground">Procurar ficheiros...</span>
          <span className="ml-auto mono text-[10px] border border-hairline rounded px-1">
            ⌘K
          </span>
        </div>
        <ModeToggle />
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
  );
}
