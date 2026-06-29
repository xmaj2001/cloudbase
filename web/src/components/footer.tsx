
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
          { title: "Produto", items: ["Armazenamento", "Fragmentação", "Automação", "IA"] },
          { title: "Plataforma", items: ["WhatsApp Bot", "Agent", "API", "VPS"] },
          { title: "Empresa", items: ["Roadmap", "Blog", "Comunidade", "Contacto"] },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-4">{col.title}</h4>
            <ul className="space-y-2.5">
              {col.items.map((i) => (
                <li key={i}>
                  <a href="#" className="text-sm hover:underline underline-offset-4">{i}</a>
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
