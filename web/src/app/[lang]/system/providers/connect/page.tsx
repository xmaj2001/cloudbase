"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { ArrowLeft, Check } from "lucide-react";

import { StepProviderPicker } from "./_components/step-provider-picker";
import { StepDocumentation } from "./_components/step-documentation";
import { StepTermsSettings } from "./_components/step-terms-settings";
import { StepCredentials } from "./_components/step-credentials";
import {
  providers,
  type ProviderSpec,
} from "@/components/providers/provider-spec";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { providerService } from "@/lib/features/providers/provider.service";

type Step = 1 | 2 | 3 | 4;

const stepLabels: Record<Step, string> = {
  1: "Escolher provider",
  2: "Documentação",
  3: "Termos & configuração",
  4: "Credenciais",
};

export default function ConnectProviderPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [selected, setSelected] = useState<ProviderSpec | null>(null);
  const [query, setQuery] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [folderName, setFolderName] = useState("cloudbase");
  const [priority, setPriority] = useState(0);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [creds, setCreds] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const filteredProviders = useMemo(
    () =>
      providers.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  );

  const handlePickProvider = (p: ProviderSpec) => {
    setSelected(p);
    setDisplayName(`${p.name} · Pessoal`);
    setCreds({});
    setStep(2);
  };

  const canSubmit =
    selected &&
    acceptTerms &&
    displayName.trim().length > 1 &&
    selected.fields.every(
      (f) => !f.required || (creds[f.name] ?? "").trim().length > 0,
    );

  const queryClient = useQueryClient();
  const connect = useMutation({
    mutationFn: (data: any) => providerService.createProvider(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["providers"] });
      setDone(true);
      // setTimeout(() => router.push("/system/providers"), 1000);
    },
    onError: (error) => {
      console.error("Erro ao conectar:", error);
    },
  });

  const handleSubmit = async () => {
    if (!selected || !canSubmit) return;

    const payload = {
      type: selected.type,
      displayName: displayName,
      priority: priority,
      credentials: {
        ...creds,
      } as any,
    };

    connect.mutate(payload);
  };

  return (
    <>
      <div className="mb-6">
        <Link
          href="/system/providers"
          className="inline-flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground transition"
        >
          <ArrowLeft className="size-3.5" /> Todos os providers
        </Link>
      </div>

      {/* Stepper */}
      <ol className="flex items-center gap-2 mb-8 flex-wrap">
        {(Object.keys(stepLabels) as unknown as Step[]).map((s) => {
          const n = Number(s) as Step;
          const active = step === n;
          const complete = step > n;
          return (
            <li key={n} className="flex items-center gap-2">
              <button
                onClick={() => (complete || n === 1) && setStep(n)}
                disabled={!complete && !active && n !== 1 ? true : false}
                className={`flex items-center gap-2 h-8 px-3 rounded-full text-[11px] mono transition ${
                  active
                    ? "bg-foreground text-background"
                    : complete
                      ? "bg-surface-2 text-foreground hover:bg-surface-2/70"
                      : "bg-transparent text-muted-foreground border border-hairline"
                }`}
              >
                <span className="tabular-nums">0{n}</span>
                <span>{stepLabels[n]}</span>
                {complete && <Check className="size-3" />}
              </button>
              {n < 4 && (
                <span className="text-muted-foreground text-[10px]">·</span>
              )}
            </li>
          );
        })}
      </ol>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <StepProviderPicker
            query={query}
            setQuery={setQuery}
            filteredProviders={filteredProviders}
            onPick={handlePickProvider}
          />
        )}

        {step === 2 && selected && (
          <StepDocumentation selected={selected} setStep={setStep} />
        )}

        {step === 3 && selected && (
          <StepTermsSettings
            selected={selected}
            folderName={folderName}
            setFolderName={setFolderName}
            acceptTerms={acceptTerms}
            setAcceptTerms={setAcceptTerms}
            setStep={setStep}
          />
        )}

        {step === 4 && selected && (
          <StepCredentials
            selected={selected}
            displayName={displayName}
            setDisplayName={setDisplayName}
            creds={creds}
            setCreds={setCreds}
            priority={priority}
            setPriority={setPriority}
            canSubmit={!!canSubmit}
            submitting={submitting}
            done={done}
            onSubmit={handleSubmit}
            setStep={setStep}
          />
        )}
      </AnimatePresence>
    </>
  );
}
