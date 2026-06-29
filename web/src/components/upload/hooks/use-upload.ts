// // =============================================================================
// // hooks/use-upload.ts
// // Hook central que gere TODO o estado e lógica do fluxo de upload.
// //
// // O UploadModal não tem lógica — apenas usa este hook.
// // Isto mantém o modal limpo e torna a lógica testável de forma independente.
// // =============================================================================

// 'use client'

// import { useState, useCallback } from 'react'
// import {
//   UploadPlanResponse,
//   UploadPlanRequest,
//   FilePlan,
//   FilePlanSuccess,
//   UploadFileProgress,
//   PlanVerificationResult,
// } from '../upload.types'
// import { getUploadPlan } from '../lib/get-upload-plan'
// import { executeUploadPlan } from '../lib/execute-upload'
// import { verifyPlan } from '../lib/verify-plan'

// // -----------------------------------------------------------------------------
// // TIPOS DO HOOK
// // -----------------------------------------------------------------------------

// /** Fase actual do fluxo de upload */
// export type UploadStep = 'file' | 'driver' | 'plan' | 'progress'

// /** Estado de carregamento do plano */
// export type PlanStatus = 'idle' | 'loading' | 'error' | 'ready'

// /** Estado de verificação do plano antes do upload */
// export type VerifyStatus = 'idle' | 'verifying' | 'invalid' | 'valid'

// // -----------------------------------------------------------------------------
// // HOOK
// // -----------------------------------------------------------------------------

// interface UseUploadOptions {
//   userId: string
//   parentId?: string | null
// }

// export function useUpload({ userId, parentId = null }: UseUploadOptions) {

//   // ── Step actual ─────────────────────────────────────────────────────────────
//   const [step, setStep] = useState<UploadStep>('file')

//   // ── Ficheiros seleccionados pelo utilizador ──────────────────────────────────
//   const [files, setFiles] = useState<File[]>([])

//   // ── Drivers seleccionados (pode ser vazio — backend escolhe automaticamente) ─
//   const [selectedDriverIds, setSelectedDriverIds] = useState<string[]>([])

//   // ── Plano de upload (resposta do backend) ────────────────────────────────────
//   const [plan, setPlan] = useState<UploadPlanResponse | null>(null)
//   const [planStatus, setPlanStatus] = useState<PlanStatus>('idle')
//   const [planError, setPlanError] = useState<string | null>(null)

//   // ── Plano editado pelo utilizador (pode alterar destino de cada chunk) ───────
//   // Começa igual ao plano do backend e o utilizador pode modificar
//   const [editedPlan, setEditedPlan] = useState<FilePlanSuccess[] | null>(null)

//   // ── Verificação do plano antes de executar ───────────────────────────────────
//   const [verifyStatus, setVerifyStatus] = useState<VerifyStatus>('idle')
//   const [verifyResult, setVerifyResult] = useState<PlanVerificationResult | null>(null)

//   // ── Progresso do upload em execução ─────────────────────────────────────────
//   const [uploadProgress, setUploadProgress] = useState<UploadFileProgress[]>([])
//   const [isUploadDone, setIsUploadDone] = useState(false)

//   // ============================================================================
//   // ACÇÕES
//   // ============================================================================

//   // ── 1. Pedir o plano ao backend ──────────────────────────────────────────────
//   //
//   // Chamado quando o utilizador clica "Avançar" no step de drivers.
//   // O backend:
//   //   1. Busca o espaço REAL de cada driver (não o cache)
//   //   2. Aplica as regras do utilizador (TODO: quando estiver implementado)
//   //   3. Calcula a distribuição óptima
//   //   4. Devolve o plano com ficheiros colocados e não colocados
//   //
//   const fetchPlan = useCallback(async () => {
//     setPlanStatus('loading')
//     setPlanError(null)
//     setPlan(null)
//     setEditedPlan(null)

//     // Monta o pedido com os dados dos ficheiros
//     // Nota: sizeBytes é string porque BigInt não serializa em JSON
//     const request: UploadPlanRequest = {
//       userId,
//       files: files.map(f => ({
//         name: f.name,
//         extension: f.name.includes('.') ? f.name.split('.').pop() ?? '' : '',
//         sizeBytes: String(f.size),  // ← converte para string aqui, nunca BigInt no frontend
//       })),
//       selectedDriverIds,
//       // TODO: Quando as regras de automação forem implementadas, adicionar:
//       // applyAutomationRules: true
//     }

