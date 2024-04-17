import { Module } from '@nestjs/common';
import { WaterLinkService } from './water-link.service';
import { WaterLinkController } from './water-link.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WaterLink } from './entities/water-link.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WaterLink])],
  controllers: [WaterLinkController],
  providers: [WaterLinkService],
})
export class WaterLinkModule { }
