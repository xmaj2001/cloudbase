"use client";
import { HeaderStorage } from "@/components/dashboad/header";
import { StorageBar } from "@/components/dashboad/StorageBar";
import { ToolbarStorage } from "@/components/dashboad/ToolbarStorage";
import { TopbarStorage } from "@/components/dashboad/Topbar";
import { DetailNode } from "@/components/nodes/DetailNode";
import { GridNodes } from "@/components/nodes/GridNodes";
import { TableNodes } from "@/components/nodes/TableNodes";
import { UploadModal } from "@/lib/upload/UploadModal";
import { useNodes } from "@/hooks/use-nodes";
import { ApiNode } from "@/lib/api/node/types";
import { AnimatePresence, motion } from "framer-motion";
import {
  Image as ImageIcon,
  Search,
  ArrowUpRight,
  Send,
  Upload,
  Info,
  UploadCloud,
} from "lucide-react";
import { useCallback, useState } from "react";

const USER_ID = "2af72357-4f6e-4a8f-8d8d-c75f5ad648c8"; // TODO: useUser()
export default function StorageNew() {
  const { data: nodes, isLoading } = useNodes(USER_ID, null);
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
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Top bar */}
      <TopbarStorage />

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
          <div className="relative overflow-auto">
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

      {/* Ask bar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-lg px-6">
        <div className="mx-auto max-w-lg rounded-full border border-hairline bg-surface shadow-[0_20px_40px_-20px_rgba(0,0,0,0.3)] flex items-center gap-3 px-2 py-2">
          <div
            onClick={handleUploadClick}
            className="h-9 w-9 rounded-full bg-foreground text-background grid place-items-center"
          >
            <Upload className="h-4 w-4" />
          </div>
          <input
            placeholder="Perguntar ou procurar nos seus ficheiros..."
            className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
          />
          <button className="h-9 w-9 grid place-items-center rounded-full border border-hairline">
            <Search className="h-4 w-4" />
          </button>
          <button className="h-9 w-9 grid place-items-center rounded-full bg-foreground text-background">
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>

      {selectNode && (
        <DetailNode n={selectNode} onClose={() => setSelectNode(null)} />
      )}
      {uploadOpen && (
        <UploadModal
          userId={USER_ID}
          open={uploadOpen}
          onOpenChange={setUploadOpen}
          initialFiles={droppedFiles}
        />
      )}
    </motion.div>
  );
}

function Section({
  title,
  period,
  children,
}: {
  title: string;
  period?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-4 rounded-2xl border border-hairline bg-surface-2/40 p-4 md:p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1.5">
          <h2 className="text-base font-medium">{title}</h2>
          <Info className="h-3.5 w-3.5 text-muted-foreground" />
        </div>
        <div className="flex items-center gap-2">
          {period && (
            <button className="flex items-center gap-1.5 rounded-full border border-hairline bg-background px-3 py-1 text-[11px] text-muted-foreground">
              {period} <span className="opacity-60">▾</span>
            </button>
          )}
          <button className="h-7 w-7 grid place-items-center rounded-full border border-hairline bg-background">
            <ArrowUpRight className="h-3 w-3" />
          </button>
        </div>
      </div>
      {children}
    </section>
  );
}
