"use client";
import { ApiNode } from "@/lib/api/node/types";
import { fmtSize, iconFor } from "@/lib/utils/node";
import { motion } from "framer-motion";
import { MoreHorizontal } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

interface TableNodesProps {
  nodes: ApiNode[] | undefined;
  isLoading?: boolean;
  onSelectNode?: (node: ApiNode) => void;
}

export function TableNodes({ nodes, isLoading, onSelectNode }: TableNodesProps) {
  return (
    <motion.div
      key="list"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="rounded-2xl border border-hairline overflow-hidden"
    >
      <table className="w-full">
        <thead className="bg-surface-2">
          <tr className="text-left text-[11px] uppercase tracking-widest text-muted-foreground">
            <th className="py-3 px-4 font-normal">Nome</th>
            <th className="py-3 font-normal">Tamanho</th>
            <th className="py-3 font-normal">Driver</th>
            <th className="py-3 font-normal">Tags</th>
            <th className="py-3 font-normal">Modificado</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <>
              {Array.from({ length: 8 }).map((_, i) => (
                <NodeRowSkeleton key={i} />
              ))}
            </>
          ) : (
            nodes?.map((n) => (
              <NodeRow key={n.id} n={n} onOpen={() => onSelectNode?.(n)} />
            ))
          )}
        </tbody>
      </table>
    </motion.div>
  );
}

export function NodeRow({ n, onOpen }: { n: ApiNode; onOpen: () => void }) {
  const Icon = iconFor(n.mimeType, n.type);
  const driver = n.location?.providerName;
  return (
    <motion.tr
      whileHover={{ backgroundColor: "var(--color-surface-2)" }}
      onClick={onOpen}
      className="border-b border-hairline/60 cursor-pointer"
    >
      <td className="py-3 pr-4">
        <div className="flex items-center gap-3">
          {n.type === "FOLDER" ? (
            <span className="size-8 rounded-md bg-surface-2 flex items-center justify-center mono">
              /
            </span>
          ) : Icon ? (
            <span className="size-8 rounded-md bg-surface-2 flex items-center justify-center">
              <Icon className="size-4 stroke-[1.5]" />
            </span>
          ) : null}
          <div>
            <div className="text-sm font-medium">{n.name}</div>
            {n.aiMetadata.category && (
              <div className="text-[11px] text-muted-foreground mono">
                {n.aiMetadata.category}
              </div>
            )}
          </div>
          {n.fragmentation.isFragmented && (
            <span className="text-[9px] mono px-1.5 py-0.5 rounded bg-foreground text-background uppercase tracking-wider">
              frag
            </span>
          )}
        </div>
      </td>
      <td className="py-3 text-[12px] text-muted-foreground mono">
        {fmtSize(Number(n.size)) ?? "—"}
      </td>
      <td className="py-3 text-[12px] text-muted-foreground">
        {driver?.split(" · ")[0] ?? "—"}
      </td>
      <td className="py-3 text-[12px] text-muted-foreground">
        <div className="flex flex-wrap gap-1">
          {n.tags.map((t) => (
            <span
              key={t}
              className="px-1.5 py-0.5 rounded bg-surface-2 mono text-[10px]"
            >
              {t}
            </span>
          ))}
        </div>
      </td>
      <td className="py-3 text-[12px] text-muted-foreground">{n.updatedAt}</td>
      <td className="py-3 text-right">
        <button className="p-1.5 rounded hover:bg-surface-2">
          <MoreHorizontal className="size-4" />
        </button>
      </td>
    </motion.tr>
  );
}

export function NodeRowSkeleton() {
  return (
    <motion.tr
      whileHover={{ backgroundColor: "var(--color-surface-2)" }}
      className="border-b border-hairline/60"
    >
      <td className="py-3 pr-4">
        <div className="flex items-center gap-3">
          <span className="size-8 rounded-md bg-surface-2 flex items-center justify-center mono" />
          <Skeleton className="h-4 w-32" />
        </div>
      </td>
      <td className="py-3 text-[12px] text-muted-foreground mono">
        <Skeleton className="h-3 w-12" />
      </td>
      <td className="py-3 text-[12px] text-muted-foreground">
        <Skeleton className="h-3 w-16" />
      </td>
      <td className="py-3 text-[12px] text-muted-foreground">
        <Skeleton className="h-3 w-20" />
      </td>
      <td className="py-3 text-[12px] text-muted-foreground">
        <Skeleton className="h-3 w-16" />
      </td>
      <td className="py-3 text-right">
        <Skeleton className="h-6 w-6 rounded-full" />
      </td>
    </motion.tr>
  );
}
