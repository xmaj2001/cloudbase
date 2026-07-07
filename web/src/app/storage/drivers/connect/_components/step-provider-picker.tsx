"use client";

import { motion } from "framer-motion";
import { Search, ArrowRight } from "lucide-react";

interface StepProviderPickerProps {
  query: string;
  setQuery: (q: string) => void;
  filteredProviders: any[];
  onPick: (p: any) => void;
}

export function StepProviderPicker({ query, setQuery, filteredProviders, onPick }: StepProviderPickerProps) {
  return (
    <motion.section
      key="s1"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-6 flex items-center gap-3 h-11 bg-background border border-hairline rounded-full px-4 max-w-md">
        <Search className="size-4 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Procurar provider..."
          className="flex-1 bg-transparent text-[13px] outline-none placeholder:text-muted-foreground"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredProviders.map((p, i) => (
          <motion.button
            key={p.type}
            onClick={() => onPick(p)}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.02 }}
            className="group text-left bg-background border border-hairline rounded-2xl p-5 hover:border-foreground transition-colors relative overflow-hidden"
          >
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 bg-linear-to-br ${p.color} transition-opacity`} />
            <div className="relative">
              <div className="flex items-start justify-between">
                <div className="h-11 w-11 rounded-xl bg-surface-2 grid place-items-center">
                  <p.icon className="size-5" />
                </div>
                <span className="mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {p.authKind.replace("_", " ")}
                </span>
              </div>
              <div className="mt-4 text-[14px] font-medium leading-tight">{p.name}</div>
              <div className="text-[12px] text-muted-foreground mt-1">{p.tagline}</div>
              <div className="mt-5 flex items-center justify-between text-[11px] text-muted-foreground">
                <span className="mono">{p.freeQuotaGb === "unlimited" ? "∞" : p.freeQuotaGb ? `${p.freeQuotaGb} GB` : "self-hosted"}</span>
                <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.section>
  );
}