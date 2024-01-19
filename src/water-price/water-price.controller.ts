import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WaterPriceService } from './water-price.service';
import { CreateWaterPriceDto } from './dto/create-water-price.dto';
import { UpdateWaterPriceDto } from './dto/update-water-price.dto';
import Result from 'src/Result/Result';
import { Code } from 'src/Result/Code';
import { Message } from 'src/Result/Message';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('water-price')
export class WaterPriceController {
  constructor(private readonly waterPriceService: WaterPriceService) {}

  @Public()
  @Post()
  async create(@Body() createWaterPriceDto: CreateWaterPriceDto) {
    const data = await this.waterPriceService.create(createWaterPriceDto)
    return new Result(Code.CREATE_OK, Message.Change_Success, data);
  }

  @Public()
  @Get()
  async findAll() {
    const data = await this.waterPriceService.findAll()
    return new Result(Code.GET_OK, Message.Find_Success, data);
  }

  @Public()
  @Get('/getWaterPrice_dashboard')
  async getWaterPriceToBashboard(){
    const data = await this.waterPriceService.getWaterPriceToBashboard()
    return new Result(Code.GET_OK, Message.Find_Success, data);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.waterPriceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWaterPriceDto: UpdateWaterPriceDto) {
    return this.waterPriceService.update(+id, updateWaterPriceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.waterPriceService.remove(+id);
  }
}
