import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class MoveNodeDto {
  @ApiPropertyOptional({
    example: 'new-parent-id-a1b2',
    description: 'ID da nova pasta ou grupo pai (null para root)',
  })
  @IsString()
  @IsOptional()
  parentId?: string | null;
}