//     try {
//       const response = await getUploadPlan(request)
//       setPlan(response)
//       // O plano editado começa igual ao plano do backend
//       setEditedPlan(Array.isArray(response?.placed) ? response.placed : [])
//       setPlanStatus('ready')
//     } catch (err: any) {
//       setPlanError(err?.message ?? 'Erro ao calcular o plano de upload.')
//       setPlanStatus('error')
//     }
//   }, [userId, files, selectedDriverIds])

//   // ── 2. Utilizador edita o plano (muda destino de um chunk) ──────────────────
//   //
//   // Chamado pelo StepPlan quando o utilizador arrasta um chunk para outro driver.
//   // Valida localmente se o driver de destino tem espaço suficiente.
//   //
//   const updateChunkDriver = useCallback((
//     fileName: string,
//     chunkIndex: number,
//     newDriverId: string,
//     newDriverName: string,
//     newDriverType: string,
//   ) => {
//     if (!editedPlan) return

//     setEditedPlan(prev =>
//       prev!.map(filePlan => {
//         if (filePlan.fileName !== fileName) return filePlan

//         return {
//           ...filePlan,
//           chunks: filePlan.chunks.map(chunk => {
//             if (chunk.chunkIndex !== chunkIndex) return chunk
//             // Substitui o driver deste chunk pelo novo escolhido
//             return {
//               ...chunk,
//               driverId: newDriverId,
//               driverName: newDriverName,
//               driverType: newDriverType,
//             }
//           }),
//         }
//       })
//     )
//   }, [editedPlan])

//   // ── 3. Verificar o plano antes de executar ───────────────────────────────────
//   //
//   // Chamado quando o utilizador clica "Confirmar e Enviar".
//   // Volta ao backend para confirmar que o espaço ainda está disponível
//   // (pode ter mudado desde que o plano foi criado — alguém pode ter guardado
//   // ficheiros entretanto no Google Drive, por exemplo).
//   //
//   const confirmPlan = useCallback(async () => {
//     if (!editedPlan || editedPlan.length === 0) return

//     setVerifyStatus('verifying')
//     setVerifyResult(null)

//     try {
//       // TODO: implementar verifyPlan que chama POST /upload/plan/verify
//       const result = await verifyPlan({ userId, plan: editedPlan })
//       setVerifyResult(result)
//       setVerifyStatus(result.isValid ? 'valid' : 'invalid')
//     } catch {
//       setVerifyStatus('invalid')
//       setVerifyResult({
//         isValid: false,
//         invalidFiles: [],
//         validFiles: [],
//       })
//     }
//   }, [userId, editedPlan])

//   // ── 4. Executar o upload ─────────────────────────────────────────────────────
//   //
//   // Chamado pelo StepProgress assim que o componente monta.
//   // Para cada ficheiro no plano:
//   //   1. Calcula o SHA-256 (TODO)
//   //   2. Se fragmentado: corta com file.slice() e envia cada chunk
//   //   3. Se directo: envia o ficheiro inteiro
//   //   4. Regista no backend após cada upload bem sucedido
//   //
//   // O upload é feito NO CLIENTE — os ficheiros vão directamente para o driver,
//   // nunca passam pelo servidor do CloudBase.
//   //
//   const executeUpload = useCallback(async () => {
//     if (!editedPlan || files.length === 0) return

//     // Inicializa o progresso de cada ficheiro
//     setUploadProgress(
//       editedPlan.map(fp => ({
//         fileName: fp.fileName,
//         status: 'WAITING',
//         progress: 0,
//         chunksDone: 0,
//         chunksTotal: fp.chunks.length,
//       }))
//     )

//     // Actualiza o progresso de um ficheiro específico
//     const updateProgress = (fileName: string, update: Partial<UploadFileProgress>) => {
//       setUploadProgress(prev =>
//         prev.map(p => p.fileName === fileName ? { ...p, ...update } : p)
//       )
//     }

