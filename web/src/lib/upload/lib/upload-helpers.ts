// =============================================================================
// lib/verify-plan.ts
// Verifica se o plano ainda é válido antes de executar o upload.
//
// O espaço nos drivers pode ter mudado desde que o plano foi criado
// (ex: o utilizador guardou ficheiros directamente no Google Drive entretanto).
// Esta verificação evita falhas a meio do upload.
// =============================================================================

import { FilePlanSuccess, PlanVerificationResult } from '../upload.types'

interface VerifyPlanInput {
  userId: string
  plan:   FilePlanSuccess[]
}

/**
 * Chama POST /api/upload/plan/verify para confirmar que o plano ainda é válido.
 * O backend verifica o espaço REAL de cada driver neste momento.
 *
 * TODO: Implementar quando o endpoint estiver disponível no backend.
 */
export async function verifyPlan(
  input: VerifyPlanInput
): Promise<PlanVerificationResult> {

  // TODO: Substituir por chamada real ao backend
  // const response = await fetch('/api/upload/plan/verify', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(input),
  // })
  // return response.json()

  // Por agora, assume que o plano é sempre válido
  // REMOVER quando o endpoint estiver implementado
  return {
    isValid:      true,
    invalidFiles: [],
    validFiles:   input.plan,
  }
}


// =============================================================================
// lib/execute-upload.ts
// Executa o upload de um ficheiro seguindo o plano definido.
//
// IMPORTANTE: Os ficheiros vão DIRECTAMENTE do browser para o driver
// (Google Drive, Telegram, etc.) — NUNCA passam pelo servidor do CloudBase.
// O servidor do CloudBase só:
//   1. Fornece as credenciais temporárias para aceder ao driver
//   2. Regista o Node na base de dados após o upload ser confirmado
//
// =============================================================================


interface ExecuteUploadInput {
  file:      File             // ficheiro real do browser (File API)
  filePlan:  FilePlanSuccess  // plano para este ficheiro
  userId:    string
  parentId:  string | null
  onProgress: (
    progress:   number,   // 0-100
    chunksDone: number    // quantos chunks já foram enviados
  ) => void
}

/**
 * Executa o upload de um ficheiro seguindo o plano.
 *
 * Para ficheiros NÃO fragmentados:
 *   → Envia o ficheiro inteiro directamente para o driver
 *
 * Para ficheiros fragmentados:
 *   → Corta o ficheiro com file.slice() e envia cada chunk
 *   → Cada chunk vai directamente para o seu driver de destino
 *   → Após todos os chunks: regista o Node no backend
 *
 * TODO: Implementar completamente quando as credenciais dos drivers
 *       estiverem disponíveis via API.
 */
export async function executeUploadPlan(input: ExecuteUploadInput): Promise<void> {
  const { file, filePlan, userId, parentId, onProgress } = input

  if (filePlan.isFragmented) {
    // ── Upload fragmentado ──────────────────────────────────────────────────
    //
    // Cada chunk é um pedaço do ficheiro original.
    // O browser corta o ficheiro com File.slice() — sem carregar tudo na RAM.
    //
    for (let i = 0; i < filePlan.chunks.length; i++) {
      const chunk = filePlan.chunks[i]

      // Corta o pedaço correspondente do ficheiro
      // file.slice(start, end) devolve um Blob sem copiar os dados para RAM
      const chunkBlob = file.slice(chunk.startByte, chunk.endByte)

      // TODO: Passo 1 — Obter credenciais temporárias para este driver
      // const credentials = await getDriverCredentials({
      //   userId,
      //   driverId: chunk.driverId,
      // })

      // TODO: Passo 2 — Enviar o chunk directamente para o driver
      // const uploadResult = await uploadChunkToDriver({
      //   credentials,
      //   chunk:      chunkBlob,
      //   chunkName:  `${file.name}.part${chunk.chunkIndex}`,
      //   folderPath: 'CloudBase/_fragments/',
      // })

      // TODO: Passo 3 — Registar o chunk no backend
      // await registerChunk({
      //   nodeId:        ...,  // criado no início do upload
      //   chunkIndex:    chunk.chunkIndex,
      //   driverId:      chunk.driverId,
      //   providerFileId: uploadResult.id,
      //   chunkHash:     await computeSHA256(chunkBlob),
      //   startByte:     chunk.startByte,
      //   endByte:       chunk.endByte,
      //   sizeBytes:     chunk.chunkSizeBytes,
      // })

      // Simula progresso (remover quando TODO acima estiver implementado)
      await new Promise(r => setTimeout(r, 300))
      onProgress(
        Math.round(((i + 1) / filePlan.chunks.length) * 100),
        i + 1
      )
    }

    // TODO: Após todos os chunks enviados com sucesso:
    // → Registar o Node completo no backend (um único Node com isFragmented=true)
    // → O backend valida que todos os chunks chegaram (hash de cada um)
    // → Só então o ficheiro aparece no explorer do utilizador

  } else {
    // ── Upload directo (sem fragmentação) ──────────────────────────────────
    //
    // O ficheiro inteiro vai para um único driver.
    //
    const chunk = filePlan.chunks[0]  // sempre existe exactamente 1 chunk

    // TODO: Passo 1 — Obter credenciais temporárias para este driver
    // const credentials = await getDriverCredentials({
    //   userId,
    //   driverId: chunk.driverId,
    // })

    // TODO: Passo 2 — Enviar o ficheiro directamente para o driver
    // const uploadResult = await uploadFileToDriver({
    //   credentials,
    //   file,
    //   fileName:   file.name,
    //   folderPath: 'CloudBase/',
    //   // TODO: Aplicar pasta de destino das regras de automação
    //   // destinationPath: chunk.destinationPath  ← vem do plano do backend
    // })

    // TODO: Passo 3 — Registar o Node no backend
    // await createFileNode({
    //   userId,
    //   parentId,
    //   name:          file.name,
    //   mimeType:      file.type,
    //   extension:     file.name.split('.').pop() ?? '',
    //   sizeBytes:     String(file.size),
    //   driverId:      chunk.driverId,
    //   providerFileId: uploadResult.id,
    //   providerPath:  uploadResult.path,
    //   fileHash:      await computeSHA256(file),
    // })

    // TODO: Passo 4 — Calcular SHA-256 do ficheiro para verificação de integridade
    // const hash = await computeSHA256(file)
    // → Guardar no Node para verificação futura

    // Simula progresso (remover quando TODO acima estiver implementado)
    await new Promise(r => setTimeout(r, 1500))
    onProgress(100, 1)
  }
}


// =============================================================================
// lib/compute-sha256.ts
// Calcula o hash SHA-256 de um ficheiro usando a Web Crypto API nativa.
//
// Usado para:
//   1. Verificar integridade de ficheiros após download
//   2. Verificar integridade de cada chunk após upload
//   3. Detectar ficheiros duplicados
//
// A Web Crypto API está disponível em todos os browsers modernos
// e não requer nenhuma dependência externa.
// =============================================================================

/**
 * Calcula o SHA-256 de um Blob (File ou parte de File).
 * Devolve o hash como string hexadecimal (64 caracteres).
 *
 * Nota: Para ficheiros grandes (>1GB) isto pode ser lento
 * porque carrega o ficheiro todo em memória.
 * TODO: Implementar versão em chunks para ficheiros grandes.
 *
 * @example
 * const hash = await computeSHA256(file)
 * // → "a8f39c2d1e4b7f..."
 */
export async function computeSHA256(blob: Blob): Promise<string> {
  const buffer     = await blob.arrayBuffer()
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer)
  const hashArray  = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}
