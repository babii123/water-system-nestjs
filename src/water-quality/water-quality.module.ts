import { Module } from '@nestjs/common';
import { WaterQualityService } from './water-quality.service';
import { WaterQualityController } from './water-quality.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WaterQuality } from './entities/water-quality.entity';
import { NoticeModule } from 'src/notice/notice.module';
import { WebsocketGateway } from 'src/websocket/websocket.gateway'
import { WaterModule } from 'src/water/water.module';

@Module({
  imports: [TypeOrmModule.forFeature([WaterQuality]), NoticeModule, WaterModule],
  controllers: [WaterQualityController],
  providers: [WaterQualityService, WebsocketGateway],
  exports: [WaterQualityService]
})
export class WaterQualityModule { }
