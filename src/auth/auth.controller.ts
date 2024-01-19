// src/auth/auth.controller.ts
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { Public } from '../common/decorators/public.decorator'; // +
import { SignInDto } from './dto/sign-in.dto';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { ApiOperation } from '@nestjs/swagger';
import Result from 'src/Result/Result';
import { Code } from 'src/Result/Code';
import { Message } from 'src/Result/Message';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiOperation({ summary: '注册' })
  @Public()
  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @ApiOperation({ summary: '登录' })
  @Public()
  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto) {
    const data = await this.authService.signIn(signInDto)
    return new Result(Code.POST_OK, Message.Login_Success, data);
  }

  @ApiOperation({ summary: '修改密码' })
  @Post('change_password/:userId')
  changePassword(
    @Param('userId') userId: string,
    @Body()
    { oldPassword, newPassword }: { oldPassword: string; newPassword: string },
  ) {
    return this.authService.changePassword(userId, oldPassword, newPassword);
  }

  @ApiOperation({ summary: '判断登录, 获取roles' })
  @Public()
  @Get('verify_login_status/:userId')
  async verifyLogin(@Param('userId') userId: string) {
    const data = await this.authService.verifyLogin(userId);
    return new Result(Code.GET_OK, Message.Request_Success, data);
  }
}
