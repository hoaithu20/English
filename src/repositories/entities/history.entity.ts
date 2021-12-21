import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { User } from './user.entity';

@Entity('history')
export class UserToken extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userTokens)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @RelationId((userToken: UserToken) => userToken.user)
  userId: number;

  @Column({name: 'package_id'})
  packageId: number;

  @Column({name: 'time'})
  time: number;

  @Column({name: 'count_true'})
  countTrue: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
