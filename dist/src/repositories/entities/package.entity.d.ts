import { Level } from 'src/constants/level.enum';
import { QuestionStatus } from 'src/constants/question-status.enum';
import { BaseEntity } from 'typeorm';
import { History } from './history.entity';
import { User } from './user.entity';
export declare class Package extends BaseEntity {
    id: number;
    user: User;
    histories: History[];
    status: QuestionStatus;
    totalQuestion: number;
    level: Level;
    isHidden: boolean;
    timeOut: number;
    like: number;
    name: string;
    questionIds: number[];
}
