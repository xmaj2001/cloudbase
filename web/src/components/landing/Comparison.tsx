import { Check, X } from "lucide-react";
import { Reveal } from "../reveal";
import { SectionHeader } from "./SectionHeader";

export function Comparison() {
  const rows = [
    ["Espaço gratuito", "100 GB+", "15 GB", "2 GB", "5 GB"],
    ["Múltiplos providers unificados", true, false, false, false],
    ["Fragmentação automática", true, false, false, false],
    ["Automação com regras personalizadas", true, false, false, false],
    ["Partilha com código de segurança", true, false, false, false],
    ["Partilha agendada para o futuro", true, false, false, false],
    ["Troca entre utilizadores", true, false, false, false],
    ["Controlo via WhatsApp", true, false, false, false],
    ["Redirecionamento entre dispositivos", true, false, false, false],
    ["VPS como provider", true, false, false, false],
    ["Espaço público de download", true, false, false, false],
    ["Custo mensal base", "$0", "$2.99", "$11.99", "$1.99"],
  ];
  const Cell = ({ v }: { v: any }) => {
    if (v === true) return <Check className="size-4 mx-auto" strokeWidth={2.5} />;
    if (v === false) return <X className="size-4 mx-auto text-muted-foreground/40" strokeWidth={1.5} />;
    return <span className={typeof v === "string" && v.startsWith("$0") ? "font-semibold" : ""}>{v}</span>;
  };
  return (
    <section id="comparativo" className="py-32 border-t border-hairline">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader index="13" kicker="Comparativo" title="CloudBase vs Mercado" />
        <Reveal className="mt-16 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-hairline">
                <th className="text-left text-xs uppercase tracking-widest text-muted-foreground py-4 font-normal"></th>
                {["CloudBase", "Google Drive", "Dropbox", "OneDrive"].map((h, i) => (
                  <th key={h} className={`text-center text-sm py-4 font-medium ${i === 0 ? "bg-foreground text-background" : ""}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-b border-hairline/60">
                  <td className="text-sm py-4 pr-4">{r[0]}</td>
                  {r.slice(1).map((v, j) => (
                    <td key={j} className={`text-center text-sm py-4 ${j === 0 ? "bg-foreground/3" : ""}`}>
                      <Cell v={v} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  );
}