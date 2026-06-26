import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsInt,
  Min,
  IsEnum,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { NodeType } from 'src/modules/node/domain/enums/node-type.enum';

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

  @ApiProperty({
    example: NodeType.FILE,
    description: `Os tipos de nó suportados são: ${Object.values(NodeType).join(', ')}`,
    enum: NodeType,
  })
  @IsEnum(NodeType)
  @IsNotEmpty()
  type: NodeType;

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

  @ApiPropertyOptional({
    type: CreateNodeLocationDto,
    description: 'Localização do ficheiro (Apenas para tipo FILE e FOLDER)',
  })
  @ValidateIf((o) => o.type === NodeType.FILE || o.type === NodeType.FOLDER)
  @ValidateNested()
  @Type(() => CreateNodeLocationDto)
  @IsOptional()
  location?: CreateNodeLocationDto;
}


export class CreateFileNodeDto extends CreateNodeDto { }

export class CreateFolderNodeDto extends CreateNodeDto { }

export class CreateGroupNodeDto extends CreateNodeDto { }
