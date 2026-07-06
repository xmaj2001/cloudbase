import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserIdQueryDto {
  @ApiProperty({ example: 'userId123' })
  @IsString()
  userId: string;
}
