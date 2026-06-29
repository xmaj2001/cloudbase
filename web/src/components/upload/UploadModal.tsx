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
}

export function UploadModal({
  open,
}: UploadModalProps) {

  return (
    <Dialog open={open} >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Adicionar ficheiros</DialogTitle>
          <DialogDescription>
          </DialogDescription>
        </DialogHeader>

       
        {/* Footer */}
        <DialogFooter className="gap-2 sm:justify-between">
       
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
