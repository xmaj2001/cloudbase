import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { UserRepository } from '../../domain/repo/user.repository';
import { UserEntity } from '../../domain/entities/user.entity';
import { UpdateUserDto } from '../../presentation/http/inputs/update-user.dto';

@Injectable()
export class UpdateUserUseCase {
  private readonly logger = new Logger(UpdateUserUseCase.name);

  constructor(private readonly userRepository: UserRepository) { }

  async execute(id: string, dto: UpdateUserDto): Promise<UserEntity> {
    this.logger.log(`A atualizar utilizador ${id}`);

    const user = await this.userRepository.findById(id);
    if (!user || user.isDeleted) {
      this.logger.warn(`Utilizador ${id} não encontrado para atualização`);
      throw new NotFoundException('Utilizador não encontrado.');
    }

    user.updateProfile({
      name: dto.name,
      avatarUrl: dto.avatarUrl,
      whatsappNumber: dto.whatsappNumber,
    });

    await this.userRepository.save(user);
    this.logger.log(`Utilizador ${id} atualizado com sucesso`);
    return user;
  }
}
