// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { User } from 'src/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import jwtConfig from '../../config/jwt.config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HashingService } from './hashing.service';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './guards/access-token.guard';
import { NoticeModule } from 'src/notice/notice.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    HashingService,
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
  ],
})
export class AuthModule {}
