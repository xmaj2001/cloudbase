"use client";
import { motion } from "framer-motion";
import { Sparkles, Shield, Boxes, Send, Cloud, Database, HardDrive } from "lucide-react";
// ─── mocked data ──────────────────────────────────────────────
type Driver = {
  id: string;
  type: "GOOGLE_DRIVE" | "ONEDRIVE" | "TELEGRAM" | "MEGA" | "VPS";
  displayName: string;
  status: "ACTIVE" | "SYNCING" | "ERROR";
  space: { totalGb: number; usedGb: number };
};

const drivers: Driver[] = [
  {
    id: "drv-1",
    type: "GOOGLE_DRIVE",
    displayName: "Google Drive · Pessoal",
    status: "ACTIVE",
    space: { totalGb: 15, usedGb: 0.8 },
  },
  {
    id: "drv-2",
    type: "GOOGLE_DRIVE",
    displayName: "Google Drive · Trabalho",
    status: "ACTIVE",
    space: { totalGb: 15, usedGb: 2.2 },
  },
  {
    id: "drv-3",
    type: "GOOGLE_DRIVE",
    displayName: "Google Drive · Backup",
    status: "SYNCING",
    space: { totalGb: 15, usedGb: 0 },
  },
  {
    id: "drv-4",
    type: "ONEDRIVE",
    displayName: "OneDrive · Microsoft",
    status: "ACTIVE",
    space: { totalGb: 5, usedGb: 0.1 },
  },
  {
    id: "drv-5",
    type: "MEGA",
    displayName: "MEGA · Encriptado",
    status: "ACTIVE",
    space: { totalGb: 20, usedGb: 0.3 },
  },
  {
    id: "drv-6",
    type: "TELEGRAM",
    displayName: "Telegram · @meu_storage",
    status: "ACTIVE",
    space: { totalGb: 9999, usedGb: 1.5 },
  },
  {
    id: "drv-7",
    type: "VPS",
    displayName: "VPS Hetzner · 200GB",
    status: "ACTIVE",
    space: { totalGb: 200, usedGb: 22 },
  },
];
const driverIcon = (t: Driver["type"]) =>
  t === "TELEGRAM" ? Send : t === "VPS" ? HardDrive : t === "MEGA" ? Database : Cloud


export function StorageBar() {
  const total = drivers
      .filter((d) => d.space.totalGb < 9000)
      .reduce((a, b) => a + b.space.totalGb, 0);
    const used = drivers.reduce((a, b) => a + b.space.usedGb, 0);
    const pct = (used / total) * 100;
  
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-hairline border border-hairline rounded-2xl overflow-hidden"
      >
        <div className="bg-background p-6">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">
            Total unificado
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-4xl font-medium tracking-tight tabular-nums">
              {total.toFixed(0)}
            </span>
            <span className="text-muted-foreground">GB</span>
            <span className="ml-1 text-xs text-muted-foreground">
              + Telegram ilimitado
            </span>
          </div>
          <div className="mt-5 h-1.5 bg-surface-2 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="h-full bg-foreground"
            />
          </div>
          <div className="mt-2 text-xs text-muted-foreground mono">
            usado: {used.toFixed(1)} GB · livre: {(total - used).toFixed(1)} GB
          </div>
        </div>
  
        <div className="bg-background p-6">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">
            Distribuição
          </div>
          <ul className="mt-3 space-y-1.5">
            {drivers.slice(0, 4).map((d) => {
              const p =
                d.space.totalGb < 9000
                  ? (d.space.usedGb / d.space.totalGb) * 100
                  : 5;
              const Icon = driverIcon(d.type);
              return (
                <li key={d.id} className="text-[12px]">
                  <div className="flex items-center justify-between mb-1">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Icon className="size-3" />{" "}
                      {d.displayName.split(" · ")[1] ?? d.displayName}
                    </span>
                    <span className="mono">
                      {d.space.totalGb < 9000
                        ? `${d.space.usedGb}/${d.space.totalGb}G`
                        : "∞"}
                    </span>
                  </div>
                  <div className="h-1 bg-surface-2 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${p}%` }}
                      transition={{ duration: 0.9, delay: 0.1 }}
                      className="h-full bg-foreground/70"
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
  
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
              <li key={i} className="flex items-start gap-2">
                <x.i className="size-3.5 mt-0.5 text-muted-foreground shrink-0" />{" "}
                {x.t}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    );
  }
  