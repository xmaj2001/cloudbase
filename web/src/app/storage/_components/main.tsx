"use client";

import { ApiNode, useNodes } from "@/api/nodes";
import { useCallback, useState } from "react";
import { ToolbarStorage } from "./ToolbarStorage";
import { AnimatePresence, motion } from "framer-motion";
import { UploadCloud } from "lucide-react";
import { GridNodes } from "@/components/nodes/GridNodes";
import { TableNodes } from "@/components/nodes/TableNodes";
import { UploadModal } from "@/lib/upload/UploadModal";
import { useSession } from "@/components/providers/session-provider";
import { DetailNode } from "@/components/nodes/DetailNode";

export function Main() {
  const { data: nodes, isLoading: isNodesLoading } = useNodes();

  const auth = useSession();
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
    if (!e.currentTarget.contains(e.relatedTarget as Node))
      setIsDragOver(false);
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
      <main
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className="relative"
      >
        {isDragOver && (
          <motion.div
            initial={{
              borderColor: "transparent",
              backgroundColor: "transparent",
            }}
            animate={{
              borderColor: "var(--foreground)",
              backgroundColor:
                "color-mix(in oklab, var(--foreground) 4%, transparent)",
            }}
            className="mt-10 absolute inset-0 z-20 flex flex-col items-center justify-center h-full border border-dashed rounded-2xl p-10 text-center"
          >
            <div className="inline-flex size-14 rounded-2xl bg-surface-2 items-center justify-center mb-4">
              <UploadCloud className="size-7 stroke-[1.5]" />
            </div>
            <div className="text-base font-medium tracking-tight">
              Arrasta ficheiros para enviar
            </div>
          </motion.div>
        )}
        <div className="space-y-5 h-full">
          <ToolbarStorage
            view={view}
            setView={setView}
            query={query}
            setQuery={setQuery}
            onUploadClick={handleUploadClick}
          />

          <AnimatePresence mode="wait">
            {view === "grid" ? (
              <GridNodes
                nodes={nodes}
                isLoading={isNodesLoading}
                onSelectNode={setSelectNode}
              />
            ) : (
              <TableNodes
                nodes={nodes}
                isLoading={isNodesLoading}
                onSelectNode={setSelectNode}
              />
            )}
          </AnimatePresence>
        </div>
      </main>
      {selectNode && (
        <DetailNode n={selectNode} onClose={() => setSelectNode(null)} />
      )}

      {uploadOpen && (
        <UploadModal
          userId={auth.user.id}
          open={uploadOpen}
          onOpenChange={setUploadOpen}
          initialFiles={droppedFiles}
        />
      )}
    </>
  );
}
