import { Reveal } from "../reveal";
import { SectionHeader } from "./SectionHeader";
import { motion } from "framer-motion";

export function Fragmentation() {
  return (
    <section id="fragmentacao" className="py-32 border-t border-hairline">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          index="02"
          kicker="Fragmentação Inteligente"
          title="Um ficheiro. Vários drives. Zero complexidade visível."
          sub="Quando nenhum drive comporta o ficheiro, o CloudBase divide-o e distribui automaticamente. Cada fragmento recebe assinatura criptográfica individual. Para ti, aparece sempre como uma unidade única."
        />
        <Reveal className="mt-16">
          <div className="rounded-2xl border border-hairline bg-foreground text-background p-8 mono text-[13px] overflow-x-auto">
            <div className="opacity-60">ficheiro: GTA6_Complete.zip (30.0 GB)</div>
            <div className="opacity-60">analisando espaço disponível...</div>
            <div className="h-3" />
            {[
              { f: "fragmento_001", d: "Google Drive A", s: "10.0 GB", h: "a8f3··9c2d" },
              { f: "fragmento_002", d: "Google Drive B", s: "10.0 GB", h: "b4e1··7f3a" },
              { f: "fragmento_003", d: "Telegram      ", s: "10.0 GB", h: "c9d2··1e8b" },
            ].map((row, i) => (
              <motion.div
                key={row.f}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.15 }}
                className="py-1"
              >
                <span className="opacity-50">{row.f}</span>
                <span className="opacity-30 mx-2">→</span>
                <span>{row.d}</span>
                <span className="opacity-30 mx-2">→</span>
                <span>{row.s}</span>
                <span className="opacity-30 mx-2">|</span>
                <span className="opacity-50">sha256: {row.h}</span>
              </motion.div>
            ))}
            <div className="h-3" />
            <div className="opacity-60">hash original: sha256:f1a9··3c7d</div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9 }}
              className="text-background"
            >
              verificação: <span className="text-green-400">ok</span> — integridade garantida
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}