import { Sex } from 'src/constants/sex.enum';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('profile')
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: true})
  avatar: string;

  @Column({ name: 'date_of_birth' })
  dateOfBirth: Date;

  @Column({nullable: true})
  website: string;

  @Column({nullable: true})
  country: string;

  @Column({nullable: true})
  sex: Sex;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
