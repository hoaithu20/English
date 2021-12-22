import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
import { AuthService } from 'src/services/auth.service';
export declare class ValidateUserExisted implements ValidatorConstraintInterface {
    private readonly authService;
    constructor(authService: AuthService);
    validate(username: any, validationArguments?: ValidationArguments): boolean | Promise<boolean>;
    defaultMessage?(validationArguments?: ValidationArguments): string;
}
export declare function IsNotExistUserName(validationOptions?: ValidationOptions): (object: unknown, propertyName: string) => void;
