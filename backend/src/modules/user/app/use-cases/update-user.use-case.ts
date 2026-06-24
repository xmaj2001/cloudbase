import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../domain/repo/user.repository';
import { UserEntity } from '../../domain/entities/user.entity';
import { UpdateUserDto } from '../../presentation/http/inputs/update-user.dto';

@Injectable()
export class UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepository) { }

  async execute(id: string, dto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findById(id);
    if (!user || user.isDeleted) {
      throw new NotFoundException('Utilizador não encontrado.');
    }

    user.updateProfile({
      name: dto.name,
      avatarUrl: dto.avatarUrl,
      whatsappNumber: dto.whatsappNumber,
    });

    await this.userRepository.save(user);
    return user;
  }
}
