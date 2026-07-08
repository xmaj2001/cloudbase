"use client";

import { useState, useCallback } from "react";
import { UploadFileProgress, UploadFileStatus } from "../upload.types";
import { ApiDriver } from "@/lib/api/drivers/types";
import { useNodeMutations } from "@/hooks/use-nodes";
import { NodeType } from "@/lib/api/node/types";
import { getStorageDriver } from "@/hooks/drivers/driver.registry";

interface UseUploadProps {
  userId: string;
  parentId: string | null;
  files: File[];
  selectedDrivers: ApiDriver[];
  onComplete?: () => void;
}

export function useUpload({
  userId,
  parentId,
  files,
  selectedDrivers,
  onComplete,
}: UseUploadProps) {
  const [fileProgress, setFileProgress] = useState<UploadFileProgress[]>([]);
  const [isUploadingDone, setIsUploadingDone] = useState(false);

  const { createNode } = useNodeMutations(userId, parentId);

  const updateFileStatus = useCallback(
    (
      fileName: string,
      status: UploadFileStatus,
      progress: number,
      error?: string,
    ) => {
      setFileProgress((prev) =>
        prev.map((f) =>
          f.fileName === fileName ? { ...f, status, progress, error } : f,
        ),
      );
    },
    [],
  );

  const startUpload = useCallback(async () => {
    if (files.length === 0) return;
    setIsUploadingDone(false);

    // Inicializa a UI
    setFileProgress(
      files.map((f) => ({
        fileName: f.name,
        status: "WAITING",
        progress: 0,
        chunksDone: 1,
        chunksTotal: 1,
      })),
    );

    const uploadPromises = files.map(async (file, idx) => {
      const extension = file.name.includes(".")
        ? `.${file.name.split(".").pop()}`
        : "";
      const activeDriverInfo =
        selectedDrivers.length > 0 ? selectedDrivers[0] : null;

      try {
        // Valores de contingência/mock caso nenhum driver seja compatível
        let providerFileId = `fallback-${Date.now()}-${idx}`;
        let providerPath = `/fallback/${file.name}`;

        updateFileStatus(file.name, "UPLOADING", 0);

        // ── ENCONTRAR O DRIVER MODULAR DINAMICAMENTE ──────────────────────
        const driver = activeDriverInfo
          ? getStorageDriver(activeDriverInfo.type)
          : null;

        if (driver && activeDriverInfo) {
          // Executa o upload real independente de qual driver seja (Polimorfismo)
          const result = await driver.upload({
            file,
            driverId: activeDriverInfo.id,
            onProgress: (percentage) => {
              updateFileStatus(file.name, "UPLOADING", percentage);
            },
          });
          providerFileId = result.providerFileId;
          providerPath = result.providerPath;
        } else {
          // Caso não haja driver mapeado (Simulação padrão local)
          await new Promise((res) => setTimeout(res, 500));
          updateFileStatus(file.name, "UPLOADING", 100);
        }

        // Registrar o Nó no NestJS de forma uniforme
        updateFileStatus(file.name, "REGISTERING", 100);

        await createNode.mutateAsync({
          type: NodeType.FILE,
          name: file.name,
          mimeType: file.type || "application/octet-stream",
          extension,
          size: String(file.size),
          driverId: activeDriverInfo?.id,
          providerFileId,
          providerPath,
          parentId,
        });

        updateFileStatus(file.name, "DONE", 100);
      } catch (error: any) {
        console.error(`Erro no ficheiro "${file.name}":`, error);
        updateFileStatus(
          file.name,
          "ERROR",
          100,
          error?.message || "Falha ao processar",
        );
      }
    });

    await Promise.all(uploadPromises);
    setIsUploadingDone(true);
    onComplete?.();
  }, [
    files,
    selectedDrivers,
    userId,
    parentId,
    createNode,
    updateFileStatus,
    onComplete,
  ]);

  return { startUpload, fileProgress, isUploadingDone };
}
