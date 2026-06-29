import { Reveal } from "../reveal";
import { SectionHeader } from "./SectionHeader";

export function ShareSystem() {
  const cards = [
    {
      tag: "modo protegido",
      title: "Link + código obrigatório",
      lines: ["link:    cloudbase.app/s/xK9mZ2aB", "código:  CB-7X9K2M", "QR Code: verificação"],
      desc: "Mesmo se o link for interceptado, sem o código não há acesso. Após download, ambos são invalidados.",
    },
    {
      tag: "modo público",
      title: "Link directo, download imediato",
      lines: ["link:    cloudbase.app/d/xK9mZ2aB", "expiração: 24h / 7d / 30d / ∞", "limite downloads configurável"],
      desc: "Expiração configurável, protecção por senha opcional, partilha directa para WhatsApp com um clique.",
    },
    {
      tag: "transferência temporária",
      title: "Enviado, descarregado, apagado.",
      lines: ["após download → eliminado", "não ocupa espaço pós-envio", "confirmação em tempo real"],
      desc: "Ideal para ficheiros grandes que não precisas de guardar.",
    },
  ];
  return (
    <section className="py-32 border-t border-hairline">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader index="04" kicker="Sistema de Partilha" title="Três formas. Cada uma para um momento." />
        <div className="mt-16 grid md:grid-cols-3 gap-5">
          {cards.map((c, i) => (
            <Reveal key={c.tag} delay={i * 0.08}>
              <div className="group rounded-2xl border border-hairline p-6 h-full hover:border-foreground transition-colors duration-500 hover:shadow-[0_20px_60px_-30px_rgba(0,0,0,0.3)]">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">{c.tag}</div>
                <h3 className="mt-3 text-xl tracking-tight font-medium">{c.title}</h3>
                <div className="mt-5 mono text-[12px] bg-surface-2 rounded-lg p-3 leading-relaxed">
                  {c.lines.map((l) => <div key={l}>{l}</div>)}
                </div>
                <p className="mt-5 text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}