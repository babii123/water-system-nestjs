import { Global, Module } from '@nestjs/common';
import { WaterService } from './water.service';
import { WaterController } from './water.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Water } from './entities/water.entity';
import { UserModule } from 'src/user/user.module';
import { HandleLogModule } from 'src/handle-log/handle-log.module';
@Module({
  imports: [TypeOrmModule.forFeature([Water]), UserModule, HandleLogModule],
  controllers: [WaterController],
  providers: [WaterService],
  exports: [WaterService]
})
export class WaterModule { }
