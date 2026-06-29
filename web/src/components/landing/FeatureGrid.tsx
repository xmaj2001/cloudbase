import { ArrowLeftRight, Globe2, MessageCircle, MonitorSmartphone, Sparkles, Trash2 } from "lucide-react";
import { Reveal } from "../reveal";
import { SectionHeader } from "./SectionHeader";

export function FeatureGrid() {
  const feats = [
    {
      icon: ArrowLeftRight,
      t: "Troca de Ficheiros",
      d: "Trocas entre utilizadores com verificação de integridade, scan de segurança e reputação pública.",
      n: "06",
    },
    {
      icon: MonitorSmartphone,
      t: "Rede de Dispositivos",
      d: "Telemóvel, PC e VPS como nós da mesma rede. Recebe num dispositivo, redireciona para outro.",
      n: "07",
    },
    {
      icon: Sparkles,
      t: "Inteligência Artificial",
      d: "Pesquisa por descrição, leitura de PDFs e imagens, detecção de duplicados, relatório mensal.",
      n: "08",
    },
    {
      icon: Globe2,
      t: "Espaço Público",
      d: "Disponibiliza ficheiros para download público com scan de segurança obrigatório.",
      n: "09",
    },
    {
      icon: Trash2,
      t: "Gestão Avançada",
      d: "Lixeira com retenção, validade configurável e Collections que agrupam sem mover.",
      n: "10",
    },
    {
      icon: MessageCircle,
      t: "Controlo via WhatsApp",
      d: "Bot que percebe linguagem natural. Partilha, busca, organiza — sem abrir o browser.",
      n: "11",
    },
  ];
  return (
    <section className="py-32 border-t border-hairline">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          index="06–11"
          kicker="Mais funcionalidades"
          title="Uma plataforma. Onze ferramentas."
        />
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-hairline border border-hairline rounded-2xl overflow-hidden">
          {feats.map((f, i) => (
            <Reveal key={f.t} delay={i * 0.05}>
              <div className="group bg-background p-8 h-full hover:bg-surface-2 transition-colors duration-500">
                <div className="flex items-start justify-between mb-8">
                  <f.icon className="size-6 stroke-[1.5]" />
                  <span className="mono text-xs text-muted-foreground">
                    {f.n}
                  </span>
                </div>
                <h3 className="text-xl tracking-tight font-medium">{f.t}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {f.d}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
