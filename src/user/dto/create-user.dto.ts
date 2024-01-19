import { Gender, UserRole } from '../entities/user.entity';

export class CreateUserDto {
  readonly realName: string;
  readonly accountName: string;
  readonly email: string;
  readonly phone: string;
  readonly sex: Gender;
  readonly birthday: Date;
  readonly roles: Array<UserRole>;
}
