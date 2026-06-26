'use client'
import { useNodes } from "@/hooks/use-nodes"
import { ApiNode } from "@/lib/api/node/types";
import { useState } from "react";
import NodeToolBar from "./NodeToolBar";
import GridNodes from "./GridNodes";
import { ListNodes } from "./ListNodes";
import { NodeDetailSheet } from "./NodeDetailSheet";

interface ExploreFIleProps {

}

export const ExploreNodes = () => {
    const { data: nodes, isLoading, error } = useNodes("a2f54be0-3154-46a6-a629-23388ddbb573", null)
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
    const [activeFile, setActiveFile] = useState<ApiNode | null>(null);
    return (
        <div className={`flex-1 flex flex-col p-4 md:p-8 transition-all duration-300`}>
            {/* Toolbar */}
            <NodeToolBar viewMode={viewMode} setViewMode={setViewMode} />

            {
                viewMode === "grid" ? (
                    <GridNodes nodes={nodes || []} isLoading={isLoading} onNodeClick={setActiveFile} />
                ) : (
                    <ListNodes nodes={nodes || []} isLoading={isLoading} onNodeClick={setActiveFile} />
                )
            }

            {/* Sheet de detalhes do nó */}
            <NodeDetailSheet
                node={activeFile}
                open={!!activeFile}
                onOpenChange={(open) => !open && setActiveFile(null)}
                onTrashed={() => setActiveFile(null)}
            />
        </div>
    )
}
