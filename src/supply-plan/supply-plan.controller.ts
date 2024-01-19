import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { SupplyPlanService } from './supply-plan.service';
import { CreateSupplyPlanDto } from './dto/create-supply-plan.dto';
import { UpdateSupplyPlanDto } from './dto/update-supply-plan.dto';
import { ApiOperation } from '@nestjs/swagger';
import Result from 'src/Result/Result';
import { Code } from 'src/Result/Code';
import { Message } from 'src/Result/Message';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('supply-plan')
export class SupplyPlanController {
  constructor(private readonly supplyPlanService: SupplyPlanService) {}

  @ApiOperation({ summary: '新增计划', description: '' })
  @Public()
  @Post()
  async create(@Body() createSupplyPlanDto: CreateSupplyPlanDto) {
    const data = await this.supplyPlanService.create(createSupplyPlanDto);
    return new Result(Code.CREATE_OK, Message.Change_Success, data);
  }

  @ApiOperation({ summary: '上传水价表', description: '' })
  @Public()
  @Post('water_price')
  createWaterPrice(@Body() createSupplyPlanDto: CreateSupplyPlanDto) {
    return 'x';
  }

  @ApiOperation({ summary: '获取所有计划', description: '' })
  @Public()
  @Get()
  async findAll() {
    const data = await this.supplyPlanService.findAll();
    return new Result(Code.GET_OK, Message.Find_Success, data);
  }

  @Public()
  @Get('/getPlan_dashboard')
  async getWaterToBashboard(){
    const data = await this.supplyPlanService.getWaterToBashboard()
    return new Result(Code.GET_OK, Message.Find_Success, data);
  }
  @Public()
  @Get('/findByCondition')
  async findByCondition(
    @Query('waterArea') waterArea?: string,
    @Query('waterPriceType') waterPriceType?: string) {
    console.log(waterArea, waterPriceType);
    const data = await this.supplyPlanService.findByCondition(waterArea, waterPriceType);
    return new Result(Code.GET_OK, Message.Find_Success, data);
  }

  @ApiOperation({ summary: 'id查询计划', description: '' })
  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.supplyPlanService.findOne(+id);
  }

  @ApiOperation({ summary: '修改计划', description: '' })
  @Public()
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSupplyPlanDto: UpdateSupplyPlanDto,
  ) {
    console.log(updateSupplyPlanDto);
    const data = await this.supplyPlanService.update(+id, updateSupplyPlanDto);
    return new Result(data.code, data.msg, null);
  }

  @ApiOperation({ summary: '删除计划', description: '' })
  @Public()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.supplyPlanService.remove(+id);
    return new Result(data.code, data.msg, null);
  }

  @ApiOperation({ summary: '删除计划根据原因', description: '' })
  @Public()
  @Delete('/delete_description/:id/:delReason')
  async deleteByDelReason(
    @Param('id') id: string,
    @Param('delReason') delReason: string,
  ) {
    const data = await this.supplyPlanService.deleteByDelReason(+id, delReason);
    return new Result(data.code, data.msg, null);
  }
}
