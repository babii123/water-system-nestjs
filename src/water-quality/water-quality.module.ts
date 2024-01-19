import { Module } from '@nestjs/common';
import { WaterQualityService } from './water-quality.service';
import { WaterQualityController } from './water-quality.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WaterQuality } from './entities/water-quality.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WaterQuality])],
  controllers: [WaterQualityController],
  providers: [WaterQualityService],
})
export class WaterQualityModule {}
