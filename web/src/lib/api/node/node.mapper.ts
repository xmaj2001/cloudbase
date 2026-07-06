import { ApiNode, NodeType, NodeStatus } from "./types";

// Função para tratar as datas estranhas {} vindas do backend
const parseBackendDate = (dateField: any): string | null => {
  if (!dateField) return null;
  // Se veio como um objeto vazio {} do backend
  if (typeof dateField === 'object' && Object.keys(dateField).length === 0) {
    return new Date().toISOString(); // ou null, dependendo se queres dar um fallback
  }
  return String(dateField);
};

export const mapBackendNodeToApiNode = (raw: any): ApiNode => {
  return {
    id: raw.id,
    userId: raw.userId,
    type: raw.type as NodeType,
    name: raw.name,
    mimeType: raw.mimeType,
    extension: raw.extension,
    size: raw.size, // Já vem como string do backend graças ao teu Prisma Extension
    parentId: raw.parentId,
    status: raw.status as NodeStatus,
    errorCount: raw.errorCount ?? 0,
    lastErrorAt: parseBackendDate(raw.lastErrorAt),
    lastCheckedAt: parseBackendDate(raw.lastCheckedAt),
    expiresAt: parseBackendDate(raw.expiresAt),
    tags: raw.tags ?? [],
    thumbnailUrl: raw.thumbnailUrl,
    createdAt: parseBackendDate(raw.createdAt) || new Date().toISOString(),
    updatedAt: parseBackendDate(raw.updatedAt) || new Date().toISOString(),

    // Arrumação do NodeLocationDto
    location: raw.driverId ? {
      driverId: raw.driverId,
      providerName: raw.providerName ?? 'Unknown', // Garante fallback se não vier do back
      providerFileId: raw.providerFileId,
      providerPath: raw.providerPath,
      providerCreatedAt: parseBackendDate(raw.providerCreatedAt) || '',
      providerUpdatedAt: parseBackendDate(raw.providerUpdatedAt) || '',
    } : null,

    // Arrumação do NodeFragmentationDto
    fragmentation: {
      isFragmented: raw.isFragmented ?? false,
      totalChunks: raw.totalChunks ?? 1,
      originalHash: raw.originalHash,
    },

    // Arrumação do NodeTrashDto
    trash: {
      trashedAt: parseBackendDate(raw.trashedAt),
      permanentDeleteAt: parseBackendDate(raw.permanentDeleteAt),
    },

    // Arrumação do NodeAiMetadataDto
    aiMetadata: {
      classified: raw.aiClassified ?? false,
      category: raw.aiCategory ?? '',
      confidence: raw.aiConfidence ?? 0,
      summary: raw.aiSummary,
    },
  };
};