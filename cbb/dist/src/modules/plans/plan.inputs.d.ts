import { ValidationOptions } from "class-validator";
export declare function IsBigInt(validationOptions?: ValidationOptions): (object: object, propertyName: string) => void;
export declare class FileInputDto {
    name: string;
    extension: string;
    sizeBytes: bigint;
}
export declare class ProviderInputDto {
    id: string;
}
export declare class RequestPlanInputDto {
    files: FileInputDto[];
    providers?: ProviderInputDto[];
}
export interface FileInput {
    name: string;
    extension: string;
    sizeBytes: bigint;
}
export interface ProvidersInput {
    id: string;
}
export interface RequestPlanInput {
    userId: string;
    files: FileInput[];
    providers?: ProvidersInput[];
}
export interface ChunkPlan {
    chunkIndex: number;
    providerId: string;
    providerName: string;
    startByte: bigint;
    endByte: bigint;
    sizeBytes: bigint;
    isFragment: boolean;
}
export interface PlacedFile {
    fileName: string;
    fileSize: bigint;
    isFragmented: boolean;
    chunks: ChunkPlan[];
}
export interface UnplaceableFile {
    fileName: string;
    fileSize: bigint;
    reason: string;
    missingBytes: bigint;
    hlsAvailable: boolean;
}
export interface UploadPlan {
    placed: PlacedFile[];
    unplaceable: UnplaceableFile[];
    canProceed: boolean;
    totalBytesUsed: bigint;
}
