import { Level } from 'src/constants/level.enum';
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
  level: Level; // enum

  @Column()
  isHidden: boolean;

  @Column({ name: 'time_out' })
  timeOut: number;

  @Column()
  like: number;

  @OneToMany(() => QuestionPackage, (p) => p.package)
  questionPackages: QuestionPackage[];
}
