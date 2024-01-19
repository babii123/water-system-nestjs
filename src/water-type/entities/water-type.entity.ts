import { Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class WaterType {
  @PrimaryGeneratedColumn()
  id: number;
  @PrimaryColumn('varchar')
  type: string;
  @PrimaryColumn('varchar')
  description: string;
}
