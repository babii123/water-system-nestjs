import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { HandleLogModule } from 'src/handle-log/handle-log.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), HandleLogModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule { }
