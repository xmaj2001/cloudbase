"use client";

import { useCallback, useEffect, useState } from "react";
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
import { AnimatePresence, motion } from "framer-motion";
import { useNodeMutations } from "@/hooks/use-nodes";
import { Stepper } from "./Stepper";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NodeType } from "@/lib/api/node/types";

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

const subtitle: Record<UploadStep, string> = {
  file: "Escolhe os ficheiros que queres adicionar ao teu armazenamento unificado.",
  driver:
    "Restringe ou deixa o sistema escolher os melhores destinos automaticamente.",
  plan: "Revê o plano de distribuição antes de iniciar o envio.",
  // progress: uploadingDone
  //   ? "Todos os ficheiros foram processados com sucesso."
  //   : "Os teus ficheiros estão a ser distribuídos pelos drivers seleccionados.",
  progress:
    "Os teus ficheiros estão a ser distribuídos pelos drivers seleccionados.",
};

const uploadSchema = z.object({
  files: z
    .array(z.instanceof(File))
    .min(1, "Seleciona pelo menos um ficheiro."),
  selectedDriverIds: z
    .array(z.string())
    .min(1, "Seleciona pelo menos um driver."),
});

type UploadForm = z.infer<typeof uploadSchema>;

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
  const { createFile } = useNodeMutations(userId, parentId);

  // ── Formulário ─────────────────────────────────────────────────────────────

  const form = useForm<UploadForm>({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      files: files,
      selectedDriverIds: [],
    },
  });

  form.watch("files");
  const selectedDriverIds = form.watch("selectedDriverIds") || [];

  const handleProgressComplete = useCallback(async () => {
    if (files.length === 0) return;
    // Reset the form and state after upload is complete
    const uploadPromises = files.map(async (file, idx) => {
      try {
        const extension = file.name.includes(".")
          ? (file.name.split(".").pop() ?? "")
          : "";

        await createFile.mutateAsync({
          userId,
          type: NodeType.FILE,
          name: file.name,
          mimeType: file.type || "application/octet-stream",
          extension,
          size: String(file.size),
          location: {
            driverId: "6ce1e74c-d2d0-4ecd-bb6b-1151858d2636",
            providerFileId: `pending-${Date.now()}-${idx}`,
            providerPath: `/CloudBase/${file.name}`,
          },
          parentId,
        });
        console.log(`Node "${file.name}" registado com sucesso.`);
      } catch (error) {
        console.error(`Erro ao registar node "${file.name}":`, error);
      }
    });

    await Promise.all(uploadPromises);
    form.reset({ files: [], selectedDriverIds: [] });
    setFiles([]);
    setStep("file");
  }, [files, userId, parentId, createFile]);

  // ── Reset ao fechar ────────────────────────────────────────────────────────
  const handleOpenChange = (v: boolean) => {
    if (!v) {
      form.reset({ files: [], selectedDriverIds: [] });
    }
    onOpenChange(v);
  };
  console.log("UploadModal", { files });
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-3xl p-0 gap-0 overflow-hidden border border-hairline">
        <DialogHeader className="px-7 pt-6 pb-5 border-b border-hairline space-y-1.5">
          <DialogTitle className="text-xl font-medium tracking-tight">
            Adicionar ficheiros
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {subtitle[step]}
          </DialogDescription>
          <div className="pt-5">
            <Stepper current={step} />
          </div>
        </DialogHeader>
        <div className="relative min-h-95 max-h-[60vh]">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 14 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -14 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="p-7"
            >
              {step === "file" && (
                <StepFileSelect files={files} setFiles={setFiles} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <DialogFooter className="gap-2 sm:justify-between">
          <div>
            {step !== "file" && step !== "progress" && (
              <Button variant="ghost" onClick={() => {}} className="gap-1.5">
                <ArrowLeft className="size-4" /> Voltar
              </Button>
            )}
          </div>
          <div className="flex items-center gap-2">
            {step !== "progress" && (
              <Button variant="outline" onClick={() => {}}>
                Cancelar
              </Button>
            )}
            <Button
              onClick={handleProgressComplete}
              // disabled={!canContinue}
              className="gap-1.5 min-w-35"
            >
              {/* {step === "progress" && !uploadingDone && (
                <Loader2 className="size-4 animate-spin" />
              )} */}
              {/* {nextLabel[step]} */}
              {step !== "progress" && <ArrowRight className="size-4" />}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
