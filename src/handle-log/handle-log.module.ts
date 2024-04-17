import { Global, Module } from '@nestjs/common';
import { HandleLogService } from './handle-log.service';
import { HandleLogController } from './handle-log.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HandleLog } from './entities/handle-log.entity';
@Global()
@Module({
  imports: [TypeOrmModule.forFeature([HandleLog])],
  controllers: [HandleLogController],
  providers: [HandleLogService],
  exports: [HandleLogService],
})
export class HandleLogModule { }
