import { useState } from "react";
import CryptoJS from "crypto-js";
interface FileInfo {
  uri: string;
  name: string;
  type: string;
  rawFile?: File; // Adicionado para facilitar a leitura no browser se necessário
}

export function useCloudinaryDriver(
  backendBaseUrl: string = "https://sua-api.com/storage",
) {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState<number>(0); // Progresso real (0 a 100)
  const [error, setError] = useState<string | null>(null);

  const uploadFileDirectly = async (
    file: FileInfo,
    folder: string = "uploads",
  ): Promise<any> => {
    setLoading(true);
    setProgress(0);
    setError(null);

    return new Promise((resolve, reject) => {
      try {
        const timestamp = Math.round(Date.now() / 1000);

        // Passo A: Pedir assinatura segura e credenciais públicas ao NestJS

        // const sigResponse = await fetch(`${backendBaseUrl}/signature`, {

        // method: "POST",

        // headers: { "Content-Type": "application/json" },

        // body: JSON.stringify({ folder, timestamp }),

        // });

        // const { signature, apiSecret, apiKey, cloudName } = await sigResponse.json();

        // 1. Criar a string to sign exatamente como a Cloudinary exige (Ordem alfabética dos parâmetros)
        const secret = "AhDY5p_fIyv8LGsO5JT7d6P9chQ"; // Substitua pelo seu segredo real
        const stringToSign = `folder=${folder}&timestamp=${timestamp}${secret}`;

        // 2. Gerar o hash SHA-1 real que a API espera
        const { signature, apiSecret, apiKey, cloudName } = {
          signature:  CryptoJS.SHA1(stringToSign).toString(),
          apiSecret: secret,
          apiKey: "498163631413899",

          cloudName: "rrfs6rwb",
        };

        const formData = new FormData();
        // Se passarmos o File nativo do browser, o upload é mais seguro na Web
        formData.append("file", file.rawFile ? file.rawFile : (file as any));
        formData.append("api_key", apiKey);
        formData.append("timestamp", timestamp.toString());
        formData.append("folder", folder);
        formData.append("signature", signature);

        const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;

        // ── Usar XMLHttpRequest para obter Progresso Real ──────────────────
        const xhr = new XMLHttpRequest();
        xhr.open("POST", cloudinaryUrl, true);

        // Ouvinte do progresso de upload real
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percentage = Math.round((event.loaded / event.total) * 100);
            setProgress(percentage);
          }
        };

        // Resposta do servidor
        xhr.onload = () => {
          const responseData = JSON.parse(xhr.responseText);
          if (xhr.status >= 200 && xhr.status < 300) {
            if (responseData.error) {
              reject(new Error(responseData.error.message));
            } else {
              resolve({
                id: responseData.public_id,
                url: responseData.secure_url,
                name: file.name,
              });
            }
          } else {
            reject(
              new Error(
                responseData.error?.message || "Erro na resposta da Cloudinary",
              ),
            );
          }
        };

        xhr.onerror = () =>
          reject(new Error("Erro de rede ao conectar à Cloudinary"));

        // Disparar o upload
        xhr.send(formData);
      } catch (err) {
        reject(err);
      }
    })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Erro no upload direto");
        throw err;
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { uploadFileDirectly, loading, progress, error };
}
