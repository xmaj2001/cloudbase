"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";

import { useUpload } from "./hooks/use-upload";
import type { FilePlanSuccess } from "./upload.types";
import { UploadStep } from "./upload.types";
import { StepFileSelect } from "./steps/StepFileSelect";
import { StepProviderSelect } from "./steps/StepProviderSelect";
import { StepPlan } from "./steps/StepPlan";
import { StepProgress } from "./steps/StepProgress";
import type { ApiProvider } from "@/lib/features/providers";
import { Stepper } from "./Stepper";

const subtitle: Record<UploadStep, string> = {
  file: "Escolhe os ficheiros que queres adicionar ao teu armazenamento unificado.",
  provider:
    "Escolha o provider de destino para onde os ficheiros vão ser transferidos.",
  plan: "Revê o plano de distribuição e ajusta os providers de destino de cada ficheiro ou parte.",
  progress:
    "Os teus ficheiros estão a ser transferidos e registados no sistema.",
};

interface UploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
  parentId?: string | null;
  initialFiles?: File[];
}

export function UploadModal({
  open,
  onOpenChange,
  userId,
  parentId = null,
  initialFiles = [],
}: UploadModalProps) {
  const [files, setFiles] = useState<File[]>(initialFiles);
  const [step, setStep] = useState<UploadStep>("file");
  const [selectedProviders, setSelectedProviders] = useState<ApiProvider[]>([]);
  const [editedPlan, setEditedPlan] = useState<FilePlanSuccess[]>([]);

  const {
    fetchPlan,
    startUpload,
    planResult,
    isPlanLoading,
    fileProgress,
    isUploadingDone,
  } = useUpload({
    userId,
    parentId,
    files,
    selectedProviders,
  });

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setFiles([]);
      setSelectedProviders([]);
      setEditedPlan([]);
      setStep("file");
    }
    onOpenChange(isOpen);
  };

  const goNext = async () => {
    if (step === "file") {
      setStep("provider");
    } else if (step === "provider") {
      // Chamar o backend para calcular o plano
      const result = await fetchPlan();
      if (result) {
        setEditedPlan(result.placed);
        setStep("plan");
      }
    } else if (step === "plan") {
      // Executar o upload com o plano (possivelmente editado pelo utilizador)
      void startUpload(editedPlan);
      setStep("progress");
    } else if (step === "progress" && isUploadingDone) {
      handleOpenChange(false);
    }
  };

  const goBack = () => {
    if (step === "provider") setStep("file");
    if (step === "plan") setStep("provider");
  };

  const canContinue = (() => {
    if (step === "file") return files.length > 0;
    if (step === "provider") return !isPlanLoading;
    if (step === "plan") return editedPlan.length > 0;
    if (step === "progress") return isUploadingDone;
    return false;
  })();

  const getNextLabel = () => {
    if (step === "file") return "Continuar";
    if (step === "provider") return isPlanLoading ? "A calcular..." : "Ver Plano";
    if (step === "plan") return "Iniciar Envio";
    if (step === "progress") return isUploadingDone ? "Fechar" : "A enviar...";
    return "Continuar";
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-3xl p-0 gap-0 overflow-hidden border border-hairline bg-background">
        <DialogHeader className="px-7 pt-6 pb-5 border-b border-hairline space-y-1.5">
          <div className="text-xl font-medium tracking-tight">
            Adicionar ficheiros
          </div>
          <DialogDescription className="text-sm text-muted-foreground">
            {subtitle[step]}
          </DialogDescription>
          <div className="pt-5">
            <Stepper current={step} isUploading={step === "progress" && !isUploadingDone} />
          </div>
        </DialogHeader>

        <div className="relative min-h-87.5 max-h-[60vh] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 14 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -14 }}
              transition={{ duration: 0.22 }}
              className="p-7"
            >
              {step === "file" && (
                <StepFileSelect files={files} setFiles={setFiles} />
              )}
              {step === "provider" && (
                <StepProviderSelect
                  userId={userId}
                  selectedProviders={selectedProviders}
                  onSelectionChange={setSelectedProviders}
                />
              )}
              {step === "plan" && (
                <StepPlan
                  plan={editedPlan}
                  providers={selectedProviders}
                  onPlanChange={setEditedPlan}
                />
              )}
              {step === "progress" && (
                <StepProgress
                  fileProgress={fileProgress}
                  isDone={isUploadingDone}
                  onStart={() => {}}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="px-7 py-4 border-t border-hairline flex items-center justify-between bg-surface-1/30">
          <div>
            {(step === "provider" || step === "plan") && (
              <Button
                variant="ghost"
                onClick={goBack}
                disabled={isPlanLoading}
                className="gap-1.5 text-xs"
              >
                <ArrowLeft className="size-4" /> Voltar
              </Button>
            )}
          </div>
          <div className="flex items-center gap-2">
            {step !== "progress" && (
              <Button
                variant="outline"
                onClick={() => handleOpenChange(false)}
                className="text-xs"
              >
                Cancelar
              </Button>
            )}
            <Button
              onClick={goNext}
              disabled={!canContinue}
              className="gap-1.5 min-w-35 text-xs font-medium"
            >
              {(step === "progress" && !isUploadingDone) || (step === "provider" && isPlanLoading) ? (
                <Loader2 className="size-3.5 animate-spin" />
              ) : null}
              {step === "progress" && isUploadingDone && (
                <Check className="size-3.5 text-emerald-400" />
              )}
              {getNextLabel()}
              {step !== "progress" && !isPlanLoading && <ArrowRight className="size-4" />}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

