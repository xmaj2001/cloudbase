import { ApiNode } from "@/lib/api/node/types";
import { ItemNode } from "./ItemNode";

interface ListNodesProps {
    nodes: ApiNode[];
    isLoading: boolean;
}

export const ListNodes = ({ nodes, isLoading }: ListNodesProps) => {
    return (
        <div className="flex flex-col gap-2">
            <div className="grid grid-cols-12 gap-4 px-4 py-2 text-xs font-medium text-surface-300 border-b border-surface-100 hidden md:grid">
                <div className="col-span-6">Name</div>
                <div className="col-span-2">Size</div>
                <div className="col-span-3">Modified</div>
                <div className="col-span-1 text-right">Provider</div>
            </div>
            {isLoading ? (
                Array.from({ length: 12 }).map((_, index) => (
                    <ItemNodeSkeleton key={index} />
                ))
            ) : (
                nodes.map((node) => {
                    return <ItemNode key={node.id} node={node} />
                })
            )}
        </div>
    )
}

const ItemNodeSkeleton = () => {
    return (
        <div className="grid grid-cols-12 gap-4 px-4 py-3 items-center rounded-[3px] cursor-pointer transition-colors border border-transparent hover:bg-surface-50">
            <div className="col-span-1 md:col-span-6 flex items-center gap-3">
                <div className="h-4 w-4 rounded border flex items-center justify-center shrink-0 transition-all border-surface-300 bg-background" />
                <div className="h-4 w-4 rounded border flex items-center justify-center shrink-0 transition-all border-surface-300 bg-background" />
                <div className="h-4 w-4 rounded border flex items-center justify-center shrink-0 transition-all border-surface-300 bg-background" />
            </div>
            <div className="col-span-1 md:col-span-2 flex items-center gap-3">
                <div className="h-4 w-4 rounded border flex items-center justify-center shrink-0 transition-all border-surface-300 bg-background" />
            </div>
            <div className="col-span-1 md:col-span-3 flex items-center gap-3">
                <div className="h-4 w-4 rounded border flex items-center justify-center shrink-0 transition-all border-surface-300 bg-background" />
            </div>
            <div className="col-span-1 md:col-span-1 flex items-center gap-3">
                <div className="h-4 w-4 rounded border flex items-center justify-center shrink-0 transition-all border-surface-300 bg-background" />
            </div>
        </div>
    )
}