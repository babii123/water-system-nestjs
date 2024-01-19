import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class WaterPrice {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('varchar')
  type: string;
  @Column({ type: 'double', name: 'basic_price' })
  basicPrice: number;
  @Column({ type: 'double', name: 'resource_cost' })
  resourceCost: number;
  @Column({ type: 'double', name: 'pollution_cost' })
  pollutionCost: number;
  @Column({ type: 'double', name: 'real_price' })
  realPrice: number;
}
