import { Reveal } from "../reveal";

export function SectionHeader({ index, kicker, title, sub }: { index: string; kicker: string; title: string; sub?: string }) {
  return (
    <Reveal>
      <div className="flex items-baseline gap-4 mb-3">
        <span className="mono text-xs text-muted-foreground">{index}</span>
        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{kicker}</span>
      </div>
      <h2 className="text-4xl md:text-5xl tracking-[-0.03em] font-medium max-w-3xl leading-tight">
        {title}
      </h2>
      {sub && <p className="mt-5 text-muted-foreground max-w-2xl leading-relaxed">{sub}</p>}
    </Reveal>
  );
}