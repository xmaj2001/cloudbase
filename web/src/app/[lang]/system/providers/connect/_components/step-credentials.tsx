"use client";

import { motion } from "framer-motion";
import {
  Lock,
  Shield,
  Check,
  RefreshCw,
  Play,
  AlertTriangle,
  ExternalLink,
} from "lucide-react";
import { ProviderHeader, Field } from "./shared-components";
import { ProviderSpec } from "@/components/providers/provider-spec";

interface StepCredentialsProps {
  selected: ProviderSpec;
  displayName: string;
  setDisplayName: (name: string) => void;
  creds: Record<string, string>;
  setCreds: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  priority: number;
  setPriority: (p: number) => void;
  canSubmit: boolean;
  submitting: boolean;
  done: boolean;
  onSubmit: () => void;
  setStep: (step: 1 | 2 | 3 | 4) => void;
}

export function StepCredentials({
  selected,
  displayName,
  setDisplayName,
  creds,
  setCreds,
  priority,
  setPriority,
  canSubmit,
  submitting,
  done,
  onSubmit,
  setStep,
}: StepCredentialsProps) {
  return (
    <motion.section
      key="s4"
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
            <Lock className="size-4" />
            <h2 className="text-[14px] font-medium">
              Credenciais · {selected.authKind.replace("_", " ")}
            </h2>
          </div>

          <Field
            label="Nome de exibição"
            helper="Como este driver aparecerá na lista."
          >
            <input
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full h-10 bg-surface-2 rounded-lg px-3 text-[13px] outline-none focus:ring-1 focus:ring-foreground"
            />
          </Field>

          {selected.authKind === "OAUTH" ? (
            <div className="p-5 rounded-xl border border-hairline bg-surface-2/50 flex items-center justify-between">
              <div>
                <div className="text-[13px] font-medium">Autorização OAuth</div>
                <div className="text-[12px] text-muted-foreground mt-1">
                  Serás redirecionado para {selected.name} para autorizar.
                </div>
              </div>
              <button
                onClick={() =>
                  setCreds({
                    accessToken: "mock",
                    refreshToken: "mock",
                    accountEmail: "user@example.com",
                  })
                }
                className="inline-flex items-center gap-2 h-9 px-4 rounded-full bg-foreground text-background text-[12px] hover:opacity-90 transition"
              >
                <ExternalLink className="size-3.5" /> Autorizar
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selected.fields.map((f) => (
                <Field
                  key={f.name}
                  label={f.label}
                  helper={f.helper}
                  full={f.type === "password"}
                >
                  <input
                    type={f.type ?? "text"}
                    placeholder={f.placeholder}
                    value={creds[f.name] ?? ""}
                    onChange={(e) =>
                      setCreds((c) => ({ ...c, [f.name]: e.target.value }))
                    }
                    className="w-full h-10 bg-surface-2 rounded-lg px-3 text-[13px] mono outline-none focus:ring-1 focus:ring-foreground"
                  />
                </Field>
              ))}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-hairline">
            <Field
              label="Prioridade"
              helper="0 = mais alta. Drivers com maior prioridade recebem escritas primeiro."
            >
              <input
                type="number"
                min={0}
                value={priority}
                onChange={(e) => setPriority(Number(e.target.value))}
                className="w-full h-10 bg-surface-2 rounded-lg px-3 text-[13px] mono outline-none focus:ring-1 focus:ring-foreground"
              />
            </Field>
            <Field label="Tipo" helper="Detetado automaticamente.">
              <div className="h-10 flex items-center px-3 rounded-lg bg-surface-2 text-[13px] mono text-muted-foreground">
                {selected.type}
              </div>
            </Field>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
          <Shield className="size-3.5" />
          Credenciais encriptadas em repouso com AES-256. Nunca são expostas no
          cliente.
        </div>
      </div>

      <div className="space-y-3">
        <button
          disabled={!canSubmit || submitting || done}
          onClick={onSubmit}
          className="w-full h-11 rounded-full bg-foreground text-background text-[13px] font-medium hover:opacity-90 transition disabled:opacity-40 inline-flex items-center justify-center gap-2"
        >
          {done ? (
            <>
              <Check className="size-4" /> Conectado
            </>
          ) : submitting ? (
            <>
              <RefreshCw className="size-4 animate-spin" /> A conectar...
            </>
          ) : (
            <>
              <Play className="size-4" /> Conectar driver
            </>
          )}
        </button>
        <button
          onClick={() => setStep(3)}
          className="w-full h-10 rounded-full border border-hairline text-[12px] hover:border-foreground transition"
        >
          Voltar
        </button>
        {!canSubmit && !submitting && (
          <div className="flex items-start gap-2 p-3 rounded-lg bg-surface-2 text-[11px] text-muted-foreground">
            <AlertTriangle className="size-3.5 mt-0.5 shrink-0" />
            Preenche o nome e todos os campos obrigatórios.
          </div>
        )}
      </div>
    </motion.section>
  );
}
