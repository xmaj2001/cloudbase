import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  IsArray,
} from 'class-validator';
import { NodeType, FileStatus } from 'src/generated/prisma/client';

export class CreateNodeDto {
  @ApiProperty({
    example: NodeType.FILE,
    description: `Os tipos de nó suportados são: ${Object.values(NodeType).join(', ')}`,
    enum: NodeType,
  })
  @IsEnum(NodeType)
  @IsNotEmpty()
  type: NodeType;

  @ApiProperty({
    example: 'relatorio_financeiro.pdf',
    description: 'Nome do arquivo, pasta ou grupo',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'application/pdf',
    description: 'MimeType do arquivo (opcional para pastas/grupos)',
    required: false,
  })
  @IsString()
  @IsOptional()
  mimeType?: string;

  @ApiProperty({
    example: '.pdf',
    description: 'Extensão do arquivo com o ponto (opcional)',
    required: false,
  })
  @IsString()
  @IsOptional()
  extension?: string;

  @ApiProperty({
    example: '2481830',
    description: 'Tamanho em bytes (pode ser enviado como string ou number)',
    required: false,
  })
  @IsOptional()
  size?: string | number;

  @ApiProperty({
    example: 'cdb35a50-54f1-4a5e-bd56-b68a73fdfa97',
    description: 'ID do Storage Driver que vai alojar o arquivo (opcional)',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  driverId?: string;

  @ApiProperty({
    example: '9f618dac-a3cf-4530-a648-2dc8af046ff4',
    description: 'ID da pasta pai na hierarquia (opcional)',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  parentId?: string;

  @ApiProperty({
    example: ['finanças', 'pdf', '2026'],
    description: 'Tags de busca associadas ao arquivo',
    required: false,
    type: [String],
  })
  @IsArray()
  @IsOptional()
  tags?: string[];

  @ApiProperty({
    example: FileStatus.ACTIVE,
    description: `Status inicial do arquivo. Padrão: ACTIVE`,
    enum: FileStatus,
    required: false,
  })
  @IsEnum(FileStatus)
  @IsOptional()
  status?: FileStatus;

  // Metadados do Provider opcionais no ato de criação direta
  @IsString()
  @IsOptional()
  providerFileId?: string;

  @IsString()
  @IsOptional()
  providerPath?: string;
}
