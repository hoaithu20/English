import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";
import { PagingRequest } from "./paging.request";

export class GetLeaderBoardRequest extends PagingRequest {
  @ApiProperty()
  @IsNumber()
  week: number
}