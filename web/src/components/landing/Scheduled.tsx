import { Reveal } from "../reveal";
import { SectionHeader } from "./SectionHeader";
import { motion } from "framer-motion";

export function Scheduled() {
  const steps = [365, 182, 91, 45, 22, 11, 5, 2];
  return (
    <section className="py-32 border-t border-hairline">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          index="05"
          kicker="Partilha Agendada"
          title="Confirmação progressiva. Sem ti, ainda assim certo."
          sub="O sistema divide o tempo restante por dois a cada notificação. Se deixares de responder, interpreta como intenção de avançar e executa automaticamente."
        />
        <Reveal className="mt-16">
          <div className="rounded-2xl border border-hairline bg-surface p-6 mono text-[13px]">
            <div className="text-muted-foreground mb-4">data definida: 365 dias</div>
            {steps.map((s, i) => (
              <motion.div
                key={s}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center gap-4 py-1"
              >
                <span className="text-muted-foreground tabular-nums w-32">notificação {i + 1}</span>
                <span className="text-muted-foreground">→</span>
                <span className="tabular-nums w-32">faltam {s.toString().padStart(3)} dias</span>
                <span className="text-muted-foreground">→</span>
                <span>{i === steps.length - 1 ? "última confirmação" : "confirmas?"}</span>
              </motion.div>
            ))}
            <div className="mt-4 pt-4 border-t border-hairline">
              sem resposta em 48h → <span className="font-semibold">executa automaticamente</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}