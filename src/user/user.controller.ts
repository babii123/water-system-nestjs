import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Query,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import Result from 'src/Result/Result';
import { Code } from 'src/Result/Code';
import { Message } from 'src/Result/Message';
import { Public } from 'src/common/decorators/public.decorator';
import { CreateHandleLogDto } from 'src/handle-log/dto/create-handle-log.dto';
import { HandleLogService } from 'src/handle-log/handle-log.service';

@ApiTags('用户管理')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly handleLogService: HandleLogService,
  ) { }

  @ApiOperation({
    summary: '获取所有用户信息',
    description: '获取所有用户信息返回一个列表',
  })
  @Public()
  @Get()
  async findAll() {
    try {
      const data = await this.userService.findAll();
      return new Result(Code.GET_OK, Message.Find_Success, data);
    } catch (error) {
      return new Result(Code.SYSTEM_UNKNOW_ERR, Message.Request_Fail, error);
    }
  }

  @Public()
  @Get('/getUser_dashboard')
  async getUserToDashboard() {
    try {
      const data = await this.userService.getUserToDashboard()
      return new Result(Code.GET_OK, Message.Find_Success, data)
    } catch (error) {
      return new Result(Code.SYSTEM_UNKNOW_ERR, Message.Request_Fail, error);
    }
  }

  @Public()
  @Get('/findByCondition')
  async findByCondition(@Query('email') email?: string, @Query('realName') realName?: string, @Query('phone') phone?: string) {
    try {
      const data = await this.userService.findByCondition(email, realName, phone);
      return new Result(Code.GET_OK, Message.Find_Success, data);
    } catch (error) {
      return new Result(Code.SYSTEM_UNKNOW_ERR, Message.Request_Fail, error);
    }
  }

  @Get(':userId')
  async findOne(@Param('userId') userId: string) {
    try {
      const data = await this.userService.findOne(userId);
      return new Result(Code.GET_OK, Message.Find_Success, data);
    } catch (error) {
      return new Result(Code.SYSTEM_UNKNOW_ERR, Message.Request_Fail, error);
    }
  }

  @ApiOperation({
    summary: '修改用户信息（个人中心）',
    description: '修改用户信息',
  })
  @Patch(':userId')
  async update(
    @Param('userId') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req
  ) {
    try {
      const data = await this.userService.update(id, updateUserDto);
      const user = await this.userService.findOne(req.userId);
      const handleLog = new CreateHandleLogDto(
        user.userId,
        user.realName,
        '修改用户信息',
        `${user.realName}(${user.userId})修改用户id为${id}的用户信息`
      )
      await this.handleLogService.create(handleLog);
      return new Result(data.code, data.msg, null);
    } catch (error) {
      return new Result(Code.SYSTEM_UNKNOW_ERR, Message.Request_Fail, error);
    }
  }

  @ApiOperation({
    summary: '删除用户信息',
    description: '根据userId删除用户信息',
  })
  @Delete(':userId')
  async remove(@Param('userId') userId: string, @Req() req) {
    try {
      const data = await this.userService.remove(userId);
      const user = await this.userService.findOne(req.userId);
      const handleLog = new CreateHandleLogDto(
        user.userId,
        user.realName,
        '删除用户信息',
        `${user.realName}(${user.userId})删除用户id为${userId}的用户信息`
      )
      await this.handleLogService.create(handleLog);
      return new Result(data.code, data.msg, null);
    } catch (error) {
      return new Result(Code.SYSTEM_UNKNOW_ERR, Message.Request_Fail, error);
    }
  }

  @ApiOperation({ summary: '批量删除用户', description: '根据id删除用户信息' })
  @Public()
  @Delete('/delete_multi/:idStr')
  async removeMulti(@Param('idStr') idStr: string, @Req() req) {
    try {
      const idList = idStr.split(',').map((item) => {
        return parseInt(item);
      });
      const data = await this.userService.removeMulti(idList);
      const user = await this.userService.findOne(req.userId);
      const handleLog = new CreateHandleLogDto(
        user.userId,
        user.realName,
        '批量删除用户信息',
        `${user.realName}(${user.userId})修改id为${idStr}的用户信息`
      )
      await this.handleLogService.create(handleLog);
      return new Result(data.code, data.msg, data.data);
    } catch (error) {
      return new Result(Code.SYSTEM_UNKNOW_ERR, Message.Request_Fail, error);
    }
  }
}
