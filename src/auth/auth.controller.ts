// src/auth/auth.controller.ts
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { Public } from '../common/decorators/public.decorator'; // +
import { SignInDto } from './dto/sign-in.dto';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { ApiOperation } from '@nestjs/swagger';
import Result from 'src/Result/Result';
import { Code } from 'src/Result/Code';
import { Message } from 'src/Result/Message';
import { HandleLogService } from 'src/handle-log/handle-log.service';
import { UserService } from 'src/user/user.service';
import { CreateHandleLogDto } from 'src/handle-log/dto/create-handle-log.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly handleLogService: HandleLogService,
    private readonly userService: UserService,
  ) { }

  @ApiOperation({ summary: '注册' })
  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto, @Req() req) {
    try {
      const data = await this.authService.signUp(signUpDto);
      const user = await this.userService.findOne(req.userId);
      const handleLog = new CreateHandleLogDto(
        user.userId,
        user.realName,
        '新增用户',
        `${user.realName}(${user.userId})新增一名用户Id为${data.userId}的用户`
      )
      await this.handleLogService.create(handleLog);
      return new Result(Code.CREATE_OK, Message.Request_Success, null)
    } catch (error) {
      return new Result(Code.SYSTEM_UNKNOW_ERR, Message.Request_Fail, error);
    }
  }

  @ApiOperation({ summary: '登录' })
  @Public()
  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto) {
    try {
      const { token, userInfo } = await this.authService.signIn(signInDto)
      const handleLog = new CreateHandleLogDto(
        userInfo.userId,
        userInfo.realName,
        '登录',
        `${userInfo.realName}(${userInfo.userId})登录系统`
      )
      await this.handleLogService.create(handleLog);
      return new Result(Code.POST_OK, Message.Login_Success, token);
    } catch (error) {
      return new Result(Code.SYSTEM_UNKNOW_ERR, Message.Request_Fail, error);
    }
  }

  @ApiOperation({ summary: '修改密码' })
  @Post('change_password/:userId')
  async changePassword(
    @Param('userId') userId: string,
    @Body()
    { oldPassword, newPassword }: { oldPassword: string; newPassword: string },
    @Req() req
  ) {
    try {
      const data = await this.authService.changePassword(userId, oldPassword, newPassword);
      const user = await this.userService.findOne(req.userId);
      const handleLog = new CreateHandleLogDto(
        user.userId,
        user.realName,
        '修改密码',
        `${user.realName}(${user.userId})修改密码`
      )
      await this.handleLogService.create(handleLog);
      return new Result(data.code, data.msg, null);
    } catch (error) {
      return new Result(Code.SYSTEM_UNKNOW_ERR, Message.Request_Fail, error);
    }
  }

  @ApiOperation({ summary: '判断登录, 获取roles' })
  @Public()
  @Get('verify_login_status/:userId')
  async verifyLogin(@Param('userId') userId: string) {
    try {
      const data = await this.authService.verifyLogin(userId);
      return new Result(Code.GET_OK, Message.Request_Success, data);
    } catch (error) {
      return new Result(Code.SYSTEM_UNKNOW_ERR, Message.Request_Fail, error);
    }
  }
}
