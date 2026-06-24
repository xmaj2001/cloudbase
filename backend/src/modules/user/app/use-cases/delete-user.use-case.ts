import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../domain/repo/user.repository';

@Injectable()
export class DeleteUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user || user.isDeleted) {
      throw new NotFoundException('Utilizador não encontrado.');
    }

    user.softDelete();
    await this.userRepository.save(user);
  }
}
