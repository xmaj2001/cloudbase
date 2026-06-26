import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { UserRepository } from '../../domain/repo/user.repository';

@Injectable()
export class DeleteUserUseCase {
  private readonly logger = new Logger(DeleteUserUseCase.name);

  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<void> {
    this.logger.log(`A eliminar utilizador ${id} (soft delete)`);

    const user = await this.userRepository.findById(id);
    if (!user || user.isDeleted) {
      this.logger.warn(`Utilizador ${id} não encontrado para eliminação`);
      throw new NotFoundException('Utilizador não encontrado.');
    }

    user.softDelete();
    await this.userRepository.save(user);
    this.logger.log(`Utilizador ${id} eliminado com sucesso (soft delete)`);
  }
}
