import { Reveal } from "../reveal";
import { SectionHeader } from "./SectionHeader";
import { motion } from "framer-motion";

export function Whatsapp() {
  return (
    <section className="py-32 border-t border-hairline">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          index="12"
          kicker="Controlo via WhatsApp"
          title="Escreves o que queres. O bot entende e executa."
        />
        <Reveal className="mt-16 max-w-2xl mx-auto">
          <div className="rounded-2xl border border-hairline bg-surface p-6 space-y-3">
            {[
              { u: "[envia ficheiro relatorio.pdf]", b: "guardado em Google Drive A · link: cloudbase.app/f/xK9m" },
              { u: "partilhar relatorio.pdf", b: "link: cloudbase.app/s/aB3x · código: CB-7X9K2M" },
              { u: "buscar contrato joao", b: "contrato_joao_2024.pdf — Google Drive / Legal /" },
              { u: "espaço usado", b: "usado: 47.3 GB de 244.6 GB" },
              { u: "organizar", b: "847 ficheiros organizados · 3 duplicados encontrados" },
            ].map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="space-y-1.5"
              >
                <div className="flex justify-end">
                  <div className="bg-foreground text-background text-sm px-4 py-2 rounded-2xl rounded-tr-sm max-w-[80%]">{m.u}</div>
                </div>
                <div className="flex">
                  <div className="bg-background border border-hairline text-sm px-4 py-2 rounded-2xl rounded-tl-sm max-w-[80%] mono text-[12px]">{m.b}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
