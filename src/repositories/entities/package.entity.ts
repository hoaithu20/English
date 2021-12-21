import { Level } from 'src/constants/level.enum';
import { QuestionStatus } from 'src/constants/question-status.enum';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { History } from './history.entity';
import { User } from './user.entity';

@Entity('package')
export class Package extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (u) => u.packages)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => History, (h) => h.package)
  histories: History[];

  @Column({default: QuestionStatus.PRIVATE})
  status: QuestionStatus;

  @Column({name: 'total_question'})
  totalQuestion: number;

  @Column({default: Level.EASY})
  level: Level; // enum

  @Column({default: false})
  isHidden: boolean;

  @Column({ name: 'time_out' })
  timeOut: number;

  @Column({ default: 0})
  like: number;

  @Column({})
  name: string;

  @Column({ name: 'question_ids', type: 'json' })
  questionIds: number[];

}
