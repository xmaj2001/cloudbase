import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { UserRepository } from '../../domain/repo/user.repository';
import { UserEntity } from '../../domain/entities/user.entity';

@Injectable()
export class GetUserByIdUseCase {
  private readonly logger = new Logger(GetUserByIdUseCase.name);

  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<UserEntity> {
    this.logger.log(`A procurar utilizador com id ${id}`);

    const user = await this.userRepository.findById(id);
    if (!user || user.isDeleted) {
      this.logger.warn(`Utilizador ${id} não encontrado`);
      throw new NotFoundException('Utilizador não encontrado.');
    }
    return user;
  }
}
