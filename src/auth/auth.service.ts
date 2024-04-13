// src/auth/auth.service.ts
import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import jwtConfig from '../../config/jwt.config';
import { SignInDto } from './dto/sign-in.dto';
import { HashingService } from './hashing.service';
import { ActiveUserData } from './interfaces/active-user-data.interface';
import { updateResult } from 'src/Result/JudgeResult';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly user: Repository<User>,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly hashingService: HashingService,
  ) { }

  // 登录
  async signIn(signInDto: SignInDto) {
    const { emailOrPhone, password } = signInDto;
    const userInfo = await this.user.findOne({
      where: [{ email: emailOrPhone }, { phone: emailOrPhone }],
    });
    if (!userInfo) throw new UnauthorizedException('User not found');
    const isEqual = await this.hashingService.compare(
      password,
      userInfo.password,
    );
    if (!isEqual) throw new UnauthorizedException('Password is incorrect');
    const token = await this.generateTokens(userInfo);
    return { token, userInfo };
  }

  // 修改密码
  async changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string,
  ) {
    // 查找这个用户是否存在
    const userInfo = await this.user.findOne({
      where: {
        userId,
      },
    });
    if (!userInfo) throw new UnauthorizedException('User not found');
    // 如果存在判断密码是否正确
    const isEqual = await this.hashingService.compare(
      oldPassword,
      userInfo.password,
    );
    console.log(oldPassword, userInfo.password, isEqual);
    if (!isEqual) throw new UnauthorizedException('Password is incorrect');
    // 将新密码加盐存入数据库
    const hashedPassword = await this.hashingService.hash(newPassword);
    console.log(hashedPassword);
    const data = await this.user.update(
      { userId },
      {
        ...userInfo,
        password: hashedPassword
      }
    );
    return updateResult(data);
  }

  // 注册用户
  async signUp(signUpDto: SignUpDto) {
    const { email, phone } = signUpDto;
    // email 和 phone 是唯一标识，判断是否已经存在
    const existingUser = await this.user.findOne({
      where: [{ email }, { phone }],
    });
    if (existingUser) throw new UnauthorizedException('User already exists');
    // 未存在，初始密码为12345678，加盐存入数据库
    const hashedPassword = await this.hashingService.hash('12345678');
    // 创建一个实体
    const user = this.user.create({
      ...signUpDto,
      password: hashedPassword,
    });
    // 存入数据库
    const res = await this.user.save(user);
    return res;
  }

  // 判断登录，获取权限
  async verifyLogin(userId: string) {
    const res = await this.user.findOne({
      where: {
        userId,
      },
      select: ['roles'],
    });
    if (!res) throw new NotFoundException();
    return res.roles;
  }

  async generateTokens(user: User) {
    const token = await this.signToken<Partial<ActiveUserData>>(user.id, {
      userId: user.userId,
    });
    return { token, userId: user.userId };
  }

  private async signToken<T>(userId: number, payload?: T) {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload,
      },
      {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        expiresIn: '5 days',
      },
    );
  }
}
