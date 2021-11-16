import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Package } from './package.entity';
import { Question } from './question.entity';

@Entity('question-package')
export class QuestionPackage extends BaseEntity {
  @PrimaryColumn({ name: 'question_id' })
  questionId: number;

  @PrimaryColumn({ name: 'package_id' })
  packageId: number;

  @ManyToOne(() => Question, (q) => q.questionPackages)
  @JoinColumn({ name: 'question_id' })
  question: Question;

  @ManyToOne(() => Package, (p) => p.questionPackages)
  @JoinColumn({ name: 'package_id' })
  package: Package;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
