import { Module } from '@nestjs/common';
import { WaterPriceService } from './water-price.service';
import { WaterPriceController } from './water-price.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WaterPrice } from './entities/water-price.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WaterPrice])],
  controllers: [WaterPriceController],
  providers: [WaterPriceService],
})
export class WaterPriceModule {}
