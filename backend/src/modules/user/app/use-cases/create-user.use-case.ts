import { Injectable, ConflictException, Logger } from '@nestjs/common';
import { UserRepository } from '../../domain/repo/user.repository';
import { UserEntity } from '../../domain/entities/user.entity';
import * as crypto from 'crypto';
import { CreateUserDto } from '../../presentation/http/inputs/create-user.dto';

@Injectable()
export class CreateUserUseCase {
  private readonly logger = new Logger(CreateUserUseCase.name);

  constructor(private readonly userRepository: UserRepository) { }

  async execute(dto: CreateUserDto): Promise<UserEntity> {
    this.logger.log(`A criar utilizador com o email ${dto.email}`);

    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
      this.logger.warn(`O email ${dto.email} já está em uso`);
      throw new ConflictException('Este email já está em uso.');
    }

    let passwordHash: string | undefined;
    if (dto.password) {
      passwordHash = this.hashPassword(dto.password);
    }

    const user = UserEntity.create({
      email: dto.email,
      name: dto.name,
      avatarUrl: dto.avatarUrl,
      passwordHash,
      whatsappNumber: dto.whatsappNumber,
    });

    await this.userRepository.save(user);
    this.logger.log(`Utilizador criado com sucesso (id: ${user.id})`);
    return user;
  }

  private hashPassword(password: string): string {
    const salt = 'cloudbase_salt';
    return crypto
      .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
      .toString('hex');
  }
}
