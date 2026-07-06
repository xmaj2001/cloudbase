import { Injectable, Logger } from '@nestjs/common';
import { CreateDriverDto } from '../dto/create-driver.dto';
import { UpdateDriverDto } from '../dto/update-driver.dto';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { Prisma } from 'src/generated/prisma/client';

@Injectable()
export class DriversService {
  private readonly logger = new Logger(DriversService.name);

  constructor(private readonly prisma: PrismaService) {}
  create(createDriverDto: CreateDriverDto) {
    return 'This action adds a new driver';
  }

  async findAll(userId?: string) {
    const where: Prisma.DriverWhereInput = userId ? { userId } : {};
    if (!userId) {
      this.logger.warn(
        'Nenhum userId foi informado, retornando todos os drivers',
      );
    }
    this.logger.log('Procurando todos os drivers...');
    const drivers = await this.prisma.driver.findMany({ where });
    this.logger.log(`A um total de ${drivers.length} drivers`);
    return drivers;
  }

  findOne(id: number) {
    return `This action returns a #${id} driver`;
  }

  update(id: number, updateDriverDto: UpdateDriverDto) {
    return `This action updates a #${id} driver`;
  }

  remove(id: number) {
    return `This action removes a #${id} driver`;
  }
}
