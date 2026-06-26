'use client'
import { useNodeDetails, useNodeMutations } from "@/hooks/use-nodes";
import { ApiNode, NodeStatus, NodeType } from "@/lib/api/node/types";
import { formatBytes } from "@/lib/api/drivers/features/upload-analysis";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {
  FileText,
  Folder,
  Layers,
  HardDrive,
  Tag,
  Calendar,
  Clock,
  Trash2,
  Pencil,
  Download,
  AlertTriangle,
  CheckCircle2,
  Loader2,
  Scissors,
  Info,
} from "lucide-react";
import { PROVIDER_ICONS } from "@/types/drivers";

// ─── Constantes ───────────────────────────────────────────────────────────────

const USER_ID = "a2f54be0-3154-46a6-a629-23388ddbb573"; // TODO: useUser()

const STATUS_CONFIG: Record<NodeStatus, { label: string; className: string; icon: React.ReactNode }> = {
  [NodeStatus.ACTIVE]:      { label: "Activo",       className: "border-green-500/40 text-green-600 dark:text-green-400",   icon: <CheckCircle2 className="size-3" /> },
  [NodeStatus.UPLOADING]:   { label: "A enviar",     className: "border-blue-500/40 text-blue-600 dark:text-blue-400",     icon: <Loader2 className="size-3 animate-spin" /> },
  [NodeStatus.FRAGMENTING]: { label: "A fragmentar", className: "border-amber-500/40 text-amber-600 dark:text-amber-400",  icon: <Scissors className="size-3" /> },
  [NodeStatus.TRASHED]:     { label: "Lixeira",      className: "border-red-500/40 text-red-600 dark:text-red-400",        icon: <Trash2 className="size-3" /> },
  [NodeStatus.DELETED]:     { label: "Eliminado",    className: "border-red-500/40 text-red-600 dark:text-red-400",        icon: <Trash2 className="size-3" /> },
  [NodeStatus.UNREACHABLE]: { label: "Inacessível",  className: "border-orange-500/40 text-orange-600 dark:text-orange-400", icon: <AlertTriangle className="size-3" /> },
  [NodeStatus.CORRUPTED]:   { label: "Corrompido",   className: "border-red-500/40 text-red-600 dark:text-red-400",        icon: <AlertTriangle className="size-3" /> },
  [NodeStatus.EXPIRED]:     { label: "Expirado",     className: "border-muted-foreground/40 text-muted-foreground",        icon: <Clock className="size-3" /> },
};

const TYPE_ICON: Record<NodeType, React.ReactNode> = {
  [NodeType.FILE]:   <FileText className="size-5" />,
  [NodeType.FOLDER]: <Folder className="size-5" />,
  [NodeType.GROUP]:  <Layers className="size-5" />,
};

// ─── Props ────────────────────────────────────────────────────────────────────

