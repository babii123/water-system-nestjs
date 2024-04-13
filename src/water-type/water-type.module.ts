import { Module } from '@nestjs/common';
import { WaterTypeService } from './water-type.service';
import { WaterTypeController } from './water-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WaterType } from './entities/water-type.entity';
import { UserModule } from 'src/user/user.module';
import { HandleLogModule } from 'src/handle-log/handle-log.module';

@Module({
  imports: [TypeOrmModule.forFeature([WaterType]), UserModule, HandleLogModule],
  controllers: [WaterTypeController],
  providers: [WaterTypeService],
  exports: [WaterTypeService]
})
export class WaterTypeModule { }
