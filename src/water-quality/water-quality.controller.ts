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
import { WaterQualityService } from './water-quality.service';
import { CreateWaterQualityDto } from './dto/create-water-quality.dto';
import { UpdateWaterQualityDto } from './dto/update-water-quality.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { Code } from 'src/Result/Code';
import { Message } from 'src/Result/Message';
import Result from 'src/Result/Result';
import { NoticeService } from 'src/notice/notice.service';
import checkQuality from 'src/utils/checkQuality';
import { UserService } from 'src/user/user.service';
import { CreateNoticeDto } from 'src/notice/dto/create-notice.dto';
import { HandleLogService } from 'src/handle-log/handle-log.service';
import { CreateHandleLogDto } from 'src/handle-log/dto/create-handle-log.dto';
import { UserRole } from 'src/user/entities/user.entity';
import { WebsocketGateway } from 'src/websocket/websocket.gateway'
import { WaterService } from 'src/water/water.service';

@Controller('water-quality')
export class WaterQualityController {
  constructor(
    private readonly waterQualityService: WaterQualityService,
    private readonly noticeService: NoticeService,
    private readonly userService: UserService,
    private readonly handleLogService: HandleLogService,
    private readonly WebsocketGateway: WebsocketGateway,
    private readonly waterService: WaterService,
  ) { }

  @Post()
  async create(@Body() createWaterQualityDto: CreateWaterQualityDto, @Req() req) {
    try {
      const user = await this.userService.findOne(req.userId);
      const data = await this.waterQualityService.create({ ...createWaterQualityDto, addUser: user.realName });
      const water = await this.waterService.findOne(createWaterQualityDto.resourceId);
      const waterInfo = `${water.waterName} - ${water.id}(水资源ID)`
      // 判断是否符合水质标准，不符合则报警
      const { result, info } = checkQuality(createWaterQualityDto);
      if (!result) {
        // 查询所有超级管理员
        const admins = await this.userService.getAdmin();
        for (const admin of admins) {
          // 向超级管理员发送信息
          await this.noticeService.sendEmail('system', admin.email, `水质报警 - ${waterInfo}`, `* 水资源信息：${waterInfo}\n${info}`);
          // 将信息存入数据库
          const notice = new CreateNoticeDto();
          notice.type = `水质报警 - ${waterInfo}`;
          notice.info = `* 水资源信息：${waterInfo}\n${info}`;
          notice.sendId = 'system';
          notice.receiveId = admin.userId;
          notice.time = new Date();
          const noticeInfo = await this.noticeService.create(notice);
          // 实时通知前端
          this.WebsocketGateway.sendNotificationToUser(admin.userId, noticeInfo);
        }
      }
      const handleLog = new CreateHandleLogDto(
        user.userId,
        user.realName,
        '新增水质信息',
        `${user.realName}(${user.userId})修改id为${data.id}的水质信息`
      )
      await this.handleLogService.create(handleLog);
      return new Result(Code.CREATE_OK, Message.Change_Success, data);
    } catch (error) {
      return new Result(Code.SYSTEM_UNKNOW_ERR, Message.Request_Fail, error);
    }
  }

  @Get()
  async findAll(@Req() req) {
    try {
      const user = await this.userService.findOne(req.userId);
      const data = await this.waterQualityService.findAll(user.roles);
      return new Result(Code.GET_OK, Message.Find_Success, data);
    } catch (error) {
      return new Result(Code.SYSTEM_UNKNOW_ERR, Message.Request_Fail, error);
    }
  }

