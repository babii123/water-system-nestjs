import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class WaterLink {
  @PrimaryGeneratedColumn()
  id:number;
  @Column('varchar')
  title: string;
  @Column('varchar')
  link: string;
}
