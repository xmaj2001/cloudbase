"use client";

import { Loader2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn, fmtBytes } from "@/lib/utils";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { ApiDriver, useDrivers } from "@/api/drivers";
import { DriverIcon } from "@/components/drivers/driver-icon";

function getFreeSpace(driver: ApiDriver): string {
  if (!driver.space || driver.space.totalSpace === 0) return "∞";
  const total = driver.space.totalSpace ?? 0;
  const free = total - driver.space.usedSpace;
  console.log("driver.space", driver.space);
  return fmtBytes(free) + " disponíveis";
}
function getpct(driver: ApiDriver): number {
  if (!driver.space || driver.space.totalSpace === 0) return 100;
  const total = driver.space.totalSpace ?? 0;
  const pct = (driver.space.usedSpace / total) * 100;
  return pct;
}

// -----------------------------------------------------------------------------
// PROPS
// -----------------------------------------------------------------------------

interface StepDriverSelectProps {
  userId: string;
  selectedDrivers: ApiDriver[];
  onSelectionChange: (drivers: ApiDriver[]) => void;
}

// -----------------------------------------------------------------------------
// COMPONENTE
// -----------------------------------------------------------------------------
export function StepDriverSelect({
  selectedDrivers,
  onSelectionChange,
  userId,
}: StepDriverSelectProps) {
  const { isLoading, data } = useDrivers();
  
  const toggleDriver = (driver: ApiDriver) => {
    const isSelected = selectedDrivers.some((d) => d.id === driver.id);
    if (isSelected) {
      onSelectionChange(selectedDrivers.filter((d) => d.id !== driver.id));
    } else {
      onSelectionChange([...selectedDrivers, driver]);
    }
  };

  // ── Estado de carregamento ──────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center gap-2 text-muted-foreground">
        <Loader2 className="size-5 animate-spin" />
        <span className="text-sm">A carregar drivers…</span>
      </div>
    );
  }
  const drivers = data || [];
  // ── Sem drivers conectados ──────────────────────────────────────────────────
  if (drivers.length === 0) {
    return (
      <div className="flex h-40 flex-col items-center justify-center gap-2 text-center">
        <p className="text-sm font-medium">Sem drivers conectados</p>
        <p className="text-xs text-muted-foreground">
          Conecta pelo menos um driver nas definições para poderes fazer upload.
        </p>
        {/* TODO: Adicionar link para a página de definições de drivers */}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl bg-surface-2/60 border border-hairline px-4 py-3 text-xs text-muted-foreground">
        <span className="text-foreground font-medium">Dica · </span>
        Se nenhum driver for seleccionado, o sistema escolherá automaticamente a
        melhor combinação de armazenamento.
      </div>

      <ul className="space-y-2">
        {drivers.map((d) => {
          const free = getFreeSpace(d);
          const pct = getpct(d);
          const isOn = selectedDrivers.some((dr) => dr.id === d.id);
          return (
            <motion.li
              key={d.id}
              whileHover={{ y: -1 }}
              onClick={() => toggleDriver(d)}
              className={cn(
                "rounded-xl border p-4 cursor-pointer transition-all flex items-center gap-4",
                isOn
                  ? "border-foreground bg-surface-2/40"
                  : "border-hairline hover:border-foreground/40",
              )}
            >
              <Checkbox
                checked={isOn}
                onCheckedChange={() => toggleDriver(d)}
              />
              <div className="size-10 rounded-lg bg-surface-2 flex items-center justify-center shrink-0">
                <DriverIcon type={d.type} className="size-5 stroke-[1.5]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium truncate">
                    {d.displayName}
                  </span>
                  <span className="text-[9px] mono px-1.5 py-0.5 rounded bg-foreground/10 text-foreground uppercase tracking-widest">
                    {d.status}
                  </span>
                </div>
                <div className="mt-1.5 flex items-center gap-3">
                  <Progress value={pct} className="h-1 flex-1 max-w-50" />
                  <span className="text-[11px] mono text-muted-foreground">
                    {free}
                  </span>
                </div>
              </div>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
