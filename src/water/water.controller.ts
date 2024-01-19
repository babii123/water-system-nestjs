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
import { WaterService } from './water.service';
import { CreateWaterDto } from './dto/create-water.dto';
import { UpdateWaterDto } from './dto/update-water.dto';
import Result from 'src/Result/Result';
import { Code } from 'src/Result/Code';
import { Message } from 'src/Result/Message';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('water')
export class WaterController {
  constructor(private readonly waterService: WaterService) {}

  @Public()
  @Post()
  async create(@Body() createWaterDto: CreateWaterDto) {
    const data = await this.waterService.create(createWaterDto);
    return new Result(Code.CREATE_OK, Message.Change_Success, data);
  }

  @Public()
  @Get()
  async findAll() {
    const data = await this.waterService.findAll();
    return new Result(Code.GET_OK, Message.Find_Success, data);
  }

  @Get('/getWater_dashboard')
  async getWaterCountToBashboard(){
    const data = await this.waterService.getWaterCountToBashboard()
    return new Result(Code.GET_OK, Message.Find_Success, data);
  }
  
  @Public()
  @Get('/findByCondition')
  async findByCondition(
    @Query('waterArea') waterArea?: string,
    @Query('waterType') waterType?: string) {
    const data = await this.waterService.findByCondition(waterArea, waterType);
    return new Result(Code.GET_OK, Message.Find_Success, data);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.waterService.findOne(+id);
  }

  @Public()
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateWaterDto: UpdateWaterDto,
  ) {
    const data = await this.waterService.update(+id, updateWaterDto);
    return new Result(data.code, data.msg, null);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.waterService.remove(+id);
    return new Result(data.code, data.msg, null);
  }

  @Public()
  @Delete('/delete_description/:id/:delReason')
  async deleteByDelReason(
    @Param('id') id: string,
    @Param('delReason') delReason: string,
  ) {
    const data = await this.waterService.deleteByDelReason(+id, delReason);
    return new Result(data.code, data.msg, null);
  }

  @Public()
  @Delete('/delete_multi/:idStr')
  async removeMulti(@Param('idStr') idStr: string) {
    const idList = idStr.split(',').map((item) => {
      return parseInt(item);
    });
    const data = await this.waterService.removeMulti(idList);
    return new Result(data.code, data.msg, data.data);
  }
}
