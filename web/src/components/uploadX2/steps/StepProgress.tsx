// =============================================================================
// steps/StepProgress.tsx
// Mostra o progresso real do upload de cada ficheiro.
//
// Diferença da versão anterior:
//   → Antes: simulava progresso com timers fixos
//   → Agora: recebe progresso REAL do hook use-upload.ts
//
// O upload é disparado assim que este componente monta.
// =============================================================================

'use client'

import { useEffect, useRef } from 'react'
import { CheckCircle2, Circle, Loader2, AlertCircle } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { UploadFileProgress } from '../upload.types'

// -----------------------------------------------------------------------------
// PROPS
// -----------------------------------------------------------------------------

interface StepProgressProps {
  fileProgress: UploadFileProgress[]   // progresso de cada ficheiro (do hook)
  isDone: boolean                // true quando todos os ficheiros terminaram
  onStart: () => void             // dispara o upload — chamado no mount
}

// -----------------------------------------------------------------------------
// COMPONENTE
// -----------------------------------------------------------------------------

export function StepProgress({ fileProgress, isDone, onStart }: StepProgressProps) {

  // Garante que o upload só é disparado uma vez (mesmo em Strict Mode do React)
  const hasStarted = useRef(false)

  useEffect(() => {
    if (!hasStarted.current) {
      hasStarted.current = true
      onStart()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ── Progresso geral (média de todos os ficheiros) ──────────────────────────
  const overallProgress = fileProgress.length === 0
    ? 0
    : Math.round(
      fileProgress.reduce((sum, f) => sum + f.progress, 0) / fileProgress.length
    )

  // ── Contagem de resultados ─────────────────────────────────────────────────
  const doneCount = fileProgress.filter(f => f.status === 'DONE').length
  const errorCount = fileProgress.filter(f => f.status === 'ERROR').length

  return (
    <div className="flex flex-col gap-6">

      {/* ── Barra de progresso geral ── */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {isDone
              ? `${doneCount} de ${fileProgress.length} ficheiros enviados`
              : 'A enviar ficheiros…'
            }
          </span>
          <span className="font-medium tabular-nums">{overallProgress}%</span>
        </div>
        <Progress value={overallProgress} className="h-2" />
      </div>

      {/* ── Progresso individual por ficheiro ── */}
      <div className="flex flex-col gap-3 max-h-[280px] overflow-y-auto pr-1">
        {fileProgress.map(fp => (
          <FileProgressRow key={fp.fileName} progress={fp} />
        ))}

        {/* Estado inicial — antes do hook devolver o progresso ── */}
        {fileProgress.length === 0 && (
          <div className="flex h-24 items-center justify-center gap-2 text-muted-foreground">
            <Loader2 className="size-4 animate-spin" />
            <span className="text-sm">A preparar o upload…</span>
          </div>
        )}
      </div>

      {/* ── Mensagem final ── */}
      {isDone && (
        <div className={cn(
          'flex items-center justify-center gap-2 rounded-lg border py-3 text-sm font-medium',
          errorCount > 0
            ? 'border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400'
            : 'border-green-500/20 bg-green-500/10 text-green-600 dark:text-green-400'
        )}>
          {errorCount > 0 ? (
            <>
              <AlertCircle className="size-4" />
              {doneCount} ficheiros enviados, {errorCount} com erro
            </>
          ) : (
            <>
              <CheckCircle2 className="size-4" />
              Todos os ficheiros foram enviados com sucesso!
            </>
          )}
        </div>
      )}
    </div>
  )
}

// -----------------------------------------------------------------------------
// SUB-COMPONENTE: linha de progresso de um ficheiro
// -----------------------------------------------------------------------------

function FileProgressRow({ progress }: { progress: UploadFileProgress }) {
  const { fileName, status, progress: pct, chunksDone, chunksTotal, error } = progress

  return (
    <div className="flex flex-col gap-1.5 rounded-lg border bg-card p-3">
      {/* Nome do ficheiro + ícone de estado */}
      <div className="flex items-center gap-2">
        {/* Ícone de estado */}
        <div className="shrink-0">
          {status === 'DONE' && <CheckCircle2 className="size-4 text-green-500" />}
          {status === 'ERROR' && <AlertCircle className="size-4 text-destructive" />}
          {status === 'UPLOADING' && <Loader2 className="size-4 text-primary animate-spin" />}
          {status === 'WAITING' && <Circle className="size-4 text-muted-foreground/40" />}
          {status === 'HASHING' && <Loader2 className="size-4 text-blue-500 animate-spin" />}
          {/* TODO: Adicionar ícone para REGISTERING */}
        </div>

        {/* Nome */}
        <span className="text-sm font-medium truncate flex-1">{fileName}</span>

        {/* Percentagem */}
        {(status === 'UPLOADING' || status === 'DONE') && (
          <span className="text-xs text-muted-foreground tabular-nums shrink-0">
            {pct}%
          </span>
        )}
      </div>

      {/* Barra de progresso individual */}
      {(status === 'UPLOADING' || status === 'DONE') && (
        <Progress
          value={pct}
          className={cn(
            'h-1',
            status === 'DONE' && 'opacity-50'
          )}
        />
      )}

      {/* Info de chunks (para ficheiros fragmentados) */}
      {chunksTotal > 1 && status === 'UPLOADING' && (
        <span className="text-[10px] text-muted-foreground">
          Parte {chunksDone} de {chunksTotal}
        </span>
      )}

      {/* Mensagem de erro */}
      {status === 'ERROR' && error && (
        <p className="text-xs text-destructive">{error}</p>
      )}

      {/* Label de estado */}
      {status === 'WAITING' && (
        <span className="text-xs text-muted-foreground">À espera…</span>
      )}
      {status === 'HASHING' && (
        // TODO: Este estado será usado quando o SHA-256 for calculado antes do upload
        <span className="text-xs text-blue-500">A verificar integridade…</span>
      )}
    </div>
  )
}
