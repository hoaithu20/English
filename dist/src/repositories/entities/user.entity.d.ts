import { UserRole } from 'src/constants/user-role.enum';
import { BaseEntity } from 'typeorm';
import { UserStatus } from '../../constants/user-status.enum';
import { History } from './history.entity';
import { Package } from './package.entity';
import { Question } from './question.entity';
import { Profile } from './user-profile.entity';
import { UserToken } from './user-token.entity';
export declare class User extends BaseEntity {
    id: number;
    username: string;
    email: string;
    password: string;
    status: UserStatus;
    role: UserRole;
    profile?: Profile;
    createdAt: Date;
    updatedAt: Date;
    userTokens: UserToken[];
    questions: Question[];
    packages: Package[];
    histories: History[];
}
