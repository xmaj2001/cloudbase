"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";

import { useUpload } from "./hooks/use-upload";
import { UploadStep } from "./upload.types";
import { StepFileSelect } from "./steps/StepFileSelect";
import { StepDriverSelect } from "./steps/StepDriverSelect";
import { StepProgress } from "./steps/StepProgress";
import { ApiDriver } from "@/lib/api/drivers/types";
import { Stepper } from "./Stepper";

const subtitle: Record<UploadStep, string> = {
  file: "Escolhe os ficheiros que queres adicionar ao teu armazenamento unificado.",
  driver: "Escolha o driver de destino para onde os ficheiros vão ser transferidos.",
  plan: "",
  progress: "Os teus ficheiros estão a ser transferidos e registados no sistema.",
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
  const [selectedDrivers, setSelectedDrivers] = useState<ApiDriver[]>([]);

  // ── Instanciação do nosso Hook Simples ─────────────────────────────────────
  const { startUpload, fileProgress, isUploadingDone, resetUploadState } = useUpload({
    userId,
    parentId,
    files,
    selectedDrivers,
    onComplete: () => {
      // Opcional: O que fazer quando tudo acabar
    },
  });

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setFiles([]);
      setSelectedDrivers([]);
      setStep("file");
      resetUploadState();
    }
    onOpenChange(isOpen);
  };

  const goNext = () => {
    if (step === "file") {
      setStep("driver");
    } else if (step === "driver") {
      setStep("progress"); // Vai direto do driver para a barra de progresso ativa
    } else if (step === "progress" && isUploadingDone) {
      handleOpenChange(false); // Concluído -> Fecha o modal e limpa
    }
  };

  const goBack = () => {
    if (step === "driver") setStep("file");
  };

  const canContinue =
    (step === "file" && files.length > 0) ||
    (step === "driver") ||
    (step === "progress" && isUploadingDone);

  const getNextLabel = () => {
    if (step === "file") return "Continuar";
    if (step === "driver") return "Iniciar Envio";
    if (step === "progress") return isUploadingDone ? "Fechar" : "A enviar...";
    return "Continuar";
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-3xl p-0 gap-0 overflow-hidden border border-hairline bg-background">
        <DialogHeader className="px-7 pt-6 pb-5 border-b border-hairline space-y-1.5">
          <div className="text-xl font-medium tracking-tight">Adicionar ficheiros</div>
          <DialogDescription className="text-sm text-muted-foreground">
            {subtitle[step]}
          </DialogDescription>
          <div className="pt-5">
            <Stepper current={step} />
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
              {step === "driver" && (
                <StepDriverSelect
                  userId={userId}
                  selectedDrivers={selectedDrivers}
                  onSelectionChange={setSelectedDrivers}
                />
              )}
              {step === "progress" && (
                <StepProgress
                  fileProgress={fileProgress}
                  isDone={isUploadingDone}
                  onStart={startUpload}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="px-7 py-4 border-t border-hairline flex items-center justify-between bg-surface-1/30">
          <div>
            {step === "driver" && (
              <Button variant="ghost" onClick={goBack} className="gap-1.5 text-xs">
                <ArrowLeft className="size-4" /> Voltar
              </Button>
            )}
          </div>
          <div className="flex items-center gap-2">
            {step !== "progress" && (
              <Button variant="outline" onClick={() => handleOpenChange(false)} className="text-xs">
                Cancelar
              </Button>
            )}
            <Button
              onClick={goNext}
              disabled={!canContinue}
              className="gap-1.5 min-w-35 text-xs font-medium"
            >
              {step === "progress" && !isUploadingDone && (
                <Loader2 className="size-3.5 animate-spin" />
              )}
              {step === "progress" && isUploadingDone && (
                <Check className="size-3.5 text-emerald-400" />
              )}
              {getNextLabel()}
              {step !== "progress" && <ArrowRight className="size-4" />}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}