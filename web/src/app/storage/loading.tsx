import { Loader2 } from "lucide-react";

export default function StorageLoading() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center gap-2 bg-background">
      <Loader2 className="size-6 animate-spin text-muted-foreground" />
      <span className="text-xs text-muted-foreground font-mono tracking-tight">
        A carregar o sistema de ficheiros virtual...
      </span>
    </div>
  );
}