"use client";
import { useMemo, useState } from "react";
import {
  ChevronRight, ChevronDown, Folder, FolderOpen, File as FileIcon, FileText, Image as ImageIcon,
  Film, Music, Archive, Code2, Search, Upload, FolderPlus, Grid3x3, List, ArrowLeft,
  Star, Clock, Trash2, Share2, MoreHorizontal, HardDrive, Cloud, Send, Database, Boxes,
  Download, Info, Sparkles, Home,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

// ─── mock filesystem ──────────────────────────────────────────
type FSNode = {
  id: string;
  name: string;
  kind: "folder" | "file";
  parent: string | null;
  size?: number;
  mime?: string;
  driver?: "GOOGLE_DRIVE" | "ONEDRIVE" | "TELEGRAM" | "MEGA" | "VPS";
  fragmented?: boolean;
  updatedAt: string;
  starred?: boolean;
};

const fs: FSNode[] = [
  { id: "root", name: "O meu CloudBase", kind: "folder", parent: null, updatedAt: "2026-06-30" },
  { id: "docs", name: "Documentos", kind: "folder", parent: "root", updatedAt: "2026-06-25" },
  { id: "docs-legal", name: "Legal", kind: "folder", parent: "docs", updatedAt: "2026-06-24" },
  { id: "docs-fin", name: "Financeiro", kind: "folder", parent: "docs", updatedAt: "2026-06-22" },
  { id: "img", name: "Imagens", kind: "folder", parent: "root", updatedAt: "2026-06-20", starred: true },
  { id: "img-2026", name: "2026", kind: "folder", parent: "img", updatedAt: "2026-06-18" },
  { id: "dev", name: "Dev", kind: "folder", parent: "root", updatedAt: "2026-06-15" },
  { id: "dev-cb", name: "cloudbase", kind: "folder", parent: "dev", updatedAt: "2026-06-14" },
  { id: "media", name: "Multimédia", kind: "folder", parent: "root", updatedAt: "2026-06-10" },
  { id: "arch", name: "Arquivos", kind: "folder", parent: "root", updatedAt: "2026-06-05" },

  { id: "f1", name: "contrato_arrendamento_v3.pdf", kind: "file", parent: "docs-legal", size: 2_456_000, mime: "application/pdf", driver: "GOOGLE_DRIVE", updatedAt: "2026-06-24" },
  { id: "f2", name: "nda_cliente.pdf", kind: "file", parent: "docs-legal", size: 340_000, mime: "application/pdf", driver: "ONEDRIVE", updatedAt: "2026-06-20" },
  { id: "f3", name: "fatura_jun_2026.pdf", kind: "file", parent: "docs-fin", size: 184_320, mime: "application/pdf", driver: "GOOGLE_DRIVE", updatedAt: "2026-06-10" },
  { id: "f4", name: "IRS_2025.pdf", kind: "file", parent: "docs-fin", size: 920_000, mime: "application/pdf", driver: "MEGA", updatedAt: "2026-04-30" },
  { id: "f5", name: "IMG_0421.jpg", kind: "file", parent: "img-2026", size: 4_100_000, mime: "image/jpeg", driver: "GOOGLE_DRIVE", updatedAt: "2026-06-18" },
  { id: "f6", name: "IMG_0422.jpg", kind: "file", parent: "img-2026", size: 3_820_000, mime: "image/jpeg", driver: "GOOGLE_DRIVE", updatedAt: "2026-06-18" },
  { id: "f7", name: "logo_brand.png", kind: "file", parent: "img", size: 1_240_000, mime: "image/png", driver: "ONEDRIVE", updatedAt: "2026-06-08" },
  { id: "f8", name: "main.tsx", kind: "file", parent: "dev-cb", size: 8_300, mime: "text/typescript", driver: "GOOGLE_DRIVE", updatedAt: "2026-06-14" },
  { id: "f9", name: "README.md", kind: "file", parent: "dev-cb", size: 4_100, mime: "text/markdown", driver: "GOOGLE_DRIVE", updatedAt: "2026-06-14" },
  { id: "f10", name: "demo_video_render.mp4", kind: "file", parent: "media", size: 540_000_000, mime: "video/mp4", driver: "MEGA", updatedAt: "2026-06-05" },
  { id: "f11", name: "podcast_ep_07.mp3", kind: "file", parent: "media", size: 78_000_000, mime: "audio/mpeg", driver: "TELEGRAM", updatedAt: "2026-06-02" },
  { id: "f12", name: "GTA6_Complete.zip", kind: "file", parent: "arch", size: 32_212_254_720, mime: "application/zip", driver: "TELEGRAM", fragmented: true, updatedAt: "2026-06-12" },
  { id: "f13", name: "backup_db_2026_05.tar.gz", kind: "file", parent: "arch", size: 1_900_000_000, mime: "application/gzip", driver: "VPS", updatedAt: "2026-05-28" },
];

function fmtSize(bytes?: number) {
  if (!bytes) return "—";
  const u = ["B", "KB", "MB", "GB", "TB"];
  let i = 0, n = bytes;
  while (n >= 1024 && i < u.length - 1) { n /= 1024; i++; }
  return `${n.toFixed(n < 10 ? 1 : 0)} ${u[i]}`;
}

function iconFor(node: FSNode) {
  if (node.kind === "folder") return Folder;
  const m = node.mime ?? "";
  if (m.startsWith("image/")) return ImageIcon;
  if (m.startsWith("video/")) return Film;
  if (m.startsWith("audio/")) return Music;
  if (m.includes("zip") || m.includes("gzip") || m.includes("tar")) return Archive;
  if (m.includes("typescript") || m.includes("javascript") || m.includes("markdown")) return Code2;
  if (m.includes("pdf") || m.includes("text")) return FileText;
  return FileIcon;
}

const driverMeta: Record<NonNullable<FSNode["driver"]>, { label: string; icon: typeof HardDrive }> = {
  GOOGLE_DRIVE: { label: "Google Drive", icon: Cloud },
  ONEDRIVE: { label: "OneDrive", icon: Cloud },
  TELEGRAM: { label: "Telegram", icon: Send },
  MEGA: { label: "MEGA", icon: Database },
  VPS: { label: "VPS", icon: HardDrive },
};

export default function ExplorerPage() {
  const [currentId, setCurrentId] = useState("root");
  const [expanded, setExpanded] = useState<Set<string>>(new Set(["root", "docs"]));
  const [view, setView] = useState<"grid" | "list">("list");
  const [selected, setSelected] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const breadcrumb = useMemo(() => {
    const chain: FSNode[] = [];
    let n = fs.find((x) => x.id === currentId);
    while (n) {
      chain.unshift(n);
      n = fs.find((x) => x.id === n!.parent);
    }
    return chain;
  }, [currentId]);

  const children = useMemo(() => {
    const list = fs.filter((n) => n.parent === currentId);
    const filtered = query
      ? list.filter((n) => n.name.toLowerCase().includes(query.toLowerCase()))
      : list;
    return [...filtered].sort((a, b) => {
      if (a.kind !== b.kind) return a.kind === "folder" ? -1 : 1;
      return a.name.localeCompare(b.name);
    });
  }, [currentId, query]);

  const selectedNode = selected ? fs.find((n) => n.id === selected) ?? null : null;

  const toggle = (id: string) => {
    const next = new Set(expanded);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setExpanded(next);
  };

  const treeChildrenOf = (id: string) => fs.filter((n) => n.parent === id && n.kind === "folder");

  const renderTree = (id: string, depth = 0) => {
    const node = fs.find((n) => n.id === id)!;
    const kids = treeChildrenOf(id);
    const open = expanded.has(id);
    const active = currentId === id;
    return (
      <div key={id}>
        <button
          onClick={() => {
            setCurrentId(id);
            if (kids.length) toggle(id);
          }}
          className={`w-full flex items-center gap-1.5 pr-2 py-1.5 rounded text-[13px] text-left transition-colors ${
            active ? "bg-accent text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-surface-2"
          }`}
          style={{ paddingLeft: `${8 + depth * 14}px` }}
        >
          {kids.length ? (
            <span className="opacity-70">
              {open ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
            </span>
          ) : (
            <span className="w-3.5" />
          )}
          {open ? <FolderOpen className="h-4 w-4" /> : <Folder className="h-4 w-4" />}
          <span className="truncate">{node.name}</span>
        </button>
        {open && kids.map((k) => renderTree(k.id, depth + 1))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-hairline bg-background/85 backdrop-blur-xl">
        <div className="h-14 px-4 lg:px-6 flex items-center gap-4">
          <Link href="/storage" className="flex items-center gap-2 text-[13px] text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Storage</span>
          </Link>
          <div className="h-4 w-px bg-hairline" />
          <Link href="/" className="flex items-center gap-2">
            <img src={'/logo.png'} alt="" className="h-6 w-6" />
            <span className="text-[13px] font-medium tracking-tight">Explorer</span>
          </Link>

          <div className="ml-auto flex items-center gap-2 flex-1 max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Pesquisar em CloudBase…"
                className="w-full h-9 rounded-md border border-hairline bg-surface pl-9 pr-3 text-[13px] outline-none focus:border-foreground transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-1 border border-hairline rounded-md p-0.5">
            <button
              onClick={() => setView("list")}
              className={`h-7 w-7 grid place-items-center rounded transition-colors ${view === "list" ? "bg-accent text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              <List className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setView("grid")}
              className={`h-7 w-7 grid place-items-center rounded transition-colors ${view === "grid" ? "bg-accent text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              <Grid3x3 className="h-3.5 w-3.5" />
            </button>
          </div>

          <button className="hidden sm:inline-flex items-center gap-1.5 h-9 px-3 rounded-md border border-hairline hover:border-foreground text-[13px] transition-colors">
            <FolderPlus className="h-3.5 w-3.5" /> Nova pasta
          </button>
          <button className="inline-flex items-center gap-1.5 h-9 px-3 rounded-md bg-foreground text-background text-[13px] hover:opacity-90 transition-opacity">
            <Upload className="h-3.5 w-3.5" /> Carregar
          </button>
        </div>
      </header>

      <div className="grid lg:grid-cols-[260px_1fr_320px] min-h-[calc(100vh-3.5rem)]">
        {/* Sidebar tree */}
        <aside className="hidden lg:flex flex-col border-r border-hairline bg-surface-2/40">
          <div className="p-3">
            <div className="mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground px-2 mb-2">Rápido</div>
            {[
              { icon: Home, label: "Início", to: "/storage" as const },
              { icon: Star, label: "Favoritos" },
              { icon: Clock, label: "Recentes" },
              { icon: Share2, label: "Partilhados" },
              { icon: Trash2, label: "Reciclagem" },
            ].map((q, i) => {
              const Inner = (
                <>
                  <q.icon className="h-4 w-4" />
                  <span>{q.label}</span>
                </>
              );
              return q.to ? (
                <Link
                  key={i}
                  href={q.to}
                  className="w-full flex items-center gap-2 px-2 py-1.5 rounded text-[13px] text-muted-foreground hover:text-foreground hover:bg-surface-2 transition-colors"
                >
                  {Inner}
                </Link>
              ) : (
                <button
                  key={i}
                  className="w-full flex items-center gap-2 px-2 py-1.5 rounded text-[13px] text-muted-foreground hover:text-foreground hover:bg-surface-2 transition-colors"
                >
                  {Inner}
                </button>
              );
            })}
          </div>

          <div className="h-px bg-hairline mx-3" />

          <div className="p-3 flex-1 overflow-y-auto">
            <div className="flex items-center justify-between px-2 mb-2">
              <span className="mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Pastas</span>
              <button className="text-muted-foreground hover:text-foreground">
                <FolderPlus className="h-3.5 w-3.5" />
              </button>
            </div>
            {renderTree("root")}
          </div>

          <div className="p-3 border-t border-hairline">
            <div className="mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground px-2 mb-2">Drivers</div>
            {(["GOOGLE_DRIVE", "ONEDRIVE", "TELEGRAM", "MEGA", "VPS"] as const).map((d) => {
              const m = driverMeta[d];
              const Icon = m.icon;
              return (
                <div key={d} className="flex items-center gap-2 px-2 py-1.5 rounded text-[12px] text-muted-foreground">
                  <Icon className="h-3.5 w-3.5" />
                  <span className="flex-1 truncate">{m.label}</span>
                  <span className="mono text-[10px]">●</span>
                </div>
              );
            })}
          </div>
        </aside>

        {/* Main content */}
        <main className="min-w-0 flex flex-col">
          {/* Breadcrumb */}
          <div className="h-11 px-4 lg:px-6 flex items-center gap-1 border-b border-hairline text-[13px] overflow-x-auto">
            {breadcrumb.map((n, i) => (
              <div key={n.id} className="flex items-center gap-1 shrink-0">
                {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />}
                <button
                  onClick={() => setCurrentId(n.id)}
                  className={`px-2 py-1 rounded hover:bg-surface-2 transition-colors ${
                    i === breadcrumb.length - 1 ? "text-foreground font-medium" : "text-muted-foreground"
                  }`}
                >
                  {n.name}
                </button>
              </div>
            ))}
            <div className="ml-auto mono text-[11px] text-muted-foreground shrink-0">
              {children.length} {children.length === 1 ? "item" : "itens"}
            </div>
          </div>

          {/* Empty state */}
          {children.length === 0 && (
            <div className="flex-1 grid place-items-center p-12">
              <div className="text-center">
                <Boxes className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
                <p className="display text-2xl">Nada por aqui.</p>
                <p className="text-[13px] text-muted-foreground mt-1">Carrega o teu primeiro ficheiro nesta pasta.</p>
              </div>
            </div>
          )}

          {/* List view */}
          {view === "list" && children.length > 0 && (
            <div className="flex-1">
              <div className="grid grid-cols-[1fr_140px_120px_120px_40px] gap-3 px-4 lg:px-6 h-9 items-center mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground border-b border-hairline">
                <span>Nome</span>
                <span>Driver</span>
                <span>Tamanho</span>
                <span>Modificado</span>
                <span />
              </div>
              {children.map((n, i) => {
                const Icon = iconFor(n);
                const isSel = selected === n.id;
                return (
                  <motion.div
                    key={n.id}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(i * 0.015, 0.15), duration: 0.2 }}
                    onClick={() => setSelected(n.id)}
                    onDoubleClick={() => n.kind === "folder" && setCurrentId(n.id)}
                    className={`group grid grid-cols-[1fr_140px_120px_120px_40px] gap-3 px-4 lg:px-6 h-11 items-center text-[13px] cursor-pointer border-b border-hairline/50 transition-colors ${
                      isSel ? "bg-accent" : "hover:bg-surface-2"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon className={`h-4 w-4 shrink-0 ${n.kind === "folder" ? "text-foreground" : "text-muted-foreground"}`} />
                      <span className="truncate">{n.name}</span>
                      {n.fragmented && (
                        <span className="mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-foreground text-background">
                          frag
                        </span>
                      )}
                      {n.starred && <Star className="h-3 w-3 fill-foreground text-foreground" />}
                    </div>
                    <div className="text-muted-foreground text-[12px] truncate">
                      {n.driver ? driverMeta[n.driver].label : "—"}
                    </div>
                    <div className="mono text-[12px] text-muted-foreground">{fmtSize(n.size)}</div>
                    <div className="mono text-[12px] text-muted-foreground">{n.updatedAt}</div>
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="opacity-0 group-hover:opacity-100 h-7 w-7 grid place-items-center rounded hover:bg-background text-muted-foreground"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Grid view */}
          {view === "grid" && children.length > 0 && (
            <div className="p-4 lg:p-6 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
              {children.map((n, i) => {
                const Icon = iconFor(n);
                const isSel = selected === n.id;
                return (
                  <motion.button
                    key={n.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: Math.min(i * 0.02, 0.2) }}
                    onClick={() => setSelected(n.id)}
                    onDoubleClick={() => n.kind === "folder" && setCurrentId(n.id)}
                    className={`group text-left rounded-lg border p-4 transition-all ${
                      isSel ? "border-foreground bg-accent" : "border-hairline hover:border-foreground/40 hover:bg-surface-2"
                    }`}
                  >
                    <div className="aspect-square rounded-md bg-surface-2 grid place-items-center mb-3 group-hover:bg-background transition-colors">
                      <Icon className={`h-8 w-8 ${n.kind === "folder" ? "text-foreground" : "text-muted-foreground"}`} />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[13px] truncate flex-1">{n.name}</span>
                      {n.fragmented && (
                        <span className="mono text-[9px] uppercase px-1 py-0.5 rounded bg-foreground text-background">
                          frag
                        </span>
                      )}
                    </div>
                    <div className="mt-1 mono text-[10px] text-muted-foreground uppercase tracking-wide">
                      {n.kind === "folder" ? "Pasta" : fmtSize(n.size)}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          )}
        </main>

        {/* Details panel */}
        <aside className="hidden lg:flex flex-col border-l border-hairline bg-surface-2/40">
          {selectedNode ? (
            <>
              <div className="p-5 border-b border-hairline">
                <div className="aspect-video rounded-md bg-surface grid place-items-center mb-4">
                  {(() => {
                    const Icon = iconFor(selectedNode);
                    return <Icon className="h-12 w-12 text-muted-foreground" />;
                  })()}
                </div>
                <h3 className="text-[14px] font-medium break-words leading-tight">{selectedNode.name}</h3>
                <p className="mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground mt-1">
                  {selectedNode.kind === "folder" ? "Pasta" : selectedNode.mime ?? "Ficheiro"}
                </p>
              </div>

              <div className="p-5 space-y-4 flex-1 overflow-y-auto">
                <div className="grid grid-cols-2 gap-2">
                  <button className="h-9 rounded-md border border-hairline hover:border-foreground text-[12px] inline-flex items-center justify-center gap-1.5 transition-colors">
                    <Download className="h-3.5 w-3.5" /> Descarregar
                  </button>
                  <button className="h-9 rounded-md border border-hairline hover:border-foreground text-[12px] inline-flex items-center justify-center gap-1.5 transition-colors">
                    <Share2 className="h-3.5 w-3.5" /> Partilhar
                  </button>
                </div>

                <div>
                  <div className="mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-2 flex items-center gap-1.5">
                    <Info className="h-3 w-3" /> Detalhes
                  </div>
                  <dl className="text-[12px] space-y-2">
                    <Row k="Tamanho" v={fmtSize(selectedNode.size)} />
                    <Row k="Driver" v={selectedNode.driver ? driverMeta[selectedNode.driver].label : "—"} />
                    <Row k="Modificado" v={selectedNode.updatedAt} />
                    <Row k="Fragmentado" v={selectedNode.fragmented ? "Sim" : "Não"} />
                  </dl>
                </div>

                {selectedNode.fragmented && (
                  <div className="rounded-md border border-hairline bg-surface p-3">
                    <div className="mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
                      Distribuição
                    </div>
                    <div className="h-2 rounded-full overflow-hidden flex">
                      <div className="bg-foreground" style={{ width: "40%" }} />
                      <div className="bg-foreground/60" style={{ width: "35%" }} />
                      <div className="bg-foreground/30" style={{ width: "25%" }} />
                    </div>
                    <p className="mt-2 text-[11px] text-muted-foreground">3 partes em 3 drivers.</p>
                  </div>
                )}

                <div className="rounded-md border border-hairline bg-surface p-3">
                  <div className="mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-2 flex items-center gap-1.5">
                    <Sparkles className="h-3 w-3" /> AI
                  </div>
                  <p className="text-[12px]">Sugestão de categoria: <span className="font-medium">Automática</span></p>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 grid place-items-center p-8 text-center">
              <div>
                <Info className="h-8 w-8 mx-auto text-muted-foreground mb-3" />
                <p className="text-[13px] text-muted-foreground">
                  Selecciona um ficheiro para ver detalhes.
                </p>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className="mono text-right">{v}</dd>
    </div>
  );
}
