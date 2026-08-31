import CryptoJS from "crypto-js";
import {
  ConnectorUploadParams,
  ConnectorUploadResult,
  IStorageConnector,
} from "../connector.interface";
import type { CloudinaryCredentials } from "@/api/drivers";
import { providerService } from "../../provider.service";

export class CloudinaryConnector implements IStorageConnector {
  async upload({
    file,
    providerId,
    folder = "cloudbase_teste",
    onProgress,
  }: ConnectorUploadParams): Promise<ConnectorUploadResult> {
    // 1. Vai buscar as credenciais de forma segura através do BFF em Runtime
    const credentials = (await 
      providerService.getCredentials(
      providerId,
    )) as CloudinaryCredentials;

    console.log("Credenciais Cloudinary recebidas:", credentials);
    if (!credentials.apiKey || !credentials.apiSecret || !credentials.cloudName) {
      throw new Error("Credenciais do Cloudinary inválidas ou incompletas.");
    }

    return new Promise((resolve, reject) => {
      const timestamp = Math.round(Date.now() / 1000);

      // 2. Assina o upload usando as credenciais dinâmicas e frescas recebidas
      const stringToSign = `folder=${folder}&timestamp=${timestamp}${credentials.apiSecret}`;
      const signature = CryptoJS.SHA1(stringToSign).toString();

      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", credentials.apiKey);
      formData.append("timestamp", timestamp.toString());
      formData.append("folder", folder);
      formData.append("signature", signature);

      // 3. Aponta dinamicamente para o bucket correto usando o cloudName retornado
      const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${credentials.cloudName}/auto/upload`;

      const xhr = new XMLHttpRequest();
      xhr.open("POST", cloudinaryUrl, true);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentage = Math.round((event.loaded / event.total) * 100);
          onProgress(percentage);
        }
      };

      xhr.onload = () => {
        const responseData = JSON.parse(xhr.responseText);
        if (xhr.status >= 200 && xhr.status < 300 && !responseData.error) {
          resolve({
            providerFileId: responseData.public_id,
            providerPath: responseData.secure_url,
          });
        } else {
          reject(new Error(responseData.error?.message || "Erro Cloudinary"));
        }
      };

      xhr.onerror = () => reject(new Error("Erro de rede Cloudinary"));
      xhr.send(formData);
    });
  }
}
