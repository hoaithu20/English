import { QuestionStatus } from 'src/constants/question-status.enum';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class Story extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  audio: string;

  @Column()
  img: string;

  @Column()
  content: string;

  @Column({ default: QuestionStatus.ACTIVE })
  status: QuestionStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
