import { Global, Module } from '@nestjs/common';
import { WaterYieldService } from './water-yield.service';
import { WaterYieldController } from './water-yield.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WaterYield } from './entities/water-yield.entity';
import { NoticeModule } from 'src/notice/notice.module';
import { WebsocketGateway } from 'src/websocket/websocket.gateway'
import { WaterModule } from 'src/water/water.module';

@Module({
  imports: [TypeOrmModule.forFeature([WaterYield]), NoticeModule, WaterModule],
  controllers: [WaterYieldController],
  providers: [WaterYieldService, WebsocketGateway],
  exports: [WaterYieldService]
})
export class WaterYieldModule { }