//     // Processa cada ficheiro sequencialmente
//     // (em paralelo pode sobrecarregar a ligação do utilizador)
//     for (const filePlan of editedPlan) {
//       const file = files.find(f => f.name === filePlan.fileName)
//       if (!file) continue

//       try {
//         // TODO: implementar executeUploadPlan que:
//         //   1. Chama backend para obter credenciais temporárias do driver
//         //   2. Usa as credenciais para enviar directamente ao provider
//         //   3. Regista o Node no backend após upload bem sucedido
//         //   4. Chama updateProgress com o progresso real
//         await executeUploadPlan({
//           file,
//           filePlan,
//           userId,
//           parentId,
//           onProgress: (progress, chunksDone) => {
//             updateProgress(filePlan.fileName, {
//               status: 'UPLOADING',
//               progress,
//               chunksDone,
//             })
//           },
//         })

//         updateProgress(filePlan.fileName, {
//           status: 'DONE',
//           progress: 100,
//         })

//       } catch (err: any) {
//         updateProgress(filePlan.fileName, {
//           status: 'ERROR',
//           error: err?.message ?? 'Erro desconhecido',
//         })
//         // Continua para o próximo ficheiro mesmo que este falhe
//       }
//     }

//     setIsUploadDone(true)
//   }, [editedPlan, files, userId, parentId])

//   // ── 5. Reset completo ────────────────────────────────────────────────────────
//   //
//   // Chamado quando o modal fecha ou o utilizador cancela.
//   //
//   const reset = useCallback(() => {
//     setStep('file')
//     setFiles([])
//     setSelectedDriverIds([])
//     setPlan(null)
//     setPlanStatus('idle')
//     setPlanError(null)
//     setEditedPlan(null)
//     setVerifyStatus('idle')
//     setVerifyResult(null)
//     setUploadProgress([])
//     setIsUploadDone(false)
//   }, [])

//   // ============================================================================
//   // VALORES DERIVADOS (computed)
//   // ============================================================================

//   // Tamanho total de todos os ficheiros seleccionados (para display no UI)
//   const totalFileSize = files.reduce((sum, f) => sum + f.size, 0)

//   // O utilizador pode avançar do step de ficheiros?
//   const canAdvanceFromFiles = files.length > 0

//   // O utilizador pode avançar do step de drivers?
//   // Nota: selectedDriverIds pode ser vazio — backend escolhe automaticamente
//   const canAdvanceFromDrivers = files.length > 0

//   // O utilizador pode avançar do step de plano?
//   const canAdvanceFromPlan = (
//     planStatus === 'ready' &&
//     Array.isArray(editedPlan) &&
//     editedPlan.length > 0 &&
//     // TODO: Verificar se não há chunks com drivers inválidos (over capacity)
//     verifyStatus !== 'verifying'
//   )

//   // ============================================================================
//   // RETORNO DO HOOK
//   // ============================================================================

//   return {
//     // Estado
//     step,
//     files,
//     selectedDriverIds,
//     plan,
//     planStatus,
//     planError,
//     editedPlan,
//     verifyStatus,
//     verifyResult,
//     uploadProgress,
//     isUploadDone,
//     totalFileSize,

//     // Navegação
//     setStep,

//     // Acções de dados
//     setFiles,
//     setSelectedDriverIds,

//     // Acções do plano
//     fetchPlan,
//     updateChunkDriver,
//     confirmPlan,
//     executeUpload,

//     // Validações
//     canAdvanceFromFiles,
//     canAdvanceFromDrivers,
//     canAdvanceFromPlan,

//     // Reset
//     reset,
//   }
// }

'use client'

import { useState, useCallback } from 'react'
import {
  UploadPlanResponse,
  UploadPlanRequest,
  FilePlanSuccess,
  UploadFileProgress,
  PlanVerificationResult,
} from '../upload.types'
import { getUploadPlan } from '../lib/get-upload-plan'
import { executeUploadPlan } from '../lib/execute-upload'
import { verifyPlan } from '../lib/verify-plan'

export type UploadStep = 'file' | 'driver' | 'plan' | 'progress'
export type PlanStatus = 'idle' | 'loading' | 'error' | 'ready'
export type VerifyStatus = 'idle' | 'verifying' | 'invalid' | 'valid'

interface UseUploadOptions {
  userId: string
  parentId?: string | null
}

