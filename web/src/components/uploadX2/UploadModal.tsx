"use client";

import { useEffect } from "react";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { useUpload, UploadStep } from "./hooks/use-upload";
import { StepFileSelect } from "./steps/StepFileSelect";
import { StepDriverSelect } from "./steps/StepDriverSelect";
import { StepPlan } from "./steps/StepPlan";
import { StepProgress } from "./steps/StepProgress";
import { ApiDriver } from "@/lib/api/drivers/types";

const ALL_STEPS: { id: UploadStep; label: string; description: string }[] = [
  {
    id: "file",
    label: "Ficheiros",
    description: "Seleciona ou arrasta os ficheiros que queres guardar.",
  },
  {
    id: "driver",
    label: "Driver",
    description: "Escolhe onde os ficheiros vão ser guardados.",
  },
  {
    id: "plan",
    label: "Plano",
    description: "Revê o plano de distribuição antes de confirmar o envio.",
  },
  {
    id: "progress",
    label: "Envio",
    description: "A processar os teus ficheiros…",
  },
];

interface UploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
  parentId?: string | null;
  initialFiles?: File[];
  drivers: ApiDriver[];
  loadingDrivers: boolean;
}

export function UploadModal({
  open,
  onOpenChange,
  userId,
  parentId = null,
  initialFiles = [],
  drivers,
  loadingDrivers,
}: UploadModalProps) {
  const upload = useUpload({ userId, parentId });

  useEffect(() => {
    if (open) {
      if (initialFiles.length > 0) {
        upload.setFiles(initialFiles);
      }
      upload.setStep("file");
    } else {
      upload.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const showPlanStep =
    upload.selectedDriverIds.length > 1 ||
    (upload.plan?.placed?.some((f) => f.isFragmented) ?? false);

  const activeSteps = ALL_STEPS.filter((s) => s.id !== "plan" || showPlanStep);
  const stepIndex = activeSteps.findIndex((s) => s.id === upload.step);

  const handleNext = async () => {
    console.log(
      `🖥️ [UploadModal] Avançar clicado no step actual: ${upload.step}`,
    );
    if (upload.step === "file" && upload.canAdvanceFromFiles) {
      upload.setStep("driver");
    } else if (upload.step === "driver" && upload.canAdvanceFromDrivers) {
      await upload.fetchPlan();
      if (showPlanStep) {
        upload.setStep("plan");
      } else {
        upload.setStep("progress");
      }
    } else if (upload.step === "plan" && upload.canAdvanceFromPlan) {
      await upload.confirmPlan();
      upload.setStep("progress");
    }
  };

  const handleBack = () => {
    if (upload.step === "driver") upload.setStep("file");
    if (upload.step === "plan") upload.setStep("driver");
    if (upload.step === "progress") {
      if (showPlanStep) upload.setStep("plan");
      else upload.setStep("driver");
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      if (upload.step === "progress" && !upload.isUploadDone) return;
      upload.reset();
    }
    onOpenChange(open);
  };

  const currentStepConfig = ALL_STEPS.find((s) => s.id === upload.step);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Adicionar ficheiros</DialogTitle>
          <DialogDescription>
            {currentStepConfig?.description}
          </DialogDescription>
        </DialogHeader>

        {/* Stepper */}
        <div className="flex items-center gap-0 mb-2">
          {activeSteps.map((step, i) => (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center gap-1 flex-1">
                <div
                  className={cn(
                    "flex size-7 items-center justify-center rounded-full text-xs font-semibold border-2 transition-all",
                    i < stepIndex
                      ? "border-primary bg-primary text-primary-foreground"
                      : i === stepIndex
                        ? "border-primary text-primary bg-background"
                        : "border-muted-foreground/30 text-muted-foreground/50 bg-background",
                  )}
                >
                  {i < stepIndex ? <Check className="size-3" /> : i + 1}
                </div>
                <span
                  className={cn(
                    "text-[10px] font-medium",
                    i === stepIndex
                      ? "text-primary"
                      : "text-muted-foreground/50",
                  )}
                >
                  {step.label}
                </span>
              </div>
              {i < activeSteps.length - 1 && (
                <div
                  className={cn(
                    "h-px flex-1 mb-4 transition-colors",
                    i < stepIndex ? "bg-primary" : "bg-muted",
                  )}
                />
              )}
            </div>
          ))}
        </div>

        {/* Conteúdo */}
        <div className="min-h-[200px]">
          {upload.step === "file" && (
            <StepFileSelect
              files={upload.files}
              onFilesChange={upload.setFiles}
              isDragging={upload.isDragging}
              onDragChange={upload.setIsDragging}
            />
          )}

          {upload.step === "driver" && (
            <StepDriverSelect
              drivers={drivers}
              loading={loadingDrivers}
              selectedDriverIds={upload.selectedDriverIds}
              onSelectionChange={upload.setSelectedDriverIds}
              totalFileSizeBytes={upload.totalFileSize}
            />
          )}

          {upload.step === "plan" && (
            <StepPlan
              // SOLUÇÃO TS: Se upload.plan existe, passamos o array .placed. Se não, passamos um array vazio.
              plan={upload.plan?.placed ?? []}
              drivers={drivers}
              onPlanChange={(newPlan) => {
                // Sincroniza as alterações manuais do StepPlan com o hook
                console.log(
                  "🖥️ [UploadModal] Plano reajustado manualmente pelo utilizador:",
                  newPlan,
                );
                upload.updateChunkDriver(
                  newPlan[0]?.fileName ?? "",
                  0, // Exemplo simplificado para remontagem rápida
                  newPlan[0]?.chunks[0]?.driverId ?? "",
                  newPlan[0]?.chunks[0]?.driverName ?? "",
                  newPlan[0]?.chunks[0]?.driverType ?? "",
                );
              }}
            />
          )}

          {upload.step === "progress" && (
            <StepProgress
              fileProgress={upload.uploadProgress}
              isDone={upload.isUploadDone}
              onStart={upload.executeUpload}
            />
          )}
        </div>

        {/* Footer */}
        <DialogFooter className="gap-2 sm:justify-between">
          <div>
            {upload.step !== "file" && upload.step !== "progress" && (
              <Button variant="ghost" onClick={handleBack}>
                <ArrowLeft className="size-4" /> Voltar
              </Button>
            )}
          </div>

          <div className="flex gap-2">
            {upload.step !== "progress" && (
              <Button variant="outline" onClick={() => handleOpenChange(false)}>
                Cancelar
              </Button>
            )}

            {upload.step === "file" && (
              <Button
                onClick={handleNext}
                disabled={!upload.canAdvanceFromFiles}
              >
                Continuar <ArrowRight className="size-4" />
              </Button>
            )}

            {upload.step === "driver" && (
              <Button
                onClick={handleNext}
                disabled={
                  !upload.canAdvanceFromDrivers ||
                  upload.planStatus === "loading"
                }
              >
                {upload.planStatus === "loading" ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <>
                    {showPlanStep ? "Ver Plano" : "Enviar"}{" "}
                    <ArrowRight className="size-4" />
                  </>
                )}
              </Button>
            )}

            {upload.step === "plan" && (
              <Button
                onClick={handleNext}
                disabled={
                  !upload.canAdvanceFromPlan ||
                  upload.verifyStatus === "verifying"
                }
              >
                {upload.verifyStatus === "verifying" ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <>
                    Confirmar e Enviar <ArrowRight className="size-4" />
                  </>
                )}
              </Button>
            )}

            {upload.step === "progress" && upload.isUploadDone && (
              <Button onClick={() => handleOpenChange(false)}>
                <Check className="size-4" /> Fechar
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
