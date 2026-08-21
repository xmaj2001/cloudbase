import { FileText, Layers, Activity, Zap } from "lucide-react";

export function DriverMetrics() {
  const metrics = [
    { icon: FileText, k: "Ficheiros", v: "0" },
    { icon: Layers, k: "Fragmentos", v: "0" },
    { icon: Activity, k: "Upload (Est.)", v: "0.0 GB" },
    { icon: Zap, k: "Download (Est.)", v: "0.0 GB" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-hairline border border-hairline rounded-2xl overflow-hidden">
      {metrics.map((c) => (
        <div key={c.k} className="bg-background p-5">
          <c.icon className="size-4 text-muted-foreground" />
          <div className="mt-3 text-2xl font-medium tabular-nums">{c.v}</div>
          <div className="text-[11px] text-muted-foreground mt-0.5">{c.k}</div>
        </div>
      ))}
    </div>
  );
}