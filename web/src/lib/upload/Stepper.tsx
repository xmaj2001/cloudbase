"use client";

import { motion } from "framer-motion";
import { UploadStep } from "./upload.types";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StepperProps {
  current: UploadStep;
  onStepClick?: (step: UploadStep) => void;
  isUploading?: boolean;
}

const STEPS: { id: UploadStep; label: string }[] = [
  { id: "file", label: "Ficheiros" },
  { id: "provider", label: "Providers" },
  { id: "plan", label: "Plano" },
  { id: "progress", label: "Envio" },
];

export function Stepper({ current, onStepClick, isUploading }: StepperProps) {
  const currentIdx = STEPS.findIndex((s) => s.id === current);

  return (
    <ol className="flex items-center gap-3 w-full select-none">
      {STEPS.map((step, i) => {
        const isPast = i < currentIdx;
        const isActive = i === currentIdx;
        const isClickable = isPast && !isUploading;

        return (
          <li
            key={step.id}
            className="flex items-center gap-3 flex-1 last:flex-none"
          >
            <button
              type="button"
              disabled={!isClickable}
              onClick={() => isClickable && onStepClick?.(step.id)}
              className={cn(
                "flex items-center gap-2.5 min-w-0 transition-opacity focus:outline-none",
                isClickable
                  ? "cursor-pointer hover:opacity-80"
                  : "cursor-default",
              )}
            >
              <motion.div
                animate={{
                  backgroundColor:
                    isPast || isActive ? "var(--foreground)" : "transparent",
                  color:
                    isPast || isActive
                      ? "var(--background)"
                      : "var(--muted-foreground)",
                  borderColor: isActive ? "var(--foreground)" : "var(--border)",
                }}
                transition={{ duration: 0.25 }}
                className="size-7 rounded-full border flex items-center justify-center text-[11px] font-medium mono shrink-0"
              >
                {isPast ? <Check className="size-3.5 stroke-[2.5]" /> : i + 1}
              </motion.div>
              <span
                className={cn(
                  "text-xs whitespace-nowrap transition-colors",
                  isActive
                    ? "text-foreground font-medium"
                    : isPast
                      ? "text-foreground/80"
                      : "text-muted-foreground/60",
                )}
              >
                {step.label}
              </span>
            </button>

            {i < STEPS.length - 1 && (
              <div className="h-px flex-1 bg-border relative overflow-hidden min-w-[20px]">
                <motion.div
                  initial={false}
                  animate={{ scaleX: isPast ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  style={{ originX: 0 }}
                  className="absolute inset-0 bg-foreground"
                />
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}
