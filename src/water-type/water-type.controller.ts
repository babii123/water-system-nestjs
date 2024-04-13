import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { WaterTypeService } from './water-type.service';
import { CreateWaterTypeDto } from './dto/create-water-type.dto';
import { UpdateWaterTypeDto } from './dto/update-water-type.dto';
import Result from 'src/Result/Result';
import { Message } from 'src/Result/Message';
import { Code } from 'src/Result/Code';
import { UserService } from 'src/user/user.service';
import { HandleLogService } from 'src/handle-log/handle-log.service';
import { CreateHandleLogDto } from 'src/handle-log/dto/create-handle-log.dto';
import { UserRole } from 'src/user/entities/user.entity';

@Controller('water-type')
export class WaterTypeController {
  constructor(
    private readonly waterTypeService: WaterTypeService,
    private readonly userService: UserService,
    private readonly handleLogService: HandleLogService,
  ) { }

  @Post()
  async create(@Body() createWaterTypeDto: CreateWaterTypeDto, @Req() req) {
    try {
      const data = await this.waterTypeService.create(createWaterTypeDto);
      const user = await this.userService.findOne(req.userId);
      const handleLog = new CreateHandleLogDto(
        user.userId,
        user.realName,
        '新增水资源类型',
        `${user.realName}(${user.userId})新增id为${data.id}的水资源类型`
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
      const data = await this.waterTypeService.findAll();
      return new Result(Code.GET_OK, Message.Find_Success, data);
    } catch (error) {
      return new Result(Code.SYSTEM_UNKNOW_ERR, Message.Request_Fail, error);
    }
  }

  @Get(':type')
  findOne(@Param('type') type: string) {
    try {
      return this.waterTypeService.findOne(type);
    } catch (error) {
      return new Result(Code.SYSTEM_UNKNOW_ERR, Message.Request_Fail, error);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateWaterTypeDto: UpdateWaterTypeDto,
    @Req() req
  ) {
    try {
      const data = await this.waterTypeService.update(+id, updateWaterTypeDto);
      const user = await this.userService.findOne(req.userId);
      const handleLog = new CreateHandleLogDto(
        user.userId,
        user.realName,
        '修改水资源类型',
        `${user.realName}(${user.userId})修改id为${id}的水资源类型`
      )
      await this.handleLogService.create(handleLog);
      return new Result(data.code, data.msg, null);
    } catch (error) {
      return new Result(Code.SYSTEM_UNKNOW_ERR, Message.Request_Fail, error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req) {
    try {
      const data = await this.waterTypeService.remove(+id);
      const user = await this.userService.findOne(req.userId);
      const handleLog = new CreateHandleLogDto(
        user.userId,
        user.realName,
        '彻底删除水资源类型',
        `${user.realName}(${user.userId})彻底删除id为${id}的水资源类型`
      )
      await this.handleLogService.create(handleLog);
      return new Result(data.code, data.msg, null);
    } catch (error) {
      return new Result(Code.SYSTEM_UNKNOW_ERR, Message.Request_Fail, error);
    }
  }

  @Delete('/delete_multi/:idStr')
  async removeMulti(@Param('idStr') idStr: string, @Param('delReason') delReason: string, @Req() req) {
    try {
      const user = await this.userService.findOne(req.userId);
      const idList = idStr.split(',').map((item) => {
        return parseInt(item);
      });
      const data = await this.waterTypeService.removeMulti(idList);
      const handleLog = new CreateHandleLogDto(
        user.userId,
        user.realName,
        `彻底水资源类型`,
        `${user.realName}(${user.userId})彻底删除id为${idStr}的水资源类型`
      )
      await this.handleLogService.create(handleLog);
      return new Result(data.code, data.msg, data.data);
    } catch (error) {
      return new Result(Code.SYSTEM_UNKNOW_ERR, Message.Request_Fail, error);
    }
  }
}
