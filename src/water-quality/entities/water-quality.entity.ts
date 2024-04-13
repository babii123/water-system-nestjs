import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class WaterQuality {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'int', name: 'resource_id' })
  resourceId: number;
  @Column({ type: 'date', name: 'add_time' })
  addTime: Date;
  @Column({ type: 'varchar', name: 'add_user', comment: '添加人' })
  addUser: string;
  @Column({ type: 'date', name: 'detect_time' })
  detectTime: Date;
  @Column({ type: 'simple-json', name: 'detect_people' })
  detectPeople: string[];
  @Column({ type: 'float', name: 'ph', comment: 'ph值' })
  ph: number;
  @Column({ type: 'float', name: 'turbidity', comment: '浊度值' })
  turbidity: number;
  @Column({ type: 'float', name: 'fluoride', comment: '含氟量' })
  fluoride: number;
  @Column({ type: 'float', name: 'cyanin', comment: '含氰量' })
  cyanin: number;
  @Column({ type: 'boolean', name: 'is_del', default: false })
  isDel: boolean;
  @Column({ type: 'varchar', name: 'del_reason', default: '' })
  delReason: string;
}
