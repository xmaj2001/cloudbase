import { ApiNode } from "@/lib/api/node/types";
import CardItemNode, { CardItemNodeSkeleton } from "./CardItemNode";

interface GridNodesProps {
    nodes: ApiNode[];
    isLoading: boolean;
    onNodeClick?: (node: ApiNode) => void;
}

export default function GridNodes({ nodes, isLoading, onNodeClick }: GridNodesProps) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {isLoading ? (
                Array.from({ length: 12 }).map((_, index) => (
                    <CardItemNodeSkeleton key={index} />
                ))
            ) : (
                nodes.map((node) => {
                    return <CardItemNode key={node.id} node={node} onNodeClick={onNodeClick} />
                })
            )}
        </div>
    )
}
