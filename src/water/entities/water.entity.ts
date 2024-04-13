import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Water {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('varchar')
  type: string;
  @Column({ type: 'varchar', name: 'water_name', unique: true })
  waterName: string;
  @Column('varchar')
  address: string;
  @Column('varchar')
  description: string;
  @Column({ type: 'date', name: 'add_time' })
  addTime: Date;
  @Column({ type: 'varchar', name: 'add_user' })
  addUser: string;
  @Column({ type: 'simple-json', name: 'check_user' })
  checkUser: string[];
  @Column({ type: 'boolean', name: 'is_del', default: false })
  isDel: boolean;
  @Column({ type: 'varchar', name: 'del_reason', default: '' })
  delReason: string;
}
