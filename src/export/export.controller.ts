import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { ExportService } from './export.service';
import { Public } from 'src/common/decorators/public.decorator';
import { WaterService } from 'src/water/water.service';
import { WaterYieldService } from 'src/water-yield/water-yield.service';
import { UserService } from 'src/user/user.service';
import { WaterTypeService } from 'src/water-type/water-type.service';
import { WaterQualityService } from 'src/water-quality/water-quality.service';
import { SupplyPlanService } from 'src/supply-plan/supply-plan.service';

@Controller('export')
export class ExportController {
  constructor(
    private readonly exportService: ExportService,
    private readonly waterService: WaterService,
    private readonly waterYieldService: WaterYieldService,
    private readonly userService: UserService,
    private readonly waterTypeService: WaterTypeService,
    private readonly waterQualityService: WaterQualityService,
    private readonly supplyPlanService: SupplyPlanService
  ) { }

  @Public()
  @Get('excel/:type')
  async exportToExcel(@Res() res: Response, @Param('type') type: string) {
    let data = []
    switch(type){
      case 'user':
        data = await this.userService.findAll();
        break;
      case 'waterType':
        data = await this.waterTypeService.findAll();
        break;
      case 'waterQuality':
        data = await this.waterQualityService.findAll();
        break;
      case 'supplyPlan':
        data = await this.supplyPlanService.findAll();
        break;
      case 'water':
        data = await this.waterService.findAll();
        break;
      case 'waterYield':
        data = await this.waterYieldService.findAll();
        break;
    }
    console.log(data);
    await this.exportService.exportToExcel(data, res, `${type}-table`);
  }
}
