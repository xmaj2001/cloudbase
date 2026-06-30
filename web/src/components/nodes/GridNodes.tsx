import { ApiNode } from "@/lib/api/node/types";
import { CardNode, CardNodeSkeleton } from "./CardNode";
import { motion } from "framer-motion";

interface TableNodesProps {
  nodes: ApiNode[] | undefined;
  isLoading?: boolean;
  onSelectNode?: (node: ApiNode) => void;
}

export function GridNodes({ nodes, isLoading, onSelectNode }: TableNodesProps) {
  return (
    <motion.div
      key="grid"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
    >
      {isLoading ? (
        <>
          {Array.from({ length: 8 }).map((_, i) => (
            <CardNodeSkeleton key={i} />
          ))}
        </>
      ) : (
        nodes?.map((n) => (
          <CardNode key={n.id} n={n} onOpen={() => onSelectNode?.(n)} />
        ))
      )}
    </motion.div>
  );
}
