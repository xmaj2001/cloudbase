/**
 * Tipos da feature `nodes`.
 * Espelha o schema Prisma e os contratos do NestJS (cbb/src/modules/nodes/).
 */

// ── ENUMS ──────────────────────────────────────────────────────────────────────

export enum NodeType {
  FILE = "FILE",
  FOLDER = "FOLDER",
}

// ── MODELOS DA API ─────────────────────────────────────────────────────────────

/**
 * Referência resumida a um provider.
 * Presente no detalhe de um node (GET /api/nodes/:id).
 */
export interface NodeProviderRef {
  id: string;
  displayName: string;
  type: string;
}

/**
 * Um chunk (fragmento) de um ficheiro fragmentado.
 * Presente apenas no detalhe de um node (GET /api/nodes/:id).
 */
export interface ApiFileChunk {
  id: string;
  nodeId: string;
  chunkIndex: number;
  /** Tamanho em bytes (string BigInt vindo do Prisma). */
  size: string;
  startByte: string;
  endByte: string;
  chunkHash: string;
  providerId: string;
  providerFileId: string | null;
  providerPath: string;
  Provider: NodeProviderRef | null;
}

/**
 * Node como vem na **listagem** (GET /api/nodes?parentId=...).
 * Inclui `_count` com o número de filhos e chunks.
 * Não inclui `fileChunks` nem o `Provider` completo.
 */
export interface ApiNode {
  id: string;
  userId: string;
  name: string;
  type: NodeType;
  mimeType: string | null;
  extension: string | null;
  /** Tamanho em bytes (string BigInt). `null` para pastas. */
  size: string | null;
  isFragmented: boolean;
  totalChunks: number;
  originalHash: string | null;
  providerId: string;
  providerFileId: string | null;
  providerPath: string;
  parentId: string | null;
  trashedAt: string | null;
  createdAt: string;
  updatedAt: string;
  _count: {
    children: number;
    fileChunks: number;
  };
}

/**
 * Node com detalhes completos — chunks e provider incluídos.
 * Só vem via GET /api/nodes/:id.
 */
export interface ApiNodeDetail extends Omit<ApiNode, "_count"> {
  Provider: NodeProviderRef | null;
  fileChunks: ApiFileChunk[];
}

// ── INPUTS ─────────────────────────────────────────────────────────────────────

export interface CreateFileChunkInput {
  chunkIndex: number;
  size: string | number;
  startByte: string | number;
  endByte: string | number;
  chunkHash: string;
  providerId: string;
  providerFileId?: string;
  providerPath?: string;
}

/**
 * Payload para criar um node (ficheiro ou pasta).
 * Para ficheiros fragmentados, incluir o array `chunks`.
 */
export interface CreateNodeInput {
  name: string;
  type: NodeType;
  mimeType?: string;
  extension?: string;
  size?: string | number;
  isFragmented?: boolean;
  totalChunks?: number;
  originalHash?: string;
  providerId: string;
  providerFileId?: string;
  providerPath?: string;
  parentId?: string | null;
  chunks?: CreateFileChunkInput[];
}
