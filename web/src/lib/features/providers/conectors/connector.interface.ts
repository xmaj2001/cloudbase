export interface ConnectorUploadParams {
  file: File;
  providerId: string;
  folder?: string;
  onProgress: (percentage: number) => void;
}

export interface ConnectorUploadResult {
  providerFileId: string;
  providerPath: string;
}

export interface IStorageConnector {
  upload(params: ConnectorUploadParams): Promise<ConnectorUploadResult>;
}
