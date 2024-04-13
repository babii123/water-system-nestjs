import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Notice {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('varchar')
  type: string;
  @Column('varchar')
  info: string;
  @Column({ type: 'varchar', default: 'system' })
  sendId: string;
  @Column('varchar')
  receiveId: string;
  @Column('date')
  time: Date;
  @Column({ type: 'boolean', name: 'is_read', default: false })
  isRead: boolean;
}
