import { Injectable } from '@nestjs/common';
import { CreateUserUseCase } from '../use-cases/create-user.use-case';
import { GetUserByIdUseCase } from '../use-cases/get-user-by-id.use-case';
import { UpdateUserUseCase } from '../use-cases/update-user.use-case';
import { DeleteUserUseCase } from '../use-cases/delete-user.use-case';
import { UserEntity } from '../../domain/entities/user.entity';
import { CreateUserDto } from '../../presentation/http/inputs/create-user.dto';
import { UpdateUserDto } from '../../presentation/http/inputs/update-user.dto';

@Injectable()
export class UserClientService {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) { }

  async createUser(dto: CreateUserDto): Promise<UserEntity> {
    return this.createUserUseCase.execute(dto);
  }

  async getUserById(id: string): Promise<UserEntity> {
    return this.getUserByIdUseCase.execute(id);
  }

  async updateUser(id: string, dto: UpdateUserDto): Promise<UserEntity> {
    return this.updateUserUseCase.execute(id, dto);
  }

  async deleteUser(id: string): Promise<void> {
    await this.deleteUserUseCase.execute(id);
  }
}
