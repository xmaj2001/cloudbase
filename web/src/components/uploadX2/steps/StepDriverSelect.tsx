// =============================================================================
// steps/StepDriverSelect.tsx
// Step de selecção de drivers.
//
// RESPONSABILIDADE DESTE COMPONENTE:
//   → Mostrar os drivers disponíveis
//   → Deixar o utilizador seleccionar um ou mais drivers
//   → Mostrar o espaço disponível de cada driver (para display apenas)
//
// O QUE NÃO ESTÁ AQUI:
//   → Análise de se o ficheiro cabe (isso é feito pelo backend ao calcular o plano)
//   → Cálculo de fragmentação (backend)
//   → Comparações de BigInt (backend)
//
// NOTA SOBRE TIPOS DE DADOS:
//   O espaço dos drivers vem do backend como string (porque é BigInt na DB).
//   Convertemos para number SÓ para display (barra visual, texto).
//   NUNCA usamos esses números para decisões de negócio no frontend.
// =============================================================================

'use client'

import { Loader2 } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'
import { ApiDriver } from '@/lib/api/drivers/types'
import { PROVIDER_ICONS } from '@/types/drivers'

// -----------------------------------------------------------------------------
// UTILITÁRIO: formata bytes para exibição legível
//
// Recebe number (já convertido de string para display).
// APENAS para mostrar ao utilizador — não usar em cálculos.
// -----------------------------------------------------------------------------

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B'
  if (bytes < 1_024) return `${bytes} B`
  if (bytes < 1_048_576) return `${(bytes / 1_024).toFixed(1)} KB`
  if (bytes < 1_073_741_824) return `${(bytes / 1_048_576).toFixed(1)} MB`
  return `${(bytes / 1_073_741_824).toFixed(1)} GB`
}

// -----------------------------------------------------------------------------
// PROPS
// -----------------------------------------------------------------------------

interface StepDriverSelectProps {
  drivers: ApiDriver[]
  loading: boolean
  selectedDriverIds: string[]
  onSelectionChange: (ids: string[]) => void
  // Tamanho total apenas para display no header
  // (não usado para cálculos — isso é feito no backend)
  totalFileSizeBytes: number
}

// -----------------------------------------------------------------------------
// COMPONENTE
// -----------------------------------------------------------------------------

export function StepDriverSelect({
  drivers,
  loading,
  selectedDriverIds,
  onSelectionChange,
  totalFileSizeBytes,
}: StepDriverSelectProps) {

  const toggleDriver = (id: string) => {
    onSelectionChange(
      selectedDriverIds.includes(id)
        ? selectedDriverIds.filter(x => x !== id)
        : [...selectedDriverIds, id]
    )
  }

  // ── Estado de carregamento ──────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex h-40 items-center justify-center gap-2 text-muted-foreground">
        <Loader2 className="size-5 animate-spin" />
        <span className="text-sm">A carregar drivers…</span>
      </div>
    )
  }

  // ── Sem drivers conectados ──────────────────────────────────────────────────
  if (drivers.length === 0) {
    return (
      <div className="flex h-40 flex-col items-center justify-center gap-2 text-center">
        <p className="text-sm font-medium">Sem drivers conectados</p>
        <p className="text-xs text-muted-foreground">
          Conecta pelo menos um driver nas definições para poderes fazer upload.
        </p>
        {/* TODO: Adicionar link para a página de definições de drivers */}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">

      {/* ── Instrução ── */}
      <p className="text-sm text-muted-foreground">
        Seleciona um ou mais drivers de destino.
        {selectedDriverIds.length === 0 && (
          <span className="block text-xs mt-0.5">
            Se não seleccionares nenhum, o sistema escolhe automaticamente.
          </span>
        )}
      </p>

      {/* ── Tamanho total a enviar ── */}
      {totalFileSizeBytes > 0 && (
        <div className="text-xs text-muted-foreground border rounded-lg px-3 py-2 bg-muted/30">
          Total a enviar: <strong>{formatBytes(totalFileSizeBytes)}</strong>
          {' '}— o plano exacto de distribuição será calculado no próximo passo.
        </div>
      )}

      {/* ── Grid de drivers ── */}
      <div className="grid grid-cols-2 gap-2">
        {drivers.map(driver => {
          const isSelected = selectedDriverIds.includes(driver.id)

          // Converte string → number SÓ para display (barra e texto)
          // NUNCA usar para decisões de negócio
          const totalBytes = Number(driver.space?.totalSpace ?? 0)
          const availableBytes = Number(driver.space?.availableSpace ?? 0)
          const usedBytes = totalBytes - availableBytes

          // Percentagem usada — apenas para a barra visual
          const usedPercent = totalBytes > 0
            ? Math.min(100, (usedBytes / totalBytes) * 100)
            : 0

          const isUnlimited = false
          // const isUnlimited = driver.space?.isUnlimited ?? false

          return (
            <div
              key={driver.id}
              onClick={() => toggleDriver(driver.id)}
              className={cn(
                'flex flex-col gap-2 rounded-xl border p-3 cursor-pointer transition-all',
                isSelected
                  ? 'border-primary bg-primary/5 ring-1 ring-primary/30'
                  : 'border-border hover:border-primary/40 hover:bg-muted/30'
              )}
            >
              {/* Nome + checkbox */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-xl shrink-0">
                    {PROVIDER_ICONS[driver.type] ?? '💾'}
                  </span>
                  <span className="text-sm font-medium truncate">
                    {driver.displayName}
                  </span>
                </div>
                <Checkbox
                  checked={isSelected}
                  className="pointer-events-none shrink-0"
                />
              </div>

              {/* Barra de espaço + texto */}
              <div className="flex flex-col gap-1">
                {isUnlimited ? (
                  // Telegram e outros providers ilimitados
                  <p className="text-xs text-muted-foreground">
                    Ilimitado
                  </p>
                ) : (
                  <>
                    <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                      <div
                        className={cn(
                          'h-full rounded-full transition-all',
                          usedPercent > 85 ? 'bg-destructive' : 'bg-primary'
                        )}
                        style={{ width: `${usedPercent}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {formatBytes(availableBytes)} livres de {formatBytes(totalBytes)}
                    </p>
                  </>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* TODO: Quando as regras de automação estiverem implementadas,
               mostrar aqui um indicador de quais regras serão aplicadas
               aos ficheiros seleccionados.
          Exemplo:
          <AutomationRulesPreview files={files} drivers={selectedDriverIds} />
      */}

    </div>
  )
}
