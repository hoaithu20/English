import { BaseEntity } from 'typeorm';
export declare class Profile extends BaseEntity {
    id: number;
    avatar: string;
    dateOfBirth: Date;
    website: string;
    country: string;
    createdAt: Date;
    updatedAt: Date;
}
