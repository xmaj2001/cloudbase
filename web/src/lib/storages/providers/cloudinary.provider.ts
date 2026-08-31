import axios from "axios";
import CryptoJS from "crypto-js";
import {
  IStorageUpload,
  StorageUploadParams,
  StorageUploadResult,
} from "../storage.interface";
import {
  CloudinaryCredentials,
  providerService,
} from "@/lib/features/providers";

export class CloudinaryProvider implements IStorageUpload {
  async upload({
    file,
    providerId,
    folder = "CloudBase/",
    onProgress,
  }: StorageUploadParams): Promise<StorageUploadResult> {
    const credentials = (await providerService.getCredentials(
      providerId,
    )) as CloudinaryCredentials;

    if (
      !credentials.apiKey ||
      !credentials.apiSecret ||
      !credentials.cloudName
    ) {
      throw new Error("Credenciais do Cloudinary inválidas ou incompletas.");
    }

    // TODO: mover a assinatura para o backend
    // O apiSecret nunca deve ser exposto no cliente em produção
    // Backend deve expor um endpoint POST /providers/:id/sign
    // que recebe { folder, timestamp } e devolve { signature }
    const timestamp = Math.round(Date.now() / 1000);
    const stringToSign = `folder=${folder}&timestamp=${timestamp}${credentials.apiSecret}`;
    const signature = CryptoJS.SHA1(stringToSign).toString();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", credentials.apiKey);
    formData.append("timestamp", String(timestamp));
    formData.append("folder", folder);
    formData.append("signature", signature);

    const { data } = await axios.post(
      `https://api.cloudinary.com/v1_1/${credentials.cloudName}/auto/upload`,
      formData,
      {
        onUploadProgress: (event) => {
          if (event.total) {
            onProgress(Math.round((event.loaded / event.total) * 100));
          }
        },
      },
    );

    return {
      providerFileId: data.public_id,
      providerPath: data.secure_url,
    };
  }
}
