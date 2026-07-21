import { Check } from "lucide-react";
import { Reveal } from "../reveal";
import { SectionHeader } from "./SectionHeader";
import Link from "next/link";

const plans = [
  {
    name: "Gratuito",
    price: "$0",
    period: "para sempre",
    desc: "Tudo o que precisas para começar.",
    highlight: false,
    features: [
      "Até 3 providers conectados",
      "Automação com regras padrão",
      "Partilha com expiração de 24h",
      "1 Space Pool com até 2 membros",
      "Bot WhatsApp básico",
      "Pesquisa e organização",
    ],
  },
  {
    name: "Pro",
    price: "$9",
    period: "/mês",
    desc: "Para quem precisa do máximo de cada provider.",
    highlight: true,
    features: [
      "Providers ilimitados",
      "Regras personalizadas e IA",
      "Partilha permanente + QR Code",
      "Space Pools ilimitados",
      "Dead Man's Switch",
      "CloudBase Agent",
      "WiFi & Bluetooth local",
      "IA completa",
    ],
  },
  {
    name: "Developer",
    price: "$19",
    period: "/mês",
    desc: "API, SDK, e infraestrutura para os teus projectos.",
    highlight: false,
    features: [
      "Tudo do Plano Pro",
      "API Keys & SDK npm",
      "HLS Streaming",
      "Supabase, Firebase, ImageKit, B2",
      "Space Pools com duração definida",
      "Dashboard de bandwidth",
      "Webhooks para eventos",
    ],
  },
];

export function Pricing() {
  return (
    <section id="planos" className="py-32 border-t border-hairline">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          index="18"
          kicker="Planos"
          title="Começa grátis. Escala quando precisares."
          sub="O plano gratuito inclui tudo para uso pessoal. Os planos pagos desbloqueiam ferramentas avançadas e acesso ao SDK."
        />
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 0.08}>
              <div
                className={`rounded-2xl border p-8 h-full flex flex-col transition-all duration-500 ${
                  plan.highlight
                    ? "border-foreground bg-foreground text-background shadow-[0_20px_80px_-20px_rgba(0,0,0,0.3)]"
                    : "border-hairline hover:border-foreground/30"
                }`}
              >
                <div>
                  <div className="text-xs uppercase tracking-widest opacity-60">{plan.name}</div>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-4xl font-medium tracking-tight">{plan.price}</span>
                    <span className="text-sm opacity-60">{plan.period}</span>
                  </div>
                  <p className={`mt-3 text-sm leading-relaxed ${plan.highlight ? "text-background/70" : "text-muted-foreground"}`}>
                    {plan.desc}
                  </p>
                </div>
                <ul className="mt-8 space-y-3 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Check className={`size-4 mt-0.5 shrink-0 ${plan.highlight ? "text-background/80" : "text-muted-foreground"}`} strokeWidth={2} />
                      <span className={plan.highlight ? "text-background/90" : ""}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/storage"
                  className={`mt-8 block text-center py-3 rounded-full text-sm font-medium transition-opacity hover:opacity-90 ${
                    plan.highlight
                      ? "bg-background text-foreground"
                      : "bg-foreground text-background"
                  }`}
                >
                  {plan.price === "$0" ? "Começar grátis" : "Experimentar"}
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
