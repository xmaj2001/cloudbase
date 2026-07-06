"use client";

import {
  forwardRef,
  useState,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: ReactNode;
  icon?: ReactNode;
};

export const AuthInput = forwardRef<HTMLInputElement, Props>(function AuthInput(
  { label, hint, icon, className, type = "text", ...props },
  ref,
) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  const effectiveType = isPassword ? (show ? "text" : "password") : type;

  return (
    <label className="block">
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          {label}
        </span>
        {hint && (
          <span className="text-[11px] text-muted-foreground">{hint}</span>
        )}
      </div>
      <div className="group relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground [&>svg]:h-4 [&>svg]:w-4">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          type={effectiveType}
          className={cn(
            "w-full h-11 rounded-md border border-hairline bg-surface px-3 text-[14px] outline-none",
            "transition-all placeholder:text-muted-foreground/60",
            "focus:border-foreground focus:ring-1 focus:ring-foreground",
            icon && "pl-9",
            isPassword && "pr-10",
            className,
          )}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((v) => !v)}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 h-7 w-7 grid place-items-center rounded text-muted-foreground hover:text-foreground hover:bg-accent transition"
          >
            {show ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        )}
      </div>
    </label>
  );
});
