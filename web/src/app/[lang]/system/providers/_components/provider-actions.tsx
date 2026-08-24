"use client";

import { useState } from "react";
import { RefreshCw, Pause } from "lucide-react";

export function ProviderActions({ providerId, dict }: { providerId: string; dict: any }) {
  const [isLoadingSync, setIsLoadingSync] = useState(false);

  const handleSyncProvider = async () => {
    if (!providerId) return;
    setIsLoadingSync(true);
    // TODO: Implement sync provider API
    setTimeout(() => {
      setIsLoadingSync(false);
      console.log("Provider sincronizado com sucesso");
    }, 1000);
  };

  return (
    <div className="flex items-center gap-2 mt-4 md:mt-0">
      <button
        onClick={handleSyncProvider}
        disabled={isLoadingSync}
        className={`inline-flex items-center gap-2 h-9 px-3 rounded-full border border-hairline text-[12px] hover:border-foreground transition font-medium bg-background ${isLoadingSync ? "invert" : ""}`}
      >
        <RefreshCw className={`size-3.5 ${isLoadingSync ? "animate-spin" : ""}`} />{" "}
        {dict?.sync || "Sincronizar"}
      </button>
      <button className="inline-flex items-center gap-2 h-9 px-3 rounded-full border border-hairline text-[12px] hover:border-foreground transition font-medium bg-background">
        <Pause className="size-3.5" /> {dict?.pause || "Pausar"}
      </button>
    </div>
  );
}
