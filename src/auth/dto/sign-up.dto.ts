import { Gender, UserRole } from 'src/user/entities/user.entity';

export class SignUpDto {
  readonly realName: string;
  readonly accountName: string;
  readonly email: string;
  readonly phone: string;
  readonly sex: Gender;
  readonly birthday: Date;
  readonly roles: Array<UserRole>;
}
