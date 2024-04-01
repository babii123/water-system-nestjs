import { Module } from '@nestjs/common';
import { ExportService } from './export.service';
import { ExportController } from './export.controller';
import { WaterModule } from 'src/water/water.module';
import { WaterYieldModule } from 'src/water-yield/water-yield.module';
import { WaterQualityModule } from 'src/water-quality/water-quality.module';
import { UserModule } from 'src/user/user.module';
import { SupplyPlanModule } from 'src/supply-plan/supply-plan.module';
import { WaterTypeModule } from 'src/water-type/water-type.module';

@Module({
  imports: [WaterModule, WaterYieldModule, WaterQualityModule, UserModule, SupplyPlanModule, WaterTypeModule],
  controllers: [ExportController],
  providers: [ExportService],
})
export class ExportModule { }
