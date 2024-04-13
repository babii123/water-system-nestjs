import { Water } from 'src/water/entities/water.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SupplyPlan {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'date', name: 'add_time' })
  addTime: Date;
  @Column({ type: 'date', name: 'start_time' })
  startTime: Date;
  @Column({ type: 'date', name: 'end_time' })
  endTime: Date;
  @Column({ type: 'simple-json', name: 'water_sources' })
  waterSources: string[];
  @Column({ type: 'varchar', name: 'water_area' })
  waterArea: string;
  @Column({ type: 'varchar', name: 'water_price_type' })
  waterPriceType: string;
  @Column('varchar')
  description: string;
  @Column({ type: 'varchar', name: 'add_user' })
  addUser: string;
  @Column({ type: 'boolean', name: 'is_del', default: false })
  isDel: boolean;
  @Column({ type: 'varchar', name: 'del_reason', default: '' })
  delReason: string;
}
