import { QuestionStatus } from 'src/constants/question-status.enum';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('dictionary')
export class Dictionary extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  english: string;
 
  @Column()
  type: string;

  @Column()
  pronunciation: string;

  @Column({type: 'json'})
  vietnamese: string[];
}
