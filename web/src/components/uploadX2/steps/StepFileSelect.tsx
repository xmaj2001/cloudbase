'use client'
import { useCallback } from "react";
import { UploadCloud, FileIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/api/drivers/features/upload-analysis";
import { cn } from "@/lib/utils";

interface StepFileSelectProps {
  files: File[];
  isDragging: boolean;
  onFilesChange: (files: File[]) => void;
  onDragChange: (isDragging: boolean) => void;
}

export function StepFileSelect({
  files,
  isDragging,
  onFilesChange,
  onDragChange,
}: StepFileSelectProps) {
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      onDragChange(false);
      const dropped = Array.from(e.dataTransfer.files);
      if (dropped.length > 0) {
        onFilesChange([...files, ...dropped]);
      }
    },
    [files, onFilesChange, onDragChange]
  );

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    if (selected.length > 0) {
      onFilesChange([...files, ...selected]);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Drop Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); onDragChange(true); }}
        onDragLeave={() => onDragChange(false)}
        onDrop={handleDrop}
        className={cn(
          "relative flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-10 transition-all cursor-pointer",
          isDragging
            ? "border-primary bg-primary/5 scale-[1.01]"
            : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/30"
        )}
        onClick={() => document.getElementById("upload-file-input")?.click()}
      >
        <input
          id="upload-file-input"
          type="file"
          multiple
          className="sr-only"
          onChange={handleFileInput}
        />
        <div className={cn(
          "flex size-14 items-center justify-center rounded-full transition-colors",
          isDragging ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
        )}>
          <UploadCloud className="size-7" />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium">
            {isDragging ? "Largue os ficheiros aqui" : "Arraste os ficheiros ou clique para selecionar"}
          </p>
          <p className="text-xs text-muted-foreground mt-1">Qualquer tipo de ficheiro</p>
        </div>
      </div>

      {/* Preview dos ficheiros selecionados */}
      {files.length > 0 && (
        <div className="flex flex-col gap-2 max-h-[220px] overflow-y-auto pr-1">
          {files.map((file, index) => (
            <div key={`${file.name}-${index}`} className="flex items-center gap-3 rounded-lg border bg-muted/30 p-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <FileIcon className="size-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {formatBytes(file.size)} &middot; {file.type || "tipo desconhecido"}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="size-7 shrink-0 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  onFilesChange(files.filter((_, i) => i !== index));
                }}
              >
                <X className="size-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