export function useUpload({ userId, parentId = null }: UseUploadOptions) {
  const [step, setStep] = useState<UploadStep>('file')
  const [files, setFiles] = useState<File[]>([])
  const [selectedDriverIds, setSelectedDriverIds] = useState<string[]>([])
  
  const [plan, setPlan] = useState<UploadPlanResponse | null>(null)
  const [planStatus, setPlanStatus] = useState<PlanStatus>('idle')
  const [planError, setPlanError] = useState<string | null>(null)
  const [editedPlan, setEditedPlan] = useState<FilePlanSuccess[] | null>(null)

  const [verifyStatus, setVerifyStatus] = useState<VerifyStatus>('idle')
  const [verifyResult, setVerifyResult] = useState<PlanVerificationResult | null>(null)

  const [uploadProgress, setUploadProgress] = useState<UploadFileProgress[]>([])
  const [isUploadDone, setIsUploadDone] = useState(false)

  // Estado local para o Drag and Drop exigido pelo StepFileSelect
  const [isDragging, setIsDragging] = useState(false)

  // ── 1. Pedir o plano ao backend ──────────────────────────────────────────────
  const fetchPlan = useCallback(async () => {
    console.log('📊 [useUpload] fetchPlan iniciado para os ficheiros:', files.map(f => f.name))
    setPlanStatus('loading')
    setPlanError(null)
    setPlan(null)
    setEditedPlan(null)

    const request: UploadPlanRequest = {
      userId,
      files: files.map(f => ({
        name: f.name,
        extension: f.name.includes('.') ? f.name.split('.').pop() ?? '' : '',
        sizeBytes: String(f.size),
      })),
      selectedDriverIds,
    }

    try {
      const response = await getUploadPlan(request)
      console.log('📊 [useUpload] Resposta do Plano recebida do BFF:', response)
      
      setPlan(response)
      const placedData = Array.isArray(response?.placed) ? response.placed : []
      setEditedPlan(placedData)
      setPlanStatus('ready')
      
      console.log('📊 [useUpload] Estado do plano definido como pronto. Itens alocados:', placedData.length)
    } catch (err: any) {
      console.error('📊 [useUpload] Erro ao obter plano:', err)
      setPlanError(err?.message ?? 'Erro ao calcular o plano de upload.')
      setPlanStatus('error')
    }
  }, [userId, files, selectedDriverIds])

  // ── 2. Utilizador edita o plano ──────────────────────────────────────────────
  const updateChunkDriver = useCallback((
    fileName: string,
    chunkIndex: number,
    newDriverId: string,
    newDriverName: string,
    newDriverType: string,
  ) => {
    console.log(`📊 [useUpload] Mover chunk ${chunkIndex} do ficheiro ${fileName} para o driver ${newDriverName}`)
    if (!editedPlan) return

    setEditedPlan(prev =>
      prev!.map(filePlan => {
        if (filePlan.fileName !== fileName) return filePlan
        return {
          ...filePlan,
          chunks: filePlan.chunks.map(chunk => {
            if (chunk.chunkIndex !== chunkIndex) return chunk
            return {
              ...chunk,
              driverId: newDriverId,
              driverName: newDriverName,
              driverType: newDriverType,
            }
          }),
        }
      })
    )
  }, [editedPlan])

  // ── 3. Verificar o plano antes de executar ───────────────────────────────────
  const confirmPlan = useCallback(async () => {
    console.log('📊 [useUpload] A confirmar validade do plano no backend...', editedPlan)
    if (!editedPlan || editedPlan.length === 0) return

    setVerifyStatus('verifying')
    setVerifyResult(null)

    try {
      const result = await verifyPlan({ userId, plan: editedPlan })
      console.log('📊 [useUpload] Resultado da verificação do plano:', result)
      setVerifyResult(result)
      setVerifyStatus(result.isValid ? 'valid' : 'invalid')
    } catch (error) {
      console.error('📊 [useUpload] Erro ao verificar plano:', error)
      setVerifyStatus('invalid')
      setVerifyResult({
        isValid: false,
        invalidFiles: [],
        validFiles: [],
      })
    }
  }, [userId, editedPlan])

  // ── 4. Executar o upload ─────────────────────────────────────────────────────
  const executeUpload = useCallback(async () => {
    console.log('📊 [useUpload] executeUpload invocado! Verificando dados de entrada...')
    console.log('- editedPlan:', editedPlan)
    console.log('- files na state:', files.map(f => f.name))

    if (!editedPlan || editedPlan.length === 0) {
      console.warn('📊 [useUpload] Cancelado: editedPlan está vazio ou nulo.')
      return
    }
    if (files.length === 0) {
      console.warn('📊 [useUpload] Cancelado: Não existem ficheiros binários no estado para enviar.')
      return
    }

    // Inicializa o estado de progresso com os ficheiros que vão ser enviados
    const initialProgress = editedPlan.map(fp => ({
      fileName: fp.fileName,
      status: 'WAITING' as const,
      progress: 0,
      chunksDone: 0,
      chunksTotal: fp.chunks.length,
    }))
    
    console.log('📊 [useUpload] Inicializar estado de progresso UI para:', initialProgress)
    setUploadProgress(initialProgress)
    setIsUploadDone(false)

    const updateProgress = (fileName: string, update: Partial<UploadFileProgress>) => {
      setUploadProgress(prev =>
        prev.map(p => p.fileName === fileName ? { ...p, ...update } : p)
      )
    }

    // Loop sequencial de uploads
    for (const filePlan of editedPlan) {
      const file = files.find(f => f.name === filePlan.fileName)
      if (!file) {
        console.error(`📊 [useUpload] Ficheiro binário não encontrado para o plano: ${filePlan.fileName}`)
        continue
      }

      try {
        console.log(`📊 [useUpload] Começar upload real do ficheiro: ${file.name} (${file.size} bytes)`)
        
        await executeUploadPlan({
          file,
          filePlan,
          userId,
          parentId,
          onProgress: (progress, chunksDone) => {
            console.log(`📊 [useUpload] Progresso do ficheiro ${file.name}: ${progress}% (Chunks: ${chunksDone}/${filePlan.chunks.length})`)
            updateProgress(filePlan.fileName, {
              status: 'UPLOADING',
              progress,
              chunksDone,
            })
          },
        })

        console.log(`📊 [useUpload] Concluído com sucesso o upload e o registo de: ${file.name}`)
        updateProgress(filePlan.fileName, {
          status: 'DONE',
          progress: 100,
        })

      } catch (err: any) {
        console.error(`📊 [useUpload] Falha catastrófica no upload de ${filePlan.fileName}:`, err)
        updateProgress(filePlan.fileName, {
          status: 'ERROR',
          error: err?.message ?? 'Erro desconhecido',
        })
      }
    }

    console.log('📊 [useUpload] Fluxo completo de todos os ficheiros terminado.')
    setIsUploadDone(true)
  }, [editedPlan, files, userId, parentId])

  const reset = useCallback(() => {
    console.log('📊 [useUpload] Reset total do estado executado.')
    setStep('file')
    setFiles([])
    setSelectedDriverIds([])
    setPlan(null)
    setPlanStatus('idle')
    setPlanError(null)
    setEditedPlan(null)
    setVerifyStatus('idle')
    setVerifyResult(null)
    setUploadProgress([])
    setIsUploadDone(false)
    setIsDragging(false)
  }, [])

  const totalFileSize = files.reduce((sum, f) => sum + f.size, 0)
  const canAdvanceFromFiles = files.length > 0
  const canAdvanceFromDrivers = files.length > 0
  const canAdvanceFromPlan = (
    planStatus === 'ready' &&
    Array.isArray(editedPlan) &&
    editedPlan.length > 0 &&
    verifyStatus !== 'verifying'
  )

  return {
    step,
    files,
    selectedDriverIds,
    plan,
    planStatus,
    planError,
    editedPlan,
    verifyStatus,
    verifyResult,
    uploadProgress,
    isUploadDone,
    totalFileSize,
    isDragging,
    setIsDragging,
    setStep,
    setFiles,
    setSelectedDriverIds,
    fetchPlan,
    updateChunkDriver,
    confirmPlan,
    executeUpload,
    canAdvanceFromFiles,
    canAdvanceFromDrivers,
    canAdvanceFromPlan,
    reset,
  }
}