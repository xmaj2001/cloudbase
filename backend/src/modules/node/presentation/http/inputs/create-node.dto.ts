import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsInt,
  Min,
} from 'class-validator';

export class CreateNodeLocationDto {
  @ApiProperty({ example: 'a1b2c3d4-...' })
  @IsString()
  driverId: string;

  @ApiProperty({ example: '1A2b3C4d5E6f...' })
  @IsString()
  providerFileId: string;

  @ApiProperty({ example: 'CloudBase/document.pdf' })
  @IsString()
  providerPath: string;
}

export class CreateNodeDto {
  @ApiProperty({
    example: 'document.pdf',
    description: 'Nome do ficheiro ou pasta',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
    example: 'application/pdf',
    description: 'MimeType do ficheiro (Apenas para tipo FILE)',
  })
  @IsString()
  @IsOptional()
  mimeType?: string;

  @ApiPropertyOptional({
    example: '.pdf',
    description: 'Extensão do ficheiro (Apenas para tipo FILE)',
  })
  @IsString()
  @IsOptional()
  extension?: string;

  @ApiPropertyOptional({
    example: 1048576,
    description: 'Tamanho em bytes (Apenas para tipo FILE)',
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  size?: number;

  @ApiPropertyOptional({
    example: 'parent-id-a1b2',
    description: 'ID da pasta ou grupo pai (null para root)',
  })
  @IsString()
  @IsOptional()
  parentId?: string;

  @ApiPropertyOptional({
    type: [String],
    example: ['trabalho', 'finanças'],
    description: 'Tags associadas ao ficheiro',
  })
  @IsArray()
  @IsOptional()
  tags?: string[];
}

export class CreateFileNodeDto extends CreateNodeDto {
  @ApiProperty({ type: CreateNodeLocationDto })
  location: CreateNodeLocationDto;
}

export class CreateFolderNodeDto extends CreateNodeDto {
  @ApiProperty({ type: CreateNodeLocationDto })
  location: CreateNodeLocationDto;
}

export class CreateGroupNodeDto extends CreateNodeDto {}
