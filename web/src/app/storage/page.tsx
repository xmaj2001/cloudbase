"use client";
import { ChevronRight, UploadCloud } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { StorageBar } from "@/components/dashboad/StorageBar";
import { LogicalSpaceBanner } from "@/components/dashboad/LogicalSpaceBanner";
import { HeaderStorage } from "@/components/dashboad/header";
import { ToolbarStorage } from "@/components/dashboad/ToolbarStorage";
import { useCallback, useMemo, useState } from "react";
import { TableNodes } from "@/components/nodes/TableNodes";
import { GridNodes } from "@/components/nodes/GridNodes";
import { DetailNode } from "@/components/nodes/DetailNode";
import { useNodes } from "@/hooks/use-nodes";
import { ApiNode } from "@/lib/api/node/types";
import { UploadModal } from "@/components/upload/UploadModal";

const USER_ID = "41394207-0974-4ac1-8d6b-75b4147939c6"; // TODO: useUser()
export default function StoragePage() {
  const { data: nodes, isLoading } = useNodes(USER_ID, null);
  const [selectNode, setSelectNode] = useState<ApiNode | null>(null);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [uploadOpen, setUploadOpen] = useState(false);
  const [droppedFiles, setDroppedFiles] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const [query, setQuery] = useState("");

  // const filtered = useMemo(() => {
  //   let list = nodes.filter(
  //     (n) => n.status === (active === "trash" ? "TRASHED" : "ACTIVE"),
  //   );
  //   if (query)
  //     list = list.filter(
  //       (n) =>
  //         n.name.toLowerCase().includes(query.toLowerCase()) ||
  //         n.tags.some((t) => t.includes(query.toLowerCase())),
  //     );
  //   return list;
  // }, [active, query]);

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
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className="h-full"
    >
      <header className="h-16 border-b border-hairline px-8 flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur z-20">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Storage</span>
          <ChevronRight className="size-3.5 text-muted-foreground" />
          <span className="font-medium">Todos os ficheiros</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground mono">
            e7136025··c75c
          </span>
          <div className="size-8 rounded-full bg-foreground text-background flex items-center justify-center text-xs font-medium">
            RP
          </div>
        </div>
      </header>
      <main className="p-8 space-y-8 max-w-350 m-auto">
        <HeaderStorage />
        <StorageBar />
        <LogicalSpaceBanner />
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
                initial={{
                  borderColor: "transparent",
                  backgroundColor: "transparent",
                }}
                key={"na"}
                animate={{
                  borderColor: "var(--foreground)",
                  backgroundColor:
                    "color-mix(in oklab, var(--foreground) 4%, transparent)",
                }}
                className="absolute inset-0 z-20 flex flex-col items-center justify-center min-h-45 h-full border border-dashed rounded-2xl p-10 text-center cursor-pointer transition-colors hover:bg-surface-2/50"
              >
                <motion.div
                  animate={{ y: -4 }}
                  className="inline-flex size-14 rounded-2xl bg-surface-2 items-center justify-center mb-4"
                >
                  <UploadCloud className="size-7 stroke-[1.5]" />
                </motion.div>
                <div className="text-base font-medium tracking-tight">
                  Arrasta ficheiros ou clica para escolher
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  Qualquer tipo de ficheiro · Múltiplos suportados
                </div>
              </motion.div>
            )}
            <AnimatePresence mode="wait">
              {view === "grid" ? (
                <GridNodes
                  nodes={nodes}
                  isLoading={isLoading}
                  onSelectNode={setSelectNode}
                />
              ) : (
                <TableNodes
                  nodes={nodes}
                  isLoading={isLoading}
                  onSelectNode={setSelectNode}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
      {selectNode && (
        <DetailNode n={selectNode} onClose={() => setSelectNode(null)} />
      )}
      {uploadOpen && <UploadModal userId={USER_ID} open={uploadOpen} onOpenChange={setUploadOpen} initialFiles={droppedFiles} />}
    </div>
  );
}
