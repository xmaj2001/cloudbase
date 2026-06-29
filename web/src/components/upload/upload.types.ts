// =============================================================================
// upload.types.ts
// Todos os tipos relacionados com o fluxo de upload num único lugar.
// Qualquer novo tipo deve ser adicionado aqui — nunca inline noutros ficheiros.
// =============================================================================

// -----------------------------------------------------------------------------
// FICHEIRO — representação de um ficheiro seleccionado pelo utilizador
// -----------------------------------------------------------------------------

/**
 * Dados de um ficheiro que o frontend envia ao backend para calcular o plano.
 * Usamos `string` para o tamanho porque BigInt não serializa em JSON.
 * O backend converte para BigInt internamente.
 */
export interface UploadFileInput {
  name:      string   // nome original do ficheiro (ex: "relatorio.pdf")
  extension: string   // extensão sem ponto       (ex: "pdf")
  sizeBytes: string   // tamanho em bytes como string (ex: "10737418240")
                      // STRING porque BigInt não serializa em JSON
}

// -----------------------------------------------------------------------------
// DRIVER — representação de um driver seleccionado
// -----------------------------------------------------------------------------

/**
 * Dados de espaço de um driver.
 * Vêm como string da API porque são BigInt na base de dados.
 */
export interface DriverSpaceDto {
  totalBytes:     string   // espaço total em bytes (string do BigInt)
  usedBytes:      string   // espaço usado em bytes
  availableBytes: string   // espaço livre em bytes
  isUnlimited:    boolean  // true para Telegram (sem limite)
}

// -----------------------------------------------------------------------------
// CHUNK — um pedaço de um ficheiro fragmentado (ou o ficheiro inteiro)
// -----------------------------------------------------------------------------

/**
 * Representa um chunk no plano de upload.
 *
 * Se o ficheiro NÃO é fragmentado:
 *   → existe apenas 1 chunk com startByte=0, endByte=fileSize, isFragment=false
 *
 * Se o ficheiro É fragmentado:
 *   → existem N chunks, cada um com o seu intervalo de bytes
 */
export interface UploadPlanChunk {
  chunkIndex:    number   // índice do chunk (0, 1, 2...)
  driverId:      string   // ID do driver de destino
  driverName:    string   // nome do driver (para mostrar no UI)
  driverType:    string   // tipo do provider (GOOGLE_DRIVE, TELEGRAM, etc.)
  startByte:     number   // byte de início no ficheiro original (para file.slice)
  endByte:       number   // byte de fim no ficheiro original   (para file.slice)
  chunkSizeBytes: number  // tamanho deste chunk em bytes
  isFragment:    boolean  // true se é parte de um ficheiro fragmentado
                          // false se é o ficheiro inteiro
}

// -----------------------------------------------------------------------------
// PLANO DE UM FICHEIRO — onde este ficheiro vai ser guardado
// -----------------------------------------------------------------------------

/** Ficheiro que consegue ser colocado (com ou sem fragmentação) */
export interface FilePlanSuccess {
  status:       'SUCCESS'
  fileName:     string
  fileSize:     number             // em bytes (number é suficiente no frontend)
  isFragmented: boolean            // true se foi necessário fragmentar
  chunks:       UploadPlanChunk[]  // 1 chunk se directo, N chunks se fragmentado
}

/** Ficheiro que NÃO consegue ser colocado por falta de espaço */
export interface FilePlanUnplaceable {
  status:       'UNPLACEABLE'
  fileName:     string
  fileSize:     number
  reason:       string   // ex: "Espaço insuficiente — faltam 4 GB"
  missingBytes: number   // quantos bytes faltam para poder colocar
}

/** União dos dois casos possíveis para um ficheiro no plano */
export type FilePlan = FilePlanSuccess | FilePlanUnplaceable

// -----------------------------------------------------------------------------
// PLANO COMPLETO — resposta do backend ao pedido de plano
// -----------------------------------------------------------------------------

/**
 * Resposta completa do backend ao endpoint POST /upload/plan
 *
 * O backend devolve SEMPRE um plano, mesmo que alguns ficheiros
 * não consigam ser colocados. O utilizador decide se continua
 * com os ficheiros que cabem ou cancela tudo.
 */
export interface UploadPlanResponse {
  // Ficheiros com plano definido (com ou sem fragmentação)
  placed:      FilePlanSuccess[]

  // Ficheiros que não têm espaço suficiente em nenhum driver
  unplaceable: FilePlanUnplaceable[]

  // true se o utilizador pode prosseguir com pelo menos 1 ficheiro
  canProceed:  boolean

  // Espaço total que vai ser consumido pelos ficheiros "placed"
  totalBytes:  number

  // TODO: Adicionar quando as regras de automação forem implementadas
  // rulesApplied: AppliedRule[]  ← quais regras foram usadas para pré-atribuir destinos
}

// -----------------------------------------------------------------------------
// PEDIDO DE PLANO — o que o frontend envia ao backend
// -----------------------------------------------------------------------------

export interface UploadPlanRequest {
  userId:            string           // ID do utilizador autenticado
  files:             UploadFileInput[] // ficheiros a enviar
  selectedDriverIds: string[]         // drivers seleccionados (pode ser vazio)
                                      // se vazio → backend escolhe automaticamente
}

// -----------------------------------------------------------------------------
// ESTADO DO UPLOAD — progresso real de cada ficheiro
// -----------------------------------------------------------------------------

export type UploadFileStatus =
  | 'WAITING'     // à espera de começar
  | 'HASHING'     // a calcular SHA-256 (TODO: implementar)
  | 'UPLOADING'   // a enviar para o driver
  | 'REGISTERING' // a registar no backend após upload
  | 'DONE'        // concluído com sucesso
  | 'ERROR'       // falhou

export interface UploadFileProgress {
  fileName:    string
  status:      UploadFileStatus
  progress:    number          // 0-100
  chunksDone:  number          // chunks já enviados
  chunksTotal: number          // total de chunks a enviar
  error?:      string          // mensagem de erro se status === 'ERROR'
}

// -----------------------------------------------------------------------------
// RESULTADO DE VERIFICAÇÃO — verificação do plano antes de executar
// -----------------------------------------------------------------------------

/**
 * Antes de executar o upload, o backend verifica se o plano ainda é válido
 * (o espaço pode ter mudado desde que o plano foi criado).
 */
export interface PlanVerificationResult {
  isValid:      boolean              // true se o plano pode ser executado
  invalidFiles: InvalidPlanFile[]    // ficheiros que já não cabem
  validFiles:   FilePlanSuccess[]    // ficheiros que ainda cabem
}

export interface InvalidPlanFile {
  fileName:       string
  reason:         string   // ex: "O driver Google Drive A ficou sem espaço"
  originalDriver: string
}
