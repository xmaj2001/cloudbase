import { ProviderType } from "../features/providers";
import { IStorageUpload } from "./storage.interface";
import { CloudinaryProvider } from "./providers/cloudinary.provider";

export function getProviderClient(type: ProviderType): IStorageUpload | null {
  const providers: Partial<Record<ProviderType, IStorageUpload>> = {
    CLOUDINARY: new CloudinaryProvider(),
  };

  return providers[type] || null;
}
