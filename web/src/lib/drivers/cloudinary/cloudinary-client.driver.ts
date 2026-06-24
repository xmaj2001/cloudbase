import { useState } from "react";

interface FileInfo {
    uri: string;
    name: string;
    type: string;
}

export function useStorageClient(backendBaseUrl: string = "https://sua-api.com/storage") {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    /**
     * UPLOAD DIRETOR PARA CLOUDINARY (Não consome dados do seu servidor)
     */
    const uploadFileDirectly = async (file: FileInfo, folder: string = "uploads") => {
        setLoading(true);
        setError(null);
        try {
            const timestamp = Math.round(Date.now() / 1000);

            // Passo A: Pedir assinatura segura e credenciais públicas ao NestJS
            //   const sigResponse = await fetch(`${backendBaseUrl}/signature`, {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify({ folder, timestamp }),
            //   });
            //   const { signature, apiKey, cloudName } = await sigResponse.json();
            const { signature, apiKey, cloudName } = {
                signature: "40cc54c0e72492a3a059820f2734842f7eb97675",
                apiKey: "835357729257646",
                cloudName: "dcc3j84w5",
            };

            // Passo B: Preparar o FormData para a Cloudinary
            const formData = new FormData();
            formData.append("file", {
                uri: file.uri,
                name: file.name,
                type: file.type,
            } as any);

            formData.append("api_key", apiKey);
            formData.append("timestamp", timestamp.toString());
            formData.append("folder", folder);
            formData.append("signature", signature);

            // Passo C: Enviar direto para os servidores da Cloudinary
            const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;
            const response = await fetch(cloudinaryUrl, {
                method: "POST",
                body: formData,
                headers: { "Content-Type": "multipart/form-data" },
            });

            const data = await response.json();

            if (data.error) throw new Error(data.error.message);

            // Retorna os dados que você precisa salvar no seu banco local (PostgreSQL/Supabase)
            return {
                id: data.public_id,
                url: data.secure_url,
                name: file.name,
            };
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro no upload direto");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    /**
     * AÇÕES LEVES (Passam pela sua API que gerencia via SDK com o API_SECRET)
     */
    const deleteFile = async (fileId: string) => {
        const response = await fetch(`${backendBaseUrl}/delete`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fileId }),
        });
        return response.json();
    };

    const renameFile = async (fileId: string, newName: string) => {
        const response = await fetch(`${backendBaseUrl}/rename`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fileId, newName }),
        });
        return response.json();
    };

    const moveFile = async (fileId: string, targetFolder: string) => {
        const response = await fetch(`${backendBaseUrl}/move`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fileId, targetFolder }),
        });
        return response.json();
    };

    return { uploadFileDirectly, deleteFile, renameFile, moveFile, loading, error };
}