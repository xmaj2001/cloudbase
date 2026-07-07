"use client";

import { Plus } from "lucide-react";

interface ConnectDriverFabProps {
  onClick?: () => void;
}

export function ConnectDriverFab({ onClick }: ConnectDriverFabProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 h-12 px-5 rounded-full bg-foreground text-background text-[13px] font-medium shadow-lg hover:scale-105 active:scale-95 transition-all"
    >
      <Plus className="size-4" /> Conectar driver
    </button>
  );
}