import { Module } from '@nestjs/common';
import { StorageDriverController } from './presentation/http/storage-driver.controller';
import { StorageDriverClientService } from './app/services/storage-driver-client.service';
import { StorageDriverRepository } from './domain/repo/storage-driver.repository';
import { PrismaStorageDriverRepository } from './infra/repo/prisma-storage-driver.repository';
import { ConnectDriverUseCase } from './app/use-cases/connect-driver.use-case';
import { GetDriversByUserUseCase } from './app/use-cases/get-drivers-by-user.use-case';
import { GetDriverByIdUseCase } from './app/use-cases/get-driver-by-id.use-case';
import { UpdateDriverUseCase } from './app/use-cases/update-driver.use-case';
import { DeleteDriverUseCase } from './app/use-cases/delete-driver.use-case';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [StorageDriverController],
  providers: [
    StorageDriverClientService,
    ConnectDriverUseCase,
    GetDriversByUserUseCase,
    GetDriverByIdUseCase,
    UpdateDriverUseCase,
    DeleteDriverUseCase,
    {
      provide: StorageDriverRepository,
      useClass: PrismaStorageDriverRepository,
    },
  ],
  exports: [StorageDriverClientService],
})
export class StorageDriverModule {}
