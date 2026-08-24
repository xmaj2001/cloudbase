"use client";

import { motion } from "framer-motion";
import { Shield, Folder, Lock, Pause, RefreshCw, Sparkles } from "lucide-react";
import { ProviderHeader, TermItem, Field, SideNav } from "./shared-components";
import { ProviderSpec } from "@/components/providers/provider-spec";

interface StepTermsSettingsProps {
  selected: ProviderSpec;
  folderName: string;
  setFolderName: (name: string) => void;
  acceptTerms: boolean;
  setAcceptTerms: (accept: boolean) => void;
  setStep: (step: 1 | 2 | 3 | 4) => void;
}

export function StepTermsSettings({
  selected,
  folderName,
  setFolderName,
  acceptTerms,
  setAcceptTerms,
  setStep,
}: StepTermsSettingsProps) {
  return (
    <motion.section
      key="s3"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6"
    >
      <div className="space-y-6">
        <ProviderHeader p={selected} />

        <div className="bg-background border border-hairline rounded-2xl p-6 space-y-5">
          <div className="flex items-center gap-2">
            <Shield className="size-4" />
            <h2 className="text-[14px] font-medium">Termos de conexão</h2>
          </div>

          <TermItem
            icon={Folder}
            title="Pasta dedicada"
            body={`A CloudBase criará uma pasta chamada "${folderName}" no teu ${selected.name}. Todos os ficheiros geridos ficam contidos aí — nada é escrito fora desta pasta.`}
          />
          <TermItem
            icon={Lock}
            title="Subpasta _fragments"
            body="Dentro da pasta acima existe uma subpasta _fragments com os chunks encriptados. NÃO a apagues nem modifiques — ficheiros ligados ficariam corrompidos."
            danger
          />
          <TermItem
            icon={Pause}
            title="Podes pausar quando quiseres"
            body="Se não quiseres que o CloudBase use este driver, pausa-o em qualquer momento. Nada é escrito ou lido enquanto estiver em pausa."
          />
          <TermItem
            icon={RefreshCw}
            title="Sincronização manual"
            body="Podes sincronizar sob pedido para atualizar espaço usado, contagem de ficheiros e estado dos fragmentos."
          />
          <TermItem
            icon={Sparkles}
            title="O que fazemos com os teus dados"
            body="Só lemos e escrevemos dentro da pasta dedicada. Metadados de fragmentos ficam no CloudBase; o conteúdo bruto permanece no teu provider."
          />

          <div className="pt-2 border-t border-hairline space-y-4">
            <Field
              label="Nome da pasta no driver"
              helper="Padrão: cloudbase. Podes personalizar."
            >
              <input
                value={folderName}
                onChange={(e) =>
                  setFolderName(e.target.value.replace(/[^a-zA-Z0-9_-]/g, ""))
                }
                className="w-full h-10 bg-surface-2 rounded-lg px-3 text-[13px] mono outline-none focus:ring-1 focus:ring-foreground"
              />
            </Field>

            <label className="flex items-start gap-3 cursor-pointer p-3 rounded-lg bg-surface-2 hover:bg-surface-2/70 transition">
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="mt-0.5 size-4 accent-foreground"
              />
              <span className="text-[12px] text-foreground/90 leading-relaxed">
                Aceito os termos e compreendo que apagar a pasta{" "}
                <span className="mono">{folderName}/_fragments</span> resulta em
                perda de dados.
              </span>
            </label>
          </div>
        </div>
      </div>

      <SideNav
        onBack={() => setStep(2)}
        onNext={() => setStep(4)}
        nextLabel="Continuar"
        disabled={!acceptTerms}
      />
    </motion.section>
  );
}
