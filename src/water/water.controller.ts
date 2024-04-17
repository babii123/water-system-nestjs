import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
} from '@nestjs/common';
import { WaterService } from './water.service';
import { CreateWaterDto } from './dto/create-water.dto';
import { UpdateWaterDto } from './dto/update-water.dto';
import Result from 'src/Result/Result';
import { Code } from 'src/Result/Code';
import { Message } from 'src/Result/Message';
import { Public } from 'src/common/decorators/public.decorator';
import { UserService } from 'src/user/user.service';
import { HandleLogService } from 'src/handle-log/handle-log.service';
import { ApiOperation } from '@nestjs/swagger';
import { CreateHandleLogDto } from 'src/handle-log/dto/create-handle-log.dto';
import { UserRole } from 'src/user/entities/user.entity';

@Controller('water')
export class WaterController {
  constructor(
    private readonly waterService: WaterService,
    private readonly userService: UserService,
    private readonly handleLogService: HandleLogService,
  ) { }

  @ApiOperation({ summary: '新增水资源', description: '' })
  @Post()
  async create(@Body() createWaterDto: CreateWaterDto,@Req() req) {
    try {
      const data = await this.waterService.create(createWaterDto);
      const user = await this.userService.findOne(req.userId);
      const handleLog = new CreateHandleLogDto(
        user.userId,
        user.realName,
        '新增水资源',
        `${user.realName}(${user.userId})新增id为${data.id}的水资源`
      )
      await this.handleLogService.create(handleLog);
      return new Result(Code.CREATE_OK, Message.Change_Success, data);
    } catch (error) {
      return new Result(Code.SYSTEM_UNKNOW_ERR, Message.Request_Fail, error);
    }
  }

  @ApiOperation({ summary: '查找所有水资源', description: '' })
  @Get()
  async findAll(@Req() req) {
    try {
      const user = await this.userService.findOne(req.userId);
      const data = await this.waterService.findAll(user.roles);
      return new Result(Code.GET_OK, Message.Find_Success, data);
    } catch (error) {
      return new Result(Code.SYSTEM_UNKNOW_ERR, Message.Request_Fail, error);
    }
  }

  @ApiOperation({ summary: '获取水资源可视化数据', description: '' })
  @Get('/getWater_dashboard')
  async getWaterCountToBashboard() {
    try {
      const data = await this.waterService.getWaterCountToBashboard()
      return new Result(Code.GET_OK, Message.Find_Success, data);
    } catch (error) {
      return new Result(Code.SYSTEM_UNKNOW_ERR, Message.Request_Fail, error);
    }
  }

  @ApiOperation({ summary: '按waterArea和waterType查找水资源', description: '' })
  @Get('/findByCondition')
  async findByCondition(@Query('waterArea') waterArea?: string, @Query('waterType') waterType?: string) {
    try {
      const data = await this.waterService.findByCondition(waterArea, waterType);
      return new Result(Code.GET_OK, Message.Find_Success, data);
    } catch (error) {
      return new Result(Code.SYSTEM_UNKNOW_ERR, Message.Request_Fail, error);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.waterService.findOne(+id);
  }

  @ApiOperation({ summary: '修改水资源', description: '' })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateWaterDto: UpdateWaterDto, @Req() req) {
    try {
      const data = await this.waterService.update(+id, updateWaterDto);
      const user = await this.userService.findOne(req.userId);
      const handleLog = new CreateHandleLogDto(
        user.userId,
        user.realName,
        '修改水资源',
        `${user.realName}(${user.userId})修改id为${id}的水资源`
      )
      await this.handleLogService.create(handleLog);
      return new Result(data.code, data.msg, null);
    } catch (error) {
      return new Result(Code.SYSTEM_UNKNOW_ERR, Message.Request_Fail, error);
    }
  }

  @ApiOperation({ summary: '彻底删除水资源', description: '' })
  @Delete(':idList')
  async remove(@Param('idList') idStr: string, @Req() req) {
    try {
      const idList = idStr.split(',').map((item) => {
        return parseInt(item);
      });
      this.waterService.remove(idList);
      const user = await this.userService.findOne(req.userId);
      const handleLog = new CreateHandleLogDto(
        user.userId,
        user.realName,
        '彻底删除水资源',
        `${user.realName}(${user.userId})彻底删除id为${idStr}的水资源`
      )
      await this.handleLogService.create(handleLog);
      return new Result(Code.DELETE_OK, Message.Del_Success, null);
    } catch (error) {
      return new Result(Code.SYSTEM_UNKNOW_ERR, Message.Request_Fail, error);
    }
  }

  @ApiOperation({ summary: '标记删除水资源', description: '' })
  @Delete('/delete_description/:id/:delReason')
  async deleteByDelReason(@Param('id') id: string, @Param('delReason') delReason: string, @Req() req) {
    try {
      const data = await this.waterService.deleteByDelReason(+id, delReason);
      const user = await this.userService.findOne(req.userId);
      const handleLog = new CreateHandleLogDto(
        user.userId,
        user.realName,
        '标记删除水资源',
        `${user.realName}(${user.userId})标记删除id为${id}的水资源`
      )
      await this.handleLogService.create(handleLog);
      return new Result(data.code, data.msg, null);
    } catch (error) {
      return new Result(Code.SYSTEM_UNKNOW_ERR, Message.Request_Fail, error);
    }
  }

  @ApiOperation({ summary: '批量删除水资源', description: '' })
  @Delete('/delete_multi/:idStr/:delReason')
  async removeMulti(@Param('idStr') idStr: string, @Param('delReason') delReason: string, @Req() req) {
    try {
      const user = await this.userService.findOne(req.userId);
      const idList = idStr.split(',').map((item) => {
        return parseInt(item);
      });
      const handle = user.roles.includes(UserRole.ADMIN) ? '彻底删除' : '标记删除';
      const data = await this.waterService.removeMulti(idList, delReason, user.roles);
      const handleLog = new CreateHandleLogDto(
        user.userId,
        user.realName,
        `${handle}水资源`,
        `${user.realName}(${user.userId})${handle}id为${idStr}的水资源`
      )
      await this.handleLogService.create(handleLog);
      return new Result(data.code, data.msg, data.data);
    } catch (error) {
      return new Result(Code.SYSTEM_UNKNOW_ERR, Message.Request_Fail, error);
    }
  }
}
