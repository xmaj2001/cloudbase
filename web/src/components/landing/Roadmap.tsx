import { Reveal } from "../reveal";
import { SectionHeader } from "./SectionHeader";

export function Roadmap() {
  const items = [
    { q: "Agora · Q2 2026", t: "Beta pública", items: ["Armazenamento unificado", "Fragmentação inteligente", "Partilha protegida", "Bot WhatsApp"] },
    { q: "Próximo · Q3 2026", t: "Inteligência ampliada", items: ["IA de classificação avançada", "Resumos de PDF na interface", "Detecção semântica de duplicados"] },
    { q: "Depois · Q4 2026", t: "Rede expandida", items: ["Agent multiplataforma estável", "Espaços partilhados (logical spaces)", "Troca de ficheiros com reputação pública"] },
    { q: "2027", t: "Ecossistema", items: ["API pública", "Integrações Zapier / n8n", "Plano empresarial opt-in"] },
  ];
  return (
    <section id="roadmap" className="py-32 border-t border-hairline">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader index="14" kicker="Roadmap" title="Onde vamos a seguir." />
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((it, i) => (
            <Reveal key={it.q} delay={i * 0.08}>
              <div className="rounded-2xl border border-hairline p-6 h-full">
                <div className="mono text-[11px] uppercase tracking-widest text-muted-foreground">{it.q}</div>
                <h3 className="mt-3 text-lg font-medium tracking-tight">{it.t}</h3>
                <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                  {it.items.map((x) => <li key={x} className="flex items-start gap-2"><span className="mt-1.5 size-1 rounded-full bg-foreground/50 shrink-0" />{x}</li>)}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}