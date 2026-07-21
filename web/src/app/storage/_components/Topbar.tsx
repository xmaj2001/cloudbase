"use client";

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
import { usePathname } from "next/navigation";
import { ModeToggle } from "../../../components/mode-toggle";
import { AuthSession } from "@/api/core/get-session.server";
import { useSession } from "@/components/providers/session-provider";

const navItems = [
  { icon: Home, label: "Storage", href: "/storage" },
  { icon: FileText, label: "Documents", href: "/storage/documents" },
  { icon: ImageIcon, label: "Images", href: "/storage/images" },
  { icon: Film, label: "Videos", href: "/storage/videos" },
  { icon: Music, label: "Audio", href: "/storage/audio" },
  { icon: Archive, label: "Archives", href: "/storage/archives" },
  { icon: Share2, label: "Shared", href: "/storage/shared" },
  { icon: MessageSquare, label: "Activity", href: "/storage/activity" },
  { icon: HardDrive, label: "Drivers", href: "/storage/drivers" },
];

interface TopbarStorageProps {
  variant?: "default" | "brand";
}

export function TopbarStorage({ variant }: TopbarStorageProps) {
  const pathname = usePathname();
  const auth = useSession();
  // Encontra o item ativo atual baseado na URL
  const activeItem = navItems.find((item) => {
    if (item.href === "/storage") return pathname === "/storage";
    return pathname.startsWith(item.href);
  });

  return (
    <header
      className={`max-w-350 sticky top-0 m-auto flex ${variant === "brand" ? "justify-between" : ""} items-center gap-4 rounded-2xl bg-background/80 backdrop-blur z-20 px-4 py-3`}
    >
      {variant === "brand" ? (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Storage</span>
          <ChevronRight className="size-3.5 text-muted-foreground" />
          <span className="font-medium">
            {activeItem ? activeItem.label : "Todos os ficheiros"}
          </span>
        </div>
      ) : (
        <Link href="/storage" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-md grid place-items-center bg-surface-2 text-background">
            <Image
              src="/logo.png"
              alt="CloudBase"
              width={16}
              height={16}
              className="h-5 w-5"
            />
          </div>
          <span className="display text-lg font-medium leading-none tracking-tight">
            CloudBase
          </span>
        </Link>
      )}

      {variant !== "brand" && (
        <nav className="mx-auto flex items-center gap-1 rounded-full border border-hairline bg-background/60 p-1">
          {navItems.map((n) => {
            // Validação exata ou baseada em prefixo de rota
            const isActive =
              n.href === "/storage"
                ? pathname === "/storage"
                : pathname.startsWith(n.href);

            return (
              <Link
                key={n.label}
                href={n.href}
                className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs transition-all ${
                  isActive
                    ? "bg-foreground text-background shadow-sm font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <n.icon className="h-3.5 w-3.5" />
                {isActive && <span className="mono">{n.label}</span>}
              </Link>
            );
          })}
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
        <ProfileAvatar auth={auth} />
      </div>
    </header>
  );
}

interface ProfileAvatarProps {
  auth: AuthSession;
}
function ProfileAvatar({ auth }: ProfileAvatarProps) {
  if (auth.user.image) {
    return (
      <Image
        src={auth.user.image}
        alt={auth.user.name}
        width={32}
        height={32}
        className="h-9 w-9 rounded-full"
      />
    );
  }

  return (
    <div className="h-9 w-9 rounded-full bg-foreground text-background grid place-items-center mono text-xs font-medium">
      {auth.user.name.charAt(0)}
      {auth.user.name.split(" ")[1]?.charAt(0) || ""}
    </div>
  );
}
