import { BaseEntity } from 'typeorm';
import { User } from './user.entity';
export declare class UserToken extends BaseEntity {
    id: number;
    user: User;
    userId: number;
    token: string;
    createdAt: Date;
}
