"use client";

/**
 * plan.mapper.ts
 *
 * Converte a resposta raw da API (ApiPlacedFile / ApiChunkPlan com strings BigInt)
 * para os tipos editáveis do frontend (FilePlanSuccess / UploadPlanChunk com numbers).
 *
 * Este é o único lugar que sabe dos nomes de campos diferentes entre os dois mundos:
 *   API:      sizeBytes  → Frontend: chunkSizeBytes
 *   API:      (sem providerType) → Frontend: providerType (lookup pelo providers[])
 */

import type {
  ApiPlacedFile,
  ApiUnplaceableFile,
  ApiUploadPlan,
} from "@/lib/features/plans/types";
import type {
  FilePlanSuccess,
  FilePlanUnplaceable,
  UploadPlanChunk,
} from "@/lib/upload/upload.types";
import type { ApiProvider } from "@/lib/features/providers";

/**
 * Converte um `ApiPlacedFile[]` (raw da API) em `FilePlanSuccess[]` (editável pelo UI).
 * Enriquece cada chunk com `providerType` a partir da lista de providers disponíveis.
 */
export function apiPlanToFilePlan(
  placed: ApiPlacedFile[],
  providers: ApiProvider[],
): FilePlanSuccess[] {
  const providerMap = new Map(providers.map((p) => [p.id, p]));

  return placed.map((placedFile): FilePlanSuccess => {
    const chunks: UploadPlanChunk[] = placedFile.chunks.map((chunk) => {
      const provider = providerMap.get(chunk.providerId);
      return {
        chunkIndex: chunk.chunkIndex,
        providerId: chunk.providerId,
        providerName: chunk.providerName,
        providerType: provider?.type ?? "CLOUDINARY", // fallback defensivo
        startByte: Number(chunk.startByte),
        endByte: Number(chunk.endByte),
        chunkSizeBytes: Number(chunk.sizeBytes),
        isFragment: chunk.isFragment,
      };
    });

    return {
      status: "SUCCESS",
      fileName: placedFile.fileName,
      fileSize: Number(placedFile.fileSize),
      isFragmented: placedFile.isFragmented,
      chunks,
    };
  });
}

/**
 * Converte `ApiUnplaceableFile[]` para `FilePlanUnplaceable[]`.
 */
export function apiUnplaceableToFilePlan(
  unplaceable: ApiUnplaceableFile[],
): FilePlanUnplaceable[] {
  return unplaceable.map(
    (u): FilePlanUnplaceable => ({
      status: "UNPLACEABLE",
      fileName: u.fileName,
      fileSize: Number(u.fileSize),
      reason: u.reason,
      missingBytes: Number(u.missingBytes),
    }),
  );
}

/**
 * Converte o plano completo da API.
 * Devolve os ficheiros colocados (editáveis) e os não colocáveis (informativos).
 */
export function mapApiPlan(
  plan: ApiUploadPlan,
  providers: ApiProvider[],
): {
  placed: FilePlanSuccess[];
  unplaceable: FilePlanUnplaceable[];
  canProceed: boolean;
} {
  return {
    placed: apiPlanToFilePlan(plan.placed, providers),
    unplaceable: apiUnplaceableToFilePlan(plan.unplaceable),
    canProceed: plan.canProceed,
  };
}
