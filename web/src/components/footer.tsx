import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-hairline mt-32">
      <div className="mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2.5">
            <img src={'/logo.png'} alt="" className="h-8 w-8" />
            <span className="font-medium">CloudBase</span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground max-w-xs">
            O teu armazenamento. Unificado. Inteligente. Sem custos.
          </p>
        </div>
        {[
          {
            title: "Produto",
            items: [
              { label: "Armazenamento", href: "/#unificado" },
              { label: "Fragmentação", href: "/#fragmentacao" },
              { label: "Automação", href: "/#automacao" },
              { label: "Planos", href: "/#planos" },
              { label: "IA", href: "/docs#inteligencia-artificial" },
            ],
          },
          {
            title: "Plataforma",
            items: [
              { label: "WhatsApp Bot", href: "/docs#whatsapp" },
              { label: "CloudBase Agent", href: "/docs#rede-dispositivos" },
              { label: "SDK & API", href: "/docs/developers" },
              { label: "Documentação", href: "/docs" },
            ],
          },
          {
            title: "Empresa",
            items: [
              { label: "Roadmap", href: "/#roadmap" },
              { label: "Blog", href: "#" },
              { label: "Comunidade", href: "#" },
              { label: "Contacto", href: "#" },
            ],
          },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-4">{col.title}</h4>
            <ul className="space-y-2.5">
              {col.items.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm hover:underline underline-offset-4">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-hairline">
        <div className="mx-auto max-w-7xl px-6 py-6 flex items-center justify-between text-xs text-muted-foreground">
          <span>© 2026 CloudBase. Todos os direitos reservados.</span>
          <span className="mono">v0.9.2-beta</span>
        </div>
      </div>
    </footer>
  );
}
