import { Module } from '@nestjs/common';
import { WaterQualityService } from './water-quality.service';
import { WaterQualityController } from './water-quality.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WaterQuality } from './entities/water-quality.entity';
import { NoticeModule } from 'src/notice/notice.module';
import { SocketGateway } from 'src/notice/gateway/socket.gateway';
import { UserModule } from 'src/user/user.module';
import { HandleLogModule } from 'src/handle-log/handle-log.module';

@Module({
  imports: [TypeOrmModule.forFeature([WaterQuality]), NoticeModule, SocketGateway, UserModule, HandleLogModule],
  controllers: [WaterQualityController],
  providers: [WaterQualityService],
  exports: [WaterQualityService]
})
export class WaterQualityModule { }
