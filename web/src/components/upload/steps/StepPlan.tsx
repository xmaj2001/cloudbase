'use client'
import { useState, useMemo } from "react";
import { CheckCircle2, Scissors, HardDrive, ChevronsUpDown, Check, AlertTriangle } from "lucide-react";
import { FilePlan, UploadPlanChunk } from "@/lib/api/upload/types";
import { ApiDriver } from "@/lib/api/drivers/types";
import { PROVIDER_ICONS } from "@/types/drivers";
import { formatBytes } from "@/lib/api/drivers/features/upload-analysis";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

// ─── Props ───────────────────────────────────────────────────────────────────

interface StepPlanProps {
  plan: FilePlan[];
  drivers: ApiDriver[];
  onPlanChange: (plan: FilePlan[]) => void;
}

// ─── Utilitário: calcula o espaço restante por driver dado o plano actual ─────
//
// Para cada driver, começa com o espaço disponível real e subtrai todos os
// chunks actualmente atribuídos a esse driver no plano.
//
function computeRemainingSpace(
  drivers: ApiDriver[],
  plan: FilePlan[],
  excludeChunk?: { fileName: string; chunkIndex: number }
): Map<string, number> {
  const map = new Map<string, number>();

  for (const d of drivers) {
    map.set(d.id, Number(d.space?.availableSpace ?? 0));
  }

  for (const filePlan of plan) {
    for (const chunk of filePlan.chunks) {
      // Ignorar o chunk que está a ser reatribuído (liberta o espaço para comparação)
      if (
        excludeChunk &&
        excludeChunk.fileName === filePlan.fileName &&
        excludeChunk.chunkIndex === chunk.chunkIndex
      ) {
        continue;
      }
      const current = map.get(chunk.driverId) ?? 0;
      map.set(chunk.driverId, current - chunk.chunkSizeBytes);
    }
  }

  return map;
}

// ─── Component principal ─────────────────────────────────────────────────────

