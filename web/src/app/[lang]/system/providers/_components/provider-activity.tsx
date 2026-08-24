export function ProviderActivity({ dict }: { dict?: any }) {
  const activities = [
    { t: "há 2 min", a: "Upload", f: "video-final.mp4", s: "128 MB" },
    { t: "há 24 min", a: "Fragmento sync", f: "backup.zip · chunk 12/40", s: "50 MB" },
    { t: "há 3 h", a: "Download", f: "familia-2025.jpg", s: "4.2 MB" },
    { t: "ontem", a: "Auth refresh", f: "Credentials cache atualizada", s: "—" },
  ];

  return (
    <div className="bg-background border border-hairline rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[14px] font-medium">Atividade recente</h2>
        <span className="text-[11px] text-muted-foreground mono">últimos 7 dias</span>
      </div>
      <ul className="divide-y divide-hairline">
        {activities.map((r, i) => (
          <li key={i} className="py-3 flex items-center gap-4 text-[13px]">
            <span className="mono text-[11px] text-muted-foreground w-16 shrink-0">{r.t}</span>
            <span className="w-28 shrink-0 text-muted-foreground">{r.a}</span>
            <span className="flex-1 truncate text-foreground/90">{r.f}</span>
            <span className="mono text-[11px] text-muted-foreground">{r.s}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}