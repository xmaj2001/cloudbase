export interface DriverUploadParams {
  file: File;
  folder?: string;
  onProgress: (percentage: number) => void;
}

export interface DriverUploadResult {
  providerFileId: string;
  providerPath: string;
}

export interface IStorageDriver {
  upload(params: DriverUploadParams): Promise<DriverUploadResult>;
}