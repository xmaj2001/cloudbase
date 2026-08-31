export interface StorageUploadParams {
  file: File;
  providerId: string;
  folder?: string;
  onProgress: (percentage: number) => void;
}

export interface StorageUploadResult {
  providerFileId: string;
  providerPath: string;
}

export interface IStorageUpload {
  upload(params: StorageUploadParams): Promise<StorageUploadResult>;
}
