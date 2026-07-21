import { motion } from "framer-motion";
import { UploadStep } from "./upload.types";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export function Stepper({ current }: { current: UploadStep }) {
  const steps: { id: UploadStep; label: string }[] = [
    { id: "file", label: "Ficheiros" },
    { id: "driver", label: "Drivers" },
    { id: "plan", label: "Plano" },
    { id: "progress", label: "Envio" },
  ];
  const idx = steps.findIndex(s => s.id === current);
  return (
    <ol className="flex items-center gap-3">
      {steps.map((s, i) => {
        const past = i < idx;
        const active = i === idx;
        return (
          <li key={s.id} className="flex items-center gap-3 flex-1 last:flex-none">
            <div className="flex items-center gap-2.5 min-w-0">
              <motion.div
                animate={{
                  backgroundColor: past || active ? "var(--foreground)" : "transparent",
                  color: past || active ? "var(--background)" : "var(--muted-foreground)",
                  borderColor: active ? "var(--foreground)" : "var(--border)",
                }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "size-7 rounded-full border flex items-center justify-center text-[11px] font-medium mono",
                )}
              >
                {past ? <Check className="size-3.5" /> : i + 1}
              </motion.div>
              <span className={cn(
                "text-xs whitespace-nowrap transition-colors",
                active ? "text-foreground font-medium" : past ? "text-foreground/70" : "text-muted-foreground/60",
              )}>
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className="h-px flex-1 bg-border relative overflow-hidden min-w-[20px]">
                <motion.div
                  initial={false}
                  animate={{ scaleX: past ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
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