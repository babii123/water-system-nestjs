import { Global, Module } from '@nestjs/common';
import { WaterYieldService } from './water-yield.service';
import { WaterYieldController } from './water-yield.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WaterYield } from './entities/water-yield.entity';
import { NoticeModule } from 'src/notice/notice.module';
import { SocketGateway } from 'src/notice/gateway/socket.gateway';
import { UserModule } from 'src/user/user.module';
import { HandleLogModule } from 'src/handle-log/handle-log.module';

@Module({
  imports: [TypeOrmModule.forFeature([WaterYield]), NoticeModule, SocketGateway, UserModule, HandleLogModule],
  controllers: [WaterYieldController],
  providers: [WaterYieldService],
  exports: [WaterYieldService]
})
export class WaterYieldModule { }
