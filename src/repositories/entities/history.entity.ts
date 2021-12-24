import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { Package } from './package.entity';
import { User } from './user.entity';

@Entity('history')
export class History extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @RelationId((h: History) => h.user)
  userId: number;

  @ManyToOne(() => Package)
  @JoinColumn({ name: 'package_id' })
  package: Package;

  @RelationId((h: History) => h.package)
  packageId: number;

  @Column({name: 'time'})
  time: number;

  @Column({name: 'point', type: 'decimal', precision: 5, scale: 2})
  point: string

  @Column({name: 'is_current', default: true})
  isCurrent: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
