import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "../reveal";
import { SectionHeader } from "./SectionHeader";

export function DevPreview() {
  return (
    <section id="developers" className="py-32 border-t border-hairline">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          index="19"
          kicker="Para Developers"
          title="Uma API. Todos os providers."
          sub="SDK npm com routing inteligente, HLS automático, e fallback entre providers. Integra em minutos, sem gerir infraestrutura."
        />
        <div className="mt-16 grid lg:grid-cols-2 gap-8">
          <Reveal>
            <div className="rounded-2xl border border-hairline bg-foreground text-background p-6 mono text-[13px] overflow-x-auto">
              <div className="text-background/50 mb-2">// npm install @cloudbase/sdk</div>
              <pre className="whitespace-pre leading-relaxed">{`import { CloudBase } from '@cloudbase/sdk'

const cb = new CloudBase({
  apiKey: 'cb_live_xxx',
  routing: {
    images:    { primary: 'imagekit',   fallback: 'cloudinary' },
    videos:    { primary: 'cloudinary', fallback: 'firebase'   },
    documents: { primary: 'supabase',   fallback: 'backblaze'  },
  },
})

// Upload com routing automático
const file = await cb.upload(myFile, {
  folder: 'produtos/imagens'
})
// → { id, url, provider, size, createdAt }

// Vídeo com HLS streaming
const video = await cb.upload(videoFile, {
  type: 'video',
  hls: true
})
// → { id, playlistUrl: "...playlist.m3u8" }`}</pre>
            </div>
          </Reveal>
          <div className="space-y-6">
            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-hairline p-6">
                <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-4">API REST</h3>
                <div className="mono text-[13px] space-y-2">
                  {[
                    ["POST", "/v1/storage/upload"],
                    ["GET", "/v1/storage/{fileId}/url"],
                    ["POST", "/v1/storage/{fileId}/signed-url"],
                    ["DELETE", "/v1/storage/{fileId}"],
                    ["GET", "/v1/storage?folder=produtos"],
                  ].map(([method, path]) => (
                    <div key={path} className="flex items-center gap-3 py-1.5 border-b border-hairline/60 last:border-0">
                      <span className={`text-xs font-semibold w-14 ${method === "POST" ? "text-success" : method === "DELETE" ? "text-destructive" : "text-info"}`}>
                        {method}
                      </span>
                      <span className="text-muted-foreground">api.cloudbase.app</span>
                      <span>{path}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="rounded-2xl border border-hairline p-6">
                <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-4">Routing inteligente</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {[
                    "Imagens → providers com URL pública directa",
                    "Vídeos → providers com CDN (HLS se activado)",
                    "Espaço verificado antes de cada upload",
                    "Bandwidth monitorizado em tempo real",
                    "Fallback automático entre providers",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="size-1 rounded-full bg-foreground/50" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <Link
                href="/docs/developers"
                className="group inline-flex items-center gap-2 text-sm font-medium hover:underline underline-offset-4"
              >
                Documentação completa do SDK
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
