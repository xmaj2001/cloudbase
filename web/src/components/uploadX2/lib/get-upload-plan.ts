// =============================================================================
// lib/get-upload-plan.ts
// Função que chama o backend (BFF) para calcular o plano de upload.
//
// O backend é responsável por:
//   1. Buscar o espaço REAL de cada driver (não o cache do frontend)
//   2. Aplicar as regras de automação do utilizador (TODO)
//   3. Calcular a distribuição óptima entre os drivers
//   4. Devolver o plano com ficheiros colocados e não colocados
//
// O frontend NUNCA calcula onde os ficheiros vão — isso é lógica de negócio
// e pertence ao backend.
// =============================================================================

import { UploadPlanRequest, UploadPlanResponse } from '../upload.types'

/**
 * Chama POST /api/upload/plan e devolve o plano calculado pelo backend.
 *
 * @throws Error se a API devolver um erro ou se a rede falhar
 */
export async function getUploadPlan(
  request: UploadPlanRequest
): Promise<UploadPlanResponse> {

  const response = await fetch('/api/upload/plan', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  })

  if (!response.ok) {
    // Tenta extrair a mensagem de erro do backend
    const errorBody = await response.json().catch(() => null)
    throw new Error(
      errorBody?.message ?? `Erro ao calcular plano: ${response.status}`
    )
  }

  const data: UploadPlanResponse = await response.json()
  return data
}