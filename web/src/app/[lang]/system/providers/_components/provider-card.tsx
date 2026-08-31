"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Activity } from "lucide-react";
import { ProviderIcon } from "@/components/providers/provider-icon";
import { fmtBytes } from "@/lib/utils";

import { ApiProvider } from "@/lib/features/providers/types";

interface ProviderCardProps {
  provider: ApiProvider;
  index: number;
  providerTotal: number;
  providerUsed: number;
}

const statusStyles: Record<string, string> = {
  ACTIVE: "bg-foreground text-background",
  SYNCING: "bg-surface-2 text-foreground",
  PAUSED: "bg-secondary text-muted-foreground",
  ERROR: "bg-destructive text-destructive-foreground",
};

const statusLabel: Record<string, string> = {
  ACTIVE: "Activo",
  SYNCING: "A sincronizar",
  PAUSED: "Pausado",
  ERROR: "Erro",
};

export function ProviderCard({ provider, index, providerTotal, providerUsed }: ProviderCardProps) {
  const pct = providerTotal > 0 ? Math.min(100, (providerUsed / providerTotal) * 100) : 0;
  const currentStatus = provider.isActive ? "ACTIVE" : "PAUSED";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.03 }}
    >
      <Link
        href={`/system/providers/${provider.id}`}
        className="group block bg-background border border-hairline rounded-2xl p-5 hover:border-foreground transition-all"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-surface-2 flex items-center justify-center shrink-0">
              <ProviderIcon type={provider.type} />
            </div>
            <div className="min-w-0">
              <div className="text-[14px] font-medium leading-tight truncate">
                {provider.displayName}
              </div>
              <div className="text-[12px] text-muted-foreground mt-0.5 truncate uppercase tracking-wider font-mono">
                {provider.type}
              </div>
            </div>
          </div>
          <ArrowUpRight className="size-4 text-muted-foreground group-hover:text-foreground transition-colors" />
        </div>

        <div className="mt-5 flex items-center justify-between text-[11px]">
          <span className={`mono px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider ${statusStyles[currentStatus] || "bg-surface-2"}`}>
            {statusLabel[currentStatus] || "Ativo"}
          </span>
          <span className="mono text-muted-foreground text-[10px]">
            {provider.lastSyncAt
              ? new Date(provider.lastSyncAt).toLocaleDateString("pt-PT")
              : "Nunca sincronizado"}
          </span>
        </div>

        <div className="mt-4">
          <div className="flex justify-between text-[11px] mono text-muted-foreground mb-1.5">
            <span>{fmtBytes(providerUsed)}</span>
            <span>{providerTotal > 0 ? `${fmtBytes(providerTotal)}` : "0"}</span>
          </div>
          <div className="h-1.5 rounded-full bg-surface-2 overflow-hidden">
            <motion.div
              className="h-full bg-foreground"
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.03 }}
            />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3 text-[11px] border-t border-hairline/60 pt-3">
          <div>
            <div className="text-muted-foreground">Ficheiros</div>
            <div className="mono font-medium text-foreground">0</div>
          </div>
          <div>
            <div className="text-muted-foreground">Fragmentos</div>
            <div className="mono font-medium text-foreground">0</div>
          </div>
          <div>
            <div className="text-muted-foreground flex items-center gap-1">
              <Activity className="size-3 text-muted-foreground/70" /> IO
            </div>
            <div className="mono text-[10px] text-muted-foreground">Normal</div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}