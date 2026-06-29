import Link from "next/link";
import { Reveal } from "../reveal";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="py-32 border-t border-hairline">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="rounded-3xl bg-foreground text-background p-12 md:p-20 text-center relative overflow-hidden">
            <motion.img
              src={'/logo.png'}
              alt=""
              className="absolute -right-20 -bottom-20 w-72 opacity-10"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            />
            <h2 className="text-4xl md:text-6xl tracking-[-0.03em] font-medium leading-[1]">
              O teu espaço, <span className="display italic">livre</span>.
            </h2>
            <p className="mt-6 text-background/70 max-w-lg mx-auto">
              Conecta o teu primeiro provider em menos de 30 segundos. Sem
              cartão. Sem subscrição.
            </p>
            <Link
              href="/storage"
              className="mt-10 inline-flex items-center gap-2 px-7 py-4 rounded-full bg-background text-foreground text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Abrir o dashboard
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
