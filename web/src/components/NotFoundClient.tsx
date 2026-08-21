"use client";
import Link from "next/link";
import { motion } from "framer-motion";

interface NotFoundClientProps {
  lang: string;
  title: string;
  description: string;
  button: string;
}

export default function NotFoundClient({
  lang,
  title,
  description,
  button,
}: NotFoundClientProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-neutral-800/20 via-neutral-500/10 to-transparent blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-md text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 relative"
        >
          <div className="relative aspect-square max-w-xs mx-auto">
            <motion.img
              src="/logo.png"
              alt="cinemax"
              className="absolute inset-0 w-full h-full object-contain"
              animate={{ y: [0, -16, 0], rotate: [-2, 2, -2] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="absolute inset-0 -z-10 rounded-full bg-foreground/5 blur-3xl" />
          </div>
          <h1 className="text-7xl font-bold text-foreground">404</h1>
          <h2 className="mt-4 text-xl font-semibold text-foreground">
            {title}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
          <div className="mt-6">
            {/* Mantém o prefixo do idioma no redirecionamento nativo */}
            <Link
              href={`/${lang}`}
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {button}
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
