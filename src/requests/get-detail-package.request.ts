import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";
import { PagingRequest } from "./paging.request";

export class GetDetailPackageRequest extends PagingRequest{
  @ApiProperty()
  @IsNumber()
  packageId: number
}