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

@ApiTags('用户管理')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @ApiOperation({
    summary: '获取登录用户的roles',
    description: '前端守卫判断用户权限',
  })
  @Public()
  @Get('verify_roles/:userId')
  async verifyRoles(@Param('userId') userId: string) {
    let code = Code.POST_ERR;
    let msg = Message.Request_Fail;
    const data = await this.userService.verifyRoles(userId);
    if (data) {
      code = Code.POST_OK;
      msg = Message.Request_Success;
    }
    return new Result(code, msg, data);
  }

  @ApiOperation({
    summary: '获取所有用户信息',
    description: '获取所有用户信息返回一个列表',
  })
  @Public()
  @Get()
  async findAll() {
    const data = await this.userService.findAll();
    return new Result(Code.GET_OK, Message.Find_Success, data);
  }

  @Public()
  @Get('/getUser_dashboard')
  async getUserToDashboard() {
    const data = await this.userService.getUserToDashboard()
    return new Result(Code.GET_OK, Message.Find_Success, data)
  }

  @Public()
  @Get('/findByCondition')
  async findByCondition(
    @Query('email') email?: string,
    @Query('realName') realName?: string,
    @Query('phone') phone?: string) {
    console.log(email, realName, phone);
    const data = await this.userService.findByCondition(email, realName, phone);
    return new Result(Code.GET_OK, Message.Find_Success, data);
  }
  
  @Public()
  @Get(':userId')
  async findOne(@Param('userId') userId: string) {
    const data = await this.userService.findOne(userId);
    return new Result(Code.GET_OK, Message.Find_Success, data);
  }

  @Public()
  @ApiOperation({
    summary: '修改用户信息（个人中心）',
    description: '修改用户信息',
  })
  @Patch(':userId')
  async update(
    @Param('userId') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const data = await this.userService.update(id, updateUserDto);
    return new Result(data.code, data.msg, null);
  }

  @ApiOperation({
    summary: '删除用户信息',
    description: '根据userId删除用户信息',
  })
  @Public()
  @Delete(':userId')
  async remove(@Param('userId') userId: string) {
    const data = await this.userService.remove(userId);
    return new Result(data.code, data.msg, null);
  }

  @ApiOperation({ summary: '批量删除用户', description: '根据id删除用户信息' })
  @Public()
  @Delete('/delete_multi/:idStr')
  async removeMulti(@Param('idStr') idStr: string) {
    const idList = idStr.split(',').map((item) => {
      return parseInt(item);
    });
    const data = await this.userService.removeMulti(idList);
    return new Result(data.code, data.msg, data.data);
  }
}
