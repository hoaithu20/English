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

@Entity('user-token')
export class UserToken extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userTokens)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @RelationId((userToken: UserToken) => userToken.user)
  userId: number;

  @Column()
  @Index()
  token: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
