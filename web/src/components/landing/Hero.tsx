import { providers } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 rounded-full bg-foreground/3 blur-3xl" />
      </div>
      <div className="mx-auto max-w-7xl px-6">

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.04em] font-medium"
            >
              O teu <span className="display italic">armazenamento</span>,
              <br />
              unificado.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="mt-8 max-w-xl text-lg text-muted-foreground leading-relaxed"
            >
              O CloudBase não te vende espaço. Conecta o espaço que já é teu —
              Google Drive, Telegram, OneDrive — numa única interface que pensa,
              organiza, e transfere com segurança.{" "}
              <span className="text-foreground">Custo mensal: zero.</span>
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <Link
                href="/storage"
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition-all"
              >
                Abrir dashboard
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a
                href="#unificado"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-hairline text-sm hover:bg-surface-2 transition-colors"
              >
                Ver como funciona
              </a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mt-12 grid grid-cols-3 max-w-md gap-6"
            >
              {[
                { v: "100+", l: "GB grátis" },
                { v: "10+", l: "providers" },
                { v: "$0", l: "custo mensal" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="text-3xl font-medium tracking-tight">
                    {s.v}
                  </div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">
                    {s.l}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              <motion.img
                src={"/logo.png"}
                alt="CloudBase"
                className="absolute inset-0 w-full h-full object-contain"
                animate={{ y: [0, -16, 0], rotate: [-2, 2, -2] }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <div className="absolute inset-0 -z-10 rounded-full bg-foreground/5 blur-3xl" />
            </div>
            <div className="mt-6 mono text-[11px] text-muted-foreground text-center">
              Meu espaço, unificado. <span className="text-foreground">CloudBase</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Logo marquee */}
      <div className="mt-24 border-y border-hairline py-6 overflow-hidden">
        <div className="flex gap-12 animate-marquee whitespace-nowrap">
          {[...providers, ...providers].map((p, i) => (
            <span
              key={i}
              className="text-sm text-muted-foreground mono flex items-center gap-3"
            >
              <span className="size-1 rounded-full bg-muted-foreground/40" />
              {p.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
