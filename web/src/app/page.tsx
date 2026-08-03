"use client";

import { Footer } from "@/components/footer";
import { Automation } from "@/components/landing/Automation";
import { Comparison } from "@/components/landing/Comparison";
import { CTA } from "@/components/landing/CTA";
import { DevPreview } from "@/components/landing/DevPreview";
import { FeatureGrid } from "@/components/landing/FeatureGrid";
import { Fragmentation } from "@/components/landing/Fragmentation";
import { Hero } from "@/components/landing/Hero";
import { Pricing } from "@/components/landing/Pricing";
import { Roadmap } from "@/components/landing/Roadmap";
import { Scheduled } from "@/components/landing/Scheduled";
import { ShareSystem } from "@/components/landing/ShareSystem";
import { Unified } from "@/components/landing/Unified";
import { Whatsapp } from "@/components/landing/Whatsapp";
import { NavBar } from "@/components/navbar";
import { motion } from "framer-motion";
import {  ArrowLeft, Mail, Bell } from "lucide-react";
import Link from "next/link";

// export default function PageIndex() {
//   return (
//     <div className="bg-background text-foreground">
//       <NavBar />
//       <main>
//         <Hero />
//         <Unified />
//         <Fragmentation />
//         <Automation />
//         <ShareSystem />
//         <Scheduled />
//         <FeatureGrid />
//         <Whatsapp />
//         <DevPreview />
//         <Pricing />
//         <Comparison />
//         <Roadmap />
//         <CTA />
//       </main>
//       <Footer />
//     </div>
//   );
// }

export default function PageIndex() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-background text-foreground">
      {/* ambient glows */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-foreground/[0.03] blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-foreground/[0.02] blur-3xl" />
      </div>

      <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link href="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors">
            <img src={'/logo.png'} alt="CloudBase" className="h-5 w-5" />
            <span>CloudBase</span>
          </Link>
        </motion.div>

        <motion.div
          className="relative mt-12 h-40 w-40 md:h-48 md:w-48"
          initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.img
            src={'/logo.png'}
            alt="CloudBase"
            className="h-full w-full object-contain"
            animate={{ y: [0, -14, 0], rotate: [-2, 2, -2] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="absolute inset-0 -z-10 rounded-full bg-foreground/5 blur-3xl" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface px-3 py-1.5 text-xs mono">
            <span className="size-1.5 rounded-full bg-foreground animate-pulse" />
            Lançamento iminente
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-[clamp(2.5rem,7vw,5rem)] font-medium leading-[0.95] tracking-[-0.04em]"
        >
          Em <span className="display italic">breve</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-lg text-lg text-muted-foreground leading-relaxed"
        >
          A plataforma CloudBase está quase pronta. Em breve poderás agregar,
          fragmentar e gerir o teu armazenamento num só sítio — sem custos mensais.
        </motion.p>

        <NotifyForm />

        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.85 }}
          className="mt-12"
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
            Voltar ao início
          </Link>
        </motion.div> */}
      </div>
    </main>
  );
}

function NotifyForm() {
  return (
    <motion.form
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mt-10 w-full max-w-md"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="flex items-center gap-2 rounded-full border border-hairline bg-surface p-1.5 pl-4 focus-within:border-foreground/30 focus-within:ring-1 focus-within:ring-foreground/10 transition-all">
        <Mail className="size-4 text-muted-foreground shrink-0" />
        <label htmlFor="notify-email" className="sr-only">
          Endereço de email
        </label>
        <input
          id="notify-email"
          type="email"
          placeholder="O teu email para ser notificado"
          className="flex-1 bg-transparent px-2 py-2 text-sm outline-none placeholder:text-muted-foreground"
          required
        />
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90 transition-opacity"
        >
          <Bell className="size-4" />
          Notificar-me
        </button>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Sem spam. Apenas uma notificação no dia do lançamento.
      </p>
    </motion.form>
  );
}