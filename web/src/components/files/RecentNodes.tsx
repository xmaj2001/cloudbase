'use client'
import { useNodes } from "@/hooks/use-nodes"
import { ApiNode } from "@/lib/api/node/types";
import { useCallback, useState } from "react";
import NodeToolBar from "./NodeToolBar";
import GridNodes from "./GridNodes";
import { ListNodes } from "./ListNodes";
import { UploadModal } from "@/components/upload/UploadModal";
import { NodeDetailSheet } from "./NodeDetailSheet";
import { cn } from "@/lib/utils";

const USER_ID = "a2f54be0-3154-46a6-a629-23388ddbb573"; // TODO: substituir por useUser() quando auth estiver pronto

export const RecentNodes = () => {
    const { data: nodes, isLoading } = useNodes(USER_ID, null)
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
    const [activeFile, setActiveFile] = useState<ApiNode | null>(null);
    const [uploadOpen, setUploadOpen] = useState(false);
    const [droppedFiles, setDroppedFiles] = useState<File[]>([]);
    const [isDragOver, setIsDragOver] = useState(false);

    const breadcrumb = ['Ficheiros recentes'];

    // ── Drag & Drop na área principal ─────────────────────────────────────────

    const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (e.dataTransfer.types.includes("Files")) {
            setIsDragOver(true);
        }
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        // Só sai do drag se o cursor realmente saiu da área (e não de um filho)
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setIsDragOver(false);
        }
    }, []);

    const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(false);
        const files = Array.from(e.dataTransfer.files);
        if (files.length > 0) {
            setDroppedFiles(files);
            setUploadOpen(true);
        }
    }, []);

    const handleUploadClick = () => {
        setDroppedFiles([]);
        setUploadOpen(true);
    };

    return (
        <>
            <div
                className={cn(
                    "flex-1 flex flex-col p-4 md:p-8 transition-all duration-300 relative",
                    isDragOver && "after:absolute after:inset-0 after:rounded-xl after:border-2 after:border-dashed after:border-primary after:bg-primary/5 after:pointer-events-none after:z-10 after:transition-all"
                )}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                {/* Overlay de drag */}
                {isDragOver && (
                    <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                        <div className="flex flex-col items-center gap-2 rounded-2xl bg-background/80 backdrop-blur-sm border border-primary/30 px-8 py-6 shadow-lg">
                            <span className="text-4xl">📂</span>
                            <p className="text-sm font-medium text-primary">Larga para fazer upload</p>
                        </div>
                    </div>
                )}

                {/* Toolbar */}
                <NodeToolBar
                    viewMode={viewMode}
                    setViewMode={setViewMode}
                    breadcrumb={breadcrumb}
                    onUploadClick={handleUploadClick}
                />

                {
                    viewMode === "grid" ? (
                        <GridNodes nodes={nodes || []} isLoading={isLoading} onNodeClick={setActiveFile} />
                    ) : (
                        <ListNodes nodes={nodes || []} isLoading={isLoading} onNodeClick={setActiveFile} />
                    )
                }
            </div>

            {/* Modal de upload */}
            <UploadModal
                open={uploadOpen}
                onOpenChange={setUploadOpen}
                userId={USER_ID}
                parentId={null}
                initialFiles={droppedFiles}
            />

            {/* Sheet de detalhes do nó */}
            <NodeDetailSheet
                node={activeFile}
                open={!!activeFile}
                onOpenChange={(open) => !open && setActiveFile(null)}
                onTrashed={() => setActiveFile(null)}
            />
        </>
    )
}
