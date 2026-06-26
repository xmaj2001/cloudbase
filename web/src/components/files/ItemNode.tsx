import { ApiNode } from "@/lib/api/node/types";
import { getNodeIcon, getProviderColor } from "@/lib/utils-components";
import { CheckCircle2 } from "lucide-react";

interface ItemNodeProps {
    node: ApiNode;
    onNodeClick?: (node: ApiNode | null) => void;
    // toggleSelection: (id: string, e: React.MouseEvent) => void;
}
export const ItemNode = ({ node, onNodeClick }: ItemNodeProps) => {
    return (
        <div
            key={node.id}
            className={`grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-4 py-3 items-center rounded-[3px] cursor-pointer transition-colors border border-transparent hover:bg-surface-50`}
            onClick={() => onNodeClick?.(node)}
        >
            <div className="col-span-1 md:col-span-6 flex items-center gap-3">
                <div
                    className={`h-4 w-4 rounded border flex items-center justify-center shrink-0 transition-all border-surface-300 bg-background`}
                // onClick={(e) => toggleSelection(node.id, e)}
                >
                </div>
                {getNodeIcon(node.type)}
                <span className="text-sm font-medium truncate">{node.name}</span>
            </div>
            <div className="col-span-1 md:col-span-2 text-xs font-mono text-surface-400 hidden md:block">{node.size}</div>
            <div className="col-span-1 md:col-span-3 text-xs text-surface-400 hidden md:block">{node.createdAt}</div>
            <div className="col-span-1 md:col-span-1 flex justify-end hidden md:flex">
                <div className={`h-2 w-2 rounded-full ${node?.location?.providerName ? getProviderColor(node?.location?.providerName) : 'bg-gray-500'}`} title={node?.location?.providerName} />
            </div>
        </div>
    )
}
