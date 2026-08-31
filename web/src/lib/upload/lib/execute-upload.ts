// Assinatura de upload devolvida pelo BFF /api/upload/sign
interface DriverUploadSignature {
  method: string;
  uploadUrl: string;
  headers?: Record<string, string>;
  formDataFields?: Record<string, string>;
}
import { FilePlanSuccess } from "../upload.types";


interface ExecuteUploadOptions {
    file: File;
    filePlan: FilePlanSuccess;
    userId: string;
    parentId: string | null;
    onProgress: (progress: number, chunksDone: number) => void;
}

/**
 * Executa o fatiamento binário via file.slice() e o upload paralelo/sequencial
 * diretamente do browser para o provider correspondente (S3, GDrive, Telegram).
 */
export async function executeUploadPlan({
    file,
    filePlan,
    userId,
    parentId,
    onProgress
}: ExecuteUploadOptions): Promise<void> {
    const totalChunks = filePlan.chunks.length;
    let chunksDone = 0;

    // Array para monitorizar o progresso individual de cada chunk
    const chunkProgresses = new Array(totalChunks).fill(0);

    const uploadPromises = filePlan.chunks.map(async (chunk, index) => {
        // 1. Fatiamento binário em memória (Não consome RAM extra, cria apontadores blob)
        const blobChunk = file.slice(chunk.startByte, chunk.endByte);

        // 2. Pedir ao BFF uma assinatura/URL temporária de upload para este Driver específico
        const signatureRes = await fetch(`/api/upload/sign`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId,
                providerId: chunk.providerId,
                fileName: filePlan.fileName,
                chunkIndex: chunk.chunkIndex,
                isFragment: filePlan.isFragmented
            })
        });

        if (!signatureRes.ok) {
            throw new Error(`Falha ao obter assinatura para o chunk ${chunk.chunkIndex}`);
        }

        const signature = (await signatureRes.json()) as DriverUploadSignature;

        // 3. Efetuar o Upload Direto via XMLHttpRequest para monitorizar o progresso em tempo real
        await new Promise<void>((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.open(signature.method, signature.uploadUrl, true);

            // Inserir cabeçalhos devolvidos pelo provider (Ex: Authorization Bearer do Drive ou tokens S3)
            if (signature.headers) {
                Object.entries(signature.headers).forEach(([key, val]) => {
                    xhr.setRequestHeader(key, val);
                });
            }

            // Escutar o progresso do upload deste fragmento
            xhr.upload.onprogress = (event) => {
                if (event.lengthComputable) {
                    const percentComplete = (event.loaded / event.total) * 100;
                    chunkProgresses[index] = percentComplete;

                    // Calcular progresso ponderado global do ficheiro completo
                    const totalProgress = chunkProgresses.reduce((a, b) => a + b, 0) / totalChunks;
                    onProgress(Math.round(totalProgress), chunksDone);
                }
            };

            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    chunksDone++;
                    const totalProgress = chunkProgresses.reduce((a, b) => a + b, 0) / totalChunks;
                    onProgress(Math.round(totalProgress), chunksDone);
                    resolve();
                } else {
                    reject(new Error(`Erro HTTP no provider ao carregar fragmento ${chunk.chunkIndex}`));
                }
            };

            xhr.onerror = () => reject(new Error("Erro de rede ao comunicar com o driver."));

            // Trata payloads Multipart/Form-Data (como Google Drive e Cloudinary pedem)
            if (signature.formDataFields) {
                const formData = new FormData();
                Object.entries(signature.formDataFields).forEach(([key, val]) => formData.append(key, val));
                formData.append("file", blobChunk, file.name);
                xhr.send(formData);
            } else {
                // Envio binário puro Octet-Stream (Ex: Telegram ou AWS S3 PUT)
                xhr.send(blobChunk);
            }
        });
    });

    // Aguarda que todos os pedaços completem o upload direto
    await Promise.all(uploadPromises);

    // 4. Gravar o Registo (Node) na base de dados central
    // Executado apenas quando os ficheiros já se encontram salvos de forma segura nos storages
    const registerRes = await fetch("/api/nodes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            userId,
            parentId,
            name: file.name,
            size: String(file.size),
            mimeType: file.type || "application/octet-stream",
            extension: file.name.includes(".") ? file.name.split(".").pop() : "",
            isFragmented: filePlan.isFragmented,
            chunks: filePlan.chunks.map(c => ({
                chunkIndex: c.chunkIndex,
                providerId: c.providerId,
                sizeBytes: String(c.chunkSizeBytes)
            }))
        })
    });

    if (!registerRes.ok) {
        throw new Error("O upload teve sucesso, mas falhou o registo do Node no CloudBase.");
    }
}