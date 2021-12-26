import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import { Question } from './question.entity';

@Entity('answer')
export class Answer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  content: string;

  @Column({ default: null, nullable: true })
  description: string;

  @Column({ name: 'is_true' })
  isTrue: boolean;

  @ManyToOne(() => Question, (q) => q.answers)
  @JoinColumn({ name: 'question_id' })
  question: Question;

  @RelationId((a: Answer) => a.question)
  questionId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
