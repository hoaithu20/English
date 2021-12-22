import { User } from 'src/repositories/entities/user.entity';
import { CreateQuestionRequest } from 'src/requests/create-question.request';
import { PagingRequest } from 'src/requests/paging.request';
import { PaginateResult } from 'src/responses/PaginateResult';
import { QuestionsService } from 'src/services/questions.service';
export declare class QuestionsController {
    private readonly questionService;
    constructor(questionService: QuestionsService);
    getListQuestion(request: PagingRequest): Promise<PaginateResult<unknown>>;
    createQuestion(user: User, request: CreateQuestionRequest): Promise<void>;
}
