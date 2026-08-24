"use client";

import { motion } from "framer-motion";
import { Info, Video, ExternalLink } from "lucide-react";
import { ProviderHeader, SideNav, EmptyPanel } from "./shared-components";
import { ProviderSpec } from "@/components/providers/provider-spec";

interface StepDocumentationProps {
  selected: ProviderSpec;
  setStep: (step: 1 | 2 | 3 | 4) => void;
}

export function StepDocumentation({
  selected,
  setStep,
}: StepDocumentationProps) {
  return (
    <motion.section
      key="s2"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6"
    >
      <div className="space-y-6">
        <ProviderHeader p={selected} />

        {selected.docs ? (
          <div className="bg-background border border-hairline rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Info className="size-4" />
              <h2 className="text-[14px] font-medium">Como conectar</h2>
            </div>
            <ol className="space-y-3">
              {selected.docs.excerpt.map((line, i) => (
                <li key={i} className="flex gap-3 text-[13px]">
                  <span className="mono text-[11px] text-muted-foreground w-5 shrink-0 pt-0.5">
                    {i + 1}.
                  </span>
                  <span className="text-foreground/90">{line}</span>
                </li>
              ))}
            </ol>
            <a
              href={selected.docs.url}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground transition"
            >
              Documentação completa <ExternalLink className="size-3" />
            </a>
          </div>
        ) : (
          <EmptyPanel
            icon={Info}
            title="Sem documentação"
            text="Este provider ainda não tem guia detalhado."
          />
        )}

        {selected.video ? (
          <div className="bg-background border border-hairline rounded-2xl overflow-hidden">
            <div className="flex items-center gap-2 p-4 border-b border-hairline">
              <Video className="size-4" />
              <h2 className="text-[14px] font-medium">
                {selected.video.title}
              </h2>
            </div>
            <div className="aspect-video bg-surface-2">
              <iframe
                src={selected.video.url}
                title={selected.video.title}
                className="w-full h-full"
                allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        ) : (
          <EmptyPanel
            icon={Video}
            title="Sem vídeo"
            text="Ainda não temos tutorial em vídeo para este provider."
          />
        )}
      </div>

      <SideNav
        onBack={() => setStep(1)}
        onNext={() => setStep(3)}
        nextLabel="Continuar"
      />
    </motion.section>
  );
}
