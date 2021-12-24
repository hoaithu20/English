import { UserRole } from 'src/constants/user-role.enum';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserStatus } from '../../constants/user-status.enum';
import { History } from './history.entity';
import { Package } from './package.entity';
import { Point } from './point.entity';
import { Question } from './question.entity';
import { Profile } from './user-profile.entity';
import { UserToken } from './user-token.entity';

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({
    name: 'status',
    nullable: false,
    default: UserStatus.VERIFING,
  })
  status: UserStatus;

  @Column({ default: UserRole.USER })
  role: UserRole;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => UserToken, (ut) => ut.user)
  userTokens: UserToken[];

  @OneToMany(() => Question, (q) =>q.user)
  questions: Question[];

  @OneToMany(() => Package, (p) => p.user)
  packages: Package[];

  @OneToMany(() => History, (h) => h.user)
  histories: History[];

  @OneToOne(() => Profile, (p) =>p.user)
  profile: Profile;

  @OneToOne(() => Point, (p) =>p.user)
  points: Point[];
}
