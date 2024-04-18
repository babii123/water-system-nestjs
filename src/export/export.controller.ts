import { Controller, Get, Param, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { ExportService } from './export.service';
import { Public } from 'src/common/decorators/public.decorator';
import { WaterService } from 'src/water/water.service';
import { WaterYieldService } from 'src/water-yield/water-yield.service';
import { UserService } from 'src/user/user.service';
import { WaterTypeService } from 'src/water-type/water-type.service';
import { WaterQualityService } from 'src/water-quality/water-quality.service';
import { SupplyPlanService } from 'src/supply-plan/supply-plan.service';
import { WaterPriceService } from 'src/water-price/water-price.service';
import { HandleLogService } from 'src/handle-log/handle-log.service';
import { CreateHandleLogDto } from 'src/handle-log/dto/create-handle-log.dto';

const handleName = {
  'user': '用户',
  'waterType': '水资源类型',
  'waterQuality': '水质',
  'waterYield': '水量',
  'waterPrice': '水价',
  'water': '水资源',
  'supplyPlan': '供水计划',
  'handleLog': '操作日志',
}
@Controller('export')
export class ExportController {
  constructor(
    private readonly exportService: ExportService,
    private readonly waterService: WaterService,
    private readonly waterYieldService: WaterYieldService,
    private readonly userService: UserService,
    private readonly waterTypeService: WaterTypeService,
    private readonly waterQualityService: WaterQualityService,
    private readonly supplyPlanService: SupplyPlanService,
    private readonly waterPriceService: WaterPriceService,
    private readonly handleLogService: HandleLogService,
  ) { }

  @Public()
  @Get('excel/:type')
  async exportToExcel(@Res() res: Response, @Param('type') type: string, @Req() req) {
    const user = await this.userService.findOne(req.userId);
    let data = []
    switch (type) {
      case 'user':
        data = await this.userService.findAll();
        break;
      case 'waterType':
        data = await this.waterTypeService.findAll();
        break;
      case 'waterQuality':
        data = await this.waterQualityService.findAll(user.roles);
        break;
      case 'supplyPlan':
        data = await this.supplyPlanService.findAll(user.roles);
        break;
      case 'water':
        data = await this.waterService.findAll(user.roles);
        break;
      case 'waterYield':
        data = await this.waterYieldService.findAll(user.roles);
        break;
      case 'waterPrice':
        data = await this.waterPriceService.findAll();
      case 'handleLog':
        data = await this.handleLogService.findAll();
        break;
    }
    const handleLog = new CreateHandleLogDto(
      user.userId,
      user.realName,
      `导出${handleName[type]}信息`,
      `${user.realName}(${user.userId})导出${handleName[type]}信息`
    )
    await this.handleLogService.create(handleLog);
    await this.exportService.exportToExcel(data, res, `${type}-table`);
  }
}
