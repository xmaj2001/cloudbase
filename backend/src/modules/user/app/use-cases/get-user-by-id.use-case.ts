import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../domain/repo/user.repository';
import { UserEntity } from '../../domain/entities/user.entity';

@Injectable()
export class GetUserByIdUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findById(id);
    if (!user || user.isDeleted) {
      throw new NotFoundException('Utilizador não encontrado.');
    }
    return user;
  }
}
