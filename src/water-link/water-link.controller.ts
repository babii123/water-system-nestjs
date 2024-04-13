import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { WaterLinkService } from './water-link.service';
import { CreateWaterLinkDto } from './dto/create-water-link.dto';
import Result from 'src/Result/Result';
import { Code } from 'src/Result/Code';
import { Message } from 'src/Result/Message';
import { UserService } from 'src/user/user.service';
import { HandleLogService } from 'src/handle-log/handle-log.service';
import { CreateHandleLogDto } from 'src/handle-log/dto/create-handle-log.dto';

@Controller('water-link')
export class WaterLinkController {
  constructor(
    private readonly waterLinkService: WaterLinkService,
    private readonly userService: UserService,
    private readonly handleLogService: HandleLogService,
  ) { }

  @Post()
  async create(@Body() createWaterLinkDto: CreateWaterLinkDto, @Req() req) {
    try {
      const data = await this.waterLinkService.create(createWaterLinkDto);
      const user = await this.userService.findOne(req.userId);
      const handleLog = new CreateHandleLogDto(
        user.userId,
        user.realName,
        '新增水资源相关链接',
        `${user.realName}(${user.userId})新增id为${data.id}的供水计划`
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
      const data = await this.waterLinkService.findAll();
      return new Result(Code.GET_OK, Message.Find_Success, data);
    } catch (error) {
      return new Result(Code.SYSTEM_UNKNOW_ERR, Message.Request_Fail, error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req) {
    try {
      const data = await this.waterLinkService.remove(+id);
      const user = await this.userService.findOne(req.userId);
      const handleLog = new CreateHandleLogDto(
        user.userId,
        user.realName,
        '删除水资源相关链接',
        `${user.realName}(${user.userId})删除id为${id}的供水计划`
      )
      await this.handleLogService.create(handleLog);
      return new Result(data.code, data.msg, null);
    } catch (error) {
      return new Result(Code.SYSTEM_UNKNOW_ERR, Message.Request_Fail, error);
    }
  }
}