interface NodeDetailSheetProps {
  node: ApiNode | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Chamado depois de mover para lixeira com sucesso */
  onTrashed?: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function NodeDetailSheet({
  node,
  open,
  onOpenChange,
  onTrashed,
}: NodeDetailSheetProps) {
  // Dados frescos do node (revalida ao abrir)
  const { data: detail, isLoading } = useNodeDetails(USER_ID, node?.id ?? "");
  const { moveToTrash } = useNodeMutations(USER_ID, node?.parentId ?? null);

  const displayed = detail ?? node;

  const handleTrash = async () => {
    if (!displayed) return;
    await moveToTrash.mutateAsync(displayed.id);
    onTrashed?.();
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[340px] sm:w-[400px] flex flex-col gap-0 p-0 overflow-hidden">
        {/* Header */}
        <SheetHeader className="px-5 pt-5 pb-4 border-b shrink-0">
          {isLoading || !displayed ? (
            <div className="flex flex-col gap-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-3.5 w-1/2" />
            </div>
          ) : (
            <>
              {/* Ícone + título */}
              <div className="flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary mt-0.5">
                  {TYPE_ICON[displayed.type]}
                </div>
                <div className="min-w-0 flex-1">
                  <SheetTitle className="truncate text-base leading-tight">
                    {displayed.name}
                  </SheetTitle>
                  <SheetDescription className="mt-0.5 text-xs flex items-center gap-1.5">
                    <StatusBadge status={displayed.status} />
                    {displayed.extension && (
                      <span className="text-muted-foreground">.{displayed.extension}</span>
                    )}
                  </SheetDescription>
                </div>
              </div>
            </>
          )}
        </SheetHeader>

        {/* Corpo principal — scrollable */}
        <div className="flex-1 overflow-y-auto">
          {isLoading || !displayed ? (
            <SheetLoadingSkeleton />
          ) : (
            <div className="flex flex-col gap-0">
              {/* ── Metadados gerais ─────────────────────────── */}
              <Section title="Informações">
                <Row label="Tipo" value={displayed.type} />
                {displayed.size && (
                  <Row label="Tamanho" value={formatBytes(Number(displayed.size))} />
                )}
                {displayed.mimeType && (
                  <Row label="Mime" value={displayed.mimeType} mono />
                )}
                <Row
                  label="Criado em"
                  value={fmtDate(displayed.createdAt)}
                  icon={<Calendar className="size-3 text-muted-foreground" />}
                />
                <Row
                  label="Actualizado"
                  value={fmtDate(displayed.updatedAt)}
                  icon={<Clock className="size-3 text-muted-foreground" />}
                />
                {displayed.expiresAt && (
                  <Row
                    label="Expira em"
                    value={fmtDate(displayed.expiresAt)}
                    icon={<Clock className="size-3 text-amber-500" />}
                    valueClassName="text-amber-600 dark:text-amber-400"
                  />
                )}
              </Section>

              <Separator />

              {/* ── Localização / Storage ─────────────────────── */}
              {displayed.location ? (
                <Section title="Armazenamento">
                  <Row
                    label="Driver"
                    value={
                      <span className="flex items-center gap-1.5">
                        <span>{PROVIDER_ICONS[displayed.location.providerName] ?? "💾"}</span>
                        <span>{displayed.location.providerName}</span>
                      </span>
                    }
                    icon={<HardDrive className="size-3 text-muted-foreground" />}
                  />
                  <Row label="Provider ID" value={displayed.location.providerFileId} mono truncate />
                  <Row label="Caminho"     value={displayed.location.providerPath}  mono truncate />
                  <Row label="Criado"      value={fmtDate(displayed.location.providerCreatedAt)} />
                  <Row label="Actualizado" value={fmtDate(displayed.location.providerUpdatedAt)} />
                </Section>
              ) : (
                <Section title="Armazenamento">
                  <p className="px-5 py-3 text-xs text-muted-foreground italic">
                    Sem localização associada.
                  </p>
                </Section>
              )}

              <Separator />

              {/* ── Fragmentação ─────────────────────────────── */}
              {displayed.fragmentation.isFragmented && (
                <>
                  <Section title="Fragmentação">
                    <Row label="Total de partes" value={String(displayed.fragmentation.totalChunks)} />
                    <Row label="Hash original"   value={displayed.fragmentation.originalHash} mono truncate />
                  </Section>
                  <Separator />
                </>
              )}

              {/* ── Tags ─────────────────────────────────────── */}
              {displayed.tags.length > 0 && (
                <>
                  <Section title="Tags">
                    <div className="px-5 pb-4 flex flex-wrap gap-1.5">
                      {displayed.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          <Tag className="size-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </Section>
                  <Separator />
                </>
              )}

              {/* ── IA ───────────────────────────────────────── */}
              {displayed.aiMetadata.classified && (
                <>
                  <Section title="Análise IA">
                    <Row label="Categoria"   value={displayed.aiMetadata.category} />
                    <Row label="Confiança"   value={`${(displayed.aiMetadata.confidence * 100).toFixed(0)}%`} />
                    {displayed.aiMetadata.summary && (
                      <div className="px-5 pb-3">
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {displayed.aiMetadata.summary}
                        </p>
                      </div>
                    )}
                  </Section>
                  <Separator />
                </>
              )}

              {/* ── Lixeira ──────────────────────────────────── */}
              {displayed.trash.trashedAt && (
                <>
                  <Section title="Lixeira">
                    <Row label="Removido em"      value={fmtDate(displayed.trash.trashedAt!)} />
                    {displayed.trash.permanentDeleteAt && (
                      <Row
                        label="Eliminação definitiva"
                        value={fmtDate(displayed.trash.permanentDeleteAt)}
                        valueClassName="text-destructive"
                      />
                    )}
                  </Section>
                  <Separator />
                </>
              )}

              {/* ── Erros ────────────────────────────────────── */}
              {displayed.errorCount > 0 && (
                <>
                  <Section title="Erros">
                    <Row
                      label="Total de erros"
                      value={String(displayed.errorCount)}
                      icon={<AlertTriangle className="size-3 text-destructive" />}
                      valueClassName="text-destructive"
                    />
                    {displayed.lastErrorAt && (
                      <Row label="Último erro" value={fmtDate(displayed.lastErrorAt)} />
                    )}
                  </Section>
                  <Separator />
                </>
              )}
            </div>
          )}
        </div>

        {/* Footer de acções */}
        {displayed && !isLoading && (
          <div className="border-t px-5 py-4 shrink-0 flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 gap-1.5"
              disabled
              title="Em breve"
            >
              <Download className="size-3.5" data-icon="inline-start" />
              Descarregar
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 gap-1.5"
              disabled
              title="Em breve"
            >
              <Pencil className="size-3.5" data-icon="inline-start" />
              Renomear
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-destructive hover:text-destructive border-destructive/30 hover:border-destructive/60 hover:bg-destructive/5"
              onClick={handleTrash}
              disabled={moveToTrash.isPending || displayed.status === NodeStatus.TRASHED}
              title="Mover para a lixeira"
            >
              {moveToTrash.isPending ? (
                <Loader2 className="size-3.5 animate-spin" />
              ) : (
                <Trash2 className="size-3.5" />
              )}
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

// ─── Sub-componentes ──────────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <p className="px-5 pt-4 pb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
        {title}
      </p>
      {children}
    </div>
  );
}

function Row({
  label,
  value,
  icon,
  mono,
  truncate: trunc,
  valueClassName,
}: {
  label: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
  mono?: boolean;
  truncate?: boolean;
  valueClassName?: string;
}) {
  return (
    <div className="flex items-start justify-between px-5 pb-2.5 gap-3 text-xs">
      <span className="flex items-center gap-1 text-muted-foreground shrink-0 mt-px">
        {icon}
        {label}
      </span>
      <span
        className={cn(
          "text-right",
          mono && "font-mono text-[10px]",
          trunc && "truncate max-w-[180px]",
          valueClassName
        )}
      >
        {value}
      </span>
    </div>
  );
}

function StatusBadge({ status }: { status: NodeStatus }) {
  const cfg = STATUS_CONFIG[status] ?? { label: status, className: "", icon: null };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-[10px] font-medium",
        cfg.className
      )}
    >
      {cfg.icon}
      {cfg.label}
    </span>
  );
}

function SheetLoadingSkeleton() {
  return (
    <div className="flex flex-col gap-4 p-5">
      {[80, 60, 90, 50, 70].map((w, i) => (
        <div key={i} className="flex justify-between">
          <Skeleton className="h-3.5 w-1/3" />
          <Skeleton className={`h-3.5`} style={{ width: `${w}px` }} />
        </div>
      ))}
    </div>
  );
}

// ─── Utilitário ───────────────────────────────────────────────────────────────

function fmtDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat("pt-AO", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}
