import {
  ArrowLeftRight,
  Globe2,
  MessageCircle,
  MonitorSmartphone,
  Sparkles,
  Trash2,
  Film,
  Users,
  Wifi,
  Shield,
} from "lucide-react";
import { Reveal } from "../reveal";
import { SectionHeader } from "./SectionHeader";

export function FeatureGrid() {
  const feats = [
    {
      icon: Film,
      t: "HLS Streaming",
      d: "Vídeo e áudio entregues progressivamente — começa a ver sem esperar. Segmentação antes do upload, sem custos de processamento.",
      n: "06",
    },
    {
      icon: Users,
      t: "Space Pools",
      d: "Grupo de utilizadores une espaço de vários providers num pool colectivo. Quotas, reputação e regras configuráveis.",
      n: "07",
    },
    {
      icon: ArrowLeftRight,
      t: "Troca de Ficheiros",
      d: "Trocas entre utilizadores com verificação SHA-256, scan de segurança e sistema de reputação pública.",
      n: "08",
    },
    {
      icon: MonitorSmartphone,
      t: "Rede de Dispositivos",
      d: "PC, telemóvel, VPS — tudo como nós da mesma rede via CloudBase Agent. Redireciona transferências entre dispositivos.",
      n: "09",
    },
    {
      icon: Wifi,
      t: "WiFi & Bluetooth",
      d: "Transferência directa via mDNS na rede local até 100 MB/s. Bluetooth para ficheiros até 50 MB. Sem servidor intermediário.",
      n: "10",
    },
    {
      icon: Sparkles,
      t: "Inteligência Artificial",
      d: "Pesquisa semântica, classificação automática, detecção de duplicados, resumo de PDFs, e criação de regras por linguagem natural.",
      n: "11",
    },
    {
      icon: Globe2,
      t: "Espaço Público",
      d: "Disponibiliza ficheiros para download público com scan de segurança, limites de downloads e expiração controlável.",
      n: "12",
    },
    {
      icon: Trash2,
      t: "Gestão Avançada",
      d: "Lixeira com retenção de 30 dias, validade configurável, Collections que agrupam sem mover, e sincronização com providers.",
      n: "13",
    },
    {
      icon: MessageCircle,
      t: "Controlo via WhatsApp",
      d: "Bot que percebe linguagem natural. Envia, partilha, busca, organiza, troca — tudo sem abrir o browser.",
      n: "14",
    },
    {
      icon: Shield,
      t: "Dead Man's Switch",
      d: "Partilha agendada com confirmação progressiva. Sem resposta = execução automática. Para legados digitais e emergências.",
      n: "15",
    },
  ];
  return (
    <section className="py-32 border-t border-hairline">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          index="06–15"
          kicker="Mais funcionalidades"
          title="Uma plataforma. Quinze ferramentas."
          sub="Cada funcionalidade resolve um problema real que as plataformas tradicionais ignoram."
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
