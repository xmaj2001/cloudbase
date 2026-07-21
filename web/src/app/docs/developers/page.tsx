"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Code2, Copy, Menu, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useState } from "react";

export default function DevelopersPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);

  const copyCode = useCallback((id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }, []);

  const sections = [
    {
      id: "install",
      title: "Instalação",
      code: "npm install @cloudbase/sdk",
      lang: "bash",
    },
    {
      id: "config",
      title: "Configuração Básica",
      desc: "Inicializa o cliente com a tua API Key e define as regras de routing por tipo de ficheiro.",
      code: `import { CloudBase } from '@cloudbase/sdk'

const cb = new CloudBase({
  apiKey: 'cb_live_xxx',
  routing: {
    images:    { primary: 'imagekit',   fallback: 'cloudinary' },
    videos:    { primary: 'cloudinary', fallback: 'firebase'   },
    documents: { primary: 'supabase',   fallback: 'backblaze'  },
    generic:   { primary: 'backblaze',  fallback: 'firebase'   },
  },
  hls: {
    enabled:         false,
    segmentDuration: 10,
    minFileSizeMB:   5,
  },
})`,
      lang: "typescript",
    },
    {
      id: "upload",
      title: "Upload Inteligente",
      desc: "Faz upload de ficheiros. O CloudBase decide o provider de destino com base nas regras de routing, espaço disponível e bandwidth.",
      code: `// Upload padrão
const file = await cb.upload(myFile, { 
  folder: 'produtos/imagens' 
})
// Retorna: { id, url, provider, size, createdAt }

// Upload de vídeo com HLS
const video = await cb.upload(videoFile, { 
  type: 'video', 
  hls: true 
})
// Retorna: { id, type: "hls", playlistUrl: "...playlist.m3u8" }`,
      lang: "typescript",
    },
    {
      id: "operations",
      title: "Gerir Ficheiros",
      desc: "Todas as operações padrão, unificadas numa única API.",
      code: `// Obter URL temporária (signed)
const tempUrl = await cb.getSignedUrl(file.id, { expiresIn: '2h' })

// Mover entre providers (o ficheiro é transferido no background)
await cb.move(file.id, { toProvider: 'supabase' })

// Outras operações
await cb.rename(file.id, 'novo-nome.jpg')
await cb.delete(file.id)

// Listar ficheiros
const files = await cb.list({ folder: 'produtos' })`,
      lang: "typescript",
    },
    {
      id: "rest",
      title: "API REST",
      desc: "Usa o CloudBase a partir de qualquer linguagem ou framework.",
      code: `POST   https://api.cloudbase.app/v1/storage/upload
GET    https://api.cloudbase.app/v1/storage/{fileId}/url
POST   https://api.cloudbase.app/v1/storage/{fileId}/signed-url
DELETE https://api.cloudbase.app/v1/storage/{fileId}
GET    https://api.cloudbase.app/v1/storage?folder=produtos`,
      lang: "bash",
    },
    {
      id: "pools",
      title: "Space Pools (Beta)",
      desc: "Cria pools temporários com a tua equipa para unir espaço durante o desenvolvimento.",
      code: `const pool = await cb.pools.create({
  name: 'Projecto X',
  duration: '3 months',
  members: ['user_id_1', 'user_id_2']
})

// O pool expira após 3 meses e os ficheiros são eliminados.`,
      lang: "typescript",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── Top bar ──────────────────────────────────────────────── */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/70 border-b border-hairline h-16"
      >
        <div className="mx-auto max-w-[1400px] px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <img src="/logo.png" alt="CloudBase" className="h-7 w-7" />
              <span className="text-[15px] font-medium tracking-tight">CloudBase</span>
            </Link>
            <span className="text-hairline">/</span>
            <Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground">
              Documentação
            </Link>
            <span className="text-hairline hidden md:inline">/</span>
            <span className="text-sm text-foreground font-medium hidden md:inline">Developers</span>
          </div>
          <div className="flex items-center gap-3">
            <ModeToggle />
            <Link
              href="/docs"
              className="hidden md:inline-flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="size-3.5" />
              Voltar aos Docs
            </Link>
          </div>
        </div>
      </motion.header>

      <main className="pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 text-sm font-medium mb-6">
              <Code2 className="size-5" />
              SDK & API REST
            </div>
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight">
              CloudBase para Developers
            </h1>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              O CloudBase abstrai a complexidade de múltiplos providers de armazenamento.
              Com o SDK, geres Cloudinary, Supabase, Firebase e Backblaze através de uma única API,
              com fallback automático e HLS streaming integrado.
            </p>
          </motion.div>

          <div className="space-y-16">
            {sections.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="scroll-mt-24"
                id={s.id}
              >
                <h2 className="text-2xl font-medium tracking-tight mb-3">{s.title}</h2>
                {s.desc && (
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                    {s.desc}
                  </p>
                )}
                <div className="relative rounded-xl border border-hairline bg-foreground text-background overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-2 border-b border-background/10 bg-surface-2/20">
                    <span className="text-[11px] uppercase tracking-widest opacity-50">
                      {s.lang}
                    </span>
                    <button
                      onClick={() => copyCode(s.id, s.code)}
                      className="inline-flex items-center gap-1.5 text-xs opacity-50 hover:opacity-100 transition-opacity"
                    >
                      {copiedId === s.id ? (
                        <><Check className="size-3.5 text-success" /> Copiado</>
                      ) : (
                        <><Copy className="size-3.5" /> Copiar</>
                      )}
                    </button>
                  </div>
                  <pre className="p-4 mono text-[13px] leading-relaxed overflow-x-auto">
                    <code>{s.code}</code>
                  </pre>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-20 pt-10 border-t border-hairline"
          >
            <h3 className="font-medium tracking-tight mb-4">Routing Inteligente em Detalhe</h3>
            <div className="overflow-x-auto rounded-xl border border-hairline">
              <table className="w-full border-collapse text-sm text-left">
                <thead>
                  <tr className="border-b border-hairline bg-surface-2/50">
                    <th className="py-3 px-4 font-medium text-xs uppercase tracking-widest text-muted-foreground">Regra</th>
                    <th className="py-3 px-4 font-medium text-xs uppercase tracking-widest text-muted-foreground">Comportamento do SDK</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-hairline/60">
                    <td className="py-3 px-4 whitespace-nowrap">Imagens</td>
                    <td className="py-3 px-4 text-muted-foreground">Força uploads para providers com URL pública directa (ex: ImageKit). Nunca fragmenta imagens.</td>
                  </tr>
                  <tr className="border-b border-hairline/60">
                    <td className="py-3 px-4 whitespace-nowrap">Vídeo / Áudio</td>
                    <td className="py-3 px-4 text-muted-foreground">Aplica segmentação HLS se activado. Prioriza providers com CDN integrada.</td>
                  </tr>
                  <tr className="border-b border-hairline/60">
                    <td className="py-3 px-4 whitespace-nowrap">Bandwidth</td>
                    <td className="py-3 px-4 text-muted-foreground">Evita automaticamente providers próximos do limite mensal e redirecciona para fallback.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 whitespace-nowrap">Documentos</td>
                    <td className="py-3 px-4 text-muted-foreground">Guarda integralmente (sem fragmentação por padrão) no provider secundário.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
