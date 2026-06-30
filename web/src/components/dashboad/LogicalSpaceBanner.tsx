import { Users, Plus } from "lucide-react";

export function LogicalSpaceBanner() {
  return (
    <div className="rounded-2xl border border-hairline bg-surface p-5 flex items-center gap-4">
      <div className="size-10 rounded-xl bg-foreground text-background flex items-center justify-center">
        <Users className="size-5" />
      </div>
      <div className="flex-1">
        <div className="text-sm font-medium">Spaces lógicos</div>
        <div className="text-xs text-muted-foreground mt-0.5">
          Cria um espaço com tamanho fixo e convida membros — funciona como um
          drive partilhado por cima do teu storage.
        </div>
      </div>
      <button className="px-4 py-2 rounded-full bg-foreground text-background text-sm hover:opacity-90 flex items-center gap-2">
        <Plus className="size-3.5" /> Novo space
      </button>
    </div>
  );
}
