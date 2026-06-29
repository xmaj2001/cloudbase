import { ChevronRight } from "lucide-react";
import { Reveal } from "../reveal";
import { SectionHeader } from "./SectionHeader";

export function Automation() {
  const modes = [
    { name: "Manual", d: "Organizas quando quiseres, com um clique." },
    { name: "Automático", d: "Cada ficheiro é organizado no momento em que entra." },
    { name: "Agendado", d: "O sistema organiza numa hora que defines." },
    { name: "Híbrido", d: "Automático, com relatório semanal do que foi feito." },
  ];
  return (
    <section id="automacao" className="py-32 border-t border-hairline">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          index="03"
          kicker="Motor de Automação"
          title="Define a regra. O CloudBase faz o resto."
        />
        <div className="mt-16 grid lg:grid-cols-2 gap-8">
          <Reveal>
            <div className="rounded-2xl border border-hairline bg-surface p-6 mono text-[13px]">
              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-4">regras.yaml</div>
              <pre className="whitespace-pre leading-relaxed text-foreground/90">{`regras:
  - nome: "Faturas"
    condições:
      - nome_contém: "fatura"
      - extensão: ".pdf"
    destino: "/Finanças/Faturas"
    notificar: true

  - nome: "Ficheiros grandes → Telegram"
    condições:
      - tamanho_maior_que: "1GB"
    destino: "telegram"

  - nome: "Backups de código"
    condições:
      - nome_contém: "backup"
      - extensão: [".zip", ".tar.gz"]
    acções:
      - comprimir: true
      - destino: "/Dev/Backups"`}</pre>
            </div>
          </Reveal>
          <div className="space-y-4">
            <Reveal>
              <div className="rounded-2xl border border-hairline p-6">
                <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-4">Automação padrão</h3>
                <div className="grid grid-cols-2 gap-3 mono text-[13px]">
                  {[
                    ["Imagens", "/Imagens"],
                    ["Documentos", "/Documentos"],
                    ["Áudio", "/Áudio"],
                    ["Vídeos", "/Vídeos"],
                    ["Arquivos", "/Arquivos"],
                    ["Código", "/Dev"],
                  ].map(([a, b]) => (
                    <div key={a} className="flex items-center justify-between border-b border-hairline/60 py-1.5">
                      <span>{a}</span><span className="text-muted-foreground">→ {b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-hairline p-6">
                <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-4">Modos de operação</h3>
                <ul className="space-y-3">
                  {modes.map((m) => (
                    <li key={m.name} className="flex items-start gap-3">
                      <ChevronRight className="size-4 mt-0.5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{m.name}</div>
                        <div className="text-sm text-muted-foreground">{m.d}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}