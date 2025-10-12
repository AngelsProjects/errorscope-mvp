import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ErrorEvent } from './error-event.entity';

@Entity('error_groups')
export class ErrorGroup {
  @PrimaryColumn()
  fingerprint: string;

  @Column()
  message: string;

  @Column('text', { nullable: true })
  stack: string | null;

  @Column({ default: 0 })
  count: number;

  @Column({ nullable: true })
  appName: string;

  @Column({ nullable: true })
  environment: string;

  @CreateDateColumn()
  firstSeen: Date;

  @UpdateDateColumn()
  lastSeen: Date;

  @OneToMany(() => ErrorEvent, (event) => event.group)
  events: ErrorEvent[];
}
