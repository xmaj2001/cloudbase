import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type, Transform } from "class-transformer";
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from "class-validator";

// Custom decorator para validar e permitir BigInt no class-validator
export function IsBigInt(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: "isBigInt",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return (
            typeof value === "bigint" ||
            typeof value === "number" ||
            (typeof value === "string" && !isNaN(Number(value)))
          );
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} deve ser um valor numérico válido ou BigInt`;
        },
      },
    });
  };
}

export class FileInputDto {
  @ApiProperty({ example: "video.mp4" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: "mp4" })
  @IsString()
  @IsNotEmpty()
  extension: string;

  @ApiProperty({
    example: 10737418240,
    description: "Tamanho em bytes (BigInt)",
  })
  @IsNotEmpty()
  @IsBigInt()
  @Transform(({ value }: { value: string | number | bigint }) => BigInt(value))
  sizeBytes: bigint;
}

export class ProviderInputDto {
  @ApiProperty({ example: "uuid-do-provider" })
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class RequestPlanInputDto {
  @ApiProperty({ type: [FileInputDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FileInputDto)
  files: FileInputDto[];

  @ApiPropertyOptional({ type: [ProviderInputDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProviderInputDto)
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
  userId: string; // ← adicionar userId
  files: FileInput[];
  providers?: ProvidersInput[]; // vazio = usa todos os providers
}

// ── Tipos de saída ────────────────────────────────────────────

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
  hlsAvailable: boolean; // true se for vídeo/áudio — HLS pode resolver
}

export interface UploadPlan {
  placed: PlacedFile[];
  unplaceable: UnplaceableFile[];
  canProceed: boolean; // true se pelo menos 1 ficheiro pode ser enviado
  totalBytesUsed: bigint; // total de espaço que vai ser consumido
}
