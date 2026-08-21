"use client";

import { motion } from "framer-motion";
import { Search, ArrowRight } from "lucide-react";
import { type ProviderSpec } from "@/components/drivers/driver-providor";
import { DriverIcon } from "@/components/drivers/driver-icon";

interface StepProviderPickerProps {
  query: string;
  setQuery: (q: string) => void;
  filteredProviders: ProviderSpec[];
  onPick: (provider: ProviderSpec) => void;
}

export function StepProviderPicker({
  query,
  setQuery,
  filteredProviders,
  onPick,
}: StepProviderPickerProps) {
  return (
    <motion.section
      key="s1"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
    >
      {/* Barra de Pesquisa Minimalista */}
      <div className="mb-6 flex items-center gap-3 h-11 bg-background border border-hairline rounded-full px-4 max-w-md focus-within:border-foreground/50 transition-colors">
        <Search className="size-4 text-muted-foreground shrink-0" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Procurar provider de armazenamento..."
          className="flex-1 bg-transparent text-[13px] outline-none placeholder:text-muted-foreground"
        />
      </div>

      {/* Grid de Provedores */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredProviders.map((p, i) => (
          <motion.button
            key={p.type}
            onClick={() => onPick(p)}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.02 }}
            className="group text-left bg-background border border-hairline rounded-2xl p-5 hover:border-foreground/60 transition-all relative overflow-hidden flex flex-col justify-between min-h-[190px]"
          >
            {/* Efeito Glow subtil de fundo ao passar o rato */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] bg-foreground transition-opacity duration-300 pointer-events-none" />

            <div className="relative w-full">
              <div className="flex items-start justify-between w-full">
                {/* O teu DriverIcon dinâmico e colorido entra aqui */}
                <div className="h-11 w-11 rounded-xl bg-surface-2 border border-hairline grid place-items-center shrink-0">
                  <DriverIcon type={p.type} className="size-5.5" />
                </div>

                <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground px-2 py-0.5 bg-surface-2 rounded border border-hairline">
                  {p.authKind === "OAUTH" ? "OAuth 2.0" : "Credentials"}
                </span>
              </div>

              <div className="mt-4 text-[14px] font-medium leading-tight text-foreground tracking-tight">
                {p.name}
              </div>
              <div className="text-[12px] text-muted-foreground mt-1.5 leading-normal font-normal">
                {p.tagline}
              </div>
            </div>

            {/* Rodapé do Card */}
            <div className="mt-5 pt-3 border-t border-hairline/50 flex items-center justify-between text-[11px] text-muted-foreground w-full">
              <span className="font-mono font-medium">
                {p.freeQuotaGb === "unlimited"
                  ? "Quota: ∞ Ilimitado"
                  : p.freeQuotaGb === "self-hosted"
                    ? "Self-Hosted"
                    : `Base: ${p.freeQuotaGb} GB`}
              </span>
              <ArrowRight className="size-3.5 group-hover:translate-x-1 text-muted-foreground group-hover:text-foreground transition-all duration-300" />
            </div>
          </motion.button>
        ))}
      </div>
    </motion.section>
  );
}
