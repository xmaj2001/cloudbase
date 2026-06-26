'use client'
import { useNodes } from "@/hooks/use-nodes"
import { ApiNode } from "@/lib/api/node/types";
import { useState } from "react";
import NodeToolBar from "./NodeToolBar";
import GridNodes from "./GridNodes";
import { ListNodes } from "./ListNodes";

interface ExploreFIleProps {

}

export const ExploreNodes = () => {
    const { data: nodes, isLoading, error } = useNodes("a2f54be0-3154-46a6-a629-23388ddbb573", null)
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
    const [activeFile, setActiveFile] = useState<ApiNode | null>(null);
    return (
        <div className={`flex-1 flex flex-col p-4 md:p-8 transition-all duration-300 ${activeFile ? 'md:pr-[320px]' : ''}`}>
            {/* Toolbar */}
            <NodeToolBar viewMode={viewMode} setViewMode={setViewMode} />

            {
                viewMode === "grid" ? (
                    <GridNodes nodes={nodes || []} isLoading={isLoading} />
                ) : (
                    <ListNodes nodes={nodes || []} isLoading={isLoading} />
                )
            }
        </div>
    )
}
