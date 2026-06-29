import { motion } from "framer-motion";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";

const links = [
  { href: "#unificado", label: "Armazenamento" },
  { href: "#fragmentacao", label: "Fragmentação" },
  { href: "#automacao", label: "Automação" },
  { href: "#comparativo", label: "Comparativo" },
  { href: "#roadmap", label: "Roadmap" },
];

export function NavBar() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/70 border-hairline"
    >
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <img
            src={"/logo.png"}
            alt="CloudBase"
            className="h-8 w-8 transition-transform duration-500 group-hover:rotate-12"
          />
          <span className="text-[15px] font-medium tracking-tight">
            CloudBase
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[13px] text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <Link
            href="/storage"
            className="text-[13px] px-4 py-2 rounded-full border border-hairline hover:border-foreground transition-colors"
          >
            Entrar
          </Link>
          <Link
            href="/storage"
            className="text-[13px] px-4 py-2 rounded-full bg-foreground text-background hover:opacity-90 transition-opacity"
          >
            Começar
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
