import { Level } from 'src/constants/level.enum';
import { QuestionStatus } from 'src/constants/question-status.enum';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Answer } from './answer.entity';
import { User } from './user.entity';

@Entity('question')
export class Question extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({default: QuestionStatus.PRIVATE})
  status: QuestionStatus; // add enum;

  @Column({default: Level.EASY})
  level: Level;

  @Column({default: false})
  isHidden: boolean;

  @Column({default: 0})
  like: number;

  @Column({name: 'total_answer'})
  totalAnswer: number;

  @ManyToOne(() => User, (u) => u.questions)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Answer, (a) => a.question)
  answers: Answer[];

  @Column({ name: 'correct_answer'})
  correctAnswer: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
