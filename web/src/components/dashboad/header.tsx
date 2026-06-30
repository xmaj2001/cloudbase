"use client";
import { motion } from "framer-motion";

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

type LogicalSpace = { id: string; name: string; sizeGb: number; usedGb: number; members: number; emoji: string };
const logicalSpaces: LogicalSpace[] = [
  { id: "ls-1", name: "Projecto Alpha", sizeGb: 50, usedGb: 18.4, members: 4, emoji: "▲" },
  { id: "ls-2", name: "Família Silva", sizeGb: 100, usedGb: 67.1, members: 6, emoji: "◆" },
  { id: "ls-3", name: "Cliente Lisboa", sizeGb: 20, usedGb: 3.2, members: 2, emoji: "●" },
];

export function HeaderStorage() {
  const total = drivers
    .filter((d) => d.space.totalGb < 9000)
    .reduce((a, b) => a + b.space.totalGb, 0);
  const used = drivers.reduce((a, b) => a + b.space.usedGb, 0);
  const pct = (used / total) * 100;

  return (
    <div>
      <motion.h1
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl tracking-[-0.03em] font-medium"
      >
        Bem-vindo de volta.
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="mt-1.5 text-muted-foreground text-sm"
      >
        {drivers.length} drivers conectados · {logicalSpaces.length} spaces
        lógicos · IA activa.
      </motion.p>
    </div>
  );
}
