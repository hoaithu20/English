import { QuestionStatus } from 'src/constants/question-status.enum';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('dictionary')
export class Dictionary extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  english: string;

  @Column()
  pronunciation: string;

  @Column({type: 'json'})
  vietnamese: string[];

  @Column()
  type: string;
}
