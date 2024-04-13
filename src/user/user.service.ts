import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from './entities/user.entity';
import { In, Like, Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { Code } from 'src/Result/Code';
import { deleteResult, updateResult } from 'src/Result/JudgeResult';
import { Message } from 'src/Result/Message';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
  ) { }

  async updatePassword(
    userId: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<{ code: number; msg: string }> {
    // 查不到则 res 为 null
    const res = await this.user.findOne({
      where: {
        userId,
        password: oldPassword,
      },
    });

    if (res) {
      const res1 = await this.user.update(
        { userId: userId },
        { password: newPassword },
      );
      return updateResult(res1);
    }
    return { code: Code.UPDATE_ERR, msg: '原密码错误!!!' };
  }

  async verifyRoles(userId: string) {
    const res = await this.user.findOne({
      where: {
        userId,
      },
    });

    if (!res) throw new NotFoundException('User list is null');

    return res;
  }

  async findAll() {
    const res = this.user.find({
      select: [
        'id',
        'userId',
        'realName',
        'accountName',
        'email',
        'phone',
        'birthday',
        'sex',
        'roles',
      ],
    });
    if (!res) throw new NotFoundException('User list is null');
    return res;
  }

  async findOne(userId: string) {
    const res = await this.user.findOne({
      where: {
        userId,
      },
      select: [
        'id',
        'userId',
        'realName',
        'accountName',
        'email',
        'phone',
        'birthday',
        'sex',
        'roles'
      ],
    });
    if (!res) throw new NotFoundException('User list is null');
    return res;
  }

  async findByCondition(email?: string, realName?: string, phone?: string) {
    const data = await this.user.find({
      where: {
        email: email ? email : undefined,
        realName: realName ? realName : undefined,
        phone: phone ? phone : undefined,
      }
    })
    return data
  }

  async update(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<{ code: number; msg: string }> {
    const res = await this.user.update({ userId }, updateUserDto);
    return updateResult(res);
  }

  async remove(userId: string): Promise<{ code: number; msg: string }> {
    const res = await this.user.delete({ userId });
    return deleteResult(res);
  }

  async removeMulti(
    idList: number[],
  ): Promise<{ code: number; msg: string; data: any }> {
    const users = await this.user.find({ where: { id: In(idList) } });
    const res = await this.user.remove(users);
    return {
      code: res ? Code.DELETE_OK : Code.DELETE_ERR,
      msg: res ? Message.Del_Success : Message.Del_Fail,
      data: res,
    };
  }

  async getUserToDashboard() {
    // 用户总数量
    const [, allCount] = await this.user.findAndCount()
    // 各个角色的数量
    const [adminList, adminCount] = await this.user.findAndCountBy({
      roles: Like(`%${UserRole.ADMIN}%`)
    })
    const [, engineerCount] = await this.user.findAndCountBy({
      roles: Like(`%${UserRole.ENGINEER}%`)
    })
    const [, searcherCount] = await this.user.findAndCountBy({
      roles: Like(`%${UserRole.SEARCHER}%`)
    })
    return {
      allCount,
      adminCount,
      engineerCount,
      searcherCount,
      adminList
    }
  }

  async getAdmin() {
    const data = await this.user.find({
      where:{
        roles: Like(`%${UserRole.ADMIN}%`)
      }
    })
    return data;
  }
}
