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
exports.CreatePackageRequest = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const level_enum_1 = require("../constants/level.enum");
const question_status_enum_1 = require("../constants/question-status.enum");
class CreatePackageRequest {
}
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsString(),
    __metadata("design:type", Number)
], CreatePackageRequest.prototype, "time", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsEnum(level_enum_1.Level),
    __metadata("design:type", Number)
], CreatePackageRequest.prototype, "level", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsEnum(question_status_enum_1.QuestionStatus),
    __metadata("design:type", Number)
], CreatePackageRequest.prototype, "status", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], CreatePackageRequest.prototype, "isHidden", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsBoolean(),
    __metadata("design:type", Number)
], CreatePackageRequest.prototype, "total", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsArray(),
    __metadata("design:type", Array)
], CreatePackageRequest.prototype, "question", void 0);
exports.CreatePackageRequest = CreatePackageRequest;
//# sourceMappingURL=create-package.request.js.map