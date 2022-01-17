import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class DictionaryRequest {
    @ApiProperty()
    @IsString()
    @IsOptional()
    search: string;
}