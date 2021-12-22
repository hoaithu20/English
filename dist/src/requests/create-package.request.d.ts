import { Level } from "src/constants/level.enum";
import { QuestionStatus } from "src/constants/question-status.enum";
export declare class CreatePackageRequest {
    time: number;
    level: Level;
    status: QuestionStatus;
    isHidden: boolean;
    total: number;
    question: number[];
}
