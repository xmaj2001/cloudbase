"use client";
import { useCallback, useRef, useState } from "react";
import { UploadCloud, FileIcon, X, FileText } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { fmtBytes } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface StepFileSelectProps {
  files: File[];
  setFiles: (f: File[]) => void;
}

export function StepFileSelect({ files, setFiles }: StepFileSelectProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const add = (list: FileList | File[]) => {
    setFiles([...files, ...list]);
  };

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.types.includes("Files")) setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node))
      setDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) add(files);
  }, []);

  return (
    <div className="space-y-4">
      <motion.div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        animate={{
          borderColor: dragOver ? "var(--foreground)" : "var(--border)",
          backgroundColor: dragOver
            ? "color-mix(in oklab, var(--foreground) 4%, transparent)"
            : "transparent",
        }}
        className="border border-dashed rounded-2xl p-10 text-center cursor-pointer transition-colors hover:bg-surface-2/50"
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => e.target.files && add(e.target.files)}
        />
        <motion.div
          animate={{ y: dragOver ? -4 : 0 }}
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

      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
                {files.length} ficheiro{files.length > 1 ? "s" : ""}{" "}
                seleccionado{files.length > 1 ? "s" : ""}
              </span>
              <span className="text-[11px] mono text-muted-foreground">
                {fmtBytes(files.reduce((a, b) => a + b.size, 0))}
              </span>
            </div>
            <ScrollArea className="max-h-45 rounded-xl border border-hairline">
              <ul className="divide-y divide-hairline">
                {files.map((f, index) => (
                  <motion.li
                    key={index}
                    layout
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    className="flex items-center gap-3 px-4 py-2.5"
                  >
                    <div className="size-8 rounded-md bg-surface-2 flex items-center justify-center shrink-0">
                      <FileText className="size-4 stroke-[1.5]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium truncate">
                        {f.name}
                      </div>
                      <div className="text-[11px] text-muted-foreground mono">
                        {fmtBytes(f.size)}
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // setFiles(files.filter((x) => x.id !== f.id)); TODO: This is not working because File doesn't have an id, we need to generate one when adding files
                        setFiles(files.filter((x) => x !== f));
                      }}
                      className="p-1.5 rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                    >
                      <X className="size-4" />
                    </button>
                  </motion.li>
                ))}
              </ul>
            </ScrollArea>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
