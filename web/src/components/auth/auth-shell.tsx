"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";
import { useAuthShell } from "./auth-shell-context";

type Props = {
  children: ReactNode;
};

export function AuthShell({ children }: Props) {
  // Consome os dados dinâmicos do contexto
  const { eyebrow, title, subtitle, rightFooter } = useAuthShell();
  return (
    <div className="min-h-screen bg-background text-foreground grid lg:grid-cols-[1.05fr_1fr]">
      {/* Left — form */}
      <div className="flex flex-col px-6 sm:px-10 lg:px-16 py-8 lg:py-12">
        <Link href="/" className="flex items-center gap-2.5 w-fit group">
          <img
            src={"/logo.png"}
            alt="CloudBase"
            className="h-8 w-8 transition-transform duration-500 group-hover:rotate-12"
          />
          <span className="text-[15px] font-medium tracking-tight">
            CloudBase
          </span>
        </Link>

        <div className="flex-1 flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-110 mx-auto py-14"
          >
            {eyebrow && (
              <div className="mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-4">
                {eyebrow}
              </div>
            )}
            <h1 className="display text-4xl sm:text-5xl leading-[1.02]">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-3 text-[14px] text-muted-foreground leading-relaxed">
                {subtitle}
              </p>
            )}
            <div className="mt-10">{children}</div>
          </motion.div>
        </div>

        <div className="mt-8 flex items-center justify-between text-[11px] text-muted-foreground">
          <span className="mono">© 2026 CloudBase</span>
          <div className="flex gap-5">
            <a href="#" className="hover:text-foreground transition-colors">
              Termos
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Privacidade
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Suporte
            </a>
          </div>
        </div>
      </div>

      {/* Right — visual */}
      <div className="hidden lg:block relative overflow-hidden bg-ink text-background">
        <div className="absolute inset-0 grain opacity-70" />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-background) 1px, transparent 1px), linear-gradient(90deg, var(--color-background) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="relative h-full flex flex-col justify-between p-12">
          <div className="flex items-center gap-2 text-[11px] mono uppercase tracking-[0.2em] opacity-70">
            <span className="h-1.5 w-1.5 rounded-full bg-background animate-pulse" />
            Rede unificada — 7 drivers activos
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-[320px] h-80">
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-full border border-background/20"
                  animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{
                    duration: 4,
                    delay: i * 1,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                />
              ))}
              <img
                src={"/logo.png"}
                alt=""
                className="absolute inset-0 m-auto h-40 w-40 animate-float"
              />
            </div>
          </motion.div>

          {rightFooter ?? (
            <div>
              <p className="display text-2xl leading-tight max-w-sm">
                “O teu armazenamento, todos os drives, uma única chave.”
              </p>
              <p className="mt-3 text-[12px] mono opacity-60">
                — CloudBase Manifesto
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
