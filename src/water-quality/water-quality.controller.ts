import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WaterQualityService } from './water-quality.service';
import { CreateWaterQualityDto } from './dto/create-water-quality.dto';
import { UpdateWaterQualityDto } from './dto/update-water-quality.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { Code } from 'src/Result/Code';
import { Message } from 'src/Result/Message';
import Result from 'src/Result/Result';

@Controller('water-quality')
export class WaterQualityController {
  constructor(private readonly waterQualityService: WaterQualityService) {}

  @Public()
  @Post()
  async create(@Body() createWaterQualityDto: CreateWaterQualityDto) {
    const data = await this.waterQualityService.create(createWaterQualityDto);
    return new Result(Code.CREATE_OK, Message.Change_Success, data);
  }

  @Public()
  @Get()
  async findAll() {
    const data = await this.waterQualityService.findAll();
    return new Result(Code.GET_OK, Message.Find_Success, data);
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.waterQualityService.findOne(+id);
    return new Result(Code.GET_OK, Message.Find_Success, data);
  }

  @Public()
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateWaterQualityDto: UpdateWaterQualityDto,
  ) {
    const data = await this.waterQualityService.update(
      +id,
      updateWaterQualityDto,
    );
    return new Result(data.code, data.msg, null);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.waterQualityService.remove(+id);
    return new Result(data.code, data.msg, null);
  }

  @Public()
  @Delete('/delete_description/:id/:delReason')
  async deleteByDelReason(
    @Param('id') id: string,
    @Param('delReason') delReason: string,
  ) {
    const data = await this.waterQualityService.deleteByDelReason(
      +id,
      delReason,
    );
    return new Result(data.code, data.msg, null);
  }

  @Public()
  @Delete('/delete_multi/:idStr')
  async removeMulti(@Param('idStr') idStr: string) {
    const idList = idStr.split(',').map((item) => {
      return parseInt(item);
    });
    const data = await this.waterQualityService.removeMulti(idList);
    return new Result(data.code, data.msg, data.data);
  }
}
