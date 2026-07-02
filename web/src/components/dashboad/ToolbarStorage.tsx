import { Search, Filter, Grid3x3, List, FolderPlus, Upload } from "lucide-react";

interface ToolbarStorageProps {
  view: "grid" | "list";
  setView: (v: "grid" | "list") => void;
  query: string;
  setQuery: (q: string) => void;
  onUploadClick: () => void;
}

export function ToolbarStorage({ view, setView, query, setQuery, onUploadClick }: ToolbarStorageProps) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <div className="flex-1 min-w-65 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Pesquisa por nome ou descrição — IA activa"
          className="w-full pl-10 pr-4 py-2.5 text-muted-foreground rounded-full bg-surface-2 border border-transparent focus:border-foreground focus:bg-background text-sm outline-none transition-all"
        />
      </div>
      <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-hairline text-sm hover:bg-surface-2 transition-colors">
        <Filter className="size-3.5" /> Filtros
      </button>
      <div className="flex items-center bg-surface-2 rounded-full p-1">
        <button onClick={() => setView("grid")} className={`p-2 rounded-full transition-colors ${view === "grid" ? "bg-background shadow-sm" : "text-muted-foreground"}`}><Grid3x3 className="size-4" /></button>
        <button onClick={() => setView("list")} className={`p-2 rounded-full transition-colors ${view === "list" ? "bg-background shadow-sm" : "text-muted-foreground"}`}><List className="size-4" /></button>
      </div>
      <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-hairline text-sm hover:bg-surface-2 transition-colors">
        <FolderPlus className="size-4" /> Nova pasta
      </button>
      <button onClick={onUploadClick} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity">
        <Upload className="size-4" /> Carregar
      </button>
    </div>
  );
}