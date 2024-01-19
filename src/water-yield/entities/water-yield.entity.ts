import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class WaterYield {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'int', name: 'resource_id' })
  resourceId: number;
  @Column({ type: 'date', name: 'add_time' })
  addTime: Date;
  @Column({ type: 'varchar', name: 'add_user' })
  addUser: string;
  @Column({ type: 'date', name: 'detect_time' })
  detectTime: Date;
  @Column({ type: 'simple-json', name: 'detect_people' })
  detectPeople: string[];
  @Column({ type: 'float', name: 'supply', comment: '供水量' })
  supply: number;
  @Column({ type: 'float', name: 'storage', comment: '库存量' })
  storage: number;
  @Column({ type: 'boolean', name: 'is_del', default: false })
  isDel: boolean;
  @Column({ type: 'varchar', name: 'del_reason', default: '' })
  delReason: string;
}
