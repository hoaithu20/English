import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsNumber } from "class-validator";

class Questions {
  @ApiProperty()
  @IsNumber()
  questionId: number;

  @ApiProperty()
  @IsBoolean()
  check: boolean;
}

export class doPackageRequest {
  @ApiProperty()
  @IsNumber()
  packageId: number;

  @ApiProperty()
  @IsArray()
  questions: Questions[];

}