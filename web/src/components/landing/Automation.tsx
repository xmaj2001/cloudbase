import { ChevronRight, Sparkles, MousePointerClick, FileCode2 } from "lucide-react";
import { Reveal } from "../reveal";
import { SectionHeader } from "./SectionHeader";

export function Automation() {
  const modes = [
    { name: "Manual", d: "Organizas quando quiseres, com um clique." },
    { name: "Automático", d: "Cada ficheiro é organizado no momento em que entra." },
    { name: "Agendado", d: "O sistema organiza numa hora que defines." },
    { name: "Híbrido", d: "Automático, com relatório semanal do que foi feito." },
  ];
  const ways = [
    { icon: MousePointerClick, name: "Builder visual", d: "Arrastar e largar condições, sem código." },
    { icon: FileCode2, name: "YAML manual", d: "Controlo total para power users." },
    { icon: Sparkles, name: "Linguagem natural com IA", d: "Descreves o que queres, a IA gera a regra." },
  ];
  return (
    <section id="automacao" className="py-32 border-t border-hairline">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          index="03"
          kicker="Motor de Automação"
          title="Define a regra. O CloudBase faz o resto."
          sub="Três formas de criar regras de organização — do visual ao código. Quatro modos de operação para cada perfil de utilizador."
        />
        <div className="mt-16 grid lg:grid-cols-2 gap-8">
          <Reveal>
            <div className="rounded-2xl border border-hairline bg-surface p-6 mono text-[13px]">
              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-4">regras.yaml</div>
              <pre className="whitespace-pre leading-relaxed text-foreground/90">{`routing:
  - name: "Faturas para Google Drive"
    priority: 1
    conditions:
      match: ALL
      rules:
        - field: extension
          operator: in
          value: [pdf, xlsx]
        - field: name
          operator: contains
          value: fatura
    destination:
      driver: google_drive_pessoal
      folder: /Finanças/Faturas
    actions:
      notify: true
      tag: financeiro`}</pre>
            </div>
          </Reveal>
          <div className="space-y-4">
            <Reveal>
              <div className="rounded-2xl border border-hairline p-6">
                <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-4">Três formas de criar regras</h3>
                <ul className="space-y-4">
                  {ways.map((w) => (
                    <li key={w.name} className="flex items-start gap-3">
                      <w.icon className="size-5 mt-0.5 text-muted-foreground stroke-[1.5]" />
                      <div>
                        <div className="font-medium">{w.name}</div>
                        <div className="text-sm text-muted-foreground">{w.d}</div>
                      </div>
                    </li>
                  ))}
                </ul>
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
            <Reveal delay={0.15}>
              <div className="rounded-2xl border border-hairline bg-surface p-6 mono text-[13px]">
                <div className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Automação padrão</div>
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
          </div>
        </div>
      </div>
    </section>
  );
}