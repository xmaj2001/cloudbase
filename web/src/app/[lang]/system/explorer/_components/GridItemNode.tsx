"use client";

import { ApiNode } from "@/features/nodes";
import { getNodeIcon } from "@/lib/utils-components";
import { fmtSize } from "@/lib/utils/node";
import { motion } from "framer-motion";

interface GridItemNodeProps {
  n: ApiNode;
  i?: number;
  onClick?: (id: string) => void;
  onPreview?: (node: ApiNode) => void;
  isSel?: boolean;
}

export default function GridItemNode({
  n,
  i,
  onClick,
  onPreview,
  isSel,
}: GridItemNodeProps) {
  const Icon = getNodeIcon(n.type);
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: Math.min((i || 0) * 0.02, 0.2) }}
      onClick={() => onClick?.(n.id)}
      onDoubleClick={() =>
        n.type === "FOLDER" ? onClick?.(n.id) : onPreview?.(n)
      }
      className={`group text-left rounded-lg border p-4 transition-all ${
        isSel
          ? "border-foreground bg-accent"
          : "border-hairline hover:border-foreground/40 hover:bg-surface-2"
      }`}
    >
      <div className="aspect-square rounded-md bg-surface-2 grid place-items-center mb-3 group-hover:bg-background transition-colors">
        <Icon
          className={`h-8 w-8 ${n.type === "FOLDER" ? "text-foreground" : "text-muted-foreground"}`}
        />
      </div>
      <div className="flex items-center gap-1.5">
        <span className="text-[13px] truncate flex-1">{n.name}</span>
        {n.isFragmented && (
          <span className="mono text-[9px] uppercase px-1 py-0.5 rounded bg-foreground text-background">
            frag
          </span>
        )}
      </div>
      <div className="mt-1 mono text-[10px] text-muted-foreground uppercase tracking-wide">
        {n.type === "FOLDER" ? "Pasta" : fmtSize(Number(n.size))}
      </div>
    </motion.button>
  );
}
