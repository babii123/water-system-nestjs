import { Module } from '@nestjs/common';
import { WaterYieldService } from './water-yield.service';
import { WaterYieldController } from './water-yield.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WaterYield } from './entities/water-yield.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WaterYield])],
  controllers: [WaterYieldController],
  providers: [WaterYieldService],
})
export class WaterYieldModule {}
