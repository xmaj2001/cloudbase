import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { StorageDriverRepository } from '../../domain/repo/storage-driver.repository';
import { StorageDriverEntity } from '../../domain/entities/storage-driver.entity';
import { UpdateDriverDto } from '../../presentation/http/inputs/update-driver.dto';

@Injectable()
export class UpdateDriverUseCase {
  private readonly logger = new Logger(UpdateDriverUseCase.name);

  constructor(private readonly driverRepository: StorageDriverRepository) {}

  async execute(
    id: string,
    userId: string,
    dto: UpdateDriverDto,
  ): Promise<StorageDriverEntity> {
    this.logger.log(`A atualizar driver ${id} para o utilizador ${userId}`);

    const driver = await this.driverRepository.findById(id);
    if (!driver || driver.userId !== userId) {
      this.logger.warn(`Driver ${id} não encontrado para o utilizador ${userId}`);
      throw new NotFoundException('Driver de armazenamento não encontrado.');
    }

    if (dto.displayName) {
      driver.updateDisplayName(dto.displayName);
    }
    if (dto.priority !== undefined) {
      driver.setPriority(dto.priority);
    }

    await this.driverRepository.save(driver);
    this.logger.log(`Driver ${id} atualizado com sucesso`);
    return driver;
  }
}
