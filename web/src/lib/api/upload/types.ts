// ─── Upload Plan Types ─────────────────────────────────────────────────────

/** Um ficheiro enviado pelo cliente para pedir o plano. */
export interface UploadPlanFile {
  name: string;
  size: number;      // em bytes
  extension: string;
}

/** Pedido POST /api/upload/plan */
export interface UploadPlanRequest {
  userId: string;
  files: UploadPlanFile[];
  selectedDriverIds?: string[];  // opcional: se omitido o BFF usa todos os drivers do user
}

/** Um chunk (pedaço) de um ficheiro dentro do plano. */
export interface UploadPlanChunk {
  driverId: string;
  driverName: string;
  driverType: string;   // ex: "GOOGLE_DRIVE"
  startByte: number;
  endByte: number;
  chunkIndex: number;
  chunkSizeBytes: number;
  /** true se este chunk é apenas uma parte de um ficheiro fragmentado. */
  isFragment: boolean;
}

/** Plano de um ficheiro individual dentro da resposta. */
export interface FilePlan {
  fileName: string;
  fileSize: number;
  /** true quando o ficheiro precisou ser dividido em vários chunks. */
  isFragmented: boolean;
  chunks: UploadPlanChunk[];
}

/** Resposta do BFF /api/upload/plan */
export interface UploadPlanResponse {
  plan: FilePlan[];
  /** Mensagem de erro se o espaço for insuficiente. */
  error?: string;
}


// Resposta com chaves ou tokens e caminhos para onde fazer o upload direto no provider
export interface DriverUploadSignature {
  uploadUrl: string;       // URL direto (Ex: S3 Presigned URL ou endpoint de chunk do Telegram)
  method: 'POST' | 'PUT';
  headers?: Record<string, string>;
  formDataFields?: Record<string, string>; // Usado em uploads via form-data (como Google Drive/Cloudinary)
  providerFileId: string;
}