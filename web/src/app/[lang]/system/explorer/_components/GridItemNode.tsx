"use client";

import { ApiNode } from "@/lib/features/nodes";
import { getNodeIcon } from "@/lib/utils-components";
import { fmtSize } from "@/lib/utils/node";
import { motion } from "framer-motion";

interface GridItemNodeProps {
  n: ApiNode;
  i?: number;
  onClick?: (id: string) => void;
  onNavigate?: (id: string) => void;
  onPreview?: (node: ApiNode) => void;
  isSel?: boolean;
}

export default function GridItemNode({
  n,
  i,
  onClick,
  onNavigate,
  onPreview,
  isSel,
}: GridItemNodeProps) {
  const Icon = getNodeIcon(n.type);
  const isFolder = n.type === "FOLDER";

  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ delay: Math.min((i || 0) * 0.02, 0.2), type: "spring", stiffness: 300, damping: 20 }}
      onClick={() => isFolder ? onNavigate?.(n.id) : onClick?.(n.id)}
      onDoubleClick={() =>
        isFolder ? onNavigate?.(n.id) : onPreview?.(n)
      }
      className={`group text-left rounded-xl border p-3 transition-colors shadow-sm ${
        isSel
          ? "border-foreground bg-accent"
          : "border-border/50 hover:border-foreground/30 hover:bg-surface-2 hover:shadow-md"
      } ${isFolder ? "flex items-center gap-3 h-14" : "flex flex-col"}`}
    >
      {isFolder ? (
        <>
          <div className="shrink-0 h-8 w-8 rounded-lg bg-blue-500/10 text-blue-500 grid place-items-center group-hover:bg-blue-500/20 transition-colors">
            <Icon className="h-4 w-4" />
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-[13px] font-medium truncate text-foreground">{n.name}</span>
          </div>
        </>
      ) : (
        <>
          <div className="aspect-4/3 w-full rounded-lg bg-surface-2 grid place-items-center mb-3 group-hover:bg-background transition-colors">
            <Icon className="h-6 w-6 text-muted-foreground group-hover:text-foreground transition-colors" />
          </div>
          <div className="flex items-center gap-1.5 w-full">
            <span className="text-[13px] font-medium truncate flex-1">{n.name}</span>
            {n.isFragmented && (
              <span className="mono text-[9px] uppercase px-1 py-0.5 rounded bg-foreground text-background">
                frag
              </span>
            )}
          </div>
          <div className="mt-0.5 mono text-[10px] text-muted-foreground uppercase tracking-wide">
            {fmtSize(Number(n.size))}
          </div>
        </>
      )}
    </motion.button>
  );
}
