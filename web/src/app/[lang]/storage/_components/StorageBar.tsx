"use client";


import { useDrivers, useDriversSummary } from "@/api/drivers";
import { DriverIcon } from "@/components/drivers/driver-icon";
import { motion } from "framer-motion";
import { Sparkles, Shield, Boxes, Loader2 } from "lucide-react";

// Mapa de labels amigáveis para manter o fallback estético na UI
const DRIVER_LABEL_MAP: Record<string, string> = {
  GOOGLE_DRIVE: "Google Drive",
  ONEDRIVE: "OneDrive",
  TELEGRAM: "Telegram",
  MEGA: "MEGA",
  VPS: "Hetzner VPS",
  CLOUDINARY: "Cloudinary",
  DROPBOX: "Dropbox",
  BOX: "Box.com",
  PCLOUD: "pCloud",
  YANDEX: "Yandex Disk",
  LOCAL_MACHINE: "Máquina Local",
};

export function StorageBar() {
  // ── 1. Chamada aos teus Hooks Reais ───────────────────────────────
  const { data: drivers = [], isLoading: isLoadingDrivers } = useDrivers();
  const { data: summary, isLoading: isLoadingSummary } = useDriversSummary();

  if (isLoadingDrivers || isLoadingSummary) {
    return (
      <div className="h-44 w-full flex items-center justify-center border border-hairline bg-background rounded-2xl">
        <Loader2 className="size-5 animate-spin text-muted-foreground mr-2" />
        <span className="text-xs font-mono text-muted-foreground">
          A consolidar storages em tempo real...
        </span>
      </div>
    );
  }

  const totalUnificado = summary?.totalGb ?? 0;
  const totalUsado = summary?.usedGb ?? 0;
  const livreUnificado = Math.max(0, totalUnificado - totalUsado);
  const percentagemGlobal =
    totalUnificado > 0 ? (totalUsado / totalUnificado) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-hairline border border-hairline rounded-2xl overflow-hidden"
    >
      {/* CARD 1: TOTAL UNIFICADO */}
      <div className="bg-background p-6">
        <div className="text-xs uppercase tracking-widest text-muted-foreground">
          Total unificado
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-4xl font-medium tracking-tight tabular-nums">
            {totalUnificado.toFixed(1)}
          </span>
          <span className="text-sm font-medium text-muted-foreground">GB</span>
          {/* TODO: Implement ilimitado display */}
          {drivers.some((d) => d.space.totalGb === null) && (
            <span className="ml-1 text-[11px] text-muted-foreground px-1.5 py-0.5 bg-surface-2 rounded-md border border-hairline">
              {/* + Telegram ilimitado */}
            </span>
          )}
        </div>

        <div className="mt-5 h-1.5 bg-surface-2 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(percentagemGlobal, 100)}%` }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="h-full bg-foreground"
          />
        </div>
        <div className="mt-2 text-xs text-muted-foreground font-mono">
          usado: {totalUsado.toFixed(1)} GB · livre: {livreUnificado.toFixed(1)}{" "}
          GB
        </div>
      </div>

      {/* CARD 2: DISTRIBUIÇÃO COM TEU DRIVER_ICON */}
      <div className="bg-background p-6">
        <div className="text-xs uppercase tracking-widest text-muted-foreground">
          Distribuição
        </div>
        <ul className="mt-3 space-y-2">
          {drivers.slice(0, 4).map((d) => {
            const isIlimitado = d.space.totalGb === null;
            const percentagemIndividual = isIlimitado
              ? 5
              : d.space.totalGb! > 0
                ? (d.space.usedGb / d.space.totalGb!) * 100
                : 0;

            return (
              <li key={d.id} className="text-[12px]">
                <div className="flex items-center justify-between mb-1">
                  <span className="flex items-center gap-2 font-medium">
                    {/* Reutiliza o teu componente limpo e injeta a classe de tamanho */}
                    <DriverIcon type={d.type} className="size-3.5 shrink-0" />
                    <span className="text-foreground font-normal truncate max-w-35">
                      {d.displayName || DRIVER_LABEL_MAP[d.type]}
                    </span>
                  </span>
                  <span className="font-mono text-muted-foreground">
                    {/*  */}
                  </span>
                </div>

                <div className="h-1 bg-surface-2 rounded-full overflow-hidden">
                  {/* Como o teu DriverIcon já pinta via style Inline, podemos aplicar a mesma cor dinamicamente na barra através do teu mapa exposto ou via herança se preferires extrair */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${Math.min(percentagemIndividual, 100)}%`,
                    }}
                    transition={{ duration: 0.9, delay: 0.1 }}
                    className="h-full rounded-full"
                    style={{
                      backgroundColor:
                        d.type === "GOOGLE_DRIVE"
                          ? "#0F9D58"
                          : d.type === "ONEDRIVE"
                            ? "#0078D4"
                            : d.type === "TELEGRAM"
                              ? "#26A5E4"
                              : d.type === "MEGA"
                                ? "#D9272E"
                                : "var(--foreground)",
                    }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* CARD 3: ACTIVIDADE IA */}
      <div className="bg-background p-6">
        <div className="text-xs uppercase tracking-widest text-muted-foreground">
          Actividade IA
        </div>
        <ul className="mt-3 space-y-2.5 text-[13px]">
          {[
            { i: Sparkles, t: "Classificou 12 ficheiros novos" },
            { i: Shield, t: "3 duplicados detectados" },
            { i: Boxes, t: "Sugestão: comprimir /Dev/Backups" },
          ].map((x, i) => (
            <li key={i} className="flex items-start gap-2 text-foreground/90">
              <x.i className="size-3.5 mt-0.5 text-muted-foreground shrink-0" />
              <span>{x.t}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
