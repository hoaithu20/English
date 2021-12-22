import { Level } from "src/constants/level.enum";
import { QuestionStatus } from "src/constants/question-status.enum";
declare class Answer {
    content: string;
    explain: string;
    isCorrect: boolean;
}
export declare class CreateQuestionRequest {
    title: string;
    level: Level;
    status: QuestionStatus;
    isHidden: boolean;
    totalAnswer: number;
    answers: Answer[];
}
export {};
