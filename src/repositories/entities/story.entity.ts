import { QuestionStatus } from 'src/constants/question-status.enum';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('story')
export class Story extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  audio: string;

  @Column()
  img: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ default: QuestionStatus.ACTIVE })
  status: QuestionStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
