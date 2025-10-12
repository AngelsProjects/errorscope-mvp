import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ErrorGroup } from './error-group.entity';

@Entity('error_events')
@Index(['fingerprint'])
@Index(['createdAt'])
export class ErrorEvent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fingerprint: string;

  @Column()
  message: string;

  @Column('text', { nullable: true })
  stack: string | null;

  @Column({
    type: 'enum',
    enum: ['error', 'warning', 'info'],
    default: 'error',
  })
  level: 'error' | 'warning' | 'info';

  @Column('jsonb')
  metadata: {
    appName?: string;
    environment?: string;
    userAgent?: string;
    url?: string;
    customData?: Record<string, any>;
  };

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => ErrorGroup, (group) => group.events)
  @JoinColumn({ name: 'fingerprint', referencedColumnName: 'fingerprint' })
  group: ErrorGroup;
}
