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
import { AuthSession } from "@/api/core/get-session.server";
import { useSession } from "@/components/providers/session-provider";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/mode-toggle";

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
      className={`flex justify-between h-16 shrink-0 items-center gap-2 w-full`}
    >
      <SidebarTrigger className="-ml-1" />
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
          <Bell className="h-4 w-4" />
        </button>
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
