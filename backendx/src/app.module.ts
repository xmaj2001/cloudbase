import { Module } from '@nestjs/common';
import { AppController } from './modules/app/app.controller';
import { AppService } from './modules/app/app.service';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from './shared/config/app.config';
import { PrismaModule } from './shared/infra/prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { DriverModule } from './modules/drivers/driver.module';
import { NodeModule } from './modules/node/node.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [appConfig] }),
    PrismaModule,
    UserModule,
    DriverModule,
    NodeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
