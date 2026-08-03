"use client";
import { useMemo, useState } from "react";
import {
  Search, Upload, Send, Music, Film, Image as ImageIcon, AppWindow,
  BookOpen, Archive, Gamepad2, LayoutGrid, Download, Heart, Clock,
} from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { PUBLIC_FILES, PUBLIC_FILTERS, PublicKind } from "@/lib/public-files";
import { AnimatePresence, motion } from "framer-motion";


const kindIcon: Record<PublicKind | "all", typeof Music> = {
  all: LayoutGrid,
  music: Music,
  video: Film,
  image: ImageIcon,
  app: AppWindow,
  book: BookOpen,
  archive: Archive,
  game: Gamepad2,
};

export default function PublicPage() {
  const [filter, setFilter] = useState<"all" | PublicKind>("all");
  const [query, setQuery] = useState("");

  const files = useMemo(() => {
    return PUBLIC_FILES.filter((f) => (filter === "all" ? true : f.kind === filter)).filter((f) =>
      query.trim() === "" ? true : (f.title + " " + f.author + " " + f.tags.join(" ")).toLowerCase().includes(query.toLowerCase())
    );
  }, [filter, query]);

  return (
    <div className="min-h-screen bg-background text-foreground pb-40">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-hairline bg-background/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <img src={'/logo.png'} alt="CloudBase" className="h-8 w-8" />
            <span className="hidden sm:block text-[15px] font-medium tracking-tight">CloudBase</span>
          </Link>

          <div className="flex-1 max-w-xl mx-auto relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Procurar ficheiros públicos…"
              className="w-full h-10 pl-10 pr-4 rounded-full bg-secondary/60 border border-hairline text-sm outline-none focus:border-foreground/40 transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <ModeToggle />
            <button aria-label="Perfil" className="h-9 w-9 rounded-full bg-foreground text-background grid place-items-center text-[13px] font-medium">
              JS
            </button>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="mx-auto max-w-7xl px-6 pt-8">
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl sm:text-4xl display tracking-tight">Descobrir</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Ficheiros públicos partilhados pela comunidade — {PUBLIC_FILES.length} disponíveis.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pb-6 border-b border-hairline">
          {PUBLIC_FILTERS.map((f) => {
            const Icon = kindIcon[f.id];
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`inline-flex items-center gap-2 h-9 px-4 rounded-full text-[13px] border transition-colors ${
                  active
                    ? "bg-foreground text-background border-foreground"
                    : "bg-transparent border-hairline hover:border-foreground/40"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-8">
          <AnimatePresence mode="popLayout">
            {files.map((f, i) => {
              const Icon = kindIcon[f.kind];
              return (
                <motion.div
                  key={f.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, delay: i * 0.02 }}
                >
                  <Link
                    href="/public/[id]"
                    as={`/public/${f.id}`}
                    className="group block rounded-2xl border border-hairline bg-surface hover:border-foreground/40 transition-colors overflow-hidden"
                  >
                    <div className="aspect-[4/3] bg-secondary/60 relative grid place-items-center overflow-hidden">
                      <Icon className="h-10 w-10 text-muted-foreground group-hover:scale-110 transition-transform" />
                      <span className="absolute top-3 left-3 text-[10px] uppercase tracking-wider mono px-2 py-1 rounded-full bg-background/80 border border-hairline">
                        {f.kind}
                      </span>
                      <span className="absolute top-3 right-3 text-[10px] mono px-2 py-1 rounded-full bg-background/80 border border-hairline">
                        {f.size}
                      </span>
                    </div>
                    <div className="p-4">
                      <div className="text-[14px] font-medium truncate">{f.title}</div>
                      <div className="text-[12px] text-muted-foreground truncate">{f.author}</div>
                      <div className="mt-3 flex items-center gap-3 text-[11px] text-muted-foreground">
                        <span className="inline-flex items-center gap-1"><Download className="h-3 w-3" />{f.downloads}</span>
                        <span className="inline-flex items-center gap-1"><Heart className="h-3 w-3" />{f.likes}</span>
                        <span className="inline-flex items-center gap-1 ml-auto"><Clock className="h-3 w-3" />{f.updatedAt}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
          {files.length === 0 && (
            <div className="col-span-full text-center text-sm text-muted-foreground py-16 border border-dashed border-hairline rounded-2xl">
              Nada encontrado para "{query}".
            </div>
          )}
        </div>
      </div>

      {/* Floating action bar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-lg px-6 z-50">
        <div className="mx-auto max-w-lg rounded-full border border-hairline bg-surface shadow-[0_20px_40px_-20px_rgba(0,0,0,0.3)] flex items-center gap-3 px-2 py-2">
          <button aria-label="Upload" className="h-9 w-9 rounded-full bg-foreground text-background grid place-items-center">
            <Upload className="h-4 w-4" />
          </button>
          <input
            placeholder="Perguntar ou procurar nos seus ficheiros..."
            className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
          />
          <button aria-label="Procurar" className="h-9 w-9 grid place-items-center rounded-full border border-hairline">
            <Search className="h-4 w-4" />
          </button>
          <button aria-label="Enviar" className="h-9 w-9 grid place-items-center rounded-full bg-foreground text-background">
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
