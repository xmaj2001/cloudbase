import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { StorageDriverRepository } from '../../domain/repo/storage-driver.repository';

@Injectable()
export class DeleteDriverUseCase {
  private readonly logger = new Logger(DeleteDriverUseCase.name);

  constructor(private readonly driverRepository: StorageDriverRepository) {}

  async execute(id: string, userId: string): Promise<void> {
    this.logger.log(`A eliminar driver ${id} para o utilizador ${userId}`);

    const driver = await this.driverRepository.findById(id);
    if (!driver || driver.userId !== userId) {
      this.logger.warn(`Driver ${id} não encontrado para o utilizador ${userId}`);
      throw new NotFoundException('Driver de armazenamento não encontrado.');
    }

    await this.driverRepository.delete(id);
    this.logger.log(`Driver ${id} eliminado com sucesso`);
  }
}
