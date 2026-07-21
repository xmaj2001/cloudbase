import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsInt,
  IsPositive,
  IsString,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class FileItemDto {
  @ApiProperty({
    example: 'foto_praia.jpg',
    description: 'Nome original do ficheiro.',
  })
  @IsString()
  fileName: string;

  @ApiProperty({
    example: 5242880,
    description: 'Tamanho do ficheiro em bytes (ex: 5 MB).',
  })
  @IsInt()
  @IsPositive()
  fileSize: number;

  @ApiProperty({
    example: 'image/jpeg',
    description: 'MimeType oficial do ficheiro.',
  })
  @IsString()
  mimeType: string;
}

export class CreatePlanDto {
  @ApiProperty({
    type: [FileItemDto],
    description:
      'Lista de ficheiros para os quais o plano de fragmentação será gerado.',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FileItemDto)
  files: FileItemDto[];

  @ApiProperty({
    example: ['a7b35a50-54f1-4a5e-bd56-b68a73fdfa97'],
    description:
      'OPCIONAL. Drivers específicos a usar para este lote. Se omitido, usa todos os ativos.',
    type: [String],
    required: false,
  })
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  driverIds?: string[];
}
