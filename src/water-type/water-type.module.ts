import { Module } from '@nestjs/common';
import { WaterTypeService } from './water-type.service';
import { WaterTypeController } from './water-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WaterType } from './entities/water-type.entity';
import { WaterModule } from 'src/water/water.module';

@Module({
  imports: [TypeOrmModule.forFeature([WaterType]), WaterModule],
  controllers: [WaterTypeController],
  providers: [WaterTypeService],
  exports: [WaterTypeService]
})
export class WaterTypeModule { }
