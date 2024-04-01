import { Module } from '@nestjs/common';
import { WaterTypeService } from './water-type.service';
import { WaterTypeController } from './water-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WaterType } from './entities/water-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WaterType])],
  controllers: [WaterTypeController],
  providers: [WaterTypeService],
  exports: [WaterTypeService]
})
export class WaterTypeModule { }
