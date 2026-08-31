/**
 * Tipos da feature `plans`.
 * Espelha o contrato do NestJS (cbb/src/modules/plans/plan.inputs.ts).
 *
 * Nota sobre BigInt:
 *   O backend usa BigInt internamente, mas JSON serializa esses valores como
 *   strings numéricas (ex: "10737418240"). O mapper (plan.mapper.ts) converte
 *   para `number` antes de entregar ao componente StepPlan.
 */

// ── Inputs ────────────────────────────────────────────────────

export interface FileInput {
  name: string;
  extension: string;
  /** Tamanho em bytes — enviado como number (JSON suporta até ~9 PB sem perda para uso prático). */
  sizeBytes: number;
}

export interface ProvidersInput {
  id: string;
}

export interface RequestPlanInput {
  files: FileInput[];
  providers?: ProvidersInput[];
}

// ── Tipos de saída (API raw) ───────────────────────────────────
// Estes tipos representam exactamente o que o backend devolve via JSON.
// Os campos numéricos chegam como strings (BigInt serializado).

export interface ApiChunkPlan {
  chunkIndex: number;
  providerId: string;
  providerName: string;
  /** Byte inicial — string BigInt da API. */
  startByte: string;
  /** Byte final — string BigInt da API. */
  endByte: string;
  /** Tamanho do chunk — string BigInt da API. */
  sizeBytes: string;
  isFragment: boolean;
}

export interface ApiPlacedFile {
  fileName: string;
  /** Tamanho do ficheiro — string BigInt da API. */
  fileSize: string;
  isFragmented: boolean;
  chunks: ApiChunkPlan[];
}

export interface ApiUnplaceableFile {
  fileName: string;
  fileSize: string;
  reason: string;
  missingBytes: string;
  hlsAvailable: boolean;
}

export interface ApiUploadPlan {
  placed: ApiPlacedFile[];
  unplaceable: ApiUnplaceableFile[];
  canProceed: boolean;
  totalBytesUsed: string;
}

