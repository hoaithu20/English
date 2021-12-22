import { BaseEntity } from 'typeorm';
import { Package } from './package.entity';
import { User } from './user.entity';
export declare class History extends BaseEntity {
    id: number;
    user: User;
    userId: number;
    package: Package;
    packageId: number;
    time: number;
    point: string;
    createdAt: Date;
}
