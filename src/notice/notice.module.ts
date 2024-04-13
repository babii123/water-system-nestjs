import { Module } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { NoticeController } from './notice.controller';
import { SocketGateway } from './gateway/socket.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notice } from './entities/notice.entity';
import { UserModule } from 'src/user/user.module';
import { HandleLogModule } from 'src/handle-log/handle-log.module';

@Module({
  imports: [TypeOrmModule.forFeature([Notice]), UserModule, HandleLogModule],
  controllers: [NoticeController],
  providers: [NoticeService, SocketGateway],
  exports: [NoticeService, SocketGateway],
})
export class NoticeModule { }
