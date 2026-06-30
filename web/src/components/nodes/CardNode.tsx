"use client";

import { motion } from "framer-motion";
import { ApiNode } from "@/lib/api/node/types";
import { fmtSize, iconFor } from "@/lib/utils/node";
import { Skeleton } from "../ui/skeleton";

export function CardNode({ n, onOpen }: { n: ApiNode; onOpen: () => void }) {
  const Icon = iconFor(n.mimeType, n.type);
  const driver = n.location?.providerName
  return (
    <motion.button
      whileHover={{ y: -2 }}
      onClick={onOpen}
      className="group text-left rounded-xl border border-hairline bg-background p-4 hover:border-foreground hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.15)] transition-all duration-300"
    >
      <div className="aspect-4/3 rounded-lg bg-surface-2 mb-3 flex items-center justify-center relative overflow-hidden">
        {n.type === "FOLDER" ? (
          <div className="text-2xl mono">/</div>
        ) : Icon ? (
          <Icon className="size-8 text-muted-foreground stroke-[1.5]" />
        ) : null}
        {n.fragmentation.isFragmented && (
          <span className="absolute top-2 right-2 text-[9px] mono px-1.5 py-0.5 rounded bg-foreground text-background uppercase tracking-wider">frag</span>
        )}
      </div>
      <div className="text-sm font-medium truncate">{n.name}</div>
      <div className="mt-1 flex items-center justify-between text-[11px] text-muted-foreground mono">
        <span>{n.type === "FOLDER" ? "pasta" : fmtSize(Number(n.size))}</span>
        {driver && <span className="truncate">{driver.split(" · ")[0]}</span>}
      </div>
    </motion.button>
  );
}

export function CardNodeSkeleton() {
  return (
    <motion.button
      whileHover={{ y: -2 }}
      className="group text-left rounded-xl border border-hairline bg-background p-4 hover:border-foreground hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.15)] transition-all duration-300"
    >
      <Skeleton className="aspect-4/3 rounded-lg bg-surface-2 mb-3 flex items-center justify-center relative overflow-hidden">
        <Skeleton className="size-8 text-muted-foreground stroke-[1.5]" />
      </Skeleton>
      <Skeleton className="text-sm font-medium truncate h-4 w-3/4" />
      <div className="mt-1 flex items-center justify-between text-[11px] text-muted-foreground mono">
        <Skeleton className="h-3 w-1/4" />
        <Skeleton className="h-3 w-1/4" />
      </div>
    </motion.button>
  );
}

export function CardNodeEmpty() {
  return (
    <motion.button
      whileHover={{ y: -2 }}
      className="group text-left rounded-xl border border-hairline bg-background p-4 hover:border-foreground hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.15)] transition-all duration-300"
    >
      <div className="aspect-4/3 rounded-lg bg-surface-2 mb-3 flex items-center justify-center relative overflow-hidden">
        <span className="text-2xl mono">/</span>
      </div>
      <div className="text-sm font-medium truncate">Sem ficheiros</div>
      <div className="mt-1 flex items-center justify-between text-[11px] text-muted-foreground mono">
        <span>—</span>
        <span>—</span>
      </div>
    </motion.button>
  );
}
