"use client";

import { useState, useCallback } from "react";
import { UploadCloud, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { StorageBar } from "@/components/dashboad/StorageBar";
import { HeaderStorage } from "@/components/dashboad/header";
import { ToolbarStorage } from "@/components/dashboad/ToolbarStorage";
import { TableNodes } from "@/components/nodes/TableNodes";
import { GridNodes } from "@/components/nodes/GridNodes";
import { DetailNode } from "@/components/nodes/DetailNode";
import { TopbarStorage } from "@/components/dashboad/Topbar";
import { UploadModal } from "@/components/upload/UploadModal";

import { useNodes } from "@/hooks/use-nodes";
import { useUser } from "@/hooks/use-user"; // 💡 O teu novo hook
import { ApiNode } from "@/lib/api/node/types";

export default function StoragePage() {
  const { userId, isLoading: isUserLoading } = useUser();
  
  // OuseNodes só vai rodar quando o userId for válido devido ao `enabled: !!userId` interno
  const { data: nodes, isLoading: isNodesLoading } = useNodes(userId ?? "", null);

  const [selectNode, setSelectNode] = useState<ApiNode | null>(null);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [uploadOpen, setUploadOpen] = useState(false);
  const [droppedFiles, setDroppedFiles] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [query, setQuery] = useState("");

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.types.includes("Files")) setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) setIsDragOver(false);
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

  // ── Bloqueio de carregamento inicial da Sessão ──────────────────────────
  if (isUserLoading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center gap-2 bg-background">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
        <span className="text-xs text-muted-foreground font-mono">A validar sessão...</span>
      </div>
    );
  }

  // Segurança extra contra IDs vazios na UI
  if (!userId) return null; 

  return (
    <div onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} className="h-full">
      <TopbarStorage variant="brand" />
      <main className="p-8 space-y-8 max-w-350 m-auto">
        <HeaderStorage />
        <StorageBar />

        <div className="space-y-5">
          <ToolbarStorage
            view={view}
            setView={setView}
            query={query}
            setQuery={setQuery}
            onUploadClick={handleUploadClick}
          />
          
          <div className="relative">
            {isDragOver && (
              <motion.div
                initial={{ borderColor: "transparent", backgroundColor: "transparent" }}
                animate={{
                  borderColor: "var(--foreground)",
                  backgroundColor: "color-mix(in oklab, var(--foreground) 4%, transparent)",
                }}
                className="absolute inset-0 z-20 flex flex-col items-center justify-center min-h-45 h-full border border-dashed rounded-2xl p-10 text-center"
              >
                <div className="inline-flex size-14 rounded-2xl bg-surface-2 items-center justify-center mb-4">
                  <UploadCloud className="size-7 stroke-[1.5]" />
                </div>
                <div className="text-base font-medium tracking-tight">Arrasta ficheiros para enviar</div>
              </motion.div>
            )}

            <AnimatePresence mode="wait">
              {view === "grid" ? (
                <GridNodes nodes={nodes} isLoading={isNodesLoading} onSelectNode={setSelectNode} />
              ) : (
                <TableNodes nodes={nodes} isLoading={isNodesLoading} onSelectNode={setSelectNode} />
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {selectNode && <DetailNode n={selectNode} onClose={() => setSelectNode(null)} />}
      
      {uploadOpen && (
        <UploadModal
          userId={userId} // 💡 Injeta o ID dinâmico real e limpo
          open={uploadOpen}
          onOpenChange={setUploadOpen}
          initialFiles={droppedFiles}
        />
      )}
    </div>
  );
}