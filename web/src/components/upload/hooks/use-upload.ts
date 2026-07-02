"use client";

import { useState, useCallback } from "react";
import { UploadFileProgress, UploadFileStatus } from "../upload.types";
import { ApiDriver } from "@/lib/api/drivers/types";
import { useNodeMutations } from "@/hooks/use-nodes";
import { NodeType } from "@/lib/api/node/types";

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

  const { createFile } = useNodeMutations(userId, parentId);

  // ── Auxiliar para atualizar o estado de um ficheiro específico ─────────────
  const updateFileStatus = useCallback(
    (fileName: string, status: UploadFileStatus, progress: number, error?: string) => {
      setFileProgress((prev) =>
        prev.map((f) =>
          f.fileName === fileName
            ? { ...f, status, progress, error }
            : f
        )
      );
    },
    []
  );

  // ── Inicializa a lista de progresso antes de começar ──────────────────────
  const resetUploadState = useCallback(() => {
    setFileProgress([]);
    setIsUploadingDone(false);
  }, []);

  // ── Função Principal de Upload (Directo e Sequencial/Paralelo) ────────────
  const startUpload = useCallback(async () => {
    if (files.length === 0) return;

    setIsUploadingDone(false);

    // 1. Prepara o estado inicial de todos os ficheiros como 'WAITING'
    const initialProgress = files.map((file) => ({
      fileName: file.name,
      status: "WAITING" as UploadFileStatus,
      progress: 0,
      chunksDone: 1,
      chunksTotal: 1, // upload simples direto não tem múltiplos chunks
    }));
    setFileProgress(initialProgress);

    // 2. Mapeia a execução individual de cada ficheiro
    const uploadPromises = files.map(async (file, idx) => {
      const extension = file.name.includes(".")
        ? (file.name.split(".").pop() ?? "")
        : "";
      // TODO: Aqui depois temos que verficar se foi selecionado mais de um driver ele deve requesitar um plano de upload.
      const driverId = selectedDrivers.length > 0 ? selectedDrivers[0].id : undefined;

      try {
        // Passo A: Simula o Envio (Uploading)
        updateFileStatus(file.name, "UPLOADING", 20);
        
        // Simulação rápida de progresso para dar feedback visual fluido na UI
        await new Promise((res) => setTimeout(res, 400));
        updateFileStatus(file.name, "UPLOADING", 60);
        await new Promise((res) => setTimeout(res, 300));
        updateFileStatus(file.name, "UPLOADING", 100);

        // Passo B: A Registar no Sistema (Database mutation)
        updateFileStatus(file.name, "REGISTERING", 100);

        await createFile.mutateAsync({
          userId,
          type: NodeType.FILE,
          name: file.name,
          mimeType: file.type || "application/octet-stream",
          extension,
          size: String(file.size), // Preserva a precisão de números grandes
          location: {
            driverId: driverId,
            providerFileId: `pending-${Date.now()}-${idx}`,
            providerPath: `/CloudBase/${file.name}`,
          },
          parentId,
        });

        // Passo C: Concluído com sucesso
        updateFileStatus(file.name, "DONE", 100);
        console.log(`Node "${file.name}" guardado e registado.`);
      } catch (error: any) {
        console.error(`Erro ao processar ficheiro "${file.name}":`, error);
        updateFileStatus(
          file.name,
          "ERROR",
          100,
          error?.message || "Falha ao registar no servidor"
        );
      }
    });

    // Aguarda que todos os uploads terminem (seja em sucesso ou erro)
    await Promise.all(uploadPromises);
    
    setIsUploadingDone(true);
    onComplete?.();
  }, [files, selectedDrivers, userId, parentId, createFile, updateFileStatus, onComplete]);

  return {
    startUpload,
    fileProgress,
    isUploadingDone,
    resetUploadState,
  };
}