import { Module } from '@nestjs/common';
import { WaterPriceService } from './water-price.service';
import { WaterPriceController } from './water-price.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WaterPrice } from './entities/water-price.entity';
import { UserModule } from 'src/user/user.module';
import { HandleLogModule } from 'src/handle-log/handle-log.module';

@Module({
  imports: [TypeOrmModule.forFeature([WaterPrice]), UserModule, HandleLogModule],
  controllers: [WaterPriceController],
  providers: [WaterPriceService],
  exports: [WaterPriceService],
})
export class WaterPriceModule { }
