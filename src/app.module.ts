import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import * as Joi from 'joi';
// import { APP_GUARD } from '@nestjs/core'
// import { AccessTokenGuard } from 'src/auth/guards/access-token.guard'
// import jwtConfig from 'config/jwt.config';
// import { JwtModule } from '@nestjs/jwt';
import { WaterModule } from './water/water.module';
import { WaterTypeModule } from './water-type/water-type.module';
import { SupplyPlanModule } from './supply-plan/supply-plan.module';
import { WaterYieldModule } from './water-yield/water-yield.module';
import { WaterQualityModule } from './water-quality/water-quality.module';
import { WaterPriceModule } from './water-price/water-price.module';
import { ExportModule } from './export/export.module';
import { NoticeModule } from './notice/notice.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql', //数据库类型
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: 'root',
      password: 'ling',
      database: 'water_system',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().default(5432),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_TOKEN_AUDIENCE: Joi.string().required(),
        JWT_TOKEN_ISSUER: Joi.string().required(),
        JWT_ACCESS_TOKEN_TTL: Joi.number().default(3600),
      }),
    }),
    WaterModule,
    WaterTypeModule,
    SupplyPlanModule,
    WaterYieldModule,
    WaterQualityModule,
    WaterPriceModule,
    ExportModule,
    NoticeModule,
    // ConfigModule.forFeature(jwtConfig),
    // JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // 全局路由守卫
    // {
    //   provide: APP_GUARD,
    //   useClass: AccessTokenGuard,
    // },
  ],
})
export class AppModule {}
