import { Cloud } from "lucide-react";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <LogoMark />
      <span className="font-bold tracking-tight text-foreground">CloudBase</span>
    </div>
  );
}

export function LogoMark({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <div className={`flex items-center justify-center rounded-lg bg-gradient-to-br from-[var(--color-ember)] to-[var(--color-amber)] text-white ${className}`} style={{ width: size, height: size }}>
      <Cloud size={size * 0.6} />
    </div>
  );
}
