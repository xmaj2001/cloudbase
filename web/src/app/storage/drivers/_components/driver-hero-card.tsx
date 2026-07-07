"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface DriverHeroCardProps {
  driver: any;
  icon: LucideIcon;
  driverUsed: number;
  driverTotal: number;
}

const statusStyles: Record<string, string> = {
  ACTIVE: "bg-foreground text-background",
  SYNCING: "bg-surface-2 text-foreground",
  PAUSED: "bg-secondary text-muted-foreground",
  ERROR: "bg-destructive text-destructive-foreground",
};

const statusLabel: Record<string, string> = {
  ACTIVE: "Activo",
  SYNCING: "A sincronizar",
  PAUSED: "Pausado",
  ERROR: "Erro",
};

export function DriverHeroCard({ driver, icon: Icon, driverUsed, driverTotal }: DriverHeroCardProps) {
  const pct = driverTotal > 0 ? Math.min(100, (driverUsed / driverTotal) * 100) : 0;
  const currentStatus = driver.status || (driver.isActive ? "ACTIVE" : "PAUSED");

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-background border border-hairline rounded-2xl p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-surface-2 flex items-center justify-center shrink-0">
            <Icon className="size-7 stroke-[1.5]" />
          </div>
          <div className="min-w-0">
            <h1 className="text-2xl font-medium tracking-tight truncate">
              {driver.displayName}
            </h1>
            <div className="text-[12px] text-muted-foreground mt-0.5 font-mono uppercase tracking-wider">
              {driver.type}
            </div>
          </div>
        </div>
        <span className={`mono text-[11px] px-2.5 py-0.5 font-medium uppercase tracking-wider rounded-full ${statusStyles[currentStatus] || "bg-surface-2"}`}>
          {statusLabel[currentStatus] || "Ativo"}
        </span>
      </div>

      <div className="mt-8">
        <div className="flex justify-between text-[12px] mono text-muted-foreground mb-2">
          <span>{driverUsed.toFixed(2)} GB usados</span>
          <span>{driverTotal > 0 ? `${driverTotal.toFixed(0)} GB total` : "Ilimitado (∞)"}</span>
        </div>
        <div className="h-2 rounded-full bg-surface-2 overflow-hidden">
          <motion.div
            className="h-full bg-foreground"
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.8 }}
          />
        </div>
      </div>

      {driver.syncError && (
        <div className="mt-5 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-[12px] text-destructive font-mono">
          {driver.syncError}
        </div>
      )}
    </motion.div>
  );
}