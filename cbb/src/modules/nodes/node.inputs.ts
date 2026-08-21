import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from "class-validator";
import { NodeType } from "src/generated/prisma/enums";

export class CreateNodeDto {
  @ApiProperty({
    example: "documento.pdf",
    description: "Nome do ficheiro ou pasta",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ enum: NodeType, example: NodeType.FILE })
  @IsEnum(NodeType)
  type: NodeType;

  @ApiPropertyOptional({ example: "application/pdf" })
  @IsString()
  @IsOptional()
  mimeType?: string;

  @ApiPropertyOptional({ example: "pdf" })
  @IsString()
  @IsOptional()
  extension?: string;

  @ApiPropertyOptional({
    example: "52428800",
    description: "Tamanho em bytes (String ou Number)",
  })
  @IsOptional()
  size?: string | number;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  isFragmented?: boolean;

  @ApiPropertyOptional({ example: 1 })
  @IsInt()
  @Min(1)
  @IsOptional()
  totalChunks?: number;

  @ApiPropertyOptional({ example: "a1b2c3d4..." })
  @IsString()
  @IsOptional()
  originalHash?: string;

  @ApiProperty({ example: "1f4885e4-ea54-499c-8612-9b5a26f066d5" })
  @IsUUID()
  providerId: string;

  @ApiPropertyOptional({ example: "gdrive_file_id_123" })
  @IsString()
  @IsOptional()
  providerFileId?: string;

  @ApiPropertyOptional({ example: "CloudBase/" })
  @IsString()
  @IsOptional()
  providerPath?: string;

  @ApiPropertyOptional({
    description: "ID da pasta pai, se estiver dentro de uma diretoria",
  })
  @IsUUID()
  @IsOptional()
  parentId?: string;
}

export class CreateFileChunkDto {
  @IsInt()
  @Min(0)
  chunkIndex: number;

  @IsNotEmpty()
  size: string | number;

  @IsNotEmpty()
  startByte: string | number;

  @IsNotEmpty()
  endByte: string | number;

  @IsString()
  @IsNotEmpty()
  chunkHash: string;

  @IsUUID()
  providerId: string;

  @IsString()
  @IsOptional()
  providerFileId?: string;

  @IsString()
  @IsOptional()
  providerPath?: string;
}

export class CreateNodeWithChunksDto extends CreateNodeDto {
  @ApiPropertyOptional({ type: [CreateFileChunkDto] })
  @IsOptional()
  chunks?: CreateFileChunkDto[];
}
