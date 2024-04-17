import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { Code } from 'src/Result/Code';
import { Message } from 'src/Result/Message';
import Result from 'src/Result/Result';
import { SendEmailDto } from './dto/send-email.dto';
import { UserService } from 'src/user/user.service';
import { HandleLogService } from 'src/handle-log/handle-log.service';
import { CreateHandleLogDto } from 'src/handle-log/dto/create-handle-log.dto';

@Controller('notice')
export class NoticeController {
  constructor(
    private readonly noticeService: NoticeService,
    private readonly userService: UserService,
    private readonly handleLogService: HandleLogService,
  ) { }

  @Post()
  async create(@Body() createNoticeDto: CreateNoticeDto) {
    const data = await this.noticeService.create(createNoticeDto);
    return new Result(Code.CREATE_OK, Message.Change_Success, data);
  }

  @Post('send')
  async sendEmailBySendId(@Body() sendEmailDto: SendEmailDto, @Req() req) {
    try {
      await this.noticeService.sendEmail(
        sendEmailDto.sendId,
        sendEmailDto.receiveId, // 收件人邮箱地址
        sendEmailDto.title, // 邮件主题
        sendEmailDto.info, // 邮件内容
      );
      const user = await this.userService.findOne(req.userId);
      const handleLog = new CreateHandleLogDto(
        user.userId,
        user.realName,
        '发送邮件',
        `${user.realName}(${user.userId})向${sendEmailDto.receiveId}发送邮件`
      )
      await this.handleLogService.create(handleLog);
      return new Result(Code.GET_OK, Message.Find_Success, '');
    } catch (error) {
      return new Result(Code.SYSTEM_UNKNOW_ERR, Message.Request_Fail, error);
    }
  }

  // 根据收件者Id获取信息
  @Get()
  async findByReceiveId(@Req() req) {
    try {
      const data = await this.noticeService.findByReceiveId(req.userId);
      return new Result(Code.GET_OK, Message.Find_Success, data);
    } catch (error) {
      return new Result(Code.SYSTEM_UNKNOW_ERR, Message.Request_Fail, error);
    }
  }

  // 阅读消息，修改是否已读状态
  @Patch(':id')
  async update(@Param('id') id: string, @Req() req) {
    try {
      const data = await this.noticeService.update(+id);
      if (!data) {
        return new Result(Code.UPDATE_OK, Message.Change_Success, null);
      } else {
        const user = await this.userService.findOne(req.userId);
        const handleLog = new CreateHandleLogDto(
          user.userId,
          user.realName,
          '阅读消息',
          `${user.realName}(${user.userId})阅读id为${id}的通知`
        )
        await this.handleLogService.create(handleLog);
        return new Result(Code.UPDATE_OK, data.msg, null);
      }
    } catch (error) {
      return new Result(Code.SYSTEM_UNKNOW_ERR, Message.Request_Fail, error);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.noticeService.remove(+id);
  }
}
