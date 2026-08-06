"use client";

interface DriversKpisProps {
  totalGb: number;
  usedGb: number;
  driversCount: number;
  activeCount: number;
}

export function DriversKpis({ totalGb, usedGb, driversCount, activeCount }: DriversKpisProps) {
  const kpis = [
    {
      k: "Espaço total",
      v: totalGb > 0 ? `${totalGb.toFixed(1)} GB` : "0 GB",
      sub: "+ Telegram Ilimitado",
    },
    {
      k: "Espaço em uso",
      v: `${usedGb.toFixed(2)} GB`,
      sub: totalGb > 0 ? `${((usedGb / totalGb) * 100).toFixed(0)}% do total` : "0% em uso",
    },
    { k: "Ficheiros virtuais", v: "0", sub: "0 fragmentos ativos" },
    {
      k: "Drivers Conectados",
      v: `${driversCount}`,
      sub: `${activeCount} operacionais`,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-hairline border border-hairline rounded-2xl overflow-hidden mb-8">
      {kpis.map((c) => (
        <div key={c.k} className="bg-background p-6">
          <div className="text-[11px] uppercase tracking-widest text-muted-foreground font-mono">
            {c.k}
          </div>
          <div className="mt-3 text-3xl font-medium tracking-tight tabular-nums">
            {c.v}
          </div>
          <div className="mt-1 text-[12px] text-muted-foreground">
            {c.sub}
          </div>
        </div>
      ))}
    </div>
  );
}