"use client";

import { useCallback, useState } from "react";
import {
  FilePlanSuccess,
  FilePlanUnplaceable,
  UploadFileProgress,
  UploadFileStatus,
  UploadPlanChunk,
} from "../upload.types";
import type { ApiProvider } from "@/lib/features/providers";
import { planService } from "@/lib/features/plans/plan.service";
import {
  CreateFileChunkInput,
  CreateNodeInput,
  NodeType,
  useNodeMutations,
} from "@/lib/features/nodes";
import { mapApiPlan } from "@/lib/upload/plan.mapper";
import { hashBlobStream } from "../utiles";
import { getProviderClient } from "@/lib/storages/storage.registry";

interface UseUploadProps {
  userId: string;
  parentId: string | null;
  files: File[];
  selectedProviders: ApiProvider[];
  onComplete?: () => void;
}

interface ChunkUploadResult {
  chunk: UploadPlanChunk;
  chunkHash: string;
  providerFileId: string;
  providerPath: string;
}

export function useUpload({
  parentId,
  files,
  selectedProviders,
  onComplete,
}: UseUploadProps) {
  const [fileProgress, setFileProgress] = useState<UploadFileProgress[]>([]);
  const [isUploadingDone, setIsUploadingDone] = useState(false);
  const [isPlanLoading, setIsPlanLoading] = useState(false);
  const [planResult, setPlanResult] = useState<{
    placed: FilePlanSuccess[];
    unplaceable: FilePlanUnplaceable[];
    canProceed: boolean;
  } | null>(null);

  const { create } = useNodeMutations();

  const updateFileStatus = useCallback(
    (
      fileName: string,
      status: UploadFileStatus,
      progress: number,
      extra?: Partial<
        Pick<UploadFileProgress, "error" | "chunksDone" | "chunksTotal">
      >,
    ) => {
      setFileProgress((prev) =>
        prev.map((f) =>
          f.fileName === fileName ? { ...f, status, progress, ...extra } : f,
        ),
      );
    },
    [],
  );

  // ── Fase 1 — Pedir o plano ao backend e converter para tipos editáveis ──────
  const fetchPlan = useCallback(async () => {
    setIsPlanLoading(true);
    setPlanResult(null);
    try {
      const apiPlan = await planService.createPlan({
        files: files.map((f) => ({
          name: f.name,
          extension: f.name.includes(".") ? f.name.split(".").pop()! : "",
          sizeBytes: f.size,
        })),
        providers: selectedProviders.map((p) => ({ id: p.id })),
      });

      const mapped = mapApiPlan(apiPlan, selectedProviders);
      console.log("plan", mapped);
      setPlanResult(mapped);
      setIsPlanLoading(false);
      return mapped;
    } catch (error) {
      console.error("Failed to fetch plan:", error);
      throw error;
    } finally {
      setIsPlanLoading(false);
    }
  }, [files, selectedProviders]);

  // ── Fase 2 — Upload real a partir do plano editável (FilePlanSuccess[]) ─────
  const uploadPlacedFile = useCallback(
    async (
      file: File,
      placed: FilePlanSuccess,
    ): Promise<{ originalHash: string; chunks: ChunkUploadResult[] }> => {
      const chunksTotal = placed.chunks.length;
      const totalBytes = placed.fileSize;

      updateFileStatus(file.name, "UPLOADING", 0, {
        chunksDone: 0,
        chunksTotal,
      });

      const originalHash = await hashBlobStream(file);

      let bytesDoneAcrossChunks = 0;
      const results: ChunkUploadResult[] = [];

      for (const chunk of placed.chunks) {
        const providerInfo = selectedProviders.find(
          (p) => p.id === chunk.providerId,
        );
        if (!providerInfo) {
          throw new Error(
            `Provider "${chunk.providerName}" não encontrado entre os selecionados.`,
          );
        }

        const provider = getProviderClient(providerInfo.type);
        if (!provider) {
          throw new Error(
            `Nenhum connector implementado para o provider "${chunk.providerName}".`,
          );
        }

        const blob = placed.isFragmented
          ? file.slice(chunk.startByte, chunk.endByte)
          : file;

        const chunkHash = placed.isFragmented
          ? await hashBlobStream(blob)
          : originalHash;

        const chunkSizeBytes = chunk.chunkSizeBytes;

        const result = await provider.upload({
          file: blob as File,
          providerId: chunk.providerId,
          onProgress: (percentage) => {
            const chunkBytesDone = (percentage / 100) * chunkSizeBytes;
            const aggregate = Math.round(
              ((bytesDoneAcrossChunks + chunkBytesDone) / totalBytes) * 100,
            );
            updateFileStatus(file.name, "UPLOADING", aggregate, {
              chunksTotal,
            });
          },
        });

        bytesDoneAcrossChunks += chunkSizeBytes;
        results.push({ chunk, chunkHash, ...result });

        updateFileStatus(
          file.name,
          "UPLOADING",
          Math.round((bytesDoneAcrossChunks / totalBytes) * 100),
          { chunksDone: results.length, chunksTotal },
        );
      }

      return { originalHash, chunks: results };
    },
    [selectedProviders, updateFileStatus],
  );

  // ── Fase 3 — Registar o nó no backend ──────────────────────────────────────
  const registerNode = useCallback(
    async (
      file: File,
      placed: FilePlanSuccess,
      originalHash: string,
      results: ChunkUploadResult[],
    ) => {
      updateFileStatus(file.name, "REGISTERING", 100);

      const extension = file.name.includes(".")
        ? `.${file.name.split(".").pop()}`
        : "";

      if (!placed.isFragmented) {
        const [only] = results;
        const input: CreateNodeInput = {
          name: file.name,
          type: NodeType.FILE,
          mimeType: file.type || "application/octet-stream",
          extension,
          size: String(file.size),
          isFragmented: false,
          totalChunks: 1,
          originalHash,
          providerId: only.chunk.providerId,
          providerFileId: only.providerFileId,
          providerPath: only.providerPath,
          parentId,
        };
        await create.mutateAsync(input);
        return;
      }

      const chunks: CreateFileChunkInput[] = results.map((r) => ({
        chunkIndex: r.chunk.chunkIndex,
        size: r.chunk.chunkSizeBytes,
        startByte: r.chunk.startByte,
        endByte: r.chunk.endByte,
        chunkHash: r.chunkHash,
        providerId: r.chunk.providerId,
        providerFileId: r.providerFileId,
        providerPath: r.providerPath,
      }));

      const input: CreateNodeInput = {
        name: file.name,
        type: NodeType.FILE,
        mimeType: file.type || "application/octet-stream",
        extension,
        size: String(file.size),
        isFragmented: true,
        totalChunks: chunks.length,
        originalHash,
        providerId: results[0].chunk.providerId,
        parentId,
        chunks,
      };
      await create.mutateAsync(input);
    },
    [create, parentId, updateFileStatus],
  );

  // ── startUpload — executa a partir do plano editável ───────────────────────
  const startUpload = useCallback(
    async (plan: FilePlanSuccess[]) => {
      if (plan.length === 0) return;
      setIsUploadingDone(false);

      setFileProgress(
        files.map((f) => ({
          fileName: f.name,
          status: "WAITING" as UploadFileStatus,
          progress: 0,
          chunksDone: 0,
          chunksTotal: 1,
        })),
      );

      try {
        await Promise.all(
          plan.map(async (placed) => {
            const file = files.find((f) => f.name === placed.fileName);
            if (!file) return;

            try {
              const { originalHash, chunks } = await uploadPlacedFile(
                file,
                placed,
              );
              await registerNode(file, placed, originalHash, chunks);
              updateFileStatus(file.name, "DONE", 100);
            } catch (error: unknown) {
              const msg =
                error instanceof Error ? error.message : "Falha ao processar";
              console.error(`Erro no ficheiro "${file.name}":`, error);
              updateFileStatus(file.name, "ERROR", 100, { error: msg });
            }
          }),
        );
      } finally {
        setIsUploadingDone(true);
        onComplete?.();
      }
    },
    [files, uploadPlacedFile, registerNode, updateFileStatus, onComplete],
  );

  return {
    fetchPlan,
    startUpload,
    planResult,
    isPlanLoading,
    fileProgress,
    isUploadingDone,
  };
}
