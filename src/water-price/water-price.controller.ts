import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Req } from '@nestjs/common';
import { WaterPriceService } from './water-price.service';
import { CreateWaterPriceDto } from './dto/create-water-price.dto';
import { UpdateWaterPriceDto } from './dto/update-water-price.dto';
import Result from 'src/Result/Result';
import { Code } from 'src/Result/Code';
import { Message } from 'src/Result/Message';
import { Public } from 'src/common/decorators/public.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import * as xlsx from 'xlsx';
import { UserService } from 'src/user/user.service';
import { HandleLogService } from 'src/handle-log/handle-log.service';
import { CreateHandleLogDto } from 'src/handle-log/dto/create-handle-log.dto';
import handleImportPrice from 'src/utils/handleImportPrice';
@Controller('water-price')
export class WaterPriceController {
  constructor(
    private readonly waterPriceService: WaterPriceService,
    private readonly userService: UserService,
    private readonly handleLogService: HandleLogService,
  ) { }

  @Post()
  async create(@Body() createWaterPriceDto: CreateWaterPriceDto, @Req() req) {
    try {
      const data = await this.waterPriceService.create(createWaterPriceDto)
      const user = await this.userService.findOne(req.userId);
      const handleLog = new CreateHandleLogDto(
        user.userId,
        user.realName,
        '新增水资源相关链接',
        `${user.realName}(${user.userId})新增id为${data.id}的水资相关链接`
      )
      await this.handleLogService.create(handleLog);
      return new Result(Code.CREATE_OK, Message.Change_Success, data);
    } catch (error) {
      return new Result(Code.SYSTEM_UNKNOW_ERR, Message.Request_Fail, error);
    }
  }

  @Get()
  async findAll() {
    try {
      const data = await this.waterPriceService.findAll()
      return new Result(Code.GET_OK, Message.Find_Success, data);
    } catch (error) {
      return new Result(Code.SYSTEM_UNKNOW_ERR, Message.Request_Fail, error);
    }
  }

  @Get('/getWaterPrice_dashboard')
  async getWaterPriceToBashboard() {
    try {
      const data = await this.waterPriceService.getWaterPriceToBashboard()
      return new Result(Code.GET_OK, Message.Find_Success, data);
    } catch (error) {
      return new Result(Code.SYSTEM_UNKNOW_ERR, Message.Request_Fail, error);
    }
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadExcel(@UploadedFile() file, @Req() req) {
    try {
      const workbook = xlsx.read(file.buffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });
      const { resPriceArr, info } = handleImportPrice(data);
      if (resPriceArr) {
        this.waterPriceService.uploadFile(resPriceArr);
        const user = await this.userService.findOne(req.userId);
        const handleLog = new CreateHandleLogDto(
          user.userId,
          user.realName,
          '导入水价表',
          `${user.realName}(${user.userId})导入水价表`
        )
        await this.handleLogService.create(handleLog);
      }
      return new Result(Code.SAVE_OK, info ? info : '数据合理', null);
    } catch (error) {
      return new Result(Code.SYSTEM_UNKNOW_ERR, Message.Request_Fail, error);
    }
  }
}
