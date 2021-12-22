import { Level } from 'src/constants/level.enum';
import { QuestionStatus } from 'src/constants/question-status.enum';
import { BaseEntity } from 'typeorm';
import { Answer } from './answer.entity';
import { User } from './user.entity';
export declare class Question extends BaseEntity {
    id: number;
    title: string;
    status: QuestionStatus;
    level: Level;
    isHidden: boolean;
    like: number;
    totalAnswer: number;
    user: User;
    answers: Answer[];
    correctAnswer: number;
    createdAt: Date;
    updatedAt: Date;
}
