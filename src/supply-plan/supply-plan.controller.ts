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
import { SupplyPlanService } from './supply-plan.service';
import { CreateSupplyPlanDto } from './dto/create-supply-plan.dto';
import { UpdateSupplyPlanDto } from './dto/update-supply-plan.dto';
import { ApiOperation } from '@nestjs/swagger';
import Result from 'src/Result/Result';
import { Code } from 'src/Result/Code';
import { Message } from 'src/Result/Message';
import { UserService } from 'src/user/user.service';
import { HandleLogService } from 'src/handle-log/handle-log.service';
import { CreateHandleLogDto } from 'src/handle-log/dto/create-handle-log.dto';
import { UserRole } from 'src/user/entities/user.entity';

@Controller('supply-plan')
export class SupplyPlanController {
  constructor(
    private readonly supplyPlanService: SupplyPlanService,
    private readonly userService: UserService,
    private readonly handleLogService: HandleLogService,
  ) { }

  @ApiOperation({ summary: '新增供水计划', description: '' })
  @Post()
  async create(@Body() createSupplyPlanDto: CreateSupplyPlanDto, @Req() req) {
    try {
      const data = await this.supplyPlanService.create(createSupplyPlanDto);
      const user = await this.userService.findOne(req.userId);
      const handleLog = new CreateHandleLogDto(
        user.userId,
        user.realName,
        '新增供水计划',
        `${user.realName}(${user.userId})新增id为${data.id}的供水计划`
      )
      await this.handleLogService.create(handleLog);
      return new Result(Code.CREATE_OK, Message.Change_Success, data);
    } catch (error) {
      return new Result(Code.SYSTEM_UNKNOW_ERR, Message.Request_Fail, error);
    }
  }

  @ApiOperation({ summary: '获取所有供水计划', description: '' })
  @Get()
  async findAll(@Req() req) {
    try {
      const user = await this.userService.findOne(req.userId);
      const data = await this.supplyPlanService.findAll(user.roles);
      return new Result(Code.GET_OK, Message.Find_Success, data);
    } catch (error) {
      return new Result(Code.SYSTEM_UNKNOW_ERR, Message.Request_Fail, error);
    }
  }

  @Get('/getPlan_dashboard')
  async getWaterToBashboard() {
    try {
      const data = await this.supplyPlanService.getWaterToBashboard()
      return new Result(Code.GET_OK, Message.Find_Success, data);
    } catch (error) {
      return new Result(Code.SYSTEM_UNKNOW_ERR, Message.Request_Fail, error);
    }
  }

  @Get('/findByCondition')
  async findByCondition(
    @Query('waterArea') waterArea?: string,
    @Query('waterPriceType') waterPriceType?: string) {
    try {
      const data = await this.supplyPlanService.findByCondition(waterArea, waterPriceType);
      return new Result(Code.GET_OK, Message.Find_Success, data);
    } catch (error) {
      return new Result(Code.SYSTEM_UNKNOW_ERR, Message.Request_Fail, error);
    }
  }

  @ApiOperation({ summary: 'id查询计划', description: '' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.supplyPlanService.findOne(+id);
  }

  @ApiOperation({ summary: '修改计划', description: '' })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSupplyPlanDto: UpdateSupplyPlanDto,
    @Req() req
  ) {
    try {
      const data = await this.supplyPlanService.update(+id, updateSupplyPlanDto);
      const user = await this.userService.findOne(req.userId);
      const handleLog = new CreateHandleLogDto(
        user.userId,
        user.realName,
        '修改供水计划',
        `${user.realName}(${user.userId})修改id为${id}的供水计划`
      )
      await this.handleLogService.create(handleLog);
      return new Result(data.code, data.msg, null);
    } catch (error) {
      return new Result(Code.SYSTEM_UNKNOW_ERR, Message.Request_Fail, error);
    }
  }

  @ApiOperation({ summary: '删除计划', description: '' })
  @Delete(':idList')
  async remove(@Param('idList') idStr: string, @Req() req) {
    try {
      const idList = idStr.split(',').map((item) => {
        return parseInt(item);
      });
      this.supplyPlanService.remove(idList);
      const user = await this.userService.findOne(req.userId);
      const handleLog = new CreateHandleLogDto(
        user.userId,
        user.realName,
        '彻底删除',
        `${user.realName}(${user.userId})彻底删除id为${idStr}的供水计划`
      )
      await this.handleLogService.create(handleLog);
      return new Result(Code.DELETE_OK, Message.Del_Success, null);
    } catch (error) {
      return new Result(Code.SYSTEM_UNKNOW_ERR, Message.Request_Fail, error);
    }
  }

  @ApiOperation({ summary: '删除计划根据原因', description: '' })
  @Delete('/delete_description/:id/:delReason')
  async deleteByDelReason(
    @Param('id') id: string,
    @Param('delReason') delReason: string,
    @Req() req
  ) {
    try {
      const data = await this.supplyPlanService.deleteByDelReason(+id, delReason);
      const user = await this.userService.findOne(req.userId);
      const handleLog = new CreateHandleLogDto(
        user.userId,
        user.realName,
        '标记删除',
        `${user.realName}(${user.userId})标记删除id为${id}的供水计划`
      )
      await this.handleLogService.create(handleLog);
      return new Result(data.code, data.msg, null);
    } catch (error) {
      return new Result(Code.SYSTEM_UNKNOW_ERR, Message.Request_Fail, error);
    }
  }

  @ApiOperation({ summary: '批量删除供水计划', description: '' })
  @Delete('/delete_multi/:idStr/:delReason')
  async removeMulti(@Param('idStr') idStr: string, @Param('delReason') delReason: string, @Req() req) {
    try {
      const user = await this.userService.findOne(req.userId);
      const idList = idStr.split(',').map((item) => {
        return parseInt(item);
      });
      const handle = user.roles.includes(UserRole.ADMIN) ? '彻底删除' : '标记删除';
      const data = await this.supplyPlanService.removeMulti(idList, delReason, user.roles);
      const handleLog = new CreateHandleLogDto(
        user.userId,
        user.realName,
        `${handle}供水计划`,
        `${user.realName}(${user.userId})${handle}id为${idStr}的供水计划`
      )
      await this.handleLogService.create(handleLog);
      return new Result(data.code, data.msg, data.data);
    } catch (error) {
      return new Result(Code.SYSTEM_UNKNOW_ERR, Message.Request_Fail, error);
    }
  }
}
