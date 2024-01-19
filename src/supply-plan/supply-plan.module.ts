import { Module } from '@nestjs/common';
import { SupplyPlanService } from './supply-plan.service';
import { SupplyPlanController } from './supply-plan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplyPlan } from './entities/supply-plan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SupplyPlan])],
  controllers: [SupplyPlanController],
  providers: [SupplyPlanService],
})
export class SupplyPlanModule {}
