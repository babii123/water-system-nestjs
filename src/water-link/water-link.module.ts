import { Module } from '@nestjs/common';
import { WaterLinkService } from './water-link.service';
import { WaterLinkController } from './water-link.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WaterLink } from './entities/water-link.entity';
import { UserModule } from 'src/user/user.module';
import { HandleLogModule } from 'src/handle-log/handle-log.module';

@Module({
  imports: [TypeOrmModule.forFeature([WaterLink]), UserModule, HandleLogModule],
  controllers: [WaterLinkController],
  providers: [WaterLinkService],
})
export class WaterLinkModule { }
