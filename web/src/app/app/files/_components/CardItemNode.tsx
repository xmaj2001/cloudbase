import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ApiNode, NodeType } from "@/lib/api/node/types";
import { getNodeIcon, getProviderColor } from "@/lib/utils-components";
import { CheckCircle2, MoreVertical } from "lucide-react";

interface CardNodeProps {
    node: ApiNode;
    isSelected: boolean;
    onNodeClick: (node: ApiNode) => void;
    // onSelectionChange: (id: string, e: React.MouseEvent) => void;
}


export default function CardItemNode({ node, isSelected, onNodeClick, }: CardNodeProps) {
    return (
        <Card
            key={node.id}
            className={`cursor-pointer transition-colors group relative ${isSelected ? 'border-primary-500 bg-primary-50/50 dark:bg-primary-900/10' : 'hover:border-surface-300'}`}
            onClick={() => onNodeClick(node)}
        >
            {/* Selection Checkbox overlay */}
            <div
                className={`absolute top-2 left-2 z-10 h-5 w-5 rounded border flex items-center justify-center transition-all ${isSelected ? 'bg-primary-500 border-primary-500 text-white' : 'border-surface-300 bg-background opacity-0 group-hover:opacity-100'}`}
            // onClick={(e) => onSelectionChange(node.id, e)}
            >
                {isSelected && <CheckCircle2 size={12} />}
            </div>

            <CardContent className="p-4 flex flex-col gap-3">
                <div className="flex justify-between items-start">
                    <div className="flex h-12 w-12 items-center justify-center rounded bg-surface-50">
                        {getNodeIcon(node.type)}
                    </div>
                    <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => { e.stopPropagation(); }}>
                        <MoreVertical size={14} />
                    </Button>
                </div>
                <div>
                    <p className="text-sm font-medium truncate">{node.name}</p>
                    <div className="flex items-center justify-between mt-1">
                        <span className="text-xs font-mono text-surface-300">{node.size}</span>
                        <div className={`h-2 w-2 rounded-full ${node.location ? getProviderColor(node.location.providerName) : 'bg-gray-500'}`} title={node.location?.providerName} />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}