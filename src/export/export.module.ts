import { Module } from '@nestjs/common';
import { ExportService } from './export.service';
import { ExportController } from './export.controller';
import { WaterModule } from 'src/water/water.module';
import { WaterYieldModule } from 'src/water-yield/water-yield.module';
import { WaterQualityModule } from 'src/water-quality/water-quality.module';
import { SupplyPlanModule } from 'src/supply-plan/supply-plan.module';
import { WaterTypeModule } from 'src/water-type/water-type.module';
import { WaterPriceModule } from 'src/water-price/water-price.module';
import { HandleLogModule } from 'src/handle-log/handle-log.module';

@Module({
  imports: [WaterModule, WaterYieldModule, WaterQualityModule, SupplyPlanModule, WaterTypeModule, WaterPriceModule, HandleLogModule],
  controllers: [ExportController],
  providers: [ExportService],
})
export class ExportModule { }
