import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from './users';

@Entity('panic_alerts')
export class PanicAlert {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 7 })
  latitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 7 })
  longitude: number;

  @CreateDateColumn()
  timestamp: Date;

  @ManyToOne(() => User, (user) => user.alerts, { onDelete: 'CASCADE' })
  user: User;
}
