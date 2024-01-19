import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WaterTypeService } from './water-type.service';
import { CreateWaterTypeDto } from './dto/create-water-type.dto';
import { UpdateWaterTypeDto } from './dto/update-water-type.dto';
import { Public } from 'src/common/decorators/public.decorator';
import Result from 'src/Result/Result';
import { Message } from 'src/Result/Message';
import { Code } from 'src/Result/Code';

@Controller('water-type')
export class WaterTypeController {
  constructor(private readonly waterTypeService: WaterTypeService) {}

  @Public()
  @Post()
  async create(@Body() createWaterTypeDto: CreateWaterTypeDto) {
    const data = await this.waterTypeService.create(createWaterTypeDto);
    return new Result(Code.CREATE_OK, Message.Change_Success, data);
  }

  @Public()
  @Get()
  async findAll() {
    const data = await this.waterTypeService.findAll();
    return new Result(Code.GET_OK, Message.Find_Success, data);
  }

  @Public()
  @Get(':type')
  findOne(@Param('type') type: string) {
    return this.waterTypeService.findOne(type);
  }

  @Public()
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateWaterTypeDto: UpdateWaterTypeDto,
  ) {
    const data = await this.waterTypeService.update(+id, updateWaterTypeDto);
    return new Result(data.code, data.msg, null);
  }

  @Public()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.waterTypeService.remove(+id);
    return new Result(data.code, data.msg, null);
  }

  @Public()
  @Delete('/delete_multi/:idStr')
  async removeMulti(@Param('idStr') idStr: string) {
    const idList = idStr.split(',').map((item) => {
      return parseInt(item);
    });
    const data = await this.waterTypeService.removeMulti(idList);
    return new Result(data.code, data.msg, data.data);
  }
}
