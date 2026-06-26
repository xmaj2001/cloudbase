import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ApiNode, NodeType } from "@/lib/api/node/types";
import { getNodeIcon, getProviderColor } from "@/lib/utils-components";
import { CheckCircle2, MoreHorizontal, MoreVertical } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

interface CardNodeProps {
    node: ApiNode;
    onNodeClick?: (node: ApiNode) => void;
    // onSelectionChange: (id: string, e: React.MouseEvent) => void;
}



export default function CardItemNode({ node, onNodeClick, }: CardNodeProps) {
    return (
        <Card
            key={node.id}
            className={`cursor-pointer group relative flex flex-col rounded-lg border border-border bg-card p-3 transition-colors hover:border-[var(--color-ember)]/40`}
            onClick={() => onNodeClick?.(node)}
        >
            <div className="mb-3 flex aspect-[4/3] items-center justify-center rounded-md bg-surface text-muted-foreground">
                {getNodeIcon(node.type)}
            </div>
            <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                    <div className="truncate text-sm font-medium text-foreground">{node.name}</div>
                    <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                        {/* <ProviderDot p={node.location?.providerName} /> */}
                        <span>{node.size}</span>
                        <span>·</span>
                        <span>{node.createdAt}</span>
                    </div>
                </div>
                <MoreHorizontal size={16} strokeWidth={1.5} className="shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
        </Card>
    )
}

export const CardItemNodeSkeleton = () => {
    return (
        <Card className={`cursor-pointer group relative flex flex-col rounded-lg border border-border bg-card p-3 transition-colors hover:border-[var(--color-ember)]/40`}>
            <div className="mb-3 flex aspect-[4/3] items-center justify-center rounded-md bg-surface text-muted-foreground">
                <Skeleton className="h-12 w-12" />
            </div>
            <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                    <Skeleton className="h-4 w-2/3" />
                    <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-2" />
                        <Skeleton className="h-4 w-2" />
                    </div>
                </div>
                <Skeleton className="h-4 w-2" />
            </div>
        </Card>
    )
}