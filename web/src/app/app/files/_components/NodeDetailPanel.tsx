import { Button } from "@/components/ui/button";
import { ApiNode } from "@/lib/api/node/types";
import { getNodeIcon, getProviderColor } from "@/lib/utils-components";
import { X, Share2, Download, ShieldCheck, Trash2 } from "lucide-react";

interface NodeDetailPanelProps {
    node: ApiNode;
    setActiveNode: (file: ApiNode | null) => void;
}
export default function NodeDetailPanel({ node, setActiveNode }: NodeDetailPanelProps) {
    return (
        <div className="fixed inset-y-0 right-0 w-full max-w-[320px] border-l border-surface-200 bg-background shadow-2xl z-40 transform transition-transform animate-fade-in md:static md:shadow-none flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-surface-200">
                <h3 className="font-semibold tracking-tight">Details</h3>
                <Button variant="ghost" size="icon" onClick={() => setActiveNode(null)}>
                    <X size={16} />
                </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
                <div className="flex flex-col items-center text-center mb-8 gap-4">
                    <div className="flex h-24 w-24 items-center justify-center rounded-lg bg-surface-50 border border-surface-200">
                        {getNodeIcon(node.type)}
                    </div>
                    <div>
                        <h4 className="font-semibold break-all">{node.name}</h4>
                        <p className="text-xs text-surface-300 mt-1">{node.size} • {node.type.toUpperCase()}</p>
                    </div>
                </div>

                <div className="flex flex-col gap-4 text-sm mb-8">
                    <div className="grid grid-cols-3 gap-2">
                        <span className="text-surface-300">Provider</span>
                        <span className="col-span-2 flex items-center gap-2 font-medium capitalize">
                            <div className={`h-2 w-2 rounded-full ${getProviderColor(node.location?.providerName || "")}`} />
                            {node.location?.providerName}
                        </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        <span className="text-surface-300">Modified</span>
                        <span className="col-span-2">{node.createdAt}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        <span className="text-surface-300">Hash</span>
                        <span className="col-span-2 font-mono text-xs text-surface-400 break-all">{node.fragmentation?.originalHash}</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <Button variant="secondary" className="gap-2"><Share2 size={14} /> Share</Button>
                    <Button variant="secondary" className="gap-2"><Download size={14} /> Download</Button>
                    <Button variant="secondary" className="gap-2 col-span-2"><ShieldCheck size={14} /> Verify Trade</Button>
                    <Button variant="destructive" className="gap-2 col-span-2"><Trash2 size={14} /> Delete</Button>
                </div>
            </div>
        </div>
    )
}