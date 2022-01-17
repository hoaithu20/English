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

export interface QuestionMap {
  [questionId: number]: number;
}

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

  @Column({ name: 'time', default: 0 })
  time: number;

  @Column({
    name: 'point',
    type: 'decimal',
    precision: 5,
    scale: 2,
    default: 0,
  })
  point: string;

  @Column({ name: 'is_current', default: true })
  isCurrent: boolean;

  @Column({ nullable: true, default: null, type: 'json' })
  questions: number[];

  @Column({ name: 'question_map', type: 'json', default: null })
  questionMap: QuestionMap[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
