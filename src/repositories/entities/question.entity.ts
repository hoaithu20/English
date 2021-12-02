import { Level } from 'src/constants/level.enum';
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
import { QuestionPackage } from './question-package.entity';
import { User } from './user.entity';

@Entity('question')
export class Question extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  status: number; // add enum;

  @Column()
  level: Level;

  @Column()
  isHidden: boolean;

  @Column()
  like: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => QuestionPackage, (q) => q.question)
  questionPackages: QuestionPackage[];

  @ManyToOne(() => User, (u) => u.questions)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Answer, (a) => a.question)
  answers: Answer[];
}
