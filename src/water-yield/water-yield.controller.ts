import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WaterYieldService } from './water-yield.service';
import { CreateWaterYieldDto } from './dto/create-water-yield.dto';
import { UpdateWaterYieldDto } from './dto/update-water-yield.dto';
import { Public } from 'src/common/decorators/public.decorator';
import Result from 'src/Result/Result';
import { Code } from 'src/Result/Code';
import { Message } from 'src/Result/Message';

@Controller('water-yield')
export class WaterYieldController {
  constructor(private readonly waterYieldService: WaterYieldService) { }

  @Public()
  @Post()
  async create(@Body() createWaterYieldDto: CreateWaterYieldDto) {
    const data = await this.waterYieldService.create(createWaterYieldDto);
    return new Result(Code.CREATE_OK, Message.Change_Success, data);
  }

  @Public()
  @Get()
  async findAll() {
    const data = await this.waterYieldService.findAll();
    return new Result(Code.GET_OK, Message.Find_Success, data);
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.waterYieldService.findOne(+id);
    console.log([data]);
    return new Result(Code.GET_OK, Message.Find_Success, data);
  }

  @Public()
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateWaterYieldDto: UpdateWaterYieldDto,
  ) {
    const data = await this.waterYieldService.update(+id, updateWaterYieldDto);
    return new Result(data.code, data.msg, null);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.waterYieldService.remove(+id);
    return new Result(data.code, data.msg, null);
  }

  @Public()
  @Delete('/delete_description/:id/:delReason')
  async deleteByDelReason(
    @Param('id') id: string,
    @Param('delReason') delReason: string,
  ) {
    const data = await this.waterYieldService.deleteByDelReason(+id, delReason);
    return new Result(data.code, data.msg, null);
  }

  @Public()
  @Delete('/delete_multi/:idStr')
  async removeMulti(@Param('idStr') idStr: string) {
    const idList = idStr.split(',').map((item) => {
      return parseInt(item);
    });
    const data = await this.waterYieldService.removeMulti(idList);
    return new Result(data.code, data.msg, data.data);
  }
}
