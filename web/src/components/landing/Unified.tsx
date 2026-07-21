import { driveStack, providers } from "@/lib/utils";
import { Reveal } from "../reveal";
import { SectionHeader } from "./SectionHeader";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";


export function Unified() {
  const total = driveStack.reduce((a, d) => a + (d.label ? 0 : d.val), 0);
  const hasUnlimited = driveStack.some((d) => d.label);

  return (
    <section id="unificado" className="py-32 border-t border-hairline">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          index="01"
          kicker="Armazenamento Unificado"
          title="Quanto mais contas adicionas, maior o teu espaço."
          sub="Cada plataforma contribui com o seu espaço para o teu total. Múltiplas contas por provider, sem custo adicional, sem limites artificiais."
        />

        <div className="mt-16 grid lg:grid-cols-5 gap-8">
          <Reveal className="lg:col-span-3">
            <div className="rounded-2xl border border-hairline bg-surface p-6 mono text-[13px] leading-relaxed">
              {driveStack.map((d, i) => (
                <motion.div
                  key={d.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center justify-between py-2 border-b border-hairline/60 last:border-0"
                >
                  <span>{d.name}</span>
                  <span className="text-muted-foreground">→</span>
                  <span className="tabular-nums">
                    {d.label ?? `${d.val.toFixed(1)} GB disponível`}
                  </span>
                </motion.div>
              ))}
              <div className="mt-4 pt-4 border-t border-foreground/20 flex items-center justify-between">
                <span className="font-semibold">Total unificado</span>
                <span className="font-semibold">{total.toFixed(1)} GB{hasUnlimited ? " + ilimitado" : ""}</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-2">
            <div className="rounded-2xl border border-hairline p-6 h-full">
              <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
                Providers suportados
              </h3>
              <ul className="space-y-3 text-sm">
                {providers.map((p) => (
                  <li
                    key={p.name}
                    className="flex items-start justify-between gap-4 py-2 border-b border-hairline/60 last:border-0"
                  >
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        {p.name}
                        {p.publicUrl && (
                          <Globe className="size-3 text-muted-foreground" />
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {p.best}
                      </div>
                    </div>
                    <span className="mono text-xs text-muted-foreground whitespace-nowrap">
                      {p.space}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-3 border-t border-hairline text-xs text-muted-foreground flex items-center gap-1.5">
                <Globe className="size-3" />
                URL pública directa disponível
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
