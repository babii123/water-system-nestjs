import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { HandleLogService } from './handle-log.service';
import { CreateHandleLogDto } from './dto/create-handle-log.dto';
import { UpdateHandleLogDto } from './dto/update-handle-log.dto';
import { UserService } from 'src/user/user.service';
import Result from 'src/Result/Result';
import { Code } from 'src/Result/Code';
import { Message } from 'src/Result/Message';

@Controller('handle-log')
export class HandleLogController {
  constructor(
    private readonly handleLogService: HandleLogService,
    private readonly userService: UserService
  ) { }

  @Get()
  async findAll() {
    try {
      const data = await this.handleLogService.findAll();
      return new Result(Code.GET_OK, Message.Find_Success, data);
    } catch (error) {
      return new Result(Code.SYSTEM_UNKNOW_ERR, Message.Request_Fail, error);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.handleLogService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHandleLogDto: UpdateHandleLogDto) {
    return this.handleLogService.update(+id, updateHandleLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.handleLogService.remove(+id);
  }
}
