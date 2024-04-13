import { Module } from '@nestjs/common';
import { SupplyPlanService } from './supply-plan.service';
import { SupplyPlanController } from './supply-plan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplyPlan } from './entities/supply-plan.entity';
import { UserModule } from 'src/user/user.module';
import { HandleLogModule } from 'src/handle-log/handle-log.module';

@Module({
  imports: [TypeOrmModule.forFeature([SupplyPlan]), UserModule, HandleLogModule],
  controllers: [SupplyPlanController],
  providers: [SupplyPlanService],
  exports: [SupplyPlanService]
})
export class SupplyPlanModule { }