export function StepPlan({ plan, drivers, onPlanChange }: StepPlanProps) {
  const hasFragmented = plan.some((f) => f.isFragmented);

  // Reassignar um chunk a um novo driver
  const handleReassign = (
    fileName: string,
    chunkIndex: number,
    newDriver: ApiDriver
  ) => {
    const newPlan = plan.map((filePlan) => {
      if (filePlan.fileName !== fileName) return filePlan;

      const newChunks = filePlan.chunks.map((chunk) => {
        if (chunk.chunkIndex !== chunkIndex) return chunk;
        return {
          ...chunk,
          driverId: newDriver.id,
          driverName: newDriver.displayName,
          driverType: newDriver.type,
        } satisfies UploadPlanChunk;
      });

      return { ...filePlan, chunks: newChunks };
    });

    onPlanChange(newPlan);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Cabeçalho informativo */}
      <div
        className={cn(
          "flex items-start gap-3 rounded-lg border p-3 text-sm",
          hasFragmented
            ? "border-amber-500/20 bg-amber-500/5"
            : "border-green-500/20 bg-green-500/5"
        )}
      >
        {hasFragmented ? (
          <Scissors className="size-4 text-amber-500 mt-0.5 shrink-0" />
        ) : (
          <CheckCircle2 className="size-4 text-green-500 mt-0.5 shrink-0" />
        )}
        <div>
          <p
            className={cn(
              "font-medium",
              hasFragmented
                ? "text-amber-700 dark:text-amber-400"
                : "text-green-700 dark:text-green-400"
            )}
          >
            {hasFragmented ? "Plano com fragmentação" : "Plano de distribuição"}
          </p>
          <p className="text-muted-foreground text-xs mt-0.5">
            Podes alterar o driver de destino de cada ficheiro ou parte clicando
            no driver. Só são apresentados drivers com espaço suficiente.
          </p>
        </div>
      </div>

      {/* Lista de ficheiros */}
      <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto pr-1">
        {plan.map((filePlan) => (
          <FilePlanCard
            key={filePlan.fileName}
            filePlan={filePlan}
            drivers={drivers}
            plan={plan}
            onReassign={handleReassign}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Card de um ficheiro ──────────────────────────────────────────────────────

function FilePlanCard({
  filePlan,
  drivers,
  plan,
  onReassign,
}: {
  filePlan: FilePlan;
  drivers: ApiDriver[];
  plan: FilePlan[];
  onReassign: (fileName: string, chunkIndex: number, driver: ApiDriver) => void;
}) {
  return (
    <div className="rounded-xl border bg-card overflow-hidden">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between px-3 py-2 border-b bg-muted/30">
        <div className="flex items-center gap-2 min-w-0">
          <HardDrive className="size-3.5 shrink-0 text-muted-foreground" />
          <span className="text-sm font-medium truncate">{filePlan.fileName}</span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0 ml-2">
          {filePlan.isFragmented && (
            <Badge
              variant="outline"
              className="text-[10px] px-1.5 py-0 border-amber-500/40 text-amber-600 dark:text-amber-400"
            >
              Fragmentado
            </Badge>
          )}
          <span className="text-xs text-muted-foreground">
            {formatBytes(filePlan.fileSize)}
          </span>
        </div>
      </div>

      {/* Chunks */}
      <div className="flex flex-col divide-y">
        {filePlan.chunks.map((chunk) => (
          <ChunkRow
            key={chunk.chunkIndex}
            fileName={filePlan.fileName}
            chunk={chunk}
            drivers={drivers}
            plan={plan}
            onReassign={onReassign}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Linha de um chunk com selector de driver ─────────────────────────────────

function ChunkRow({
  fileName,
  chunk,
  drivers,
  plan,
  onReassign,
}: {
  fileName: string;
  chunk: UploadPlanChunk;
  drivers: ApiDriver[];
  plan: FilePlan[];
  onReassign: (fileName: string, chunkIndex: number, driver: ApiDriver) => void;
}) {
  const [open, setOpen] = useState(false);

  // Calcula o espaço livre por driver excluindo a alocação actual deste chunk
  const remaining = useMemo(
    () =>
      computeRemainingSpace(drivers, plan, {
        fileName,
        chunkIndex: chunk.chunkIndex,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [drivers, plan, fileName, chunk.chunkIndex]
  );

  // Drivers que têm espaço suficiente para este chunk
  const eligibleDrivers = useMemo(
    () =>
      drivers.filter((d) => (remaining.get(d.id) ?? 0) >= chunk.chunkSizeBytes),
    [drivers, remaining, chunk.chunkSizeBytes]
  );

  const currentDriver = drivers.find((d) => d.id === chunk.driverId);
  const remainingForCurrent = remaining.get(chunk.driverId) ?? 0;
  // Se o driver actual já não tem espaço suficiente (pode acontecer após outra reatribuição)
  const isOverCapacity = remainingForCurrent < 0;

  return (
    <div
      className={cn(
        "flex items-center justify-between px-3 py-2 text-sm transition-colors",
        isOverCapacity && "bg-destructive/5"
      )}
    >
      {/* Info do chunk */}
      <div className="flex flex-col min-w-0 flex-1 mr-3">
        {chunk.isFragment && (
          <div className="flex items-center gap-1.5 mb-0.5">
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
              Parte {chunk.chunkIndex + 1}
            </Badge>
            <span className="text-[10px] text-muted-foreground tabular-nums">
              {chunk.startByte.toLocaleString()} → {chunk.endByte.toLocaleString()} bytes
            </span>
          </div>
        )}
        <span className="text-xs font-medium tabular-nums text-muted-foreground">
          {formatBytes(chunk.chunkSizeBytes)}
        </span>
      </div>

      {/* Selector de driver */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "h-8 max-w-[180px] px-2 text-xs gap-1.5 justify-between shrink-0",
              isOverCapacity && "border-destructive/50 text-destructive"
            )}
          >
            <span className="flex items-center gap-1.5 min-w-0">
              {isOverCapacity ? (
                <AlertTriangle className="size-3.5 shrink-0 text-destructive" />
              ) : (
                <span className="leading-none shrink-0">
                  {PROVIDER_ICONS[chunk.driverType] ?? "💾"}
                </span>
              )}
              <span className="truncate">{chunk.driverName}</span>
            </span>
            <ChevronsUpDown className="size-3 shrink-0 text-muted-foreground" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-64 p-1" align="end">
          <p className="text-[10px] font-medium text-muted-foreground px-2 py-1.5 uppercase tracking-wide">
            Drivers disponíveis — {formatBytes(chunk.chunkSizeBytes)} necessários
          </p>
          {drivers.map((driver) => {
            const free = remaining.get(driver.id) ?? 0;
            const canFit = free >= chunk.chunkSizeBytes;
            const isCurrent = driver.id === chunk.driverId;

            return (
              <button
                key={driver.id}
                disabled={!canFit && !isCurrent}
                onClick={() => {
                  if (canFit || isCurrent) {
                    onReassign(fileName, chunk.chunkIndex, driver);
                    setOpen(false);
                  }
                }}
                className={cn(
                  "w-full flex items-center gap-2 rounded-md px-2 py-1.5 text-xs transition-colors text-left",
                  canFit
                    ? "hover:bg-muted cursor-pointer"
                    : "opacity-40 cursor-not-allowed",
                  isCurrent && "bg-primary/10 font-medium"
                )}
              >
                {/* Ícone do provider */}
                <span className="text-base leading-none shrink-0">
                  {PROVIDER_ICONS[driver.type] ?? "💾"}
                </span>

                {/* Nome + espaço livre */}
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="truncate">{driver.displayName}</span>
                  <span
                    className={cn(
                      "text-[10px] tabular-nums",
                      canFit ? "text-muted-foreground" : "text-destructive/70"
                    )}
                  >
                    {formatBytes(Math.max(0, free))} livres
                    {!canFit && " (insuficiente)"}
                  </span>
                </div>

                {/* Check se está seleccionado */}
                {isCurrent && (
                  <Check className="size-3.5 shrink-0 text-primary" />
                )}
              </button>
            );
          })}
        </PopoverContent>
      </Popover>
    </div>
  );
}
