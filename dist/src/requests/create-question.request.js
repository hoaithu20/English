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
exports.CreateQuestionRequest = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const level_enum_1 = require("../constants/level.enum");
const question_status_enum_1 = require("../constants/question-status.enum");
class Answer {
}
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Answer.prototype, "content", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Answer.prototype, "explain", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], Answer.prototype, "isCorrect", void 0);
class CreateQuestionRequest {
}
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateQuestionRequest.prototype, "title", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsEnum(level_enum_1.Level),
    __metadata("design:type", Number)
], CreateQuestionRequest.prototype, "level", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsEnum(question_status_enum_1.QuestionStatus),
    __metadata("design:type", Number)
], CreateQuestionRequest.prototype, "status", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], CreateQuestionRequest.prototype, "isHidden", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], CreateQuestionRequest.prototype, "totalAnswer", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsArray(),
    class_transformer_1.Type(() => Answer),
    __metadata("design:type", Array)
], CreateQuestionRequest.prototype, "answers", void 0);
exports.CreateQuestionRequest = CreateQuestionRequest;
//# sourceMappingURL=create-question.request.js.map