  @Get('getWaterQuality_dashboard')
  async getWaterQualityToBashboard() {
    try {
      const data = await this.waterQualityService.getWaterQualityToBashboard();
      return new Result(Code.GET_OK, Message.Find_Success, data);
    } catch (error) {
      return new Result(Code.SYSTEM_UNKNOW_ERR, Message.Request_Fail, error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const data = await this.waterQualityService.findOne(+id);
      return new Result(Code.GET_OK, Message.Find_Success, data);
    } catch (error) {
      return new Result(Code.SYSTEM_UNKNOW_ERR, Message.Request_Fail, error);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateWaterQualityDto: UpdateWaterQualityDto, @Req() req
  ) {
    try {
      const data = await this.waterQualityService.update(+id, updateWaterQualityDto);
      // 判断是否符合水质标准，不符合则报警
      const { result, info } = checkQuality(updateWaterQualityDto);
      const water = await this.waterService.findOne(updateWaterQualityDto.resourceId);
      const waterInfo = `${water.waterName} - ${water.id}(水资源ID)`;
      if (!result) {
        // 向超级管理员发送信息
        const admins = await this.userService.getAdmin();
        for (const admin of admins) {
          // 查询所有超级管理员
          await this.noticeService.sendEmail('system', admin.email, `水质报警 - ${waterInfo}`, `* 水资源信息：${waterInfo}\n${info}`);
          // 将信息存入数据库
          const notice = new CreateNoticeDto();
          notice.type = `水质报警 - ${waterInfo}`;
          notice.info = `* 水资源信息：${waterInfo}\n${info}`;
          notice.sendId = 'system';
          notice.receiveId = admin.userId;
          notice.time = new Date();
          const noticeInfo = await this.noticeService.create(notice);
          // 实时通知前端
          this.WebsocketGateway.sendNotificationToUser(admin.userId, noticeInfo);
        }
      }
      const user = await this.userService.findOne(req.userId);
      const handleLog = new CreateHandleLogDto(
        user.userId,
        user.realName,
        '修改水质信息',
        `${user.realName}(${user.userId})修改id为${id}的水质信息`
      )
      await this.handleLogService.create(handleLog);
      return new Result(Code.UPDATE_OK, Message.Change_Success, null);
    } catch (error) {
      console.log(error);
      return new Result(Code.SYSTEM_UNKNOW_ERR, Message.Request_Fail, error);
    }
  }

  @Delete(':idStr')
  async remove(@Param('idStr') idStr: string, @Req() req) {
    try {
      const idList = idStr.split(',').map((item) => {
        return parseInt(item);
      });
      this.waterQualityService.remove(idList);
      const user = await this.userService.findOne(req.userId);
      const handleLog = new CreateHandleLogDto(
        user.userId,
        user.realName,
        '彻底删除水质信息',
        `${user.realName}(${user.userId})彻底删除id为${idStr}的水质信息`
      )
      await this.handleLogService.create(handleLog);
      return new Result(Code.DELETE_OK, Message.Del_Success, null);
    } catch (error) {
      return new Result(Code.SYSTEM_UNKNOW_ERR, Message.Request_Fail, error);
    }
  }

  @Public()
  @Delete('/delete_description/:id/:delReason')
  async deleteByDelReason(@Param('id') id: string, @Param('delReason') delReason: string, @Req() req) {
    try {
      const data = await this.waterQualityService.deleteByDelReason(+id, delReason);
      const user = await this.userService.findOne(req.userId);
      const handleLog = new CreateHandleLogDto(
        user.userId,
        user.realName,
        '标记删除水质信息',
        `${user.realName}(${user.userId})标记删除id为${id}的水质信息`
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
      const handle = user.roles.includes(UserRole.ADMIN) ? '彻底删除' : '标记删除';
      const data = await this.waterQualityService.removeMulti(idList, delReason, user.roles);
      const handleLog = new CreateHandleLogDto(
        user.userId,
        user.realName,
        `${handle}水质信息`,
        `${user.realName}(${user.userId})${handle}id为${idStr}的水质信息`
      )
      await this.handleLogService.create(handleLog);
      return new Result(data.code, data.msg, data.data);
    } catch (error) {
      return new Result(Code.SYSTEM_UNKNOW_ERR, Message.Request_Fail, error);
    }
  }
}
