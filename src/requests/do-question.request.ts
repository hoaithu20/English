import { ApiProperty } from "@nestjs/swagger";
import { IsArray } from "class-validator";

export class DoQuestionRequest {
    @ApiProperty()
    @IsArray()
    question: number[];
}