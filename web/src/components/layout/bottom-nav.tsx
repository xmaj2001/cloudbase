"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Folder, Zap, Share2, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", icon: Home, label: "Home" },
  { href: "/dashboard/files", icon: Folder, label: "Files" },
  { href: "/dashboard/automation", icon: Zap, label: "Automate" },
  { href: "/dashboard/shares", icon: Share2, label: "Share" },
  { href: "/dashboard/settings", icon: Settings, label: "Settings" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 z-50 flex w-full h-16 items-center justify-between border-t border-surface-200 bg-background px-4 pb-safe md:hidden">
      {navItems.map((item) => {
        const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center gap-1 min-w-[64px] h-full",
              isActive ? "text-primary-600" : "text-surface-300 hover:text-foreground"
            )}
          >
            <item.icon size={20} className={isActive ? "fill-primary-50/50" : ""} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
