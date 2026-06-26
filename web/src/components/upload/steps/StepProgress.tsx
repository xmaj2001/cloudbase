'use client'
import { useEffect, useState } from "react";
import { CheckCircle2, Circle, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface ProgressStep {
  label: string;
  durationMs: number;
}

const STEPS: ProgressStep[] = [
  { label: "A conectar ao driver…", durationMs: 1200 },
  { label: "A verificar espaço disponível…", durationMs: 800 },
  // TODO: Quando o upload real for implementado, adicionar aqui:
  // { label: "A calcular hash SHA-256…", durationMs: 2000 },
  // { label: "A enviar o ficheiro…", durationMs: 5000 },  // duração real depende do tamanho
  { label: "A enviar o ficheiro…", durationMs: 2000 },
  { label: "A registar no sistema…", durationMs: 600 },
  { label: "Concluído!", durationMs: 0 },
];

interface StepProgressProps {
  onComplete: () => void;
}

export function StepProgress({ onComplete }: StepProgressProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let stepIndex = 0;

    const runStep = () => {
      if (stepIndex >= STEPS.length) {
        setDone(true);
        // TODO: Aqui vai ser chamado o createFileNode real
        //       após a confirmação do upload no driver.
        onComplete();
        return;
      }

      setCurrentStep(stepIndex);
      setProgress(Math.round((stepIndex / (STEPS.length - 1)) * 100));

      const duration = STEPS[stepIndex].durationMs;
      if (duration === 0) {
        setProgress(100);
        setDone(true);
        onComplete();
        return;
      }

      stepIndex++;
      setTimeout(runStep, duration);
    };

    // Pequeno delay inicial para o modal aparecer antes de começar
    const t = setTimeout(runStep, 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col gap-6">
      {/* Barra de progresso geral */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Progresso</span>
          <span className="font-medium tabular-nums">{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Lista de etapas */}
      <div className="flex flex-col gap-3">
        {STEPS.map((step, i) => {
          const isCompleted = i < currentStep || done;
          const isCurrent = i === currentStep && !done;

          return (
            <div
              key={step.label}
              className={cn(
                "flex items-center gap-3 text-sm transition-opacity duration-300",
                i > currentStep && !done ? "opacity-30" : "opacity-100"
              )}
            >
              {isCompleted ? (
                <CheckCircle2 className="size-4 shrink-0 text-green-500" />
              ) : isCurrent ? (
                <Loader2 className="size-4 shrink-0 animate-spin text-primary" />
              ) : (
                <Circle className="size-4 shrink-0 text-muted-foreground/40" />
              )}
              <span
                className={cn(
                  isCompleted && "line-through text-muted-foreground",
                  isCurrent && "font-medium text-foreground"
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {done && (
        <div className="flex items-center justify-center gap-2 rounded-lg bg-green-500/10 border border-green-500/20 py-3 text-sm font-medium text-green-600 dark:text-green-400">
          <CheckCircle2 className="size-4" />
          Ficheiro adicionado com sucesso!
        </div>
      )}
    </div>
  );
}
