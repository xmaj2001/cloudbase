import CryptoJS from "crypto-js";
import { DriverUploadParams, DriverUploadResult, IStorageDriver } from "../driver.interface";

export class CloudinaryDriver implements IStorageDriver {
  async upload({ file, folder = "cloudbase_teste", onProgress }: DriverUploadParams): Promise<DriverUploadResult> {
    return new Promise((resolve, reject) => {
      const timestamp = Math.round(Date.now() / 1000);
      const secret = "AhDY5p_fIyv8LGsO5JT7d6P9chQ"; // O teu segredo dinâmico ou estático
      
      const stringToSign = `folder=${folder}&timestamp=${timestamp}${secret}`;
      const signature = CryptoJS.SHA1(stringToSign).toString();

      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", "498163631413899");
      formData.append("timestamp", timestamp.toString());
      formData.append("folder", folder);
      formData.append("signature", signature);

      const cloudinaryUrl = `https://api.cloudinary.com/v1_1/rrfs6rwb/auto/upload`;
      const xhr = new XMLHttpRequest();
      
      xhr.open("POST", cloudinaryUrl, true);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentage = Math.round((event.loaded / event.total) * 100);
          onProgress(percentage); // Dispara o callback real para a UI
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