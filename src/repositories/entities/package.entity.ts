import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { QuestionPackage } from './question-package.entity';

@Entity('package')
export class Package extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  // @Column({name: 'number_question'})
  // numberQuestion: number;

  @Column()
  level: number; // enum

  @Column({ name: 'time_out' })
  timeOut: number;

  @Column({ name: 'vote_up' })
  voteUp: number;

  @Column({ name: 'vote_down' })
  voteDown: number;

  @OneToMany(() => QuestionPackage, (p) => p.package)
  questionPackages: QuestionPackage[];
}
