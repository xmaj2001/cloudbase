import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserClientService } from '../../app/services/user-client.service';
import { CreateUserDto } from './inputs/create-user.dto';
import { UpdateUserDto } from './inputs/update-user.dto';
import { UserResponseDto } from './reponse/user.response.dto';
import { SuccessResponse } from '../../../../shared/common/envelope.response';
import { ResponseInterceptor } from '../../../../shared/common/interceptors/response.interceptor';

@ApiTags('users')
@Controller('users')
@UseInterceptors(ResponseInterceptor)
export class UserController {
  constructor(private readonly userClientService: UserClientService) { }

  @Post()
  @ApiOperation({ summary: 'Registar um novo utilizador' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: SuccessResponse(UserResponseDto),
    description: 'Utilizador registado com sucesso.',
  })
  async create(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.userClientService.createUser(dto);
    return UserResponseDto.fromEntity(user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter perfil do utilizador pelo ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SuccessResponse(UserResponseDto),
    description: 'Perfil retornado com sucesso.',
  })
  async getById(@Param('id') id: string): Promise<UserResponseDto> {
    const user = await this.userClientService.getUserById(id);
    return UserResponseDto.fromEntity(user);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar perfil do utilizador' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SuccessResponse(UserResponseDto),
    description: 'Perfil atualizado com sucesso.',
  })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const user = await this.userClientService.updateUser(id, dto);
    return UserResponseDto.fromEntity(user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remover (soft delete) utilizador' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Utilizador removido com sucesso.',
  })
  async delete(@Param('id') id: string): Promise<void> {
    await this.userClientService.deleteUser(id);
  }
}
