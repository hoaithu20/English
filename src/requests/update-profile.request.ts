import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEnum, IsOptional, IsString } from "class-validator";
import { Sex } from "src/constants/sex.enum";

export class UpdateProfileRequest {
  @ApiProperty()
  @IsOptional()
  @IsString()
  avatar: string;

  @ApiProperty()
  @IsDate()
  date: Date;

  @ApiProperty()
  @IsOptional()
  @IsEnum(Sex)
  sex: Sex;
}