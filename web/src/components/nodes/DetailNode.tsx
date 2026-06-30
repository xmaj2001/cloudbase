"use client";
import { ArrowUpRight,  File, Share2, Sparkles,  Tag, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { ApiNode } from "@/lib/api/node/types";
import { fmtSize } from "@/lib/utils/node";


export function DetailNode({ n, onClose }: { n: ApiNode; onClose: () => void }) {
  const driver = n.location?.providerName ? { displayName: n.location.providerName.split(" · ")[0] } : null;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 right-0 h-screen w-105 bg-background border-l border-hairline z-50 flex flex-col"
      >
        <div className="h-16 px-5 flex items-center justify-between border-b border-hairline">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Detalhes</span>
          <button onClick={onClose} className="p-1.5 rounded hover:bg-surface-2"><X className="size-4" /></button>
        </div>
        <div className="p-6 overflow-y-auto flex-1">
          <div className="aspect-video rounded-xl bg-surface-2 flex items-center justify-center mb-5">
            <File className="size-12 text-muted-foreground stroke-[1.2]" />
          </div>
          <h2 className="text-lg font-medium tracking-tight break-all">{n.name}</h2>
          <div className="mt-1 text-xs text-muted-foreground mono">{n.mimeType}</div>

          <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Tamanho</div>
              <div className="mt-1 mono">{fmtSize(Number(n.size))}</div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Modificado</div>
              <div className="mt-1 mono">{n.updatedAt}</div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Driver</div>
              <div className="mt-1">{driver?.displayName ?? "—"}</div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Estado</div>
              <div className="mt-1 flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-foreground" />{n.status}</div>
            </div>
          </div>

          {n.fragmentation.isFragmented && (
            <div className="mt-6 rounded-xl border border-hairline p-4 mono text-[12px]">
              <div className="text-[11px] uppercase tracking-widest text-muted-foreground mb-2">Fragmentação</div>
              <div>fragmento_001 → Google Drive A · sha256:a8f3</div>
              <div>fragmento_002 → Google Drive B · sha256:b4e1</div>
              <div>fragmento_003 → Telegram · sha256:c9d2</div>
              <div className="mt-2 ">Total de fragmentos: {n.fragmentation.totalChunks}</div>
              <div className="mt-2 ">Original Hash: {n.fragmentation.originalHash}</div>
              <div className="mt-2 text-green-600">verificação: ok</div>
            </div>
          )}

          <div className="mt-6">
            <div className="text-[11px] uppercase tracking-widest text-muted-foreground mb-2">Tags</div>
            <div className="flex flex-wrap gap-1.5">
              {n.tags.map(t => <span key={t} className="px-2 py-1 rounded-full bg-surface-2 text-xs flex items-center gap-1"><Tag className="size-2.5" />{t}</span>)}
              <button className="px-2 py-1 rounded-full border border-dashed border-hairline text-xs text-muted-foreground hover:text-foreground hover:border-foreground transition-colors">+ adicionar</button>
            </div>
          </div>

          {n.aiMetadata.category && (
            <div className="mt-6 rounded-xl bg-foreground/4 p-4">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                <Sparkles className="size-3" /> Análise IA
              </div>
              <div className="text-sm">Categoria sugerida: <span className="font-medium">{n.aiMetadata.category}</span></div>
              <div className="mt-1 text-xs text-muted-foreground">confiança:{n.aiMetadata.confidence}%</div>
            </div>
          )}
        </div>
        <div className="p-5 border-t border-hairline grid grid-cols-2 gap-2">
          <button className="px-4 py-2.5 rounded-full border border-hairline text-sm hover:bg-surface-2 transition-colors flex items-center justify-center gap-2"><Share2 className="size-3.5" /> Partilhar</button>
          <button className="px-4 py-2.5 rounded-full bg-foreground text-background text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2"><ArrowUpRight className="size-3.5" /> Abrir</button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}