import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class UpdateDriverDto {
  @ApiPropertyOptional({
    example: 'Drive Trabalho',
    description: 'Novo nome de exibição para o driver.',
  })
  @IsString()
  @IsOptional()
  displayName?: string;

  @ApiPropertyOptional({
    example: 1,
    description: 'Nova prioridade no routing de uploads (0 = mais alta).',
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  priority?: number;
}
