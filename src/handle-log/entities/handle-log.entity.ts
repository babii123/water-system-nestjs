import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class HandleLog {
  @PrimaryGeneratedColumn()
  id: number
  @Column('varchar')
  userId: string
  @Column('varchar')
  realName: string
  @Column('varchar')
  handle: string
  @Column('varchar')
  description: string
  @Column('date')
  time: Date;
}
