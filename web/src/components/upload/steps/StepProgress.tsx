"use client";

import { useEffect, useRef } from "react";
import {
  CheckCircle2,
  Loader2,
  AlertCircle,
  FileText,
  Clock,
  Settings,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn, fmtBytes } from "@/lib/utils";
import { UploadFileProgress, UploadFileStatus } from "../upload.types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

// -----------------------------------------------------------------------------
// PROPS
// -----------------------------------------------------------------------------

interface StepProgressProps {
  fileProgress: UploadFileProgress[]; // progresso real de cada ficheiro vindo do hook
  isDone: boolean;                    // true quando todos os ficheiros terminaram (sucesso ou erro)
  onStart: () => void;                // dispara o upload — chamado no mount
}

// -----------------------------------------------------------------------------
// COMPONENTE AUXILIAR: StatusBadge
// -----------------------------------------------------------------------------

function StatusBadge({ status }: { status: UploadFileStatus }) {
  const config: Record<UploadFileStatus, { label: string; className: string; icon: any }> = {
    WAITING: {
      label: "Em espera",
      className: "bg-surface-2 text-muted-foreground border-hairline",
      icon: Clock,
    },
    HASHING: {
      label: "A calcular Hash",
      className: "bg-amber-500/10 text-amber-500 border-amber-500/20",
      icon: Loader2,
    },
    UPLOADING: {
      label: "A enviar",
      className: "bg-primary/10 text-primary border-primary/20",
      icon: Loader2,
    },
    REGISTERING: {
      label: "A registar",
      className: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      icon: Settings,
    },
    DONE: {
      label: "Concluído",
      className: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      icon: CheckCircle2,
    },
    ERROR: {
      label: "Erro",
      className: "bg-destructive/10 text-destructive border-destructive/20",
      icon: AlertCircle,
    },
  };

  const current = config[status] ?? config.WAITING;
  const Icon = current.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-medium border tabular-nums",
        current.className
      )}
    >
      {current.icon === Loader2 && <Icon className="size-3 animate-spin" />}
      {current.icon !== Loader2 && <Icon className="size-3" />}
      {current.label}
    </span>
  );
}

// -----------------------------------------------------------------------------
// COMPONENTE PRINCIPAL
// -----------------------------------------------------------------------------

export function StepProgress({
  onStart,
  fileProgress,
  isDone,
}: StepProgressProps) {
  // Garante que o upload só é disparado uma vez (evita problemas com React Strict Mode)
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!hasStarted.current) {
      hasStarted.current = true;
      onStart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalFiles = fileProgress.length;

  // ── Média aritmética real do progresso global de todos os ficheiros ────────
  const overallProgress = totalFiles === 0
    ? 0
    : Math.round(
        fileProgress.reduce((sum, f) => sum + f.progress, 0) / totalFiles
      );

  // ── Contagem de estados para o sumário ─────────────────────────────────────
  const doneCount = fileProgress.filter((f) => f.status === "DONE").length;
  const errorCount = fileProgress.filter((f) => f.status === "ERROR").length;
  const activeCount = fileProgress.filter(
    (f) => f.status === "UPLOADING" || f.status === "HASHING" || f.status === "REGISTERING"
  ).length;

  // Texto dinâmico do cabeçalho de progresso
  let helperText = "A preparar o upload...";
  if (activeCount > 0) helperText = `A processar ${activeCount} ficheiro(s)...`;
  if (isDone) {
    helperText = errorCount > 0 
      ? `Concluído com avisos. ${doneCount} enviados, ${errorCount} falharam.`
      : "Todos os ficheiros enviados com sucesso!";
  }

  return (
    <div className="space-y-5">
      {/* Card de Progresso Geral */}
      <div className="rounded-xl border border-hairline p-5 bg-surface-2/30">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            {isDone ? (
              <CheckCircle2
                className={cn("size-5", errorCount > 0 ? "text-amber-500" : "text-emerald-500")}
              />
            ) : (
              <Loader2 className="size-5 animate-spin text-primary" />
            )}
            <div>
              <div className="text-sm font-medium transition-all">
                {helperText}
              </div>
              <div className="text-[11px] text-muted-foreground mono">
                Concluídos: {doneCount + errorCount} de {totalFiles} ficheiros
              </div>
            </div>
          </div>
          <span className="text-2xl font-medium tracking-tight tabular-nums">
            {overallProgress}%
          </span>
        </div>
        <Progress value={overallProgress} className="h-1.5" />
      </div>

      {/* Lista Individual de Ficheiros */}
      <ScrollArea className="max-h-65">
        <ul className="space-y-2 pr-2">
          {fileProgress.map((f) => {
            return (
              <motion.li
                key={f.fileName}
                layout
                className="rounded-lg border border-hairline px-4 py-3 bg-background"
              >
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-md bg-surface-2 flex items-center justify-center shrink-0">
                    <FileText className="size-4 stroke-[1.5]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate" title={f.fileName}>
                      {f.fileName}
                    </div>
                    <div className="text-[11px] text-muted-foreground mono flex items-center gap-1.5">
                      {f.chunksTotal > 1 && (
                        <span className="text-primary font-medium">
                          [Chunk {f.chunksDone}/{f.chunksTotal}] ·
                        </span>
                      )}
                      <span>{Math.round(f.progress)}%</span>
                      {f.error && (
                        <span className="text-destructive truncate max-w-[180px]" title={f.error}>
                          · {f.error}
                        </span>
                      )}
                    </div>
                  </div>
                  <StatusBadge status={f.status} />
                </div>

                {/* Barra de progresso individual animada */}
                <div className="mt-2.5 h-1 rounded-full bg-surface-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${f.progress}%` }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className={cn(
                      "h-full transition-colors duration-300",
                      f.status === "DONE"
                        ? "bg-emerald-500"
                        : f.status === "ERROR"
                        ? "bg-destructive"
                        : f.status === "HASHING" || f.status === "REGISTERING"
                        ? "bg-amber-500"
                        : "bg-primary"
                    )}
                  />
                </div>
              </motion.li>
            );
          })}
        </ul>
      </ScrollArea>
    </div>
  );
}