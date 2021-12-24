import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Matches } from 'class-validator';
import { ErrorCode } from 'src/constants/errorcode.constant';

export class ResetPasswordRequest {
  @ApiProperty()
  @IsNumber()
  otp: number;

  @ApiProperty()
  @IsNumber()
  newOtp: number;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Matches(/(?!.*\s).{5,30}$/, {
    message: ErrorCode.INVALID_PASSWORD_FORMAT,
  })
  newPassword: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Matches(/(?!.*\s).{5,30}$/, {
    message: ErrorCode.INVALID_PASSWORD_FORMAT,
  })
  confirmPassword: string;
}
