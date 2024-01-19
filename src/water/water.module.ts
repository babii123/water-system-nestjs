import { Module } from '@nestjs/common';
import { WaterService } from './water.service';
import { WaterController } from './water.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Water } from './entities/water.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Water])],
  controllers: [WaterController],
  providers: [WaterService],
})
export class WaterModule {}
