import { BaseEntity } from 'typeorm';
import { Question } from './question.entity';
export declare class Answer extends BaseEntity {
    id: number;
    content: string;
    isTrue: boolean;
    question: Question;
    questionId: number;
    createdAt: Date;
    updatedAt: Date;
}
