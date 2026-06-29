'use client'
import { useEffect, useState } from "react";
import { AlertTriangle, CheckCircle2, Info, Loader2, Scissors } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DriverDto, PROVIDER_ICONS } from "@/types/drivers";
import {
  analyzeUpload,
  AnalysisResult,
  formatBytes,
  buildFragmentPlan,
} from "@/lib/api/drivers/features/upload-analysis";
import { cn } from "@/lib/utils";
import { ApiDriver } from "@/lib/api/drivers/types";

interface StepDriverSelectProps {
  drivers: ApiDriver[];
  loading: boolean;
  fileSize: number;
  selectedDriverIds: string[];
  onSelectionChange: (ids: string[]) => void;
  analysis: AnalysisResult | null;
  onAnalysisChange: (result: AnalysisResult | null) => void;
  forceFragment: boolean;
  onForceFragmentChange: (v: boolean) => void;
}

export function StepDriverSelect({
  drivers,
  loading,
  fileSize,
  selectedDriverIds,
  onSelectionChange,
  analysis,
  onAnalysisChange,
  forceFragment,
  onForceFragmentChange,
}: StepDriverSelectProps) {



  // Recalcula a análise sempre que a seleção muda
  useEffect(() => {
    const selected = drivers.filter((d) => selectedDriverIds.includes(d.id));
    if (selected.length === 0) { onAnalysisChange(null); return; }
    const result = analyzeUpload(fileSize, selected);
    onAnalysisChange(result);
  }, [selectedDriverIds, drivers, fileSize, onAnalysisChange]);

  const toggleDriver = (id: string) => {
    onSelectionChange(
      selectedDriverIds.includes(id)
        ? selectedDriverIds.filter((x) => x !== id)
        : [...selectedDriverIds, id]
    );
  };

  if (loading) {
    return (
      <div className="flex h-40 items-center justify-center gap-2 text-muted-foreground">
        <Loader2 className="size-5 animate-spin" />
        <span className="text-sm">A carregar drivers…</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground">
        Seleciona um ou mais drivers onde o ficheiro vai ser guardado.
      </p>

      {/* Grid de drivers */}
      <div className="grid grid-cols-2 gap-2">
        {drivers.map((driver) => {
          const selected = selectedDriverIds.includes(driver.id);
          const usedPct = ((+driver.space.totalSpace - +driver.space.availableSpace) / +driver.space.totalSpace) * 100;
          return (
            <div
              key={driver.id}
              onClick={() => toggleDriver(driver.id)}
              className={cn(
                "flex flex-col gap-2 rounded-xl border p-3 text-left transition-all",
                selected
                  ? "border-primary bg-primary/5 ring-1 ring-primary/30"
                  : "border-border hover:border-primary/40 hover:bg-muted/30"
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{PROVIDER_ICONS[driver.displayName] ?? "💾"}</span>
                  <span className="text-sm font-medium truncate">{driver.displayName}</span>
                </div>
                <Checkbox checked={selected} onChange={() => { }} className="pointer-events-none" />
              </div>
              {/* Barra de espaço */}
              <div className="flex flex-col gap-1">
                <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all",
                      usedPct > 85 ? "bg-destructive" : "bg-primary"
                    )}
                    style={{ width: `${usedPct}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  {formatBytes(+driver.space.availableSpace)} livres de {formatBytes(+driver.space.totalSpace)}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Painel de análise */}
      {analysis && (
        <>
          <Separator />
          <AnalysisBanner
            analysis={analysis}
            forceFragment={forceFragment}
            onForceFragmentChange={onForceFragmentChange}
            selectedDrivers={drivers.filter((d) => selectedDriverIds.includes(d.id))}
          />
        </>
      )}
    </div>
  );
}

// ─── Sub-componente: banner de análise ───────────────────────────────────────

function AnalysisBanner({
  analysis,
  forceFragment,
  onForceFragmentChange,
  selectedDrivers,
}: {
  analysis: AnalysisResult;
  forceFragment: boolean;
  onForceFragmentChange: (v: boolean) => void;
  selectedDrivers: ApiDriver[];
}) {
  if (analysis.type === "SINGLE_DRIVER" || analysis.type === "FITS_IN_SELECTED") {
    const driver = analysis.type === "SINGLE_DRIVER" ? analysis.driver : (analysis as any).driver;
    return (
      <div className="flex items-start gap-3 rounded-lg border border-green-500/20 bg-green-500/5 p-3">
        <CheckCircle2 className="size-4 text-green-500 mt-0.5 shrink-0" />
        <div className="text-sm">
          <p className="font-medium text-green-700 dark:text-green-400">Pronto para enviar</p>
          <p className="text-muted-foreground text-xs mt-0.5">
            O ficheiro vai ser guardado em <strong>{driver?.displayName}</strong>.
          </p>
        </div>
      </div>
    );
  }

  if (analysis.type === "ASK_FRAGMENT") {
    const plan = forceFragment ? buildFragmentPlan(analysis.fileSize, selectedDrivers) : [];
    return (
      <div className="flex flex-col gap-3 rounded-lg border border-blue-500/20 bg-blue-500/5 p-3">
        <div className="flex items-start gap-3">
          <Info className="size-4 text-blue-500 mt-0.5 shrink-0" />
          <div className="text-sm">
            <p className="font-medium text-blue-700 dark:text-blue-400">
              O ficheiro cabe num único driver
            </p>
            <p className="text-muted-foreground text-xs mt-0.5">
              Selecionaste {analysis.drivers.length} drivers. Queres fragmentar o ficheiro mesmo assim?
            </p>
          </div>
        </div>
        <label className="flex items-center gap-2 cursor-pointer pl-7">
          <Checkbox
            id="force-fragment"
            checked={forceFragment}
            onCheckedChange={(v) => onForceFragmentChange(!!v)}
          />
          <span className="text-sm">Sim, fragmentar pelos drivers selecionados</span>
        </label>
      </div>
    );
  }

  if (analysis.type === "NEEDS_FRAGMENT") {
    return (
      <div className="flex flex-col gap-3 rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
        <div className="flex items-start gap-3">
          <Scissors className="size-4 text-amber-500 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-medium text-amber-700 dark:text-amber-400">
              Fragmentação necessária
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Nenhum driver tem espaço suficiente individualmente. O ficheiro vai ser dividido:
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-1.5 pl-7">
          {analysis.plan.map((chunk) => (
            <div key={chunk.chunkIndex} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5">
                <span>{PROVIDER_ICONS[chunk.driver.type] ?? "💾"}</span>
                <span className="font-medium">{chunk.driver.displayName}</span>
              </div>
              <Badge variant="secondary">{formatBytes(chunk.chunkSizeBytes)}</Badge>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (analysis.type === "NO_SPACE") {
    return (
      <div className="flex items-start gap-3 rounded-lg border border-destructive/20 bg-destructive/5 p-3">
        <AlertTriangle className="size-4 text-destructive mt-0.5 shrink-0" />
        <div className="text-sm">
          <p className="font-medium text-destructive">Espaço insuficiente</p>
          <p className="text-muted-foreground text-xs mt-0.5">
            Os drivers selecionados têm apenas {formatBytes(analysis.totalFree)} livres, mas o ficheiro pesa{" "}
            {formatBytes(analysis.fileSize)}.
          </p>
        </div>
      </div>
    );
  }

  return null;
}
