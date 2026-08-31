"use client";

import { Loader2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn, fmtBytes } from "@/lib/utils";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { ApiProvider, useProviders } from "@/lib/features/providers";
import { ProviderIcon } from "@/components/providers/provider-icon";

/**
 * Calcula o espaço livre de um provider.
 * ApiProvider expõe totalSpace/usedSpace/availableSpace como string (BigInt do Prisma).
 * Se totalSpace for null ou "0" → ilimitado (ex: Telegram).
 */
function getFreeSpace(provider: ApiProvider): string {
  if (!provider.availableSpace) return "∞";
  const available = Number(provider.availableSpace);
  if (isNaN(available) || available === 0) return "∞";
  return fmtBytes(available) + " disponíveis";
}

function getPct(provider: ApiProvider): number {
  const total = Number(provider.totalSpace ?? 0);
  const used = Number(provider.usedSpace ?? 0);
  if (!total) return 100;
  return (used / total) * 100;
}

// -----------------------------------------------------------------------------
// PROPS
// -----------------------------------------------------------------------------

interface StepProviderSelectProps {
  userId: string;
  selectedProviders: ApiProvider[];
  onSelectionChange: (providers: ApiProvider[]) => void;
}

// -----------------------------------------------------------------------------
// COMPONENTE
// -----------------------------------------------------------------------------
export function StepProviderSelect({
  selectedProviders,
  onSelectionChange,
}: StepProviderSelectProps) {
  const { isLoading, data } = useProviders();

  const toggleProvider = (provider: ApiProvider) => {
    const isSelected = selectedProviders.some((p) => p.id === provider.id);
    if (isSelected) {
      onSelectionChange(selectedProviders.filter((p) => p.id !== provider.id));
    } else {
      onSelectionChange([...selectedProviders, provider]);
    }
  };

  // ── Estado de carregamento ──────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center gap-2 text-muted-foreground">
        <Loader2 className="size-5 animate-spin" />
        <span className="text-sm">A carregar providers…</span>
      </div>
    );
  }

  const providers = data || [];

  // ── Sem providers conectados ────────────────────────────────────────────────
  if (providers.length === 0) {
    return (
      <div className="flex h-40 flex-col items-center justify-center gap-2 text-center">
        <p className="text-sm font-medium">Sem providers conectados</p>
        <p className="text-xs text-muted-foreground">
          Conecta pelo menos um provider nas definições para poderes fazer
          upload.
        </p>
        {/* TODO: Adicionar link para a página de definições de providers */}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl bg-surface-2/60 border border-hairline px-4 py-3 text-xs text-muted-foreground">
        <span className="text-foreground font-medium">Dica · </span>
        Se nenhum provider for seleccionado, o sistema escolherá automaticamente
        a melhor combinação de armazenamento.
      </div>

      <ul className="space-y-2">
        {providers.map((p) => {
          const free = getFreeSpace(p);
          const pct = getPct(p);
          const isOn = selectedProviders.some((sp) => sp.id === p.id);
          return (
            <motion.li
              key={p.id}
              whileHover={{ y: -1 }}
              onClick={() => toggleProvider(p)}
              className={cn(
                "rounded-xl border p-4 cursor-pointer transition-all flex items-center gap-4",
                isOn
                  ? "border-foreground bg-surface-2/40"
                  : "border-hairline hover:border-foreground/40",
              )}
            >
              <Checkbox
                checked={isOn}
                onCheckedChange={() => toggleProvider(p)}
              />
              <div className="size-10 rounded-lg bg-surface-2 flex items-center justify-center shrink-0">
                <ProviderIcon type={p.type} className="size-5 stroke-[1.5]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium truncate">
                    {p.displayName}
                  </span>
                  <span className="text-[9px] mono px-1.5 py-0.5 rounded bg-foreground/10 text-foreground uppercase tracking-widest">
                    {p.isActive ? "ACTIVE" : "INACTIVE"}
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
