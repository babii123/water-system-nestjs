import {
  Entity,
  PrimaryGeneratedColumn,
  Generated,
  Column,
  Unique,
  PrimaryColumn,
} from 'typeorm';

export enum Gender {
  MALE = 1,
  FEMALE = 2,
}

export enum UserRole {
  ADMIN = 'admin',
  ENGINEER = 'engineer',
  SEARCHER = 'searcher',
}

@Entity()
@Unique(['email', 'phone', 'userId'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @PrimaryColumn({ name: 'user_id' })
  @Generated('uuid')
  userId: string;
  @Column({ type: 'varchar', default: '12345678' })
  password: string;
  @Column('varchar')
  email: string;
  @Column({ type: 'varchar', name: 'real_name' })
  realName: string;
  @Column({ type: 'varchar', name: 'account_name' })
  accountName: string;
  @Column()
  phone: string;
  @Column({ type: 'enum', enum: Gender, default: Gender.FEMALE })
  sex: number;
  @Column('date')
  birthday: Date;
  @Column({ type: 'set', enum: UserRole, default: [] })
  roles: UserRole[];
}
