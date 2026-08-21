"use client";

import { HardDrive, MapPin, Calendar, RefreshCw, Shield, Trash2 } from "lucide-react";
import React from "react";

interface DriverSidebarDetailsProps {
  driver: any;
}

export function DriverSidebarDetails({ driver }: DriverSidebarDetailsProps) {
  return (
    <aside className="space-y-6">
      <div className="bg-background border border-hairline rounded-2xl p-5">
        <div className="text-[11px] uppercase tracking-widest text-muted-foreground mb-4 font-mono">Detalhes</div>
        <dl className="space-y-3 text-[13px]">
          <Row icon={HardDrive} k="Tipo" v={driver.type.replace("_", " ")} />
          <Row icon={MapPin} k="Cluster" v="Luanda / Hub" />
          <Row icon={Calendar} k="Conectado" v={driver.space?.cachedAt ? new Date(driver.space.cachedAt).toLocaleDateString("pt-PT") : "—"} />
          <Row icon={RefreshCw} k="Última sync" v={driver.space?.cachedAt ? new Date(driver.space.cachedAt).toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" }) : "—"} />
        </dl>
      </div>

      <div className="bg-background border border-hairline rounded-2xl p-5">
        <div className="text-[11px] uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2 font-mono">
          <Shield className="size-3.5" /> Permissões (Scopes)
        </div>
        <ul className="space-y-2">
          <li className="mono text-[11px] px-2 py-1.5 rounded bg-surface-2 text-foreground break-all">
            cloudbase.driver.read_write
          </li>
          <li className="mono text-[11px] px-2 py-1.5 rounded bg-surface-2 text-foreground break-all">
            storage.metadata.sync
          </li>
        </ul>
      </div>

      <div className="bg-background border border-hairline rounded-2xl p-5">
        <div className="text-[11px] uppercase tracking-widest text-muted-foreground mb-4 font-mono">Zona de perigo</div>
        <button className="w-full inline-flex items-center justify-center gap-2 h-9 rounded-lg border border-hairline text-[12px] text-destructive hover:bg-destructive hover:text-destructive-foreground hover:border-destructive transition font-medium">
          <Trash2 className="size-3.5" /> Desconectar driver
        </button>
      </div>
    </aside>
  );
}

function Row({ icon: Icon, k, v }: { icon: React.ElementType; k: string; v: string }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="flex items-center gap-2 text-muted-foreground text-[12px]">
        <Icon className="size-3.5 text-muted-foreground/70" /> {k}
      </span>
      <span className="mono text-[12px] text-foreground font-medium truncate max-w-[160px]">{v}</span>
    </div>
  );
}