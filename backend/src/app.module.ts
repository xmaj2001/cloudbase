import { Module } from '@nestjs/common';
import { AppController } from './modules/app/app.controller';
import { AppService } from './modules/app/app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { appConfig } from './shared/config/app.config';
import { BullModule } from '@nestjs/bullmq';
import { bullRedisConfig } from './shared/config/bull.config';
import { PrismaModule } from './shared/infra/prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { StorageDriverModule } from './modules/storagedriver/storage-driver.module';
import { NodeModule } from './modules/node/node.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [appConfig] }),
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: bullRedisConfig,
    }),
    PrismaModule,
    UserModule,
    StorageDriverModule,
    NodeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
