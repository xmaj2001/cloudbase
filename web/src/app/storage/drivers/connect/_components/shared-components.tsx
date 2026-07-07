"use client";

import React from "react";
import { ArrowRight, LucideIcon } from "lucide-react";
import { ProviderSpec } from "@/lib/api/drivers/driver-providor";

export function ProviderHeader({ p }: { p: ProviderSpec }) {
  return (
    <div className="bg-background border border-hairline rounded-2xl p-5 flex items-center gap-4">
      <div className="h-12 w-12 rounded-xl bg-surface-2 grid place-items-center">
        <p.icon className="size-6" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[15px] font-medium">{p.name}</div>
        <div className="text-[12px] text-muted-foreground">{p.tagline}</div>
      </div>
      <span className="mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {p.authKind.replace("_", " ")}
      </span>
    </div>
  );
}

export function SideNav({ onBack, onNext, nextLabel, disabled }: {
  onBack: () => void; onNext: () => void; nextLabel: string; disabled?: boolean;
}) {
  return (
    <div className="space-y-3">
      <button
        onClick={onNext}
        disabled={disabled}
        className="w-full h-11 rounded-full bg-foreground text-background text-[13px] font-medium hover:opacity-90 transition disabled:opacity-40 inline-flex items-center justify-center gap-2"
      >
        {nextLabel} <ArrowRight className="size-4" />
      </button>
      <button
        onClick={onBack}
        className="w-full h-10 rounded-full border border-hairline text-[12px] hover:border-foreground transition"
      >
        Voltar
      </button>
    </div>
  );
}

export function TermItem({ icon: Icon, title, body, danger }: {
  icon: LucideIcon; title: string; body: string; danger?: boolean;
}) {
  return (
    <div className={`flex gap-3 p-3 rounded-lg ${danger ? "bg-destructive/5 border border-destructive/20" : "bg-surface-2/50"}`}>
      <Icon className={`size-4 mt-0.5 shrink-0 ${danger ? "text-destructive" : "text-muted-foreground"}`} />
      <div className="min-w-0">
        <div className="text-[13px] font-medium">{title}</div>
        <div className="text-[12px] text-muted-foreground mt-1 leading-relaxed">{body}</div>
      </div>
    </div>
  );
}

export function Field({ label, helper, children, full }: {
  label: string; helper?: string; children: React.ReactNode; full?: boolean;
}) {
  return (
    <div className={full ? "md:col-span-2" : ""}>
      <label className="text-[11px] uppercase tracking-widest text-muted-foreground">{label}</label>
      <div className="mt-2">{children}</div>
      {helper && <div className="mt-1.5 text-[11px] text-muted-foreground">{helper}</div>}
    </div>
  );
}

export function EmptyPanel({ icon: Icon, title, text }: { icon: LucideIcon; title: string; text: string }) {
  return (
    <div className="bg-background border border-dashed border-hairline rounded-2xl p-8 text-center">
      <Icon className="size-5 mx-auto text-muted-foreground" />
      <div className="mt-3 text-[13px] font-medium">{title}</div>
      <div className="text-[12px] text-muted-foreground mt-1">{text}</div>
    </div>
  );
}