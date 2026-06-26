'use client'
import { useCallback, useState, useEffect, useMemo } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { StepFileSelect } from "./steps/StepFileSelect";
import { StepDriverSelect } from "./steps/StepDriverSelect";
import { StepPlan } from "./steps/StepPlan";
import { StepProgress } from "./steps/StepProgress";
import { AnalysisResult } from "@/lib/api/drivers/features/upload-analysis";
import { useNodeMutations } from "@/hooks/use-nodes";
import { NodeType } from "@/lib/api/node/types";
import { ApiDriver } from "@/lib/api/drivers/types";
import { getDrivers } from "@/lib/api/drivers/features/get-drivers";
import { FilePlan } from "@/lib/api/upload/types";
import { getUploadPlan } from "@/lib/api/upload/features/get-upload-plan";

// ─── Schema de validação ─────────────────────────────────────────────────────

const uploadSchema = z.object({
  files: z.array(z.instanceof(File)).min(1, "Seleciona pelo menos um ficheiro."),
  selectedDriverIds: z.array(z.string()).min(1, "Seleciona pelo menos um driver."),
});

type UploadForm = z.infer<typeof uploadSchema>;

// ─── Steps ───────────────────────────────────────────────────────────────────

type StepId = "file" | "driver" | "plan" | "progress";

const ALL_STEPS: { id: StepId; label: string }[] = [
  { id: "file", label: "Ficheiros" },
  { id: "driver", label: "Driver" },
  { id: "plan", label: "Plano" },
  { id: "progress", label: "Envio" },
];

// ─── Props ───────────────────────────────────────────────────────────────────

interface UploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
  parentId?: string | null;
  initialFiles?: File[];
}

// ─── Component ───────────────────────────────────────────────────────────────

export function UploadModal({
  open,
  onOpenChange,
  userId,
  parentId = null,
  initialFiles = [],
}: UploadModalProps) {
  const [currentStep, setCurrentStep] = useState<StepId>("file");
  const [isDragging, setIsDragging] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [forceFragment, setForceFragment] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Drivers carregados do BFF
  const [drivers, setDrivers] = useState<ApiDriver[]>([]);
  const [loadingDrivers, setLoadingDrivers] = useState(true);

  // Plano de distribuição/fragmentação retornado pelo BFF
  const [uploadPlan, setUploadPlan] = useState<FilePlan[] | null>(null);
  const [fetchingPlan, setFetchingPlan] = useState(false);
  const [planError, setPlanError] = useState<string | null>(null);

  const { createFile } = useNodeMutations(userId, parentId);

  // ── Carrega drivers quando o modal abre ────────────────────────────────────

  useEffect(() => {
    if (open) {
      setLoadingDrivers(true);
      const fetchDrivers = async () => {
        try {
          const response = await getDrivers({ userId });
          setDrivers(response);
        } catch (error) {
          console.log("Erro ao carregar drivers no modal:", error);
        } finally {
          setLoadingDrivers(false);
        }
      };
      fetchDrivers();
    }
  }, [open, userId]);

  // ── Formulário ─────────────────────────────────────────────────────────────

  const form = useForm<UploadForm>({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      files: initialFiles,
      selectedDriverIds: [],
    },
  });

  const files = form.watch("files") || [];
  const selectedDriverIds = form.watch("selectedDriverIds") || [];

  // Reset form when modal opens with new initial files
  useEffect(() => {
    if (open) {
      form.reset({ files: initialFiles, selectedDriverIds: [] });
      setCurrentStep("file");
      setAnalysis(null);
      setForceFragment(false);
      setIsCompleted(false);
      setUploadPlan(null);
      setPlanError(null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // ── Determinar se o step "Plano" é necessário ──────────────────────────────
  //
  // O passo de plano é activado quando:
  //   • Mais de um driver foi seleccionado, OU
  //   • A análise indica que é necessário fragmentar (NEEDS_FRAGMENT), OU
  //   • O utilizador activou a checkbox de fragmentação forçada (ASK_FRAGMENT + forceFragment)
  //
  const needsPlanStep = useMemo(() => {
    if (selectedDriverIds.length <= 1) return false;
    if (!analysis) return false;
    if (analysis.type === "NEEDS_FRAGMENT") return true;
    if (analysis.type === "ASK_FRAGMENT" && forceFragment) return true;
    // Múltiplos drivers seleccionados (qualquer tipo de análise válida)
    return selectedDriverIds.length > 1 && analysis.type !== "NO_SPACE";
  }, [selectedDriverIds.length, analysis, forceFragment]);

  // ── Stepper dinâmico ───────────────────────────────────────────────────────

  const activeSteps = useMemo(
    () => ALL_STEPS.filter((s) => s.id !== "plan" || needsPlanStep),
    [needsPlanStep]
  );

  const stepIndex = activeSteps.findIndex((s) => s.id === currentStep);

  // ── Validação de navegação ─────────────────────────────────────────────────

  const canAdvanceFromFile = files.length > 0;
  const canAdvanceFromDriver =
    selectedDriverIds.length > 0 &&
    analysis !== null &&
    analysis.type !== "NO_SPACE";
  const canAdvanceFromPlan = uploadPlan !== null && !fetchingPlan && !planError;

  // ── Buscar o plano no BFF ──────────────────────────────────────────────────

  const fetchPlan = useCallback(async () => {
    setFetchingPlan(true);
    setPlanError(null);
    try {
      const result = await getUploadPlan({
        userId,
        files: files.map((f) => ({
          name: f.name,
          size: f.size,
          extension: f.name.includes(".") ? f.name.split(".").pop() ?? "" : "",
        })),
        selectedDriverIds,
      });

      if (result.error) {
        setPlanError(result.error);
        setUploadPlan(null);
      } else {
        setUploadPlan(result.plan);
      }
    } catch (err: any) {
      setPlanError(err?.message ?? "Erro ao obter o plano de upload.");
      setUploadPlan(null);
    } finally {
      setFetchingPlan(false);
    }
  }, [userId, files, selectedDriverIds]);

  // ── Navegação ──────────────────────────────────────────────────────────────

  const handleNext = async () => {
    if (currentStep === "file" && canAdvanceFromFile) {
      setCurrentStep("driver");
    } else if (currentStep === "driver" && canAdvanceFromDriver) {
      if (needsPlanStep) {
        // Pedir o plano ao BFF antes de avançar
        setCurrentStep("plan");
        await fetchPlan();
      } else {
        setCurrentStep("progress");
      }
    } else if (currentStep === "plan" && canAdvanceFromPlan) {
      setCurrentStep("progress");
    }
  };

  const handleBack = () => {
    if (currentStep === "driver") setCurrentStep("file");
    else if (currentStep === "plan") {
      setUploadPlan(null);
      setPlanError(null);
      setCurrentStep("driver");
    } else if (currentStep === "progress") {
      if (needsPlanStep) setCurrentStep("plan");
      else setCurrentStep("driver");
    }
  };

  // ── Conclusão do progresso ─────────────────────────────────────────────────

  const handleProgressComplete = useCallback(async () => {
    if (files.length === 0) return;

    const selectedDrivers = drivers.filter((d) => selectedDriverIds.includes(d.id));
    const primaryDriverId = selectedDriverIds[0];

    const uploadPromises = files.map(async (file, idx) => {
      const extension = file.name.includes(".")
        ? file.name.split(".").pop() ?? ""
        : "";

      // Encontra o plano deste ficheiro específico (se existir)
      const filePlan = uploadPlan?.find((p) => p.fileName === file.name);
      const isFragmented = filePlan?.isFragmented ?? false;

      if (isFragmented && filePlan) {
        // ── Fragmentação baseada no plano do BFF ──────────────────────────
        console.log(`[FRAGMENTAÇÃO] Ficheiro: ${file.name} | ${filePlan.chunks.length} chunks`);

        try {
          /*
            ============================================================================
            LUGAR PARA CHAMAR OS DRIVERS E ENVIAR CADA PARTE (CHUNK):

            for (const chunk of filePlan.chunks) {
              // 1. Cortar o pedaço correspondente:
              const chunkBlob = file.slice(chunk.startByte, chunk.endByte);

              // 2. Obter o cliente do driver:
              const driverClient = await getStorageDriverClient(chunk.driverId);

              // 3. Enviar o chunk:
              const uploadRes = await driverClient.upload({
                fileName: `${file.name}.part${chunk.chunkIndex}`,
                content: chunkBlob,
                path: `/CloudBase/fragments/${file.name}/`
              });

              // 4. chunk.driverId + uploadRes.id → registar no backend
            }
            ============================================================================
          */

          await createFile.mutateAsync({
            userId,
            type: NodeType.FILE,
            name: file.name,
            mimeType: file.type || "application/octet-stream",
            extension,
            size: String(file.size),
            location: {
              driverId: filePlan.chunks[0].driverId,
              providerFileId: `fragmented-${Date.now()}-${idx}`,
              providerPath: `/CloudBase/${file.name}`,
            },
            parentId,
          });
        } catch (err) {
          console.error(`Erro ao registar node fragmentado "${file.name}":`, err);
        }
      } else {
        // ── Upload directo num único driver ────────────────────────────────
        const targetDriverId = filePlan?.chunks[0]?.driverId ?? primaryDriverId;

        try {
          /*
            ============================================================================
            LUGAR PARA CHAMAR O DRIVER E ENVIAR O FICHEIRO COMPLETO:

            // 1. Obter o cliente do driver:
            const driverClient = await getStorageDriverClient(targetDriverId);

            // 2. Enviar o ficheiro inteiro:
            const uploadRes = await driverClient.upload({
              fileName: file.name,
              content: file,
              path: `/CloudBase/`
            });

            // targetDriverId + uploadRes.id → registar no backend
            ============================================================================
          */

          await createFile.mutateAsync({
            userId,
            type: NodeType.FILE,
            name: file.name,
            mimeType: file.type || "application/octet-stream",
            extension,
            size: String(file.size),
            location: {
              driverId: targetDriverId,
              providerFileId: `pending-${Date.now()}-${idx}`,
              providerPath: `/CloudBase/${file.name}`,
            },
            parentId,
          });
        } catch (err) {
          console.error(`Erro ao registar node "${file.name}":`, err);
        }
      }
    });

    await Promise.all(uploadPromises);
    setIsCompleted(true);
  }, [files, selectedDriverIds, userId, parentId, createFile, drivers, uploadPlan]);

  // ── Reset ao fechar ────────────────────────────────────────────────────────

  const handleOpenChange = (v: boolean) => {
    if (!v) {
      if (currentStep === "progress" && !isCompleted) return;
      form.reset({ files: [], selectedDriverIds: [] });
      setCurrentStep("file");
      setAnalysis(null);
      setForceFragment(false);
      setIsCompleted(false);
      setUploadPlan(null);
      setPlanError(null);
    }
    onOpenChange(v);
  };

  // ── Labels de descrição ────────────────────────────────────────────────────

  const stepDescription: Record<StepId, string> = {
    file: "Seleciona ou arrasta os ficheiros que queres guardar.",
    driver: "Escolhe onde os ficheiros vão ser guardados.",
    plan: "Revê o plano de distribuição antes de confirmar o envio.",
    progress: "A processar os teus ficheiros…",
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Adicionar ficheiros</DialogTitle>
          <DialogDescription>
            {stepDescription[currentStep]}
          </DialogDescription>
        </DialogHeader>

        {/* Stepper dinâmico */}
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
                      : "border-muted-foreground/30 text-muted-foreground/50 bg-background"
                  )}
                >
                  {i < stepIndex ? <Check className="size-3" /> : i + 1}
                </div>
                <span
                  className={cn(
                    "text-[10px] font-medium",
                    i === stepIndex ? "text-primary" : "text-muted-foreground/50"
                  )}
                >
                  {step.label}
                </span>
              </div>
              {i < activeSteps.length - 1 && (
                <div
                  className={cn(
                    "h-px flex-1 mb-4 transition-colors",
                    i < stepIndex ? "bg-primary" : "bg-muted"
                  )}
                />
              )}
            </div>
          ))}
        </div>

        {/* Conteúdo do step */}
        <div className="min-h-[200px]">
          {currentStep === "file" && (
            <StepFileSelect
              files={files}
              isDragging={isDragging}
              onFilesChange={(fs) => form.setValue("files", fs)}
              onDragChange={setIsDragging}
            />
          )}

          {currentStep === "driver" && files.length > 0 && (
            <StepDriverSelect
              drivers={drivers}
              loading={loadingDrivers}
              fileSize={files.reduce((sum, f) => sum + f.size, 0)}
              selectedDriverIds={selectedDriverIds}
              onSelectionChange={(ids) => form.setValue("selectedDriverIds", ids)}
              analysis={analysis}
              onAnalysisChange={setAnalysis}
              forceFragment={forceFragment}
              onForceFragmentChange={setForceFragment}
            />
          )}

          {currentStep === "plan" && (
            <div className="flex flex-col gap-3">
              {fetchingPlan && (
                <div className="flex h-40 items-center justify-center gap-2 text-muted-foreground">
                  <Loader2 className="size-5 animate-spin" />
                  <span className="text-sm">A calcular plano de distribuição…</span>
                </div>
              )}
              {planError && !fetchingPlan && (
                <div className="flex flex-col items-center gap-3 h-40 justify-center text-center p-4">
                  <p className="text-sm text-destructive font-medium">{planError}</p>
                  <Button variant="outline" size="sm" onClick={fetchPlan}>
                    Tentar novamente
                  </Button>
                </div>
              )}
              {uploadPlan && !fetchingPlan && (
                <StepPlan
                  plan={uploadPlan}
                  drivers={drivers}
                  onPlanChange={setUploadPlan}
                />
              )}
            </div>
          )}

          {currentStep === "progress" && (
            <StepProgress onComplete={handleProgressComplete} />
          )}
        </div>

        {/* Footer */}
        <DialogFooter className="gap-2 sm:justify-between">
          <div>
            {currentStep !== "file" && currentStep !== "progress" && (
              <Button variant="ghost" onClick={handleBack}>
                <ArrowLeft className="size-4" data-icon="inline-start" />
                Voltar
              </Button>
            )}
          </div>

          <div className="flex gap-2">
            {currentStep !== "progress" && (
              <Button variant="outline" onClick={() => handleOpenChange(false)}>
                Cancelar
              </Button>
            )}

            {currentStep === "file" && (
              <Button onClick={handleNext} disabled={!canAdvanceFromFile}>
                Continuar
                <ArrowRight className="size-4" data-icon="inline-end" />
              </Button>
            )}

            {currentStep === "driver" && (
              <Button onClick={handleNext} disabled={!canAdvanceFromDriver || fetchingPlan}>
                {fetchingPlan ? (
                  <Loader2 className="size-4 animate-spin" data-icon="inline-start" />
                ) : (
                  <>
                    {needsPlanStep ? "Ver Plano" : "Enviar"}
                    <ArrowRight className="size-4" data-icon="inline-end" />
                  </>
                )}
              </Button>
            )}

            {currentStep === "plan" && (
              <Button onClick={handleNext} disabled={!canAdvanceFromPlan}>
                Confirmar e Enviar
                <ArrowRight className="size-4" data-icon="inline-end" />
              </Button>
            )}

            {currentStep === "progress" && isCompleted && (
              <Button onClick={() => handleOpenChange(false)}>
                <Check className="size-4" data-icon="inline-start" />
                Fechar
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
