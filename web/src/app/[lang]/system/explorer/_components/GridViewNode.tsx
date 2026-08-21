"use client";

import { ApiNode } from "@/features/nodes";
import GridItemNode from "./GridItemNode";

interface GridViewNodeProps {
  nodes: ApiNode[];
}

export default function GridViewNode({ nodes }: GridViewNodeProps) {
  return (
    <div className="p-4 lg:p-6 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
      {nodes.map((n) => (
        <GridItemNode key={n.id} n={n} />
      ))}
    </div>
  );
}
