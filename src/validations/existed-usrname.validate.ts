import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ErrorCode } from 'src/constants/errorcode.constant';
import { AuthService } from 'src/services/auth.service';

@ValidatorConstraint()
@Injectable()
export class ValidateUserExisted implements ValidatorConstraintInterface {
  constructor(private readonly authService: AuthService) {}

  validate(
    username: any,
    validationArguments?: ValidationArguments,
  ): boolean | Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  defaultMessage?(validationArguments?: ValidationArguments): string {
    return ErrorCode.USER_EXISTED;
  }
}

export function IsNotExistUserName(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: ValidateUserExisted,
    });
  };
}
