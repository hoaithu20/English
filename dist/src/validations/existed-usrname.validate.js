"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsNotExistUserName = exports.ValidateUserExisted = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const errorcode_constant_1 = require("../constants/errorcode.constant");
const auth_service_1 = require("../services/auth.service");
let ValidateUserExisted = class ValidateUserExisted {
    constructor(authService) {
        this.authService = authService;
    }
    validate(username, validationArguments) {
        throw new Error('Method not implemented.');
    }
    defaultMessage(validationArguments) {
        return errorcode_constant_1.ErrorCode.USER_EXISTED;
    }
};
ValidateUserExisted = __decorate([
    class_validator_1.ValidatorConstraint(),
    common_1.Injectable(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], ValidateUserExisted);
exports.ValidateUserExisted = ValidateUserExisted;
function IsNotExistUserName(validationOptions) {
    return function (object, propertyName) {
        class_validator_1.registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: ValidateUserExisted,
        });
    };
}
exports.IsNotExistUserName = IsNotExistUserName;
//# sourceMappingURL=existed-usrname.validate.js.